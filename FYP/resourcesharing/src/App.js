import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import React, { useContext,useState,Component } from "react";
import { Switch, Route,  BrowserRouter as Router } from 'react-router-dom';
import styled from "styled-components";
import { AccountBox } from "./components/accountBox";
import AdminDashboard from "./components/AdminDashboard";
import UserDashboard from "./components/UserDashboard";
import SignIn from "./components/Login/SignIn";
import SignUp from "./components/Login/SignUp";
import Main from "./components/userDashboard/Main";
import DetailedShopProduct from "./components/Products/DetailedShopProduct";
import MasterLayout from "./layouts/admin/MasterLayout";
import Dashboard from './components/admin/Dashboard';
import SuperMain from './SuperAdmin/SAdmin/SuperMain';
function App() {
  return (
    <>
 
    <Router>
         <Switch> 
  <Route exact path = '/Dashboard' component={AdminDashboard }></Route>
  <Route exact path = '/UDashboard' component={UserDashboard}></Route>
  <Route exact path = '/SignUp' component={SignUp}></Route>
 <Route exact path = '/Main' component={Main}></Route>
{/*  
 <Route exact path = '/SuperAdmin' component={SuperMain}></Route> */}
  <Route exact path='/' component={SignIn }></Route>
   
    <Route exact   render={(props)=><MasterLayout {...props}/>} ></Route>
    

 </Switch> 
 </Router>
    
    </>
     
    
  );
}

export default App;
