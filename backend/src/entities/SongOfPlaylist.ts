import { DataTypes, Model } from "sequelize"
import db from "../configs/dbconfig"
interface Attributes {
    id: number
    playlistId: number
    songId: number
  }
class SongOfPlaylist extends Model<Attributes> {
}

SongOfPlaylist.init({
  id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
  },
  playlistId: {
    type:DataTypes.INTEGER,
    allowNull: false,
  },
  songId: {
    type:DataTypes.INTEGER,
    allowNull: false,
  }, 
},
{
      sequelize: db,
      modelName: 'SongOfPlaylist'
})

export default SongOfPlaylist;