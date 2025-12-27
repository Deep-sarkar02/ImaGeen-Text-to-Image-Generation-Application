// import details
import express from "express";
import { generateImage } from "../Controllers/ImageController.js";
import userAuthMiddleware from "../middleware/auth.js";

// create the router
const imageRoute = express.Router();
// create the route
// https://localhost:8000/api/image/generateImage
imageRoute.post("/generateImage", userAuthMiddleware, generateImage);
// but this takes the user id and the prompt from the body
// so we will give them by the help of middleware auth.js

// export it
export default imageRoute;
// so we will use it in the server.js file