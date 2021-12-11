import { React, useState, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import ReactiveButton from 'reactive-button';
import { DateRange } from 'react-date-range';

import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator'
import { useHistory, Link, NavLink, useLocation } from 'react-router-dom';
import styled from "styled-components";
import { TextareaAutosize } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import ResponsiveDateRangePicker from '../ResponsiveDateRangePicker';

import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Category from './Category';
//import Swal from 'sweetalert2-react';
import swal from 'sweetalert2';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import DesktopDateRangePicker from '@mui/lab/DesktopDateRangePicker';

import axios from 'axios'

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


// function getStyles(name, CategoryName, theme) {
//   return {
//     fontWeight:
//       CategoryName.indexOf(name) === -1
//         ? theme.typography.fontWeightRegular
//         : theme.typography.fontWeightMedium,
//   };
// }

export const BoxContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction:column;
  align-items: center;
  margin-top: 30px;
`;



const UpdateProduct = (props) => {
  const formData = new FormData();
  
  const theme = useTheme();
  const location = useLocation()
  const { from } = location.state
  const history = useHistory();
  const [CategoryName, setCategoryName] = useState(from.category);
  const [multipleFiles, setMultipleFiles] = useState([]);
  const [multipleFiles1, setMultipleFiles1] = useState([]);
  const [ selectedFiles, setSelectedFiles ] = useState([]);
  const [state1, setState1] = useState('idle');
  const [value, setValue] = useState([null, null]);
  const [multipleFiles2, setMultipleFiles2] = useState([]);
  
 const[state,setstate]=useState(true);
  const [userInfo, setUserInfo] = useState({
    name: '',
    description: '',
    price: '',
    file: [],
    category: '',
    date:[],
    fromdate:'',
    todate:'',
    status:'',

  })
 const hi=from.id;
 const data=JSON.parse(localStorage.getItem('ssd'));
  useEffect( async() => {
    await axios.get(`http://localhost:8080/findproductbyid/${from.id}`).then((response) => {

  console.log(response.data)
    userInfo.status=response.data.status
    setUserInfo(response.data)
   //   const formData = new FormData();
   setValue([response.data.fromdate,response.data.todate])
  
   setMultipleFiles1(response.data.productImages)
   
 
    })


  }, []);
  console.log(userInfo.fromdate)
  const MultipleFileChange = (e) => {
   setstate(false)
    const filesArray = Array.from(e.target.files).map((file) => URL.createObjectURL(file));
    setSelectedFiles(filesArray);
    userInfo.file = e.target.files;
    setMultipleFiles(e.target.files);
  
    
  }
  
  const renderPhotos = (source) => {
		return source.map((photo) => {
	
      return (<>
        <img src={photo} alt="" key={photo} width="60px" />;
      </>
      )
		});

	};
 

  const handleChange = ({ target: { name, value } }) => {
    let temp = { ...userInfo }
    temp[name] = value
    setUserInfo(temp)
  }

  const handleSubmit =async (event) => {
    event.preventDefault();
    setState1('loading')
    try {
      formData.append('name', userInfo.name);
      formData.append('description', userInfo.description)
      formData.append('price', userInfo.price)
      formData.append('category', userInfo.category)
      formData.append('fromdate', value[0])
      formData.append('todate', value[1])
      formData.append('status',userInfo.status)
   
      for (let i = 0; i < multipleFiles.length; i++) {

        formData.append('file', multipleFiles[i]);
  
      }
   
      axios({
        method: 'PUT',
        url: `http://localhost:8080/updateproduct/${data.id}and/${from.id}`,
   
        data:formData
        
    }).then( response=>{
      setState1('success')
      swal.fire(
        'Good job!',
        'Product Updated Successfully',
        'success'
      )

      
    }
        ).catch(res=>    setState1('error')
        );
    }
    catch (e) {
      console.log(e)

    }

  };


  return (
    <>
      <BoxContainer >

        <Container fullWidth style={{ marginLeft: 30 }} >
          <CssBaseline />
          <Box
            sx={{

              marginTop: 1,
              width: '50%',
              marginLeft: 1,

              backgroundColor: 'white',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Typography component="h1" variant="h5">
              Update Product
            </Typography>
            <ValidatorForm component="form" enctype="multipart/form-data" onSubmit={handleSubmit} style={{ marginLeft: 10, marginRight: 10 }} >
              <TextValidator
                margin="normal"
                required
                fullWidth
                id="name"
                label="Product Name"
                onChange={handleChange}
                className="form-control"
                name="name"
                value={userInfo.name}
                autoComplete="Product Name"
                autoFocus
                validators={['required']}
                errorMessages={[
                  'this field is required',

                ]}
              />
              <TextValidator
                margin="normal"
                required
                fullWidth
                id="price"
                label="Product price"
                onChange={handleChange}
                className="form-control"
                name="price"
                value={userInfo.price}
                autoComplete="Product Price"
                autoFocus
                validators={['required']}
                errorMessages={[
                  'this field is required',

                ]}
              />

              <TextareaAutosize style={{ width: '100%', height: '80px' }}
                margin="normal"
                required
                placeholder="Product Description"
                onChange={handleChange}
                name="description"
                label="Product Description"
                type="text"
                id="description"
                value={userInfo.description}
                className="form-control"
                validators={['required']}
                errorMessages={['this field is required']}

              />
                        <InputLabel id="CategoryName">Category</InputLabel>
                <Select labelId="CategoryName"
                  id="CategoryName"
                  required
                  fullWidth
                  value={CategoryName}
                  validators={['required']}
                  errorMessages={['this field is required']}
                  className="form-control"
                  onChange={(e) => userInfo.category = e.target.value}
                  input={<OutlinedInput label="Category Name" />}
                  MenuProps={MenuProps}
                >
                  {Category.map((name) => (
                    <MenuItem style={{ width: '100%' }}
                      key={name}
                      value={name}

                    >
                      {name}
                    </MenuItem>
                  ))}
                </Select>
                <div>
              <input type="file" name="files" id="imgid" className="form-control"  onChange={(e) => MultipleFileChange(e)} multiple />
           </div>
              <div className="result">{
              renderPhotos(selectedFiles)
              }</div>
    <br></br>


               {
            state&&  multipleFiles1.map((path,index)=>{
                 
                return    <img src={path.url} width="60px"/>
                
              })
                } 
<br></br>

  
<br></br>
<LocalizationProvider dateAdapter={AdapterDateFns}>
      <Stack spacing={3}>
        <DesktopDateRangePicker
          startText="Availbailty Dates"
          inputFormat = "dd/MM/yyyy"
       
          value={value}
          fullWidth
  
        disablePast
      
          onChange={(newValue) => {
       //     console.log(newValue)
       console.log(newValue[0])
       
       localStorage.setItem("date",JSON.stringify(newValue))
              userInfo.fromdate=newValue[0];
              userInfo.todate=newValue[1];
            setValue(newValue);
          }}
          renderInput={(startProps, endProps) => (
            <>
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
            </>
          )}
        />
      </Stack>
    </LocalizationProvider>
         <br></br>
          
              <ReactiveButton
                type="submit"
                buttonState={state1}
                idleText={'Update Product'}
                loadingText={'Loading'}
                errorText={'Please Enter Correct '}
                color={'primary'}
                animation={true}
                className={'class1 class2'}
                style={{ borderRadius: '5px' }}
                outline={false}
                shadow={false}
                rounded={true}
                block={false}
                width="100%"
              >

              </ReactiveButton>
 </ValidatorForm>
          </Box>
        </Container>
      </BoxContainer>
    </>
  );
}

export default UpdateProduct;
