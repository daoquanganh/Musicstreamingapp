import { DataTypes, Model } from "sequelize"
import db from "../configs/dbconfig"
interface Attributes {
    id: number
    songId: number
    userId: number
  }
class SongOfUser extends Model<Attributes> {
}

SongOfUser.init({
  id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
  },
  songId: {
    type:DataTypes.INTEGER,
    allowNull: false,
  },
  userId: {
    type:DataTypes.INTEGER,
    allowNull: false,
  }, 
},
{
      sequelize: db,
      modelName: 'SongOfUser'
})

export default SongOfUser;