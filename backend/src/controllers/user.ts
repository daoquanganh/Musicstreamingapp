import UserService from "../services/user"
import { Request, Response } from "express"
import User from "../entities/User"
import multer from "multer"
import path from 'path'
import { Op } from "sequelize"

class UserController {
    private userService: UserService

    constructor() {
        this.userService = new UserService()
    }
    // GET v1/user/profile/:username
    me = async (request: Request, response: Response) => {
        try {
            const record = await this.userService.getByUsername(request.params.username)
            return response.json(record);

        } catch (error:any) {
            response.status(404).json({ error: error.message })
        }
      }
    
    //GET v1/user/list
    getUsers = async (request: Request, response: Response) => {
        try {
            const records = await this.userService.listUsers()
            return response.json(records);
        } catch (error: any) {
            return response.status(404).json({ error: error.message })
        }
    }

    //GET v1/user/id:id
    getUserbyId = async (request: Request, response: Response) => {
        try {
            const record = await this.userService.getById(request.params.id)
            return response.json(record);
        } catch (error: any) {
            response.status(404).json({ error: error.message })
        }
    }

    //GET v1/user/query=:username
    getUserbyName = async (request: Request, response: Response) => {
        try {
            const record = await User.findAll({where:
                {username: {[Op.substring]:request.params.username}}})
            return response.json(record);
        } catch (error: any) {
            response.status(404).json({ error: error.message })
        }
    }

    //PUT v1/user/id:id
    updateUser = async (request: Request, response: Response) => {
        try {
            let data = {
                username: request.body.username,
                image : request.file?.path,
            } 
            const record = await this.userService.updateUser(request.params.id, data)
            return response.json({record, msg: 'Successfully update user' })
        } catch (error: any) {
            response.status(404).json({ error: error.message })
        }
    }
    //DELETE v1/user/id:id
    deleteUser = async (request: Request, response: Response) => {
        try {
            const record = await this.userService.deleteUser(request.params.id)
            return response.json({msg: 'Successfully delete user' })
        } catch (error: any) {
            response.status(404).json({ error: error.message })
        }
    }

    // Image Controller
    storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, './uploads/users/')
        },
        filename: (req, file, cb) => {
            cb(null, "user"+ Date.now()+ path.extname(file.originalname))
        }
    })

    upload = multer({
        storage: this.storage,
        limits: {fileSize: 5000000},
        fileFilter: (req, file, cb) => {
            const fileTypes = /jpeg|jpg|png/
            const mimeType = fileTypes.test(file.mimetype)
            const extname = fileTypes.test(path.extname(file.originalname))
        
            if (mimeType && extname) {
                return cb(null, true)
            }
            cb(Error('Give proper files format to upload'));
        }
    }).single('image')
}

export default UserController