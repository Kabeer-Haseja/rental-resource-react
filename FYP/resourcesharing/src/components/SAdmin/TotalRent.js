import { Icon } from '@iconify/react';
import androidFilled from '@iconify/icons-ant-design/android-filled';
import numeriv from '@iconify/icons-ant-design/number-outline'
// material
import {useState} from 'react';
import { alpha, styled } from '@material-ui/core/styles';
import { Card, Typography } from '@material-ui/core';
import axios from 'axios';
// utils

// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: 'none',
  textAlign: 'center',
  padding: theme.spacing(5, 0),
  color: '#FCF6F5FF',
  backgroundColor:'#2BAE66FF'
}));

const IconWrapperStyle = styled('div')(({ theme }) => ({
  margin: 'auto',
  display: 'flex',
  borderRadius: '50%',
  alignItems: 'center',
  width: theme.spacing(8),
  height: theme.spacing(8),
  justifyContent: 'center',
  marginBottom: theme.spacing(3),
  color: '#2BAE66FF',
  backgroundImage: `linear-gradient(135deg, ${alpha('#2BAE66FF', 0)} 0%, ${alpha(
    '#FCF6F5FF',
    0.42
  )} 100%)`
}));

// ----------------------------------------------------------------------
const TOTAL = 714000;
const APP=()=>{

}
export default function TotalRent() {
    const [state,setstate]=useState(0);
    const data=JSON.parse(localStorage.getItem('ssd'));
  
axios.get(`http://localhost:8080/totalRentproducts`).then((response)=>{
    setstate(response.data);

})
  return (
    <RootStyle>
      <IconWrapperStyle>
        <Icon icon={numeriv} width={24} height={24} />
      </IconWrapperStyle>
      <Typography variant="h5" >
      Rented
      </Typography>
 
      <Typography variant="h4" >
      {state}
      </Typography>
    </RootStyle>
  );
}
