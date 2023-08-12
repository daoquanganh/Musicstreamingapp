import Playlist from "../entities/Playlist"
import Song from "../entities/Song"
import SongOfPlaylist from "../entities/SongOfPlaylist"
import PlaylistService from "../services/playlist"
import SongService from "../services/song"
import SongOfPlaylistService from "../services/songOfPlaylist"
import { Request, Response } from "express"


class SongOfPlaylistController {
    private songOfPlaylistService: SongOfPlaylistService
    private playlistService: PlaylistService
    private songService: SongService

    constructor() {
        this.songOfPlaylistService = new SongOfPlaylistService()
    }
    
    //GET v1/songOfPlaylist/id:playlist
    getLists = async (request: Request, response: Response) => {
        try {
            const records = await this.songOfPlaylistService.listSongOfPlaylists()
            return response.json(records);
        } catch (error: any) {
            return response.status(404).json({ error: error.message })
        }
    }

    //POST v1/playlist/addSong
    add = async (request: Request, response: Response) => {
        try {
            const connection = await SongOfPlaylist.create(request.body)
            const playlist = await Playlist.findByPk(request.body.playlistId)
            if (playlist) {
                let numberOfTracks = playlist.dataValues.numberOfTracks
                if (numberOfTracks || numberOfTracks==0) {
                    numberOfTracks+=1
                    await playlist.update({numberOfTracks:numberOfTracks})
                }
            }
            return response.status(201).json(connection)
        } catch (e:any) {
            return response.status(500).json({message: e.message})
        }
    }

    //GET v1/songOfPlaylist/playlistId:id
    getSongOfPlaylistbyId = async (request: Request, response: Response) => {
        try {
            const record = await this.songOfPlaylistService.getByPlaylistId(request.params.id)
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
    

    //PUT v1/songOfPlaylist/id:id
    update = async (request: Request, response: Response) => {

        try {

            const record = await this.songOfPlaylistService.updateSongOfPlaylist(request.params.id, request.body)
            return response.json({record, msg: 'Successfully update songOfPlaylist' })
        } catch (error: any) {
            response.status(404).json({ error: error.message })
        }
    }
    //DELETE v1/songOfPlaylist/id:id
    delete = async (request: Request, response: Response) => {
        try {
            const record = await this.songOfPlaylistService.deleteSongOfPlaylist(request.params.id)
            return response.json({msg: 'Successfully delete songOfPlaylist' })
        } catch (error: any) {
            response.status(404).json({ error: error.message })
        }
    }
}

export default SongOfPlaylistController