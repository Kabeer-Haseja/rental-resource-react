import  {React,useState,useContext,createContext} from 'react';
import ReactiveButton from 'reactive-button';
import swal from 'sweetalert2';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator'
 import { useHistory,Link, NavLink,useLocation } from 'react-router-dom';
import styled from "styled-components";
import Logo from '../../RR.png'
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { getdata, logindata } from '../../actions';
export const BoxContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10px;
`;

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
export let Context=createContext(); 
const theme = createTheme();

export default function SignIn() {
    const history = useHistory();
    const dispatch=useDispatch()
    const [userInfo, setUserInfo] = useState({
        email: 'jason@ui-lib.com',
        password: 'dummyPass',
    })

    const handleChange = ({ target: { name, value } }) => {
        let temp = { ...userInfo }
        temp[name] = value
        setUserInfo(temp)
 
    }
const [post,setpost]=useState("kabber")
const [state, setState] = useState('idle');

const handleSubmit = async(event) => {
        setState('loading');
   
     
await axios.post('http://localhost:8080/login',userInfo).then((response)=>{
setState('success');
    
  dispatch(logindata(response.data))
  dispatch(getdata())
localStorage.setItem("ssd",JSON.stringify(response.data))
if(response.data.email=="kabeer.cs17@iba0suk.edu.pk" && response.data.password=="1234")
{
  history.push({
    pathname:'/superadmin',
    state:{users:response.data}
  })
}
else{
history.push({
  pathname:'/Main',
  state:{users:response.data}
})}

}).catch((error)=>{
 
  if(error)
  {
    swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Please enter the Correct Username and Password',
    }
    )
  setState('error')
   
  }
}

  
  )

  };
 
  return (
<>

<BoxContainer >
      <Container component="main"  >
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            backgroundColor:'white',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1 }}>
          <img src={Logo} style={{width:50}}/>
  
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <ValidatorForm component="form" onSubmit={handleSubmit} style={{width:'50%'}} >
            <TextValidator
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              onChange={handleChange}
              name="email"
              value={userInfo.email}
              autoComplete="email"
              autoFocus
              validators={['required', 'isEmail']}
              errorMessages={[
                  'this field is required',
                  'email is not valid',
              ]}
            />
            <TextValidator
              margin="normal"
              required
              fullWidth
              onChange={handleChange}
              
              name="password"
              label="Password"
              type="password"
              id="password"
              value={userInfo.password}
              autoComplete="current-password"
              validators={['required']}
              errorMessages={['this field is required']}

            />
            {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary"  />}
              label="Remember me"
            /> */}
          <ReactiveButton  style={{ color: '#F2AA4CFF',
  backgroundColor:'#101820FF'}}
                    type="submit"
                    buttonState={state}
                    idleText={'Sign In'}
                    loadingText={'Loading'}
                    errorText={'Please Enter Correct Email and Password '}
                    color={'#F2AA4CFF'}
                    animation={true}
                    className={'class1 class2'}
                    style={{ borderRadius: '5px' }}
                    outline={false}
                    shadow={false}
                    rounded={true}
                    block={false}
                        width="100%"
                  >
                    Sign In
                  </ReactiveButton>
                  <br></br>
                  <br></br>
                    <Grid container>
              <Grid item>
                <Link to="/SignUp" variant="body2"  >
                  {"Don't have an account? Sign Up"}

                </Link>
              </Grid>
            </Grid>
          </ValidatorForm>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>

    </BoxContainer>

</>

  );
}