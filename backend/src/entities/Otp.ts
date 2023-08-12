import { DataTypes, Model } from "sequelize"
import db from "../configs/dbconfig"
interface Attributes {
  id: string
  userId: number
  otp: string
  createAt: number
  expiresAt: number
}
class OTP extends Model<Attributes> {}
OTP.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true
},
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  otp: {
    type: DataTypes.STRING,
  },
  createAt: {
    type: DataTypes.BIGINT,
  },  
  expiresAt: {
    type: DataTypes.BIGINT,
  }
}, {
      sequelize: db,
      modelName: 'OTP'
})

export default OTP;