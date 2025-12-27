// context hooks
import React, { useState, useEffect } from "react";
import { createContext } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";

// create a context variable
export const AppContext = createContext();
const AppContextProvider = (props) => {
    const [user, setUser] = React.useState(null);
    // now for the signup and the login featuirew or the login form will be hidden
    const [showLogin, setShowLogin] = useState(false);
    // token will be stored in the local storage
    // initial value will be token stored in the local storag of the browser or null
    const [token, setToken] = useState(localStorage.getItem('token') || null);
    // credit state
    const [credit, setCredit] = useState(0);

    const navigate = useNavigate();
    // now we will show how the backend and the frontedn is connected
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    // now load the credit data
    const loadCreditData = async () => {
        try {
            // go to the backend and fetch the credit data
            // by the post method
            // also pass the headrs in the object and in the headers we will pass the token in the object also 
            const { data } = await axios.post(backendUrl + `/api/user/userCredit`, {}, { headers: { token } })
            // if the data is fetched successfully
            if (data.success) {
                // set the credit
                setCredit(data.user.creditBalance)
                setUser(data.user)
            }
        }
        catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }
    // generate image function
    const generateImage = async (prompt) => {
        try {
            // now post the prompt to the backend and also the token in the headers
            const { data } = await axios.post(backendUrl + `/api/image/generateImage`, { prompt }, { headers: { token } })
            // if the data is fetched successfully
            if (data.success) {
                console.log(data)
                // load the credit data
                loadCreditData();
                return data.image; // return the image
            }
            else {
                toast.error(data.message)
                // again call the load credit data
                loadCreditData();
                // if the credit balance is 0
                if (data.creditBalance === 0) {
                    // show the  buy credit page
                    navigate('/buy-credit')
                }

            }
        }
        catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }
    // now for the logout
    const logout = () => {
        localStorage.removeItem('token')
        setToken('') // the token will be removed from the local storage
        setUser(null)// the user will be removed from the local storage
    }

    // now we will call the loadCreditData function
    // this function will execute when the token is changed
    // so the token is in the dependancy array
    useEffect(() => {
        if (token) {
            loadCreditData()
        }
    }, [token])



    // now  we can provide values to this context
    const value = {
        user, setUser, showLogin, setShowLogin, backendUrl, token, setToken, credit, setCredit, logout, generateImage, loadCreditData
    };
    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )

}
export default AppContextProvider;
// for the logout we will import the contexti  in the navbar for the functionality