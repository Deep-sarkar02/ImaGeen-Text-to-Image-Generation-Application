import React, { useContext, useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import { motion } from 'framer-motion'
import axios from "axios";
import { toast } from "react-toastify";
const Login = () => {
    // add the state variable to mainttain the login and the signup
    // inittailly it will   be login
    const [State, setState] = useState("Login")
    // now we will import the seShowLogin from the Appcontext
    const { backendUrl, setToken, setUser, setShowLogin } = useContext(AppContext);
    // login and registration functionality
    // now we will store  the data enterrd by the user in  the state variable
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    // handler funtion
    const handleSubmit = async (event) => {
        // prevent the default action of the form
        event.preventDefault();
        // print the data in the console
        console.log(name, email, password);
        try {
            // if it is the login state
            if (State === 'Login') {
                // call  the api and call the backedn url in thhe backendUrl
                // now we will send the data to the backend and append the url with the login endpoint 
                const { data } = await axios.post(backendUrl + '/api/user/login', { email, password })
                // if 
                // this data contails the token also 
                if (data.success) {
                    // set the token
                    setToken(data.token)
                    // set the user
                    setUser(data.user)
                    // set the token in the browser local storegae
                    // this will help to maintain the token even after the page is reloaded
                    localStorage.setItem('token', data.token)
                    // hide the login form  
                    setShowLogin(false)
                }
                else {
                    // now we will display an error mag by the help of react toastify 
                    // install :- npm install react-toastify 
                    // in the app.jsx import toast from react-toastify
                    // in the app.jsx import ToastContainer from react-toastify
                    // in the app.jsx import 'react-toastify/dist/ReactToastify.css';
                    // now we will wrap the navbar and the footer with the toast container and in the ToastContainer tag we will set the position of the toast ie  where the notification will be displayed
                    // now we will display the toast container in the app.jsx file above the navbar 
                    // now we will display the toast error message
                    toast.error(data.message)
                }
            }
            // else
            else {
                const { data } = await axios.post(backendUrl + '/api/user/register', { name, email, password })
                if (data.success) {
                    // set the token
                    setToken(data.token)
                    // set the user
                    setUser(data.user)
                    // set the token in the browser local storegae
                    // this will help to maintain the token even after the page is reloaded
                    localStorage.setItem('token', data.token)
                    // hide the login form  
                    setShowLogin(false)
                }
                else {
                    // now we will display an error mag by the help of react toastify 
                    // install :- npm install react-toastify 
                    // in the app.jsx import toast from react-toastify
                    // in the app.jsx import ToastContainer from react-toastify
                    // in the app.jsx import 'react-toastify/dist/ReactToastify.css';
                    // now we will wrap the navbar and the footer with the toast container and in the ToastContainer tag we will set the position of the toast ie  where the notification will be displayed
                    // now we will display the toast container in the app.jsx file above the navbar 
                    // now we will display the toast error message
                    toast.error(data.message)
                }


            }

        }
        catch (error) {
            toast.error(error.message)

        }
    }

    // now we will disable the scrollign feature in the Login page
    //  this arrow fucntion  will execute when the componnet will loaded
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'unset'
        }
    }, [])
    //  the above statement tells that when the login is on then  the page is not scrollable 
    return (
        <div className="fixed top-0 left-0 right-0 bottom-0 z-10 backdrop-blur-sm bg-black/30 flex justify-center items-center">
            {/* on submit we will call the handleSubmit function */}
            <motion.form onSubmit={handleSubmit}
                initial={{ opacity: 0.2, y: 50 }}
                transition={{ duration: 0.3 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} action="" className="relative bg-white p-10 rounded-xl text-slate-500">
                {/* now we will display the value of the state varaibel */}
                <h1 className="text-center text-2xl text-neutral-700 font-medium">{State}</h1>
                <p>Welcome back! Please sign in to continue</p>


                {/* for the named input field */}
                {/* this fullname field will be visible when the state var will not be equal to login */}
                {State !== "Login" &&
                    <div className="border px-6 py-2 flex items-center gap-2 rounded-full mt-5">
                        <img src={assets.user_icon} alt="" />
                        {/* the name will be stored in the value ie name , and it is a prop of the evenet object and whenwe access the evenet object then it can be accessed */}
                        <input onChange={event => setName(event.target.value)} value={name} type="text" className="outline-none text-sm" placeholder="Full Name" required />

                    </div>}

                <div className="border px-6 py-2 flex items-center gap-2 rounded-full mt-4">
                    <img src={assets.email_icon} alt="" />
                    <input onChange={event => setEmail(event.target.value)} value={email} type="email" className="outline-none text-sm" placeholder="Email id" required />

                </div>

                <div className="border px-6 py-2 flex items-center gap-2 rounded-full mt-4">
                    <img src={assets.lock_icon} alt="" />
                    <input onChange={event => setPassword(event.target.value)} value={password} type="password" className="outline-none text-sm" placeholder="Password" required />

                </div>

                <p className="text-sm text-600 my-4">Forgot Password?</p>


                {/* now on the basis of the state variabel we will display the text on basis of the state var value */}
                <button className="bg-blue-600 w-full text-white py-2 rounded-full">{State === 'Login' ? 'Login' : 'Create Account'}</button>



                {State === 'Login' ? <p className="mt-5 text-center">Don't have an account ?  <span className="text-blue-600 cursor-pointer" onClick={() => setState('Sign Up')}>Sign up</span></p>

                    :

                    <p className="mt-5 text-center">Already have an account ?  <span className="text-blue-600 cursor-pointer" onClick={() => setState('Login')}>Login</span></p>}


                <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="" className="absolute top-5 right-5 cursor-pointer" />
            </motion.form>

        </div>
    )
}
export default Login;