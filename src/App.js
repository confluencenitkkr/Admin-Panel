import React, { Component, useState ,useEffect } from "react";
import { BrowserRouter as Router, Routes, Route,Navigate } from "react-router-dom";
import './App.css';
import { auth } from "./firebase";
import {useNavigate} from 'react-router-dom'
import Dashboard from './components/dashboard';

function App() {
 
  const history=useNavigate(); 


  return (
    <>
    
            <Routes>
              
               <Route exact path="/" key="userdashboard" element={<Dashboard />}/>
               <Route path="*" element={<Navigate to="/" />} />
              </Routes>
        
    </>
  );
}

export default App;
