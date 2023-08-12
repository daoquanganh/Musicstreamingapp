import { DataTypes, Model } from "sequelize"
import db from "../configs/dbconfig"
interface Attributes {
    id: number
    title: string
    category: string
    language: string
    image: string
    songUrl: string
  }
class Song extends Model<Attributes> {}

Song.init({
  id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
  },
  title: {
      type: DataTypes.STRING,
  },
  category: {
      type: DataTypes.STRING,
      allowNull: false
  },
  language: {
      type: DataTypes.STRING,
      allowNull: false,
  },
  image: {
      type: DataTypes.STRING
  },
  songUrl: {
      type: DataTypes.STRING,
  }
}, {
      sequelize: db,
      modelName: 'Song'
})

export default Song;