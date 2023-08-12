import express from "express"
import FollowerController from '../controllers/follower'


const router: express.Router = express.Router()
const followerController = new FollowerController()

router.route('/list')
  .get(followerController.getLists)

router.route('/')
  .post(followerController.add)

router.route('/followingId:id')
  .get(followerController.getFollowerbyId)

router.route('/update/id:id')
  .put(followerController.update)

router.route('/delete/id:id')
  .delete(followerController.delete)


export default router