import Playlist from "../entities/Playlist"
import Song from "../entities/Song"
import Follower from "../entities/Follower"
import PlaylistService from "../services/playlist"
import SongService from "../services/song"
import FollowerService from "../services/follower"
import { Request, Response } from "express"
import User from "../entities/User"


class FollowerController {
    private followerService: FollowerService
    private playlistService: PlaylistService
    private songService: SongService

    constructor() {
        this.followerService = new FollowerService()
    }
    
    //GET v1/follower/list
    getLists = async (request: Request, response: Response) => {
        try {
            const records = await this.followerService.listFollowers()
            return response.json(records);
        } catch (error: any) {
            return response.status(404).json({ error: error.message })
        }
    }

    //POST v1/follower
    add = async (request: Request, response: Response) => {
        try {
            const connection = await Follower.create(request.body)
            const userFollowing = await User.findByPk(request.body.followingId)
            if (userFollowing) {
                let follower = userFollowing.dataValues.follower
                if (follower || follower==0) {
                    follower+=1
                    await userFollowing.update({follower})
                }
            }
            return response.status(201).json(connection)
        } catch (e:any) {
            return response.status(500).json({message: e.message})
        }
    }

    //GET v1/follower/followingId:id
    getFollowerbyId = async (request: Request, response: Response) => {
        try {
            const record = await this.followerService.getByFollowingId(request.params.id)
            if (record) {
                var newData: any[] = []
                newData = await Promise.all( record.map(async (element)=> {
                    const follower = await User.findByPk(element.dataValues.followerId.toString())
                    if (follower) {
                        return {...element.dataValues, followerInfo:follower.dataValues}
                    }
                }))
            return response.json(newData);
            } else return response.status(404).json({message: 'User has no followers'})
        } catch (error: any) {
            response.status(404).json({ error: error.message })
        }
    }

    //PUT v1/follower/id:id
    update = async (request: Request, response: Response) => {

        try {

            const record = await this.followerService.updateFollower(request.params.id, request.body)
            return response.json({record, msg: 'Successfully update follower' })
        } catch (error: any) {
            response.status(404).json({ error: error.message })
        }
    }
    //DELETE v1/follower/id:id
    delete = async (request: Request, response: Response) => {
        try {
            const record = await this.followerService.deleteFollower(request.params.id)
            return response.json({msg: 'Successfully delete follower' })
        } catch (error: any) {
            response.status(404).json({ error: error.message })
        }
    }
}

export default FollowerController