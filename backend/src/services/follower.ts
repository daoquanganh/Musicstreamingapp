import { where } from "sequelize"
import Playlist from "../entities/Playlist"
import Follower from "../entities/Follower"


class FollowerService {
    async getById(id: string){
        const user = await Follower.findByPk(id)

        if (user) return user.toJSON()

        throw new Error('Not found!')

    }

    async getByFollowingId(id: string){
        try {
            const user = await Follower.findAll({where: {followingId: id}})
            if (user) return user
        } catch (e: any) {
                const errors = e.errors.map((error: any) => error.message)
    
                throw new Error(errors)
        }
    }
    async listFollowers(){
        const users = await Follower.findAll()


        if (users) return users

        throw new Error('Not found!')
    }

    async updateFollower(id:string, data: any) {
        try {
            const user = await Follower.findByPk(id)
            if (user) {
                user.update(data)
            }
            return user
        } catch (e: any) {
            const errors = e.errors.map((error: any) => error.message)

            throw new Error(errors)
        }
    }
    
    async deleteFollower(id:string) {
        try {
            await Follower.destroy({where: {id:id}})
        } catch (e: any) {
            const errors = e.errors.map((error: any) => error.message)

            throw new Error(errors)
        }
    }

}

export default FollowerService