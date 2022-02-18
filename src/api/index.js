import axios from "axios";
import {
    USER_LOGIN_URL,
    USER_LOGOUT_URL,
    HOMEPAGE_URL,
    IMPORT_FILE
    
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
  
  
  
  export const logoutApi = () => {
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
  

  export const employeeDetail = () => {
    const token = getCookie("token").token;
    const axiosConfig = {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Token ${token}`,
      },
    };
    return axios.get(HOMEPAGE_URL, axiosConfig);
  };
  
  export const employeeDetailPage = (page) => {
    const token = getCookie("token").token;
    const axiosConfig = {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Token ${token}`,
      },
    };
    return axios.get(HOMEPAGE_URL+'?offset='+(page-1)*10, axiosConfig);
  };

  export const employeeDetailFilter = (keyword) => {
    const token = getCookie("token").token;
    const axiosConfig = {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Token ${token}`,
      },
    };
    return axios.get(HOMEPAGE_URL+'?created_by__username='+keyword, axiosConfig);
  };

  export const employeeDetailFilterDate = (keyword) => {
    const token = getCookie("token").token;
    const axiosConfig = {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Token ${token}`,
      },
    };
    return axios.get(HOMEPAGE_URL+'?created_date='+keyword, axiosConfig);
  };
  
  export const importFile = (data) => {
    const token = getCookie("token").token;
    const axiosConfig = {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Token ${token}`,
      },
    };
    return axios.post(IMPORT_FILE,data, axiosConfig);
  };
  