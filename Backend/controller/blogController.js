import Blog from "../model/blogSchema.js";
import { ObjectId } from "mongoose";

//get all blogs
const getBlogs = async (req,res)=>{
    const blogs = await Blog.find();
    res.json(blogs);
};

//create a new blog
const createBlog = async (req, res) => {
    try {
        const blog = new Blog({
            title: req.body.title,
            author: req.body.author,
            content: req.body.content,
            category: req.body.category,
            createdAt: req.body.createdAt
        });
        await blog.save();
        res.json(blog);
    } catch (error) {
        console.error("Error saving blog:", error);
        res.status(500).json({ error: "Error saving blog" });
    }
};

//delete a blog
const deleteBlog = async (req, res) => {
    try {
        let ids = req.params.id;
        console.log(`Passed Id: ${ids}`);
        const deletedBlog = await Blog.findByIdAndDelete(ids);
        
        if (!deletedBlog) {
            return res.status(404).json({ message: "Blog not found" });
        }

        res.status(200).json({ message: "Blog deleted successfully", deletedBlog });
    } catch (error) {
        console.error("Error deleting blog:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

//update a blog by id
const updateBlog = async (req,res)=>{
    const updateBlog = await Blog.findByIdAndUpdate(req.params.id,req.body);
    res.json(updateBlog);
};

//search by id 
const getBlogById = async (req,res)=>{
    const blogById = await Blog.findById(req.params.id);
    res.json(blogById);
};

//search by author 
const getBlogByAuthor = async (req,res)=>{
    
    const authorBlog = await Blog.find({author:req.params.author});
    res.json(authorBlog);
};
//search by Category
const getBlogByCategory = async (req,res)=>{
    //console.log(req.params.category)
    const getBlogByCategory = await Blog.find({category:req.params.category});
    res.json(getBlogByCategory);
};
export {getBlogs,createBlog,deleteBlog,updateBlog,getBlogById,getBlogByAuthor,getBlogByCategory};