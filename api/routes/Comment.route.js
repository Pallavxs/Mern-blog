import express from 'express'
import { addComment, commentCount, deleteComment, getAllComments, getCommentCount } from '../controllers/Comment.controller.js';
import { authenticate } from '../middleware/Authenticate.js';

const CommentRoute = express.Router()

CommentRoute.post('/add',authenticate, addComment)
CommentRoute.get('/get/:blogid', getCommentCount)
CommentRoute.get('/get-count/:blogid',commentCount)
CommentRoute.get('/get-all-comment',authenticate, getAllComments) 
CommentRoute.delete('/delete/:commentid',authenticate, deleteComment)


export default CommentRoute;
