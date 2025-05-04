import express from 'express'
import { addBlog, deleteBlog, editBlog, getAllBlogs, getBlog, getBlogCategory, getRelatedBlog, Search, showAllBlog, updateBlog } from '../controllers/Blog.controller.js'
import upload from '../config/multer.js'
import { authenticate } from '../middleware/Authenticate.js'


const BlogRoute = express.Router()

BlogRoute.post('/add',authenticate, upload.single('file') ,addBlog)
BlogRoute.put('/update/:blogid',authenticate, upload.single('file') ,updateBlog)
BlogRoute.get('/edit/:blogid',authenticate, editBlog)
BlogRoute.delete('/delete/:blogid',authenticate, deleteBlog)
BlogRoute.get('/get-all',authenticate, showAllBlog)

BlogRoute.get('/get-blog/:slug',getBlog)
BlogRoute.get('/get-related-blog/:category/:blog',getRelatedBlog)
BlogRoute.get('/get-blog-by-category/:category',getBlogCategory)
BlogRoute.get('/search',Search)

BlogRoute.get('/blogs', getAllBlogs)

export default BlogRoute;
