import axios from "axios";
import {
    USER_LOGIN_URL,
    USER_LOGOUT_URL
    
  } from "./constant";

import { getCookie } from "../Cookies/index";


export const loginApi = (data) => {
    const axiosConfig = {
        headers: {
          "Content-Type": "application/json",
          'Accept' : 'application/json'
        },
    };
    return axios.post(USER_LOGIN_URL, data, axiosConfig);
  };
  
  
  
  export const logoutApi = (data, format) => {
    const token = getCookie("token").token;
    const axiosConfig = {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Token ${token}`,
      },
    };
    return axios.post(USER_LOGOUT_URL, axiosConfig);
  };
  