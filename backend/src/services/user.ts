import UserError from "../errors/user"
import User from "../entities/User"
import bcrypt from "bcrypt"

class UserService {
    async getById(id: string){
        const user = await User.findByPk(id)

        if (user) return user.toJSON()

        throw new UserError('Not found!')

    }
    
    async getByEmail(email: string){
        try {
            const user = await User.findOne({where: {email}})
            return user
        } catch (e: any) {
            const errors = e.errors?.map((error: any) => error.message)
            throw new UserError(errors)
        }
    }

    async getByUsername(username: string){
        try {
            const user = await User.findOne({where: {username}})
            return user
        } catch (e: any) {
            const errors = e.errors?.map((error: any) => error.message)
            throw new UserError(errors)
        }
    }

    async createUser(user: any): Promise<User>{
        try {
            user.password = bcrypt.hashSync(user.password, 10)
            const userData = await User.create(user)
            return userData
        } catch (e: any) {
            const errors = e.errors.map((error: any) => error.message)
            throw new UserError(errors)
        }
    }

    async listUsers(){
        const users = await User.findAll()

        if (users) return users

        throw new UserError('Not found!')
    }

    async updateUser(id:string, data: any) {
        try {
            const user = await User.findByPk(id)
            if (user) {
                user.update(data)
            }
            return user
        } catch (e: any) {
            const errors = e.errors.map((error: any) => error.message)

            throw new UserError(errors)
        }
    }
    
    async deleteUser(id:string) {
        try {
            await User.destroy({where: {id:id}})
        } catch (e: any) {
            const errors = e.errors.map((error: any) => error.message)

            throw new UserError(errors)
        }
    }
    async checkPassword(username: string, password: string): Promise<any> {
        try {
            const user = await User.findOne({where: {username:username}})
            if (user) {
                if (user.dataValues.verified == false) throw new UserError("You need to verify your email before signing in")
                var matchPassword = bcrypt.compareSync(password, user.dataValues.password)
                return { user: user, passwordMatch: matchPassword }
            } else throw new UserError("User does not exist")



        } catch (e: any) {
            throw new UserError(e.message)
        }
    }
}

export default UserService