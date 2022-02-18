import { Form, Input, Button, Checkbox } from 'antd';

import {setCookie} from '../../Cookies/index' 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from '../../context/Auth';
import {loginApi} from '../../api/index'
import {apiErrorHandler} from '../../errorHandling/error'


const Login = () => {

  const { isLoggedIn } = useContext(AuthContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");


  const loginData=async(data)=>{
    const response = await Login(data)
}
  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setErrorMessage("");

    const formData = { username, password };
    console.log(formData)
    await loginApi(formData)
    .then(data=>{
      console.log(data.data.token)
      setCookie('token',data.data.token);
      window.location.href = "/homepage";

    })
    .catch(err=>{
      const errMsg = apiErrorHandler(err)
      toast.error(errMsg)
    })
    

  }


  

  useEffect(() => {
    if (isLoggedIn) {

      window.location.href = "/homepage";
    }
}, [])

  return (
      <>
    <Form
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      initialValues={{
        remember: true,
      }}
      autoComplete="off"
    >
      <Form.Item
        label="Username"
        name="username"
        rules={[
          {
            required: true,
            message: 'Please input your username!',
          },
        ]}
      >
        <Input value={username} onChange={(e) => setUsername(e.target.value)}/>
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
      >
        <Input.Password  value={password} onChange={(e) => setPassword(e.target.value)}/>
      </Form.Item>


      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit" onClick={handleSubmit} >
          Submit
        </Button>
      </Form.Item>
      <ToastContainer />

    </Form>
    </>
  );
};

export default Login;
