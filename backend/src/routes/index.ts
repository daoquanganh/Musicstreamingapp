import { Router } from 'express'

import auth from './auth'
import artist from './artist'
import song from './song'
import user from './user'
import playlist from './playlist'
import songOfPlaylist from './songOfPlaylist'
import follower from './follower'
import SongOfUser from './songOfUser'

const router = Router();

router.use('/auth', auth);
router.use('/artist', artist);
router.use('/song', song);
router.use('/user', user);
router.use('/playlist', playlist)
router.use('/songOfPlaylist', songOfPlaylist)
router.use('/follower', follower)
router.use('/songOfUser',SongOfUser)


export default router