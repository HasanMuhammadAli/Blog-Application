import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import blogRoutes from "./routes/blogRoutes.js";

const app = express();
const port =3000;

app.use(cors());
app.use(express.json());

//Database connection
connectDB();

//Use routes
app.use("/",blogRoutes);

app.listen(port,()=>{
    console.log(`Successfully Ported on ${port}`);
});