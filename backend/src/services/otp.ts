import OTPError from "../errors/otp"
import OTP from "../entities/Otp"
import bcrypt from "bcrypt"
import { v4 as uuidv4 } from "uuid"
import nodemailer from 'nodemailer'

class OTPService {
    async getByUserId(userId: string){
        const otp = await OTP.findByPk(userId)

        if (otp) return otp.toJSON()

        throw new OTPError('Not found!')

    }

    async sendOTP(userId: number, email: string) {
        try {
            const otp = `${Math.floor(1000 + Math.random() * 9000)}`

            const mailOptions = {
                from: process.env.EMAIL,
                to: email,
                subject: 'Verify your email',
                html: `<p> Enter <b>${otp}</b> in the app to verify your email</p>`
              }
              const hashedOTP = bcrypt.hashSync(otp, 10)
              const otpId = uuidv4()
              const data = {id: otpId,
                  userId: userId,
                  otp:hashedOTP,
                  createAt: Date.now(),
                  expiresAt: Date.now() + 3600000}
              const newOTPVerification = await OTP.create(data)
              console.log(newOTPVerification)
              var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                  user: process.env.EMAIL,
                  pass: process.env.EMAIL_PASSWORD
                }
              })
              await transporter.sendMail(mailOptions)

              return {
                  status: "PENDING",
                  message: "Verification otp email sent",
                }
        } catch (e:any) {
            throw new Error(e.message)
        }
    }
}


export default OTPService