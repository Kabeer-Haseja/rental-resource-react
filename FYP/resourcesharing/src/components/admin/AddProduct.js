import { React, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import ReactiveButton from 'reactive-button';
import swal from 'sweetalert2';
import { DateRange } from 'react-date-range';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator'
import { useHistory, Link, NavLink } from 'react-router-dom';
import styled from "styled-components";
import { TextareaAutosize } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Category from './Category';
import ResponsiveDateRangePicker from '../ResponsiveDateRangePicker';
import axios from 'axios'
import { uploadImage } from "../../actions/uploadActions"
import { useDispatch, useSelector } from "react-redux";

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



const AddProduct = (props) => {
  const theme = useTheme();
  const [CategoryName, setCategoryName] = useState();
  const [state, setState] = useState('idle');
  const [selectedFiles, setSelectedFiles] = useState([]);
 
  //const {image} = useSelector(state => state.upload);
  const [state1, setState1] = useState([
    {
      startDate: new Date(),
      endDate: null,
      key: 'selection'
    }
  ]);
  

  const history = useHistory();
  const dispatch = useDispatch();
  const [userInfo, setUserInfo] = useState({
    name: '',
    description: '',
    price: '',
    file: [],
    category: ''
   

  })
  const [multipleFiles, setMultipleFiles] = useState([]);
 
  const handleChange = ({ target: { name, value } }) => {
    let temp = { ...userInfo }
    temp[name] = value
    setUserInfo(temp)

  }
  const MultipleFileChange = (e) => {
    const filesArray = Array.from(e.target.files).map((file) => URL.createObjectURL(file));
    setSelectedFiles(filesArray);

    userInfo.file = e.target.files;
    setMultipleFiles(e.target.files);
  }
  const renderPhotos = (source) => {
    return source.map((photo) => {
      return <img src={photo} alt="" key={photo} width="60px" />;
    });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setState('loading')
      const data = JSON.parse(localStorage.getItem('ssd'));
      const date = JSON.parse(localStorage.getItem('date'));
      
      const formData = new FormData();
      formData.append('name', userInfo.name);
      formData.append('description', userInfo.description)
      formData.append('price', userInfo.price)
      formData.append('category', userInfo.category)
      formData.append('fromdate', date[0])
      formData.append('todate', date[1])
      
      
      for (let i = 0; i < multipleFiles.length; i++) {
        formData.append('file', multipleFiles[i]);

      }

      await axios.post(`http://localhost:8080/Customer/${data.id}/product`, formData).then((response) => {
        setState('success')
        swal.fire(
          'Good job!',
          'Product Added Successfully',
          'success'
        )
        setUserInfo({ name: '',
        description: '',
        price: '',
        file: [],
        category: ''})
    
        
      
      });

    }
    catch (e) {
      setState('error')
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
              Add Product
            </Typography>
            <ValidatorForm component="form" enctype="multipart/form-data" onSubmit={handleSubmit} style={{ marginLeft: 10, marginRight: 10 }} >
              <TextValidator
                className="form-control"
                margin="normal"
                required
                fullWidth
                id="name"
                label="Product Name"
                onChange={handleChange}
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
                className="form-control"
                required
                fullWidth
                id="price"
                label="Product price"
                onChange={handleChange}
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
                className="form-control"
                required
                placeholder="Product Description"
                onChange={handleChange}
                name="description"
                label="Product Description"
                type="text"
                id="description"
                value={userInfo.description}

                validators={['required']}
                errorMessages={['this field is required']}

              />
                             <InputLabel id="CategoryName">Category</InputLabel>

<Select
  labelId="CategoryName"
  label="Category Name"
  id="CategoryName"
  required
  fullWidth
  className="form-control"
  value={CategoryName}
  validators={['required']}
  errorMessages={['this field is required']}

  onChange={(e) => userInfo.category = e.target.value}
  MenuProps={MenuProps}
>
  {Category.map((name) => (
    <MenuItem 
      key={name}
      value={name}

    >
      {name}
    </MenuItem>
  ))}
</Select>

              <input type="file"
                required
           validators={['required']}
                errorMessages={['this field is required']}

                name="files" id="imgid" className="form-control" onChange={(e) => MultipleFileChange(e)} multiple />
              <br></br>
              <div className="result">{renderPhotos(selectedFiles)}</div>
            
              <br></br>
              <ResponsiveDateRangePicker     />
  
     
             <br></br>
          
              <ReactiveButton
                type="submit"
                buttonState={state}
                idleText={'Add Product'}
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

export default AddProduct;
