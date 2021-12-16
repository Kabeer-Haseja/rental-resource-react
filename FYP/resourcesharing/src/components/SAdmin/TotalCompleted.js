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
    color: '#F2AA4CFF',
    backgroundColor:'#101820FF'
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
    color: '#F2AA4CFF',
    backgroundImage: `linear-gradient(135deg, ${alpha('#F2AA4CFF', 0)} 0%, ${alpha(
      '#C1D2D2',
      0.24
    )} 100%)`
  }));

  const APP=()=>{

}
export default function TotalCompleted() {
    const [state,setstate]=useState(0);
    const data=JSON.parse(localStorage.getItem('ssd'));
  
axios.get(`http://localhost:8080/totalCompleted`).then((response)=>{
    setstate(response.data);

})
  return (
    <RootStyle>
      <IconWrapperStyle>
        <Icon icon={numeriv} width={24} height={24} />
      </IconWrapperStyle>
      <Typography variant="h5" >
      Completed
      </Typography>
 
      <Typography variant="h4" >
      {state}
      </Typography>
    </RootStyle>
  );
}
