import React, { useContext,useState,Component } from "react";

import { Formik } from "formik";
import "./login.css";
import axios from 'axios';


import { Switch, Route, Redirect, BrowserRouter as Router, Link  } from 'react-router-dom';
import {
  BoldLink,
  BoxContainer,
  FormContainer,
  Input,
  MutedLink,
  SubmitButton,
} from "./common";
import { Marginer } from "../marginer";
import { AccountContext } from "./accountContext";
import App from "../../App";

export function LoginForm(props) {
//const history = useHistory();
const onTrue = () =>{

//history.push('/Dashboard')

}
const onTrue1 = () =>{

  //history.push('/UDashboard')
  
  }
  


  const { switchToSignup } = useContext(AccountContext);
 const [data, setdata] = useState("none")
  const initialValues = {
    email: "",
    password: ""
  };
  const validate = (values) => {
    let errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.email) {
      errors.email = "Email is required";
    } else if (!regex.test(values.email)) {
      errors.email = "Invalid Email";
    }
    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 4) {
      errors.password = "Password too short";
    }
    return errors;
  };

  const submitForm = (values) => {
   axios({
       method: 'post',
       url: 'http://localhost:8080/check',
       data:values
     }).then(
        user=>{
          if(user.data ==="yes")
          {
            onTrue1();
          }
          else if(user.data=="admin")
          {
            
         onTrue(); 
          }

        }
       ).catch(response=>alert(response.data))
   
  };
    return (
      
      <Formik
        initialValues={initialValues}
        validate={validate}
        onSubmit={submitForm}
      >
        {(formik) => {
          const {
            values,
            handleChange,
            handleSubmit,
            errors,
            touched,
            handleBlur,
            isValid,
            dirty
          } = formik;
          return (
             <BoxContainer>
                <FormContainer onSubmit={handleSubmit}>
                    <Input
                      type="email"
                      name="email"
                      placeholder="Enter Email "
                      id="email"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={errors.email && touched.email ? 
                      "input-error" : null}
                    />
                    {errors.email && touched.email && (
                      <span className="error">{errors.email}</span>
                    )}
                  
  
                    <Input
                      type="password"
                      name="password"
                      id="password"
                      placeholder="Enter Password "
                  
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={errors.password && touched.password ? 
                       "input-error" : null}
                    />
                    {errors.password && touched.password && (
                      <span className="error"  >{errors.password}</span>
                    )}
  
                   </FormContainer>
                <Marginer direction="vertical" margin={10} />
             <MutedLink href="#">Forget your password?</MutedLink>
             <SubmitButton
                    type="submit"
                    className={dirty && isValid ? "" : "disabled-btn"}
                    onClick={handleSubmit}
                    disabled={!(dirty && isValid)}>
                    
                    SignIn
                  </SubmitButton>
                  <Marginer direction="vertical" margin="1em" />
      <MutedLink href="#">
        Don't have an accoun?{" "}
        <BoldLink href="#" onClick={switchToSignup}>
          Signup
        </BoldLink>
      </MutedLink>
              </BoxContainer>
        
        );
        }}
      </Formik>
   
   
  
);
      
      }
 