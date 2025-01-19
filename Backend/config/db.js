import mongoose, { Error } from "mongoose";
/*
METHOD - 1

const MONGO_URL = "mongodb://localhost:27017/Blog";

const connectDB = async ()=>{
    mongoose.connect(MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(() => {
        console.log("Connected to MongoDB");
    }).catch((error) => {
        console.error("Error connecting to MongoDB", error);
    });
    
}
*/
//METHOD - 2
const URL = "mongodb://localhost:27017/Blog";
const connectDB = async ()=>{
    try{
        const conn = await mongoose.connect(URL);
        console.log("Successfully Connected to MongoDB.");
    }
    catch{
        console.log(error);
        process.exit(1);
    }
}
export default connectDB;



