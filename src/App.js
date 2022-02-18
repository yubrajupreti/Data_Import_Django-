import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NotFound from './components/NotFound';
import Login from './components/auth/index.js'
import './App.css'

// import SignUp from './components/Auth/form';



import AuthContextProvider from './context/Auth'
import Homepage from './components/homepage';

function App(){

    return(
        <AuthContextProvider>
            <BrowserRouter>
                <Routes>
                <Route exact path="/" element={<Login/>} />

                <Route exact path="/homepage" element={<Homepage/>} />

               


                <Route exact path="*" component={NotFound} />
                
                </Routes>
            </BrowserRouter>
            
        </AuthContextProvider>
    )
}

export default App;