import React, { useState } from 'react';
import axios from 'axios'
import ProgressButton from 'react-progress-button'
import ReactiveButton from 'reactive-button';

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
import { Link, useHistory } from 'react-router-dom';
import { Formik } from "formik";
import { RadioGroup, Radio } from 'react-styled-radio';
import Logo from '../../RR.png'

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      <Link color="inherit" href="">
        Resource Sharing
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function SignUp() {
  const [state, setState] = useState('idle');
 const history = useHistory();
  const initialValues = {
    email: "",
    password: "",
    username: "",
    gender: "",
    phone: "",
    nic: ""
  };
  const validate = (values) => {
    let errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    const regex_nic = /^[0-9]{5}-[0-9]{7}-[0-9]$/;
    const regex_phone = /^\d{11}$/;
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
    console.log(values);
    setState('loading');
      
    axios({
      method: 'post',
      url: 'http://localhost:8080/signup',
      data: values

    }).then(user => {
      alert(user.data)
      if(user.data=="already Saved")
      {
        setState('error')
      }
      else{
        setState('success');
        
      }
     }
    ).catch(res => alert("error"));
  };



  

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
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
          <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
              <CssBaseline />
              <Box
                sx={{
                  marginTop: 8,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <Avatar sx={{ m: 1 }}>
                  <img src={Logo} style={{ width: 50 }} />
                </Avatar>
                <Typography component="h1" variant="h5">
                  Sign up
                </Typography>
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
                        type="email"
                        name="email"
                        fullWidth
                        label="Email"
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
                      <RadioGroup horizontal name="gender"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={errors.gender && touched.gender ?
                          "input-error" : null}
                      >
                        <Radio small value="male" name="gender" label="male" id="male" />
                        <Radio small value="female" name="gender" label="female" id="female" />
                      </RadioGroup>
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
                  <ReactiveButton
                    type="submit"
                    buttonState={state}
                    idleText={'Sign up'}
                    loadingText={'Loading'}
                    successText={'Please Check Your Mail For Verfication'}
                    errorText={'Your Account is already Registered Please Verify'}
                    color={'primary'}
                    animation={true}
                    fullWidth
                    className={'class1 class2'}
                    style={{ borderRadius: '5px' }}
                    outline={false}
                    shadow={false}
                    rounded={true}
                    block={false}
                        width="100%"
                    messageDuration={2000}
                     disabled={!isValid }
                  
                  >
                    Sign Up
                  </ReactiveButton>
                  <Grid container justifyContent="flex-end">
                    <Grid item>
                      <Link to="/" variant="body2" >
                        Already have an account? Sign in
                      </Link>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
              <Copyright sx={{ mt: 5 }} />
            </Container>
          </ThemeProvider>
        )
      }}

    </Formik>
  );
}