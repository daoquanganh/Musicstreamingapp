import GenreError from "../errors/genre"
import Genre from "../entities/Genre"


class GenreService {
    async getById(id: string){
        const category = await Genre.findByPk(id)

        if (category) return category.toJSON()

        throw new GenreError('Not found!')

    }

    async createGenre(category: any): Promise<Genre|Error>{
        try {
            const categoryData = await Genre.create(category)
            return categoryData
        } catch (e: any) {
            const errors = e.errors.map((error: any) => error.message)
            throw new GenreError(errors)
        }
    }

    async listGenres(){
        const categorys = await Genre.findAll()

        if (categorys) return categorys

        throw new GenreError('Not found!')
    }

    async updateGenre(id:string, data: any) {
        try {
            const category = await Genre.findByPk(id)
            if (category) {
                category.update(data)
            }
            return category
        } catch (e: any) {
            const errors = e.errors.map((error: any) => error.message)

            throw new GenreError(errors)
        }
    }
    
    async deleteGenre(id:string) {
        try {
            await Genre.destroy({where: {id:id}})
        } catch (e: any) {
            const errors = e.errors.map((error: any) => error.message)

            throw new GenreError(errors)
        }
    }

}

export default GenreService