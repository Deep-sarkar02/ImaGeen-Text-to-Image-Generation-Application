// this is the server file
// how to configure
// npm init
// npm install express cors(help to connect backend with frontend) dotenv(create env file ) nodemon form-data jsonwebtoken mongoose axios(help to make api call ) bcrypt razorpay 

// import the dependencies
import "dotenv/config";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import axios from "axios";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import formdata from "form-data";
import Razorpay from "razorpay";
import connectDB from "./config/mongodb.js";
import userRouter from "./routes/userRoute.js";
import imageRoute from "./routes/ImageRoute.js";

// app config
// dotenv.config();

// port
const port = process.env.PORT || 8000;

// app config
const app = express();

// middleware(built in middleware )
app.use(cors());
app.use(express.json()); // to parse the json data
// connect to the database
await connectDB();

// now we will use the user router
// register router
// https://localhost:8000/api/user/register --> for register\
// login router
// https://localhost:8000/api/user/login --> for login
// app.use means that we are using the user router in the express app
// now if we type localhost:8000/api/user/register then it will go to the user router for register
app.use("/api/user", userRouter);  // this will do both register and login since we are using the same router


// now we will use the image router
// https://localhost:8000/api/image/generateImage --> for generateImage
app.use("/api/image", imageRoute)






// test route
app.get("/", (req, res) => {
    res.send("Hello World!");
});

// listen in the console
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


// MongoDB Atlas connection setup completed.
// Use environment variables for connection strings.
// Ensure IP whitelist is configured correctly in Atlas.

