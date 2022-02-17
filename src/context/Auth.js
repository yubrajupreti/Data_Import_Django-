import React, { createContext, useState, useEffect } from "react";
import axios from 'axios';
import { baseUrl } from '../api/constant';
import {getCookie} from '../Cookies/index'

export const AuthContext = createContext();

const AuthContextProvider = (props) => {
   
    const [isLoggedIn, setIsLoggedIn] = useState(getCookie('token').token ? true : false);
    // const [userProfile, setUserProfile] = useState([]);


    useEffect(() => {
        const fetchedData = async() => {
            const token = getCookie('token').token;
            const axiosConfig = {
                headers: {
                    "Content-Type": "application/json",
                    'Accept' : 'application/json',
                    Authorization: `Token ${token}`
                },
            };
            // const results = await axios.get(`${baseUrl}user/login/`, axiosConfig)
            // setUserProfile(results.data)
        }

        fetchedData()

    },[isLoggedIn])

    return (
        <AuthContext.Provider value={{ isLoggedIn,setIsLoggedIn }}>
            {props.children}
        </AuthContext.Provider>
    )

}

 
export default AuthContextProvider;