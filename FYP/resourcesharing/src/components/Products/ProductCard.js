import PropTypes from 'prop-types';
import React, { useState,useEffect } from 'react'
import './Product.css';
import { Link as RouterLink } from 'react-router-dom';
// material
import { Box, Card, Link, Typography, Stack } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
// utils
//
import Label from '../userDashboard/Label';
import ColorPreview from '../userDashboard/ColorPreview';
import Products from '../userDashboard/Products';

// ----------------------------------------------------------------------

const ProductImgStyle = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute'
});

// ----------------------------------------------------------------------

ShopProductCard.propTypes = {
  product: PropTypes.object
};
export default function ShopProductCard({ product }) {
  const { name, productImages, price, status,description,fromdate,todate } = product;
  console.log(product.productImages)
  return (
    <> 
 
      <Card component={RouterLink} 
      
      to={{pathname:'/Main/DetailedProduct',state:{DetailedProduct: product}}}>
      <Box sx={{ pt: '100%', position: 'relative' }} >
        {status && (
          <Label
            variant="filled"
            color={(status === 'sale' && 'error') || 'info'}
            sx={{
              zIndex: 9,
              top: 16,
              right: 16,
              position: 'absolute',
              textTransform: 'uppercase'
            }}
          >
            {status}
          </Label>
        )}
         
        <ProductImgStyle alt={name} src={productImages[0].url}   />
        
      </Box>

      <Stack spacing={2} sx={{ p: 3 }}>
        <Link to="#" color="inherit" underline="hover" component={RouterLink}>
          <Typography variant="subtitle2" noWrap  >
            {name}
          </Typography>
        </Link>

        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="subtitle1">
            <Typography
              component="span"
              variant="body1"
              sx={{
                color: 'text.disabled',
                textDecoration: 'line-through'
              }}
            >
            </Typography>
           Price &nbsp;
            {price}
          </Typography>
        </Stack>
      </Stack>
    </Card>

               </>
            );
}
