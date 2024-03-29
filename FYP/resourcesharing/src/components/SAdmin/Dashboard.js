import React from 'react'
import styled from "styled-components";
import Grid from "@mui/material/Grid";
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import {  Typography } from '@material-ui/core';
import Page from '../Page';
import TotalUser from './TotalUser';
import TotalProducts from './TotalProducts';
import TotalRequests from './TotalRequests';
import TotalRent from './TotalRent';
import TotalCompleted from './TotalCompleted';

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
            <Typography variant="h4">Admin Dashboard</Typography>
          </Box>
          <CssBaseline />
          <Grid container spacing={2}>
            <Grid item xs={4} sm={3} md={2}>
              <TotalUser/>
            </Grid>
            <Grid item xs={4} sm={3} md={2}>
              <TotalProducts/>
                    </Grid>
                    <Grid item xs={4} sm={3} md={2}>
              <TotalRequests/>
                    </Grid>
                    <Grid item xs={4} sm={3} md={2}>
              <TotalRent/>
                    </Grid>
                    <Grid item xs={4} sm={3} md={2}>
              <TotalCompleted/>
                    </Grid>
      
          </Grid>


        </Container>
      </BoxContainer>
      </Page>
    </>
  )
}
export default Dashboard;