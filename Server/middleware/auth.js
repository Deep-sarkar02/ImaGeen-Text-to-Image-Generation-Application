// this is the middleware for the authentication and find the user by id
import jwt from "jsonwebtoken";
// userAuthMiddleware
const userAuthMiddleware = async (req, res, next) => {
    try {
        // get the token the from the headr 
        const { token } = req.headers;
        // if token is not found
        if (!token) {
            return res.json({
                success: false,
                message: "Token not found"
            })
        }
        // find the decoded tokeb
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        // from the decoded token we will find the id
        if (decodedToken.id) {
            // attach the id to the request object
            req.body.userId = decodedToken.id;

        }
        else {
            return res.json({
                success: false,
                message: "Invalid token"
            })
        }
        // call the next middleware
        next();

    } catch (error) {
        console.log(error);
        return res.json({
            success: false,
            message: "Invalid token"
        })
    }
}
// export it
export default userAuthMiddleware