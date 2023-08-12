import express from "express"
import AuthController from '../controllers/auth'
import passport from "../middlewares/passport";


const router: express.Router = express.Router()

const authcontroller = new AuthController()


router.route('/register')
  .post(authcontroller.register)

router.route('/verify')
  .post(authcontroller.verify)

router.route('/resendOTP')
  .post(authcontroller.resendOTP)
  
router.route('/login')
  .post(authcontroller.login)


export default router