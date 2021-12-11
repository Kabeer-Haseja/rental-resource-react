import React,{useState} from 'react';
import { Container, Stack,Button } from '@material-ui/core';
import styled from '@emotion/styled'
import './Product.css'
import { useLocation } from 'react-router-dom';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import Box from '@mui/material/Box';
import DesktopDateRangePicker from '@mui/lab/DesktopDateRangePicker';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import DatePicker from '../DatePicker';
import swal from 'sweetalert2';
import NotificationsPopover from '../../layouts/admin/NotificationsPopover';

const ProductContainer=styled.div`
display: block;
  flex-grow: 0;
  flex-shrink: 1;
  flex-basis: auto;
  align-self: stretch;
  order: 0;
  margin-top:80px;
 
`;
const ProductImgStyle = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute'
});

const DetailedShopProduct = () => {

  const location=useLocation();
const {DetailedProduct} =location.state
const [index,setindex]=useState(0);
const from=new Date(DetailedProduct.fromdate).toDateString();
const to=new Date(DetailedProduct.todate).toDateString();
const [value, setValue] = React.useState([null, null]);
const[orderinfo,setorderinfo]=useState({
   requestDate:'',
   fromdate:'',
 todate:'',
 productid:'',
   productName:'',
   orderstatus:''

})
const requestRentButton=()=>{
  const data = JSON.parse(localStorage.getItem('ssd'));
  const requestdate = JSON.parse(localStorage.getItem('requestdate'));
  
  const formData = new FormData();
  formData.append('productName', DetailedProduct.name);
  formData.append('productid', DetailedProduct.id)
  formData.append('requestDate', new Date())
  formData.append('orderstatus', "Pending")
  formData.append('fromdate', value[0])
  formData.append('todate', value[1])
  
 if(value[0]!=null&&value[1]!=null){
  swal.fire({
    title: 'Are you sure?',
    text: "Do you Want to Rent the Product !",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, Rent it!'
  }).then((confirmed) => {
    if(confirmed.value){
       axios.post(`http://localhost:8080/requestforrent/${data.id}`, formData).then((response) => {
        if(response.data.id==0){
          swal.fire({
            type: 'error',
            title: 'Oops...',
            text: 'Already Rented or Already Requested or Your Product !',
          })
        }
        else{
       
     
          swal.fire(
            'Good job!',
            'You Successfully Rented the Product!',
            'success'
          )
        }  
      
        
      
      });
      
    }
  })
}

}
return (
 <>
<ProductContainer>
  <Container>
  <Stack
          direction="row"
          flexWrap="wrap-reverse"
          alignItems="center"
          justifyContent="flex-end"
          sx={{ mb: 5 }}
        >
      </Stack>
      <div className="app">
      <div className="details">
      <div className="big-img">
      <img alt="ddd" src={DetailedProduct.productImages[index].url}   />
              </div>
              <div className="box">
                <div className="row">
                  <h2>{DetailedProduct.name}</h2>
                  <h4><span> price {DetailedProduct.price}</span></h4>
     
      
                  <h3>{from} <span>to </span>{to}</h3>
                </div>
                <p>{DetailedProduct.description}</p>
                <div className="thumb" >
                {
                DetailedProduct.productImages.map((img, index) =>(
                    <img src={img.url} alt="" key={index} 
                    onClick={()=>{
                      setindex(index)
                    }}
                    />

                ))
                }
            </div>
               <p>
                 {/* <DatePicker mock={DetailedProduct.fromdate} mock1={DetailedProduct.todate} /> */}
                 <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Stack spacing={3}>
        <DesktopDateRangePicker
          startText="Availbailty Dates"
          value={value}
          inputFormat = "dd/MM/yyyy"
          minDate={new Date(DetailedProduct.fromdate)}
          maxDate={new Date(DetailedProduct.todate)}
          
          fullWidth
  
        disablePast
      
          onChange={(newValue) => {
       //localStorage.setItem("requestdate",JSON.stringify(newValue))

            setValue(newValue);
          }}
          renderInput={(startProps, endProps) => (
            <React.Fragment>
              <TextField {...startProps}     required
              fullWidth
        
        validators={['required']}      
        errorMessages={['this field is required']}
/>
              <Box sx={{ mx: 2 }}> to </Box>
              <TextField {...endProps}   required
              fullWidth
        
        validators={['required']}      
        errorMessages={['this field is required']}
 />
            </React.Fragment>
          )}
        />
      <Button fullWidth style={{ color: '#F2AA4CFF',
  backgroundColor:'#101820FF'}} variant="h4" onClick={requestRentButton}>
            Request for Rent
          </Button>
 
      </Stack>
  
    </LocalizationProvider>

                 </p>

 
              </div>
        </div>
      </div>
  </Container>
</ProductContainer>
 </>
  );
}

export default DetailedShopProduct;
