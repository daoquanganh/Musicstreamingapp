import express from "express"
import UserController from '../controllers/user'
import passport from "../middlewares/passport";


const router: express.Router = express.Router()

const usercontroller = new UserController()


router.get('/profile/:username', 
  passport.authenticate('jwt', {session: false}), usercontroller.me)

router.route('/list')
  .get(usercontroller.getUsers)

router.route('/id:id')
  .get(usercontroller.getUserbyId)

router.route('/update/id:id')
  .put(passport.authenticate('jwt', {session: false}), usercontroller.upload, usercontroller.updateUser)

router.route('/delete/id:id')
  .delete(usercontroller.deleteUser)

router.route('/query=:username')
  .get(usercontroller.getUserbyName)


export default router