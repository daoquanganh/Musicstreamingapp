import express from "express"
import SongOfPlaylistController from '../controllers/songOfPlaylist'


const router: express.Router = express.Router()

const songOfPlaylistController = new SongOfPlaylistController()

router.route('/list')
  .get(songOfPlaylistController.getLists)

router.route('/playlistId:id')
  .get(songOfPlaylistController.getSongOfPlaylistbyId)

router.route('/update/id:id')
  .put(songOfPlaylistController.update)

router.route('/delete/id:id')
  .delete(songOfPlaylistController.delete)


export default router