import styled from '@emotion/styled'
import React from 'react'
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Button } from '@material-ui/core';
import { Link as RouterLink, matchPath, useLocation } from 'react-router-dom';
import { useFormik } from 'formik';
import Scrollbar from '../Scrollbar'
import Category from '../admin/Category';
import {
  Box,
  Radio,
  Rating,
  Divider,
  Checkbox,
  FormGroup,
  IconButton,
  RadioGroup,
  FormControlLabel
} from '@material-ui/core';

import { useState, useEffect } from 'react';
// material
import { Container, Stack, Typography } from '@material-ui/core';
import Page from '../Page';
import { ProductFilterSidebar, ProductSort, ProductList } from '../Products';
import ProductDetail from '../Products/ProductDetail';
import PRODUCTS from '../../_mocks_/products';
import DetailedShopProduct from '../Products/DetailedShopProduct';
import axios from 'axios'
import { Icon } from '@iconify/react';
import { Form, FormikProvider } from 'formik';
import closeFill from '@iconify/icons-eva/close-fill';
import roundClearAll from '@iconify/icons-ic/round-clear-all';
import roundFilterList from '@iconify/icons-ic/round-filter-list';

const ProductContainer = styled.div`
display: block;
  flex-grow: 0;
  flex-shrink: 1;
  flex-basis: auto;
  align-self: stretch;
  order: 0;
  margin-top:80px;
 
`;
export default function Products(product, value) {
  const location = useLocation();
  //  const data=location.state.filterdata;

  const [openFilter, setOpenFilter] = useState(false);
  const [prod, setprod] = useState([])
  // console.log("xyz"+data);

  useEffect(() => {
    axios.get("http://localhost:8080/getall/products").then((response) => {

      setprod(response.data);
    })
  }, []);
  const [flag, setflag] = useState(true);

  const formik = useFormik({
    initialValues: {
      gender: '',
      category: '',
      colors: '',
      priceRange: '',
      rating: ''
    },
    onSubmit: () => {
      setOpenFilter(false);
    }
  });
  if (value == false) {
    setflag(value);
  }
  const { resetForm, handleSubmit } = formik;
  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  const handleResetFilter = () => {
    handleSubmit();
    resetForm();
    axios.get("http://localhost:8080/getall/products").then((response) => {

      setprod(response.data);
    })
 
  };
  const Hello = () => {
    if (flag) {
      setflag(false)
    }
    else {
      setflag(true);
    }

  }
  return (
    <>
      {
        flag ?
          <ProductContainer>
            <Page title="Dashboard: Products | Resource Sharing">
              <Container>
                <Stack
                  direction="row"
                  flexWrap="wrap-reverse"
                  alignItems="center"
                  justifyContent="flex-end"
                  sx={{ mb: 5 }}
                >
                  <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
                    <Button style={{ color: '#F2AA4CFF' }}
                      disableRipple
                      endIcon={<Icon icon={roundFilterList} />}

                      onClick={() => setOpenFilter(true)}
                    >
                      <b>Filterss</b>&nbsp;
                    </Button>
                    <FormikProvider value={formik}>
                      <Form autoComplete="off" noValidate>
                        <Drawer
                          anchor="right"
                          open={openFilter}
                          onClose={() => { setOpenFilter(false) }}
                          PaperProps={{
                            sx: { width: 280, border: 'none', overflow: 'hidden' }
                          }}
                        >
                          <Stack
                            direction="row"
                            alignItems="center"
                            justifyContent="space-between"
                            sx={{ px: 1, py: 2 }}
                          >
                            <Typography variant="subtitle1" sx={{ ml: 1 }}>
                              Filters
                            </Typography>
                            <IconButton onClick={()=>setOpenFilter(false)}>
                              <Icon icon={closeFill} width={20} height={20} />
                            </IconButton>
                          </Stack>

                          <Divider />

                          <Scrollbar>
                            <Stack spacing={3} sx={{ p: 3 }}>

                              <div>
                                <Typography variant="subtitle1" gutterBottom>
                                  Category
                                </Typography>
                                <RadioGroup>
                                  {Category.map((item) => (
                                    <FormControlLabel key={item} value={item}  control={<Radio />}


                                     label={item}
                                     onClick={(e)=>{
                                      axios.get(`http://localhost:8080/productfindcategory/${e.target.value}`).then((response) => {
                                       
                                        setprod(response.data);
                                      })
                                     }}
                                     
                                     />
                                  ))}
                                </RadioGroup>
                              </div>

                            </Stack>
                          </Scrollbar>
                          <Box sx={{ p: 3 }}>
                            <Button
                              fullWidth
                              size="large"
                              type="submit"
                              color="inherit"
                              variant="outlined"
                              onClick={handleResetFilter}
                              startIcon={<Icon icon={roundClearAll} />}
                            >
                              Clear All
                            </Button>
                          </Box>
                        </Drawer>
                      </Form>
                    </FormikProvider>

                    {/* <ProductFilterSidebar 
              formik={formik}
              isOpenFilter={openFilter}
              onResetFilter={handleResetFilter}
              onOpenFilter={handleOpenFilter}
              onCloseFilter={handleCloseFilter}
            /> */}

                    <ProductSort />

                  </Stack>
                </Stack>

                <ProductList products={prod} />

              </Container>
            </Page>
          </ProductContainer>
          :
          <>
            <div>cvc</div>


          </>
      }</>
  )
}
