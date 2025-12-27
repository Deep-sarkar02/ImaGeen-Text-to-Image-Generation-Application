import userModel from "../models/UserModel.js";

import axios from "axios";
import FormData from "form-data";

/**
 * Generate an image using Gemini API based on user prompt.
 * Deduct one credit from the user on successful generation.
 */
export const generateImage = async (req, res) => {
    try {
        const { userId, prompt } = req.body;
        // Validate input
        if (!userId || !prompt) {
            return res.json({ success: false, message: "userId and prompt are required" });
        }
        // Find user
        const user = await userModel.findById(userId);
        if (!user) {
            return res.json({ success: false, message: "User not found" });
        }
        // Check credit balance
        if (user.creditBalance <= 0) {
            return res.json({ success: false, message: "Insufficient credit balance" });
        }

        // image generation by the clip drop api
        // create the multi part form data 
        const formData = new FormData();
        // append the promt to the form data
        formData.append("prompt", prompt);
        // send the form data  to  the api end point
        // by the help of axios
        // first the api end point , formdata , and the header 
        const { data } = await axios.post("https://clipdrop-api.co/text-to-image/v1",
            formData,
            {
                headers: {
                    "x-api-key": process.env.CLIPDROP_API,

                },
                responseType: "arraybuffer"
            }
        );
        // by the help of the arrayBuffer we have to convert the data to base64
        const base64Image = Buffer.from(data, 'binary').toString('base64');
        // generate the image url based on this base64 image
        const resultImage = `data:image/png;base64,${base64Image}`;
        // update the credit balance
        await userModel.findByIdAndUpdate(userId,
            { creditBalance: user.creditBalance - 1 });
        // send the result image in the response
        return res.json(
            {
                success: true,
                message: "Image generated successfully",
                creditBalance: user.creditBalance - 1,
                image: resultImage
            });

    }
    catch (error) {
        console.error(error);
        return res.json({ success: false, message: error.message || "Server error" });
    }
};
// now generate the routes from the Controller function