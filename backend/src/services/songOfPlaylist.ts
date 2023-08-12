import { where } from "sequelize"
import Playlist from "../entities/Playlist"
import SongOfPlaylist from "../entities/SongOfPlaylist"


class SongOfPlaylistService {
    async getById(id: string){
        const song = await SongOfPlaylist.findByPk(id)

        if (song) return song.toJSON()

        throw new Error('Not found!')

    }

    async getByPlaylistId(id: string){
        try {
            const song = await SongOfPlaylist.findAll({where: {playlistId: id}})
            if (song) return song
        } catch (e: any) {
                const errors = e.errors.map((error: any) => error.message)
    
                throw new Error(errors)
        }
    }
    async listSongOfPlaylists(){
        const songs = await SongOfPlaylist.findAll()


        if (songs) return songs

        throw new Error('Not found!')
    }

    async updateSongOfPlaylist(id:string, data: any) {
        try {
            const song = await SongOfPlaylist.findByPk(id)
            if (song) {
                song.update(data)
            }
            return song
        } catch (e: any) {
            const errors = e.errors.map((error: any) => error.message)

            throw new Error(errors)
        }
    }
    
    async deleteSongOfPlaylist(id:string) {
        try {
            await SongOfPlaylist.destroy({where: {id:id}})
        } catch (e: any) {
            const errors = e.errors.map((error: any) => error.message)

            throw new Error(errors)
        }
    }

}

export default SongOfPlaylistService