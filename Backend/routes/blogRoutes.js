import express from "express";
const router = express.Router();
import { getBlogs,createBlog,deleteBlog, updateBlog, getBlogById, getBlogByAuthor, getBlogByCategory } from "../controller/blogController.js";

router.get("/blogs",getBlogs);
router.post("/blog/new",createBlog);
router.delete("/blog/delete/:id",deleteBlog);
//patch is used for update
router.patch("/blog/update/:id",updateBlog);
//get blog by Id 
router.get("/blog/:id",getBlogById);
//get blog by Author
router.get("/blog/author/:author",getBlogByAuthor);
//get blog by Category
router.get("/blog/category/:category",getBlogByCategory);
export default router;