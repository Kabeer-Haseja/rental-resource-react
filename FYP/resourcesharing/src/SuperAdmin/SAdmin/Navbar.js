import PropTypes from 'prop-types';

import { Link } from 'react-router-dom'
import { Link as RouterLink } from 'react-router-dom';
import Logo from '../../RR.png'
import Logo1 from '../../Logo'
import React from 'react'
import { AppBar,Toolbar,IconButton, Stack,Box } from '@mui/material';
import { alpha, styled } from '@material-ui/core/styles';
import MHidden from '../../components/@material-extend/MHidden';
import menu2Fill from '@iconify/icons-eva/menu-2-fill';
import { Icon } from '@iconify/react';
import NotificationsPopover from './NotificationsPopover'
const DRAWER_WIDTH = '100%';
const APPBAR_MOBILE = 64;
const APPBAR_DESKTOP = 92;


const RootStyle = styled(AppBar)(({ theme }) => ({
    boxShadow: 'none',
    backdropFilter: 'blur(6px)',
    WebkitBackdropFilter: 'blur(6px)', // Fix on Mobile
    backgroundColor: alpha(theme.palette.background.default, 0.72),
  
 //  backgroundColor: 'blue',
   
    [theme.breakpoints.up('lg')]: {
      width: `calc(100% - ${DRAWER_WIDTH + 1}px)`
    }
  }));
  const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
    minHeight: APPBAR_MOBILE,
    [theme.breakpoints.up('lg')]: {
      minHeight: APPBAR_DESKTOP,
      padding: theme.spacing(0, 5)
    }
  }));
  Navbar.propTypes = {
    onOpenSidebar: PropTypes.func
  };
  
export default function Navbar({onOpenSidebar},props){
    return (
        
        <RootStyle>
            <ToolbarStyle>
                <div>
        <Box sx={{ px: 2.5}}  component={RouterLink} to="/Main" >
            <img src={Logo} style={{width:50}}/>
           
        </Box>
   

                <IconButton onClick={onOpenSidebar} sx={{ mr: 1, color: 'black' }}>
                <Icon  icon={menu2Fill} />
                     </IconButton>
             
                </div>
             
                <Box sx={{ flexGrow: 1 }} />

                <Stack direction="row" alignItems="center" >
      
                  <NotificationsPopover/> 
      </Stack>
            </ToolbarStyle>

        </RootStyle> 
        
    )
}
