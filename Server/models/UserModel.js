// here we will create the user model
import mongoose from "mongoose";
// create the schema
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    creditBalance: { type: Number, required: true, default: 5 },

});
// create the model
// const modelname = mongoose.model("modelname", schema created);
// use of || is to check if the model is already created or not
// so if the model is already created then it will return the model else it will create the model
const userModel = mongoose.models.User || mongoose.model("User", userSchema);
// export the model
export default userModel;
// now we will create the user controller
