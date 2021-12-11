import React from 'react'
import styled from "styled-components";
import Grid from "@mui/material/Grid";
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import MiniStatisticsCard from './MiniStatisticsCard'
import TotalProducts from './TotalProducts';
import {  Typography } from '@material-ui/core';
import Page from '../Page';
import TotalOrder from './TotalOrder';

export const BoxContainer = styled.div`
width: 100%;
display: flex;
flex-direction:column;
align-items: center;
margin-top: 90px;
margin-left:80px;
`;

const Dashboard = () => {
  return (
    <>
 <Page title="Dashboard |Resource Sharing">
   
      <BoxContainer>

        <Container maxWidth="xl">
          <Box sx={{ pb: 5 }}>
            <Typography variant="h4">Dashboard</Typography>
          </Box>
          <CssBaseline />
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={3}>
              <TotalProducts />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
             <TotalOrder/>
                        </Grid>
      
          </Grid>


        </Container>
      </BoxContainer>
      </Page>
    </>
  )
}
export default Dashboard;