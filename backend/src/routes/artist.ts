import express from "express"
import ArtistController from '../controllers/artist'


const router: express.Router = express.Router()

const artistController = new ArtistController()



router.route('/list')
  .get(artistController.getArtists)

router.route('/')
  .post(artistController.add)

router.route('/id:id')
  .get(artistController.getArtistbyId)

router.route('/update/id:id')
  .put(artistController.update)

router.route('/delete/id:id')
  .delete(artistController.delete)


export default router