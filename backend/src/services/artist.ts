import ArtistError from "../errors/artist"
import Artist from "../entities/Artist"


class ArtistService {
    async getById(id: string){
        const artist = await Artist.findByPk(id)

        if (artist) return artist.toJSON()

        throw new ArtistError('Not found!')

    }

    async createArtist(artist: any): Promise<Artist|Error>{
        try {
            const artistData = await Artist.create(artist)
            return artistData
        } catch (e: any) {
            const errors = e.errors.map((error: any) => error.message)
            throw new ArtistError(errors)
        }
    }

    async listArtists(){
        const artists = await Artist.findAll()

        if (artists) return artists

        throw new ArtistError('Not found!')
    }

    async updateArtist(id:string, data: any) {
        try {
            const artist = await Artist.findByPk(id)
            if (artist) {
                artist.update(data)
            }
            return artist
        } catch (e: any) {
            const errors = e.errors.map((error: any) => error.message)

            throw new ArtistError(errors)
        }
    }
    
    async deleteArtist(id:string) {
        try {
            await Artist.destroy({where: {id:id}})
        } catch (e: any) {
            const errors = e.errors.map((error: any) => error.message)

            throw new ArtistError(errors)
        }
    }

}

export default ArtistService