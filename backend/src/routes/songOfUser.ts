import express from "express"
import SongOfUserController from '../controllers/songOfUser'


const router: express.Router = express.Router()
const songOfUserController = new SongOfUserController()

router.route('/list')
  .get(songOfUserController.getLists)

router.route('/')
  .post(songOfUserController.add)

router.route('/userId:id')
  .get(songOfUserController.getSongOfUserbyId)

router.route('/update/id:id')
  .put(songOfUserController.update)

router.route('/delete/id:id')
  .delete(songOfUserController.delete)


export default router