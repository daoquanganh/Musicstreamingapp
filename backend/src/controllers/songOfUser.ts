import Song from "../entities/Song"
import SongOfUser from "../entities/SongOfUser"
import User from "../entities/User"
import SongService from "../services/song"
import SongOfUserService from "../services/songOfUser"
import { Request, Response } from "express"


class SongOfUserController {
    private songOfUserService: SongOfUserService


    constructor() {
        this.songOfUserService = new SongOfUserService()
    }
    
    //GET v1/songOfUser/list
    getLists = async (request: Request, response: Response) => {
        try {
            const records = await this.songOfUserService.listSongOfUsers()
            return response.json(records);
        } catch (error: any) {
            return response.status(404).json({ error: error.message })
        }
    }

    //POST v1/songOfUser/
    add = async (request: Request, response: Response) => {
        try {
            const connection = await SongOfUser.create(request.body)
            const user = await User.findByPk(request.body.userId)
            if (user) {
                let track = user.dataValues.track
                if (track || track==0) {
                    track+=1
                    await user.update({track})
                }
            }
            return response.status(201).json(connection)
        } catch (e:any) {
            return response.status(500).json({message: e.message})
        }
    }

    //GET v1/songOfUser/userId:id
    getSongOfUserbyId = async (request: Request, response: Response) => {
        try {
            const record = await this.songOfUserService.getByUserId(request.params.id)
            if (record) {
                var newData: any[] = []
                newData = await Promise.all( record.map(async (element)=> {
                    const song = await Song.findByPk(element.dataValues.songId.toString())
                    if (song) {
                        return {...element.dataValues, songInfo:song.dataValues}
                    }
                }))
            return response.json(newData);
            } else return response.status(404).json({message: 'No songs found'})
        } catch (error: any) {
            response.status(404).json({ error: error.message })
        }
    }

    //PUT v1/songOfUser/id:id
    update = async (request: Request, response: Response) => {

        try {

            const record = await this.songOfUserService.updateSongOfUser(request.params.id, request.body)
            return response.json({record, msg: 'Successfully update songOfUser' })
        } catch (error: any) {
            response.status(404).json({ error: error.message })
        }
    }
    //DELETE v1/songOfUser/id:id
    delete = async (request: Request, response: Response) => {
        try {
            const record = await this.songOfUserService.deleteSongOfUser(request.params.id)
            return response.json({msg: 'Successfully delete songOfUser' })
        } catch (error: any) {
            response.status(404).json({ error: error.message })
        }
    }
}

export default SongOfUserController