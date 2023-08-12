import { DataTypes, Model } from "sequelize"
import db from "../configs/dbconfig"
interface Attributes {
    id: number
    name: string
    image: string
    numberOfTracks: number
    playCount: number
  }
class Playlist extends Model<Attributes> {
}

Playlist.init({
  id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
  },
  name: {
      type: DataTypes.STRING,
      allowNull: true,
  },
  image: {
      type: DataTypes.STRING,
  },
  numberOfTracks:  {
    type: DataTypes.INTEGER
  },
  playCount: {
    type: DataTypes.INTEGER
  }
}, {
      sequelize: db,
      modelName: 'Playlist'
})

export default Playlist;