import PropTypes from 'prop-types';
import { useEffect,useContext } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { styled } from '@material-ui/core/styles';
import { Box, Link, Button, Drawer, Typography, Avatar, Stack } from '@material-ui/core';
// components
//import Logo from '../../components/Logo';
import Scrollbar from '../../components/Scrollbar';
import NavSection from '../../components/NavSection';
import { MHidden } from '../../components/@material-extend';
//
import sidebarConfig from './SidebarConfig';
// ----------------------------------------------------------------------
import Userdata from '../../components/userDashboard/Main'
import {useSelector,useDispatch} from 'react-redux';
import MyContext from '../../MyContext';
import { Context } from '../../components/Login/SignIn';
const DRAWER_WIDTH = 280;

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('lg')]: {
    flexShrink: 0,
    width: DRAWER_WIDTH
    
  },
  
}));

const AccountStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2, 2.5),
  borderRadius: theme.shape.borderRadiusSm,
  backgroundColor: theme.palette.grey[200]
}));

// ----------------------------------------------------------------------

DashboardSidebar.propTypes = {
  isOpenSidebar: PropTypes.bool,
  onCloseSidebar: PropTypes.func
};

export default function DashboardSidebar(isOpenSidebar, onCloseSidebar ) {

  const { pathname } = useLocation();
  const data=JSON.parse(localStorage.getItem('ssd'));
  const mystate = useSelector(state => state.changeTheData)
 
  useEffect(() => {
    try{
    if (!isOpenSidebar) {
      // onCloseSidebar();
    }
  }
  catch(Exception )
  {

  }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);
  const renderContent = (
<>
   <Scrollbar
      sx={{
        height: '100%',
        '& .simplebar-content': { height: '100%', display: 'flex', flexDirection: 'column' }
      }}
    >
      
      <Box sx={{ mb: 5, mx: 2.5,marginTop:10 }}>
        <Link underline="none" component={RouterLink} to="#">
          <AccountStyle>
            <Avatar src="{account.photoURL}" alt="photoURL" />
            <Box sx={{ ml: 2 }}>
              <Typography variant="subtitle2" sx={{ color: 'text.primary' }}>
        {data.username}
                </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                role
              </Typography>
            </Box>
          </AccountStyle>
        </Link>
      </Box>

      <NavSection navConfig={sidebarConfig}  />

      <Box sx={{ flexGrow: 1 }} />

        </Scrollbar>
    </>
  );

  return (
    <>
 
    <RootStyle >
 
      <div width="lgUp">
        <Drawer
          // open={isOpenSidebar}
          // onClose={onCloseSidebar}
          // PaperProps={{
          //   sx: { width: DRAWER_WIDTH }
          // }}
        >
          {renderContent}
        </Drawer>
      </div>

      <div width="lgDown">
        <Drawer
          open
          variant="persistent"
          PaperProps={{
            sx: {
              width: DRAWER_WIDTH,
              bgcolor: 'background.default'
            }
          }}
        >
          {renderContent}
        </Drawer>
      </div>
    </RootStyle>
    </>
  );
}
