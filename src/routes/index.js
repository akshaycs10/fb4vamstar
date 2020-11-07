import express from 'express';
import {
  onLike,
  getAllLikes
} from './likes';
import {
  createPost,
  getAllPostForUser
} from './posts'
import {
  sendFriendRequest,
  getFriendsListForUser
} from './friends'

const router = express.Router();
router.post('/like', onLike);
router.get('/getAllLikes', getAllLikes);

router.post('/post', createPost);
router.get('/getAllPostForUser', getAllPostForUser);

router.post('/sendFriendRequest', sendFriendRequest);
router.get('/getFriendsListForUser', getFriendsListForUser);
export default router;
