import PropTypes from 'prop-types';
import { useEffect } from 'react';
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
import superAdminSideBarConfig from './SuperAdminSideBarConfig';

// ----------------------------------------------------------------------

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

SuperAdminDashboardSidebar.propTypes = {
  isOpenSidebar: PropTypes.bool,
  onCloseSidebar: PropTypes.func
};

export default function SuperAdminDashboardSidebar({ isOpenSidebar, onCloseSidebar }) {
  const { pathname } = useLocation();
  useEffect(() => {
    if (isOpenSidebar) {
      onCloseSidebar();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const renderContent = (
    <Scrollbar
      sx={{
        height: '100%',
        '& .simplebar-content': { height: '100%', display:'flex', flexDirection: 'column' }
      }}
    >
      
      <Box sx={{ mb: 5, mx: 2.5,marginTop:10 }}>
        <Link underline="none" component={RouterLink} to="#">
          <AccountStyle>
            <Avatar src="{account.photoURL}" alt="photoURL" />
            <Box sx={{ ml: 2 }}>
              <Typography variant="subtitle2" sx={{ color: 'text.primary' }}>
                Super Admin
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              </Typography>
            </Box>
          </AccountStyle>
        </Link>
      </Box>

      <NavSection navConfig={superAdminSideBarConfig} />

      <Box sx={{ flexGrow: 1 }} />

    </Scrollbar>
  );

  return (
    <RootStyle >
      <div width="lgUp">
        <Drawer
          open={isOpenSidebar}
          onClose={onCloseSidebar}
          PaperProps={{
            sx: { width: DRAWER_WIDTH }
          }}
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
  );
}
