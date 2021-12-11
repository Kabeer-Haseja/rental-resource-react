import React, { useContext,useState } from "react";
import { Formik } from "formik";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import "./login.css";
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
import axios from 'axios'
import Loader from "react-loader-spinner";

export function SignupForm(props) {

  const { switchToSignin } = useContext(AccountContext);
  const [loading, setloading] = useState(true);
  const initialValues = {
    email: "",
    password: "",
    username:"",
    gender:"",
    phone:"",
    nic:""
  };
  const validate = (values) => {
    let errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    const regex_nic=/^[0-9]{5}-[0-9]{7}-[0-9]$/;
    const regex_phone=/^\d{11}$/;
    if (!values.username) {
      errors.username = "UserName is required";
    }
    if (!values.email) {
      errors.email = "Email is required";
    } 
    else if (!regex.test(values.email)) {
      errors.email = "Invalid Email";
    }
    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 4) {
      errors.password = "Password too short";
    }
    if (!values.nic) {
      errors.nic = "Cnic is required";
    }
    else if (!regex_nic.test(values.nic)) {
      errors.nic = "Invalid CNIC";
    }
    if (!values.phone) {
      errors.phone = "phone number is required";
    }
    else if (!regex_phone.test(values.phone)) {
      errors.phone = "Invalid Phone";
    }
    

    
    return errors;
  };
  
  const submitForm = (values) => {
   axios({
      method: 'post',
      url: 'http://localhost:8080/signup',
      data:values
    }).then( user=>alert(user.data)
    
      ).catch(res=>alert(res.data));
 
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
      return(
   
   <BoxContainer>
   <FormContainer onSubmit={handleSubmit}>
                    <Input
                      type="text"
                      name="username"
                      placeholder="Enter Username "
                      id="username"
                      value={values.username}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={errors.username && touched.username ? 
                      "input-error" : null}
                    />
                    {errors.username && touched.username && (
                      <span className="error">{errors.username}</span>
                    )}
                  
  
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
  
  <div  class="toggle"    onChange={handleChange}
      onBlur={handleBlur}
      className={errors.gender && touched.gender ? 
       "input-error" : null}
   >
    <input type="radio"
   
    name="gender" value="male" id="male"  />
    <label for="male">Male</label>
    <input type="radio" name="gender" value="female" id="female" />
    <label for="female">Female</label>
  </div>
  <Input
                      type="text"
                      name="nic"
                      id="nic"

                      placeholder="Enter CNIC XXXXX-XXXXXXX-X "
                  
                      value={values.nic}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={errors.nic && touched.nic ? 
                       "input-error" : null}
                    />
                    {errors.nic && touched.nic && (
                      <span className="error"  >{errors.nic}</span>
                    )}

<Input
                      type="text"
                      name="phone"
                      id="phone"

                      placeholder="Enter phone number  "
                        value={values.phone}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={errors.phone && touched.phone ? 
                       "input-error" : null}
                    />
                    {errors.phone && touched.phone && (
                      <span className="error"  >{errors.phone}</span>
                    )}

                   </FormContainer>
              
      <Marginer direction="vertical" margin={10} />
      <SubmitButton type="submit"  onClick={handleSubmit} 
                   >Signup</SubmitButton>
      <Marginer direction="vertical" margin="1em" />
      <MutedLink href="#">
        Already have an account?
        <BoldLink href="#" onClick={switchToSignin}>
          Signin

        </BoldLink>
      </MutedLink>
    </BoxContainer>
      )
    }}
 </Formik>
 );
}
