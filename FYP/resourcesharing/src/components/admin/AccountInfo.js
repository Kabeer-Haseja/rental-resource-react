import { BoxContainer } from './AddProduct'
import  React,{useState,useContext,useEffect} from 'react';
import axios from 'axios'

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
 import { Link,useHistory } from 'react-router-dom';
import { Formik } from "formik";
import { RadioGroup, Radio } from 'react-styled-radio';
import Logo from '../../RR.png'
import Context from '../Login/SignIn'
import { useDispatch } from 'react-redux';
import { logindata } from '../../actions';
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

export default function AccountInfo() {
const dispatch=useDispatch()

    const data=JSON.parse(localStorage.getItem('ssd'));
   // console.log(data);

    const initialValues = {
        email:data.email,
        password: data.password,
        username:data.username,
        phone:data.phone,
        nic:data.nic
      };
      const validate = (values) => {
        let errors = {};
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        const regex_nic=/^[0-9]{5}-[0-9]{7}-[0-9]$/;
        const regex_phone=/^\d{11}$/;
        if (!values.username) {
          errors.username = "UserName is required";
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
 const  [udata, setdata] = useState({
     id:data.id,
    email: data.email,
    password: "",
    username:"",
    gender:data.gender,
    phone:"",
    nic:""
 }
 )
      const submitForm = (values) => {
            udata.password=values.password;
            udata.username=values.username;
            udata.phone=values.phone;
            udata.nic=values.nic
          console.log(udata) 
          axios({
            method: 'put',
            url: 'http://localhost:8080/updatecustomer',
       
            data:udata
            
        }).then( user=>{
            localStorage.setItem("ssd",JSON.stringify(udata))
          alert(user.data)
        }
            ).catch(res=>alert("error"));
          };

  



    return (
        <>
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
      } = formik;
  
return(
    <BoxContainer>
      
      <Container  fullWidth style={{ marginLeft: 30 }}>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} >
                <TextField
                 type="text"
                 name="username"
                 id="username"
                 value={values.username}
                 onChange={handleChange}
                 onBlur={handleBlur}
                 className={errors.username && touched.username ? 
                 "input-error" : null}
            autoComplete="fname"
                  fullWidth
                  label=" Name"
                />
                  {errors.username && touched.username && (
                      <span className="error">{errors.username}</span>
                    )}
                  
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={errors.password && touched.password ? 
                       "input-error" : null}
                    />
                    {errors.password && touched.password && (
                      <span className="error"  >{errors.password}</span>
                    )}
     </Grid>
              <Grid item xs={12}>
                <TextField
                  type="text"
                  name="nic"
                  id="nic"
                  label="NIC"
                  fullWidth
                  value={values.nic}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={errors.nic && touched.nic ? 
                   "input-error" : null}
                />
                {errors.nic && touched.nic && (
                  <span className="error"  >{errors.nic}</span>
                )}
 </Grid>
 <Grid item xs={12}>
                <TextField
                          type="text"
                          name="phone"
                          id="phone"
                        fullWidth
                        label="Phone"
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
    
 </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Update 
            </Button>
          </Box>
        </Box>
      </Container>
      </BoxContainer>
 )
  }}
      </Formik>    
           </>
    )
}
