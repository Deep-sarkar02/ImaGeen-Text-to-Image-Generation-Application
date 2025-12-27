// after the controller we will create the routes
// since after the controller the control will come to the routes
// import the controllers
import { registerUser, loginUser, userCreditController, paymentController, verifyPayment } from "../Controllers/UserController.js";
// import the express router
import express from "express";
import userAuthMiddleware from "../middleware/auth.js";
// import the router
// this is bydefault router
const userRouter = express.Router();
// create the routes
// register route
userRouter.post('/register', registerUser)
// login route
userRouter.post('/login', loginUser)
// user credit route
// before going to the controller we will check the authentication
userRouter.post('/userCredit', userAuthMiddleware, userCreditController)
// payment route
userRouter.post('/pay-razor', userAuthMiddleware, paymentController)
// verify payment route
userRouter.post('/verify-razor', userAuthMiddleware, verifyPayment)
// export the router
export default userRouter
// now we will import it in the server.js
// we will use this in the express app

// https://localhost:8000/api/user/register --> for registerr
// https://localhost:8000/api/user/login --> for login
// https://localhost:8000/api/user/userCredit --> for user credit

