import { DataTypes, Model } from "sequelize"
import db from "../configs/dbconfig"
interface Attributes {
    id: number
    followerId: number
    followingId: number
  }
class Follower extends Model<Attributes> {}

Follower.init({
  id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
  },
  followerId: {
    type:DataTypes.INTEGER,
    allowNull: false,
  },
  followingId: {
    type:DataTypes.INTEGER,
    allowNull: false,
  }, 
}, {
      sequelize: db,
      modelName: 'Follower'
})

export default Follower;