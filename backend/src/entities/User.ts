import { DataTypes, Model } from "sequelize"
import db from "../configs/dbconfig"
interface Attributes {
    id: number
    username: string
    email: string
    password: string
    isAdmin: boolean
    image: string
    verified: boolean
    follower: number
    track:number
  }
class User extends Model<Attributes> {}
User.init({
  id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
  },
  username: {
      type: DataTypes.STRING,
      unique: true,
  },
  email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
  },
  password: {
      type: DataTypes.STRING,
      allowNull: false,
  },
  isAdmin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
  },
  image: {
    type: DataTypes.STRING
  },
  verified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  follower: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  track: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
}, {
      sequelize: db,
      modelName: 'User'
})
export default User;