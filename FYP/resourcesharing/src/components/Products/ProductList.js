import PropTypes from 'prop-types';
// material
import { Grid } from '@material-ui/core';
import ShopProductCard from './ProductCard';
import React, { useState,useEffect } from 'react'
import './Product.css';
import DetailsThumb from './DetailsThumb';
import DetailedShopProduct from './DetailedShopProduct';
//import { useHistory } from 'react-router-dom';
// ----------------------------------------------------------------------

ProductList.propTypes = {
  products: PropTypes.array.isRequired
};

export default function ProductList({ products, ...other }) {
  const [flag, setflag] = useState(true);
  //const history = useHistory();

  const Toggle=()=>{
//history.push('/DetailedProduct')
    
  }
  
  return (
    <>
    
    <Grid  container spacing={3} {...other}   >
      {products.map((product) => (
        <Grid key={product.id} item xs={12} sm={6} md={3} >
          <ShopProductCard product={product}/>
       
        </Grid>
        
      ))}
    </Grid>
  
</> 
  );
}
