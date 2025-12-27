// this is the controller function for the user registrations
// first we will create the controller for the registrations
// import the user mODEL
import userModel from "../models/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import razorpay from "razorpay"
import TransactionModel from "../models/TransactionalModel.js";
// now we will creata a token by jwt
const registerUser = async (req, res) => {
    try {
        // find the name  , email and pass from the request body
        const { name, email, password } = req.body;
        // check if the user is avialabel
        if (!name || !email || !password) {
            return res.json({ success: false, message: "All fields are required" })

        }

        // Check if user already exists
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.json({ success: false, message: "User already exists with this email" });
        }
        // else case
        // nnow we will create  the salt
        const salt = await bcrypt.genSalt(10);
        // now we will hash the password by the given password and the salt
        const hashedpass = await bcrypt.hash(password, salt);
        // now create the userdata in form of json
        const userData = {
            name,
            email,
            password: hashedpass
        }
        // insert the user data in the database
        const newUser = new userModel(userData);
        // save the user data in the database
        const user = await newUser.save();
        // create the token
        const token = jwt.sign({ id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "1h" });
        // send the token in the response to the user
        return res.json(
            {
                success: true,
                message: "User registered successfully",
                user: {
                    name: user.name,

                },
                token
            });

    } catch (error) {
        console.log(error);
        return res.json({
            success: false,
            message: "User registration failed"
        })

    }
}


// user login controller functions
const loginUser = async (req, res) => {
    try {
        // get the email and the pass from the req.body
        const { email, password } = req.body;
        // find the user data from the database by email
        const user = await userModel.findOne({ email });
        // check if the user is available
        if (!user) {
            return res.json({
                success: false,
                message: "User not found"
            })
        }
        // else
        // mathc the saved pass and the yped pass
        const isMatch = await bcrypt.compare(password, user.password);
        // check if the password is correct
        if (!isMatch) {
            return res.json({
                success: false,
                message: "Incorrect password"
            })
        }
        // else case
        // create the token
        const token = jwt.sign({ id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        )
        // send the token in the response to the user
        return res.json({
            success: true,
            message: "user log in successfull",
            token,
            user: {
                name: user.name,
                email: user.email,
                creditBalance: user.creditBalance
            }
        })

    } catch (error) {
        console.log(error);
        return res.json({
            success: false,
            message: "User login failed"
        })
    }
}


// controller for the usercredit controller
const userCreditController = async (req, res) => {
    try {
        // we need the userid (token used aafter the login) for fetching the user credit\
        const { userId } = req.body;
        // from userid find the user
        const user = await userModel.findById(userId);
        // check if the user is available
        if (!user) {
            return res.json({
                success: false,
                message: "User not found"
            })
        }
        // else case
        // send the user credit in the response to the user
        return res.json({
            success: true,
            message: "User credit fetched successfully",
            user: {
                name: user.name,
                email: user.email,
                creditBalance: user.creditBalance
            }
        })
    } catch (error) {
        console.log(error);
        return res.json({
            success: false,
            message: "User credit fetching failed"
        })
    }
}
// create  razorpay instance
const razorpayInstance = new razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
})
const paymentController = async (req, res) => {
    try {
        // get the user id and the plan id
        const { userId, planId } = req.body;
        // now get the userdata from the usermodel
        const userData = await userModel.findById(userId);
        // check if the user is available
        if (!userData || !planId) {
            return res.json({
                success: false,
                message: "mmissing details"
            })
        }
        // else case
        let credits, plan, amount, date;
        switch (planId) {
            case 'Basic':
                plan = "Basic"
                credits = 100
                amount = 10
                break;
            case 'Advanced':
                plan = "Advanced"
                credits = 500
                amount = 50
                break;
            case 'Business':
                plan = "Business"
                credits = 5000
                amount = 250
                break;
            default:
                return res.json({
                    success: false,
                    message: "Plan not found"
                })
        }
        date = Date.now();
        const transationData = { userId, plan, credits, amount, date }
        // now we will store the transaction data to the mongo
        // so go to transactional model.js 
        // store the data to the transaction model
        const newTransaction = await TransactionModel.create(transationData);
        // now we will create the order
        // create the options for the order
        const options = {
            amount: amount * 100,  // amount in paise to remove the decimal 
            currency: process.env.CURRENCY,
            receipt: newTransaction._id,

        }
        const order = await razorpayInstance.orders.create(options, (error, order) => {
            if (error) {
                console.log(error)
                return res.json({
                    success: false,
                    message: error.message
                })
            }
            // else case
            // send the order to the user
            return res.json({
                success: true,
                message: "Order created successfully",
                order
            })

        });

    } catch (error) {
        console.log(error);
        return res.json({
            success: false,
            message: error.message
        })
    }
}
// verfidy the payment
const verifyPayment = async (req, res) => {
    try {
        // get the ordre id from  the req.body
        const { razorpay_order_id } = req.body;
        // find the order
        const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);
        // verify the payment
        if (orderInfo.status === 'paid') {
            const transactionData = await TransactionModel.findById(orderInfo.receipt);
            if (!transactionData) {
                return res.json({ success: false, message: "Transaction not found" });
            }

            if (transactionData.payment) {
                return res.json({
                    success: false,
                    message: "Payment already processed"
                })
            }
            const userData = await userModel.findById(transactionData.userId);
            if (!userData) {
                return res.json({ success: false, message: "User not found" });
            }

            // update the creditBalance
            const creditBalance = userData.creditBalance + transactionData.credits;
            await userModel.findByIdAndUpdate(userData._id, { creditBalance });

            // update the transaction data
            await TransactionModel.findByIdAndUpdate(transactionData._id, { payment: true });

            return res.json({
                success: true,
                message: "Credits Added",
            })
        } else {
            return res.json({ success: false, message: "Payment Failed" });
        }

    } catch (error) {
        console.log(error)
        return res.json({
            success: false,
            message: error.message
        })
    }
}

export { loginUser, registerUser, userCreditController, paymentController, verifyPayment }
// now create a middleware to find the user by id
// in the auth.js