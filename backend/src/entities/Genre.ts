import { DataTypes, Model } from "sequelize"
import db from "../configs/dbconfig"
interface Attributes {
    id: number
    name: string
  }
class Genre extends Model<Attributes> {}

Genre.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull:false
    }
}, {
      sequelize: db,
      modelName: 'Genre'
})

export default Genre;