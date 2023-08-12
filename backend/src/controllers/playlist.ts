import PlaylistService from "../services/playlist"
import { Request, Response } from "express"
import Playlist from "../entities/Playlist"
import multer from "multer"
import path from 'path'
import { Op } from "sequelize"

class PlaylistController {
    private playlistService: PlaylistService

    constructor() {
        this.playlistService = new PlaylistService()
    }
    
    //GET v1/playlist/list
    getPlaylists = async (request: Request, response: Response) => {
        try {
            const records = await this.playlistService.listPlaylists()
            return response.json(records);
        } catch (error: any) {
            return response.status(404).json({ error: error.message })
        }
    }

    //POST v1/playlist/
    add = async (request: Request, response: Response) => {
        try {
            let data = {
                name : request.body.name,
                image : request.file?.path,
                numberOfTracks : 0,
                playCount: 0
            }
            const record = await this.playlistService.createPlaylist(data)
            console.log(record)
            return response.json({ record, msg: 'Successfully create playlist' })
        } catch (error: any) {
            response.status(400).json({ error: error.message })
        }
    }

    //GET v1/playlist/query=:name
    getPlaylistbyName = async (request: Request, response: Response) => {
        try {
            const record = await Playlist.findAll({where:{
                name:{[Op.substring]: request.params.name}
            }})
            return response.json(record);
        } catch (error: any) {
            response.status(404).json({ error: error.message })
        }
    }

    //GET v1/playlist/id:id
    getPlaylistbyId = async (request: Request, response: Response) => {
        try {
            const record = await this.playlistService.getById(request.params.id.toString())
            return response.json(record);
        } catch (error: any) {
            response.status(404).json({ error: error.message })
        }
    }

    //PUT v1/playlist/id:id
    update = async (request: Request, response: Response) => {
        try {
            const record = await this.playlistService.updatePlaylist(request.params.id, request.body)
            return response.json({record, msg: 'Successfully update playlist' })
        } catch (error: any) {
            response.status(404).json({ error: error.message })
        }
    }
    //DELETE v1/playlist/id:id
    delete = async (request: Request, response: Response) => {
        try {
            const record = await this.playlistService.deletePlaylist(request.params.id)
            return response.json({msg: 'Successfully delete playlist' })
        } catch (error: any) {
            response.status(404).json({ error: error.message })
        }
    }

    // Image Controller
    storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, './uploads/playlists/images')
        },
        filename: (req, file, cb) => {
            cb(null, "playlist"+ Date.now()+ path.extname(file.originalname))
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

export default PlaylistController