import express from "express"
import SongController from '../controllers/song'


const router: express.Router = express.Router()

const songController = new SongController()



router.route('/list')
  .get(songController.getSongs)

router.route('/')
  .post(songController.upload.fields([
    { name: 'image', maxCount: 1 },
    { name: 'songUrl', maxCount: 1 }
  ]),songController.add )

router.route('/query=:title').get(songController.getSongbyParam)

router.route('/id:id')
  .get(songController.getSongbyId)

router.route('/update/id:id')
  .put(songController.update)

router.route('/delete/id:id')
  .delete(songController.delete)


export default router