import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { jwtOptions } from '../middlewares/passport'
import UserService from '../services/user'
import bcrypt from 'bcrypt'
import OTP from '../entities/Otp'
import 'dotenv/config'
import OTPService from '../services/otp'


class AuthController {
    private userService: UserService
    private otpService: OTPService

    constructor() {
        this.userService = new UserService()
        this.otpService = new OTPService()
    }

    register = async (request: Request, response: Response) => {
        try {
            const emailCheck = await this.userService.getByEmail(request.body.email);
            const usernameCheck = await this.userService.getByUsername(request.body.username);

            if (emailCheck) {
              return response.status(400).json({ emailError: "User with specified email already exists" })
            }
            else if (usernameCheck) {
                return response.status(400).json({ usernameError: "User with specified username already exists" })
            }
            else {
                const userData = {...request.body, verified: false}
                const user = await this.userService.createUser(userData)
                const otpStatus = await this.otpService.sendOTP(user.getDataValue('id'), user.getDataValue('email'))
                if (otpStatus.status == "PENDING"){
                    return response.status(201).json({...otpStatus, data: user })
                } else {
                    return response.status(201).json({
                        status: "FAILED",
                        message: otpStatus.message
                      })
                }
            }
        }

        catch (error: any) {
             return response.status(400).json({ 
                status:"FAILED_C",
                error: error.message })
        }
    }
    // POST v1/auth/verifyOTP
    verify = async (request: Request, response: Response) => {
        try {
            let userId = request.body.userId
            let otp = request.body.otp
            if (!userId) {
                throw new Error("Empty user id details are not allowed")
            }
            else if (!otp){
                throw new Error("Empty otp details are not allowed")
            }
            else {
                const records = await OTP.findOne({where:{userId:userId}})
                console.log(records)
                if (records) {
                    if (records.getDataValue('expiresAt') < Date.now()) {
                        OTP.destroy({where:{userId}})
                        throw new Error("Code has expired. Please request a new OTP")
                    } else {
                        const validOTP = await bcrypt.compareSync( otp, records.getDataValue('otp'))
                        console.log(records.getDataValue('otp'))
                        console.log(otp)
                        if (!validOTP) {
                            throw new Error("Invalid code passed")
                        } else {
                            const userUpdate = await this.userService.updateUser(userId, {verified: true})
                            OTP.destroy({where:{userId}})
                            response.json({
                                status:'VERIFIED',
                                message: 'User email verified succesfully'
                            })
                        }
                    }
                } else {
                    throw new Error("Account record does not exist")
                }
            }
        } catch (error: any) {
            response.json({
                status: "FAILED",
                message: error.message,
            })
        }
    }
    // POST /v1/auth/resendOTP
    resendOTP = async (request: Request, response: Response) => {
        try {
            let userId = request.body.userId
            let email = request.body.email
            if (!userId || !email) {
                throw new Error("Empty email details are not allowed")
            } else {
                await OTP.destroy({where:{userId}})
                const otpStatus = await this.otpService.sendOTP(userId, email)
                if (otpStatus.status == "PENDING"){
                    return response.status(201).json(otpStatus)
                } else {
                    return response.status(201).json({
                        status: "FAILED",
                        message: otpStatus.message
                      })
                }
            }
        } catch (e: any) {
            return response.status(401).json({ error: e.message })
        }
    }

    login = async (request: Request, response: Response) => {
        const { body } = request

        const { username, password } = body

        try {
            const { user, passwordMatch } = await this.userService.checkPassword(username, password)

            if (passwordMatch) {
                const payload = { id: user.id, isAdmin: user.isAdmin }

                const accessToken = jwt.sign(payload, jwtOptions.secretOrKey, {expiresIn:'1hr'})

                response.json({ accessToken, userId: user.id })
            } else {
                throw new Error('Invalid credentials')
            }
        } catch (e: any) {
            return response.status(401).json({ error: e.message })
        }
    }


}

export default AuthController