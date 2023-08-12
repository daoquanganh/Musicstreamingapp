import { where } from "sequelize"
import Song from "../entities/Song"
import SongOfUser from "../entities/SongOfUser"
import User from "../entities/User"


class SongOfUserService {
    async getById(id: string){
        const user = await SongOfUser.findByPk(id)

        if (user) return user.toJSON()

        throw new Error('Not found!')

    }

    async getByUserId(id: string){
        try {
            const user = await SongOfUser.findAll({where: {userId:id}})
            if (user) return user
        } catch (e: any) {
                const errors = e.errors.map((error: any) => error.message)
    
                throw new Error(errors)
        }
    }
    async listSongOfUsers(){
        const users = await SongOfUser.findAll()


        if (users) return users

        throw new Error('Not found!')
    }

    async updateSongOfUser(id:string, data: any) {
        try {
            const user = await SongOfUser.findByPk(id)
            if (user) {
                user.update(data)
            }
            return user
        } catch (e: any) {
            const errors = e.errors.map((error: any) => error.message)

            throw new Error(errors)
        }
    }
    
    async deleteSongOfUser(id:string) {
        try {
            await SongOfUser.destroy({where: {id:id}})
        } catch (e: any) {
            const errors = e.errors.map((error: any) => error.message)

            throw new Error(errors)
        }
    }

}

export default SongOfUserService