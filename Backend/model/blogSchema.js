import mongoose, {Schema} from "mongoose";
const schema = mongoose.Schema
const blogSchema = new schema({
    title:{
        type:String,
        required:true,
        trim:true
    },
    author:{
        type:String,
        required:true,
        trim:true
    },
    content:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:false
    },
    createdAt:{
        type:Date,
        required:false
    }
})
const Blog = mongoose.model("Blog",blogSchema);
export default Blog;