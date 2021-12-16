import { Icon } from '@iconify/react';
import androidFilled from '@iconify/icons-ant-design/android-filled';
import numeriv from '@iconify/icons-ant-design/number-outline'
// material
import { alpha, styled } from '@material-ui/core/styles';
import { Card, Typography } from '@material-ui/core';
import { useEffect,useState } from 'react';
import axios from 'axios'
// utils

// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: 'none',
  textAlign: 'center',
  padding: theme.spacing(5, 0),
  color: '#00539CFF',
  backgroundColor:'#FFD662FF'
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
  color: '#00539CFF',
  backgroundImage: `linear-gradient(135deg, ${alpha('#F2AA4CFF', 0)} 0%, ${alpha(
    '#00539CFF',
    0.24
  )} 100%)`
}));

// ----------------------------------------------------------------------
const TOTAL = 714000;
const APP=()=>{

}
export default function TotalOrder() {
  const [state,setstate]=useState(0);
  const data=JSON.parse(localStorage.getItem('ssd'));
useEffect(() => {
axios.get(`http://localhost:8080/totalorderbycustomer/${data.id}`).then((response)=>{
  setstate(response.data);
})

}, []); 

  return (
    <RootStyle>
      <IconWrapperStyle>
        <Icon icon={numeriv} width={24} height={24} />
      </IconWrapperStyle>
      <Typography variant="h4" >
      Total Order
      </Typography>
      <Typography variant="h4" >
      {state}
      </Typography>

    </RootStyle>
  );
}
