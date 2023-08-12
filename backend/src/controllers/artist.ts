import ArtistService from "../services/artist"
import { Request, Response } from "express"
import Artist from "../entities/Artist"
import multer from "multer"
import path from 'path'

class ArtistController {
    private artistService: ArtistService

    constructor() {
        this.artistService = new ArtistService()
    }
    
    //GET v1/artist/list
    getArtists = async (request: Request, response: Response) => {
        try {
            Artist.findAll()
                .then(artists => {
                    response.send(artists)
                })
            const records = await this.artistService.listArtists()
            return response.json(records);
        } catch (error: any) {
            return response.status(404).json({ error: error.message })
        }
    }

    //POST v1/artist/
    add = async (request: Request, response: Response) => {
        try {
            const record = await this.artistService.createArtist(request.body)
            console.log(record)
            return response.json({ record, msg: 'Successfully create artist' })
        } catch (error: any) {
            response.status(400).json({ error: error.message })
        }
    }

    //GET v1/artist/id:id
    getArtistbyId = async (request: Request, response: Response) => {
        try {
            const record = await this.artistService.getById(request.params.id)
            return response.json(record);
        } catch (error: any) {
            response.status(404).json({ error: error.message })
        }
    }

    //PUT v1/artist/id:id
    update = async (request: Request, response: Response) => {
        try {
            const record = await this.artistService.updateArtist(request.params.id, request.body)
            return response.json({record, msg: 'Successfully update artist' })
        } catch (error: any) {
            response.status(404).json({ error: error.message })
        }
    }
    //DELETE v1/artist/id:id
    delete = async (request: Request, response: Response) => {
        try {
            const record = await this.artistService.deleteArtist(request.params.id)
            return response.json({msg: 'Successfully delete artist' })
        } catch (error: any) {
            response.status(404).json({ error: error.message })
        }
    }

    // Image Controller
    storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, "./uploads/images/artists")
        },
        filename: (req, file, cb) => {
            cb(null, "artist"+ Date.now()+ path.extname(file.originalname))
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

export default ArtistController