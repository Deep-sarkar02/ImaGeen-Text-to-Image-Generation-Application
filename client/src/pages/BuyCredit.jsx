import React, { useContext } from "react";
import { assets, plans } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import { motion } from 'framer-motion'
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
const BuyCredit = () => {
    // use state
    //  from the app context we will get the user
    const { user, backendUrl, loadCreditData, token, setShowLogin } = useContext(AppContext)
    const [planId, setPlanId] = useState(null)
    const navigate = useNavigate()
    // inialisation of payment
    const initPay = async (order) => {
        const options = {
            key: import.meta.env.VITE_RAZORPAY_KEY_ID,
            amount: order.amount,
            currency: "INR",
            name: "ImaGeen",
            description: "credits purchase",
            order_id: order.id,
            handler: async (response) => {
                // call the api to verify the payment
                try {
                    const { data } = await axios.post(backendUrl + `/api/user/verify-razor`, response, { headers: { token } })
                    // if the data is fetched successfully 
                    if (data.success) {

                        loadCreditData()
                        // redirect to home page
                        navigate('/')
                        toast.success("Payment successful")

                    }
                }
                // if the data is fetched successfully 
                catch (error) {
                    toast.error(error.message)
                }
            }
        }
        const rzp = new window.Razorpay(options)
        rzp.open()
    }
    // razorpay function
    const paymentRazorPay = async (planId) => {
        try {
            // find the user
            if (!user) {
                // if the user is not logged in then show the login page
                setShowLogin(true)

            }
            // else case we will redirect to the payment page and also send the planId and token in the headers to the backend
            const { data } = await axios.post(backendUrl + `/api/user/pay-razor`, { planId }, { headers: { token } })
            // if the data is fetched successfully 
            if (data.success) {
                initPay(data.order)
            }
        }
        // if the data is fetched successfully 
        catch (error) {
            toast.error(error.message)
        }
    }
    //  we wil use the user data to show the plans
    return (
        <motion.div
            initial={{ opacity: 0.2, y: 100 }}
            transition={{ duration: 1 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="min-h-[80vh] text-center pt-14 mb-10">
            <button className="border border-gray-400 px-10 py-2 rounded-full mb-6">
                Our Plans
            </button>
            <h1 className="text-center text-3xl font-medium mb-6 sm:mb-10">Choose the plan</h1>

            <div className="flex flex-wrap justify-center gap-6 text-left">
                {plans.map((item, index) => (
                    <div key={index} className="bg-white drop-shadow-sm border rounded-lg py-12 px-8 text-gray-600 hover:scale-105 transition-all duration-500">
                        <img width={40} src={assets.logo_icon} alt="" />
                        <p className="mt-3 mb-1 font-semibold">{item.id}</p>
                        <p className="text-sm">{item.desc}</p>
                        <p className="mt-6">
                            <span className="text-3xl font-medium">₹{item.price}</span> / {item.credits} credits</p>
                        <button onClick={() => paymentRazorPay(item.id)} className="mt-8 bg-black text-white px-10 py-2 rounded-full hover:scale-105 transition-all duration-500 min-w-52">
                            {user ? 'Purchase' : 'Get Started'}</button>
                        {/* it means that if the user is logged in  then puchase  */}
                    </div>
                ))}
            </div>
        </motion.div>
    );
};
export default BuyCredit;