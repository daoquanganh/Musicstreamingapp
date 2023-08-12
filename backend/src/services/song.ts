import SongError from "../errors/song"
import Song from "../entities/Song"


class SongService {
    async getById(id: string){
        const song = await Song.findByPk(id)

        if (song) return song.toJSON()

        throw new SongError('Not found!')
    }

    async listSongs(){
        const songs = await Song.findAll()

        if (songs) return songs

        throw new SongError('Not found!')
    }

    async createSong(song: any): Promise<Song|Error>{
        try {
            const songData = await Song.create(song)
            return songData
        } catch (e: any) {
            const errors = e.errors.map((error: any) => error.message)
            throw new SongError(errors)
        }
    }



    async updateSong(id:string, data: any) {
        try {
            const song = await Song.findByPk(id)
            if (song) {
                song.update(data)
            }
            return song
        } catch (e: any) {
            const errors = e.errors.map((error: any) => error.message)

            throw new SongError(errors)
        }
    }
    
    async deleteSong(id:string) {
        try {
            await Song.destroy({where: {id:id}})
        } catch (e: any) {
            const errors = e.errors.map((error: any) => error.message)

            throw new SongError(errors)
        }
    }

}

export default SongService