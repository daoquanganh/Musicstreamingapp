import PlaylistError from "../errors/playlist"
import Playlist from "../entities/Playlist"


class PlaylistService {
    async getById(id: string){
        const playlist = await Playlist.findByPk(id)

        if (playlist) return playlist.toJSON()

        throw new PlaylistError('Not found!')
    }

    async createPlaylist(playlist: any): Promise<Playlist|Error>{
        try {
            const playlistData = await Playlist.create(playlist)
            return playlistData
        } catch (e: any) {
            const errors = e.errors.map((error: any) => error.message)
            throw new PlaylistError(errors)
        }
    }

    async listPlaylists(){
        const playlists = await Playlist.findAll()

        if (playlists) return playlists

        throw new PlaylistError('Not found!')
    }

    async updatePlaylist(id:string, data: any) {
        try {
            const playlist = await Playlist.findByPk(id)
            if (playlist) {
                playlist.update(data)
            }
            return playlist
        } catch (e: any) {
            const errors = e.errors.map((error: any) => error.message)

            throw new PlaylistError(errors)
        }
    }
    
    async deletePlaylist(id:string) {
        try {
            await Playlist.destroy({where: {id}})
        } catch (e: any) {
            const errors = e.errors.map((error: any) => error.message)

            throw new PlaylistError(errors)
        }
    }

}

export default PlaylistService