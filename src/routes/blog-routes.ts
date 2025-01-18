import express from 'express';
import { addNewBlog, deleteSpecificBlog, getAllBlog, findSpecificBlog, updateSpecificBlog } from '../controller/blog-controller';
import { verify } from '../auth';


const router = express.Router();

// SAMPLE URL: http://localhost:3000/blog/add-blog
router.post('/add-blog', verify, addNewBlog);
// SAMPLE URL: http://localhost:3000/blog/delete-blog/6751365daf19f100d106ce7d
router.delete('/delete-blog/:blogId', verify, deleteSpecificBlog);
// SAMPLE URL: http://localhost:3000/blog/get-blog
router.get('/get-blog', getAllBlog);

router.get('/find-blog/:blogId', verify, findSpecificBlog);

router.put('/update-blog/:blogId', verify, updateSpecificBlog);

export default router;
