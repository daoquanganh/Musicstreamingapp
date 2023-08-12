import SongService from "../services/song"
import { Request, Response } from "express"
import Song from "../entities/Song"
import multer from "multer"
import path from 'path'
import { Op, where } from "sequelize"

class SongController {
    private songService: SongService

    constructor() {
        this.songService = new SongService()
    }
    
    //GET v1/song/list
    getSongs = async (request: Request, response: Response) => {
        try {
            const records = await this.songService.listSongs()
            return response.json(records)
        } catch (error: any) {
            return response.status(404).json({ error: error.message })
        }
    }

    //POST v1/song/
    add = async (request: Request, response: Response) => {
        try {
            if (request.files == undefined){
                return response.json({ msg: 'No files selected' })
            } else {
                let data = {
                    title : request.body.title,
                    category : request.body.category,
                    language : request.body.language,
                    image: (request.files as any)['image'][0].path,
                    songUrl : (request.files as any)['songUrl'][0].path
                }
                const record = await this.songService.createSong(data)
                return response.json({ record, msg: 'Successfully create song' })
            }
        } catch (error: any) {
            response.status(400).json({ error: error.message })
        }
    }

    //GET v1/song/id:id
    getSongbyId = async (request: Request, response: Response) => {
        try {
            const record = await this.songService.getById(request.params.id)
            return response.json(record);
        } catch (error: any) {
            response.status(404).json({ error: error.message })
        }
    }
    //GET v1/song/query=:title
    getSongbyParam = async (request: Request, response: Response) => {
        try {
            const record = await Song.findAll({where: 
                {title: {[Op.substring]: request.params.title }}})
            return response.json(record);
        } catch (error: any) {
            response.status(404).json({ error: error.message })
        }
    } 

    //PUT v1/song/id:id
    update = async (request: Request, response: Response) => {

        try {

            const record = await this.songService.updateSong(request.params.id, request.body)
            return response.json({record, msg: 'Successfully update song' })
        } catch (error: any) {
            response.status(404).json({ error: error.message })
        }
    }
    //DELETE v1/song/id:id
    delete = async (request: Request, response: Response) => {
        try {
            const record = await this.songService.deleteSong(request.params.id)
            return response.json({msg: 'Successfully delete song' })
        } catch (error: any) {
            response.status(404).json({ error: error.message })
        }
    }

    // Image Controller
    storage = multer.diskStorage({
        destination: (req, file, cb) => {
            if (file.fieldname === "image") {
                cb(null, './uploads/songs/images')
            }
            else if (file.fieldname === "songUrl") {
                cb(null, './uploads/songs/urls');
            }
         },
        filename: (req, file, cb) => {
            if (file.fieldname === "image") {
                cb(null, "image"+ Date.now()+ path.extname(file.originalname))
            }
            else if (file.fieldname === "songUrl") {
                cb(null, "song"+ Date.now()+ path.extname(file.originalname))
            }
        }
    })

    upload = multer({
        storage: this.storage,
        limits: {fileSize: 5000000},
        fileFilter: (req, file, cb) => {
            const fileTypes = /jpeg|jpg|png|mp3/
            const extname = fileTypes.test(path.extname(file.originalname))
        
            if (extname) {
                return cb(null, true)
            }
            cb(Error('Give proper files format to upload'));
        }
    })
}

export default SongController