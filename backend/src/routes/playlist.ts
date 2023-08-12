import express from "express"
import PlaylistController from '../controllers/playlist'
import SongOfPlaylistController from "../controllers/songOfPlaylist"


const router: express.Router = express.Router()

const playlistController = new PlaylistController()
const songOfPlaylistController = new SongOfPlaylistController()



router.route('/list')
  .get(playlistController.getPlaylists)

router.route('/')
  .post(playlistController.upload, playlistController.add)

router.route('/addSong')
  .post(songOfPlaylistController.add)

router.route('/id:id')
  .get(playlistController.getPlaylistbyId)

router.route('/query=:name')
  .get(playlistController.getPlaylistbyName)

router.route('/update/id:id')
  .put(playlistController.update)

router.route('/delete/id:id')
  .delete(playlistController.delete)


export default router