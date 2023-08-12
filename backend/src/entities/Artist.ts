import { DataTypes, Model } from "sequelize"
import db from "../configs/dbconfig"
interface Attributes {
    id: number
    username: string
    email: string
    gender: string
    avatar: string
  }
class Artist extends Model<Attributes> {}

Artist.init({
  id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
  },
  username: {
      type: DataTypes.STRING,
      allowNull: true,
  },
  gender: {
      type: DataTypes.STRING,
  },
  email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
  },
  avatar: {
      type: DataTypes.STRING,
  },
}, {
      sequelize: db,
      modelName: 'Artist'
})

export default Artist;