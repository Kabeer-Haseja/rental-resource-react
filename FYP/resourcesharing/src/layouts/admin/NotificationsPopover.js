import faker from 'faker';
import PropTypes from 'prop-types';
import { noCase } from 'change-case';
import { useRef, useState,useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { set, sub, formatDistanceToNow } from 'date-fns';
import { Icon } from '@iconify/react';
import bellFill from '@iconify/icons-eva/bell-fill';
import clockFill from '@iconify/icons-eva/clock-fill';
import doneAllFill from '@iconify/icons-eva/done-all-fill';
// material
import { Button } from 'react-bootstrap';
import { alpha } from '@material-ui/core/styles';
import Moment from 'moment';


import {
  Box,
  List,
  Badge,
  Avatar,
  Tooltip,
  Divider,
  IconButton,
  Typography,
  ListItemText,
  ListSubheader,
  ListItemAvatar,
  ListItemButton,
 
} from '@material-ui/core';
// utils
// components
import Scrollbar from '../../components/Scrollbar';
import MenuPopover from './MenuPopover';
import axios from 'axios';
import { height } from '@material-ui/system';
import Swal from 'sweetalert2';

// ----------------------------------------------------------------------



const NOTIFICATIONS = [
  {

    id: faker.datatype.uuid(),
    productName: 'Your order is placed',
    description: 'waiting for shipping',
    avatar: null,
    type: 'order_placed',
    createdAt: set(new Date(), { hours: 10, minutes: 30 }),
    read: true
  }
 ];

function renderContent(notification) {
  const productName = (
    <Typography variant="subproductName2">
       Some one Wanted to Rent your {notification.productName} product
    </Typography>
  );

  if (notification.type === 'order_placed') {
    return {
      avatar: <img alt={notification.productName} src={notification.url} />,
      productName
    };
  }
  if (notification.type === 'order_shipped') {
    return {
      avatar: <img alt={notification.productName} src={notification.url} />,
      productName
    };
  }
  if (notification.type === 'mail') {
    return {
      avatar: <img alt={notification.productName} src="/static/icons/ic_notification_mail.svg" />,
      productName
    };
  }
  if (notification.type === 'chat_message') {
    return {
      avatar: <img  alt={notification.productName} src="/static/icons/ic_notification_chat.svg" />,
      productName
    };
  }
  return {
    avatar: <img style={{width:"100%" ,height:"100%"}} alt={notification.productName} src={notification.url} />,
    productName
  };
}

NotificationItem.propTypes = {
  notification: PropTypes.object.isRequired
};

function NotificationItem({ notification }) {
  const { avatar, productName } = renderContent(notification);
 const notificationDetail=()=>{
 
Swal.fire({
  title: notification.productName,
  html:'Somene want to Rent Your Product'+
  '<h3 id="s" >From:'+Moment(notification.fromdate).format('DD-MM-YYYY')+'</h3>' +
  '<h3 id="ss">To '+Moment(notification.todate).format('DD-MM-YYYY')+'</h3>',

  imageUrl: notification.url,
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: 'Yes, Rent it!'
}).then((result) => {
  if (result.value) {
     axios.get(`http://localhost:8080/changeOrderStatus/${notification.productId}`).then((response)=>{
     axios.get(`http://localhost:8080//ChangeNotificationStatus/${notification.notificationId}`).then((response)=>{
      Swal.fire(
        'Pending!',
        'Your Product will  Approve By Admin',
        'Thanks'
      )  
   
     }) 
     }
     )
     
      
  }
 
})
}
  return (
    <ListItemButton
    onClick={notificationDetail}
      disableGutters
      component={RouterLink}
      sx={{
        py: 1.5,
        px: 2.5,
        mt: '1px',
        ...(notification.read && {
          bgcolor: 'action.selected'
        })
      }}
    >
      <ListItemAvatar>
        <Avatar sx={{ bgcolor: 'background.neutral' }}>{avatar}</Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={productName}
        secondary={
          <>
          <Typography
            variant="caption"
            sx={{
              mt: 0.5,
              display: 'flex',
              alignItems: 'center',
              color: 'text.disabled'
            }}
          >
 
<br>
</br>          </Typography>
          <Box component={Icon} icon={clockFill} sx={{ mr: 0.5, width: 16, height: 16 }} />
          {formatDistanceToNow(new Date(notification.createdAt))}
       
        </>
        }
      />
    </ListItemButton>
  );
 
}
export default function NotificationsPopover(props) {
    const anchorRef = useRef(null);
    const [open, setOpen] = useState(false);
    const [notifications, setNotifications] = useState([]);

    const totalUnRead = notifications.filter((item) => item.read == false).length;
    const data = JSON.parse(localStorage.getItem('ssd'));
 
  axios.get(`http://localhost:8080/findnotificationbycustomerid/${data.id}`).then((response) => {
  setNotifications(response.data)
  })
  
 
   
    const handleOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  
    const handleMarkAllAsRead = () => {
      setNotifications(
        notifications.map((notification) => ({
          ...notification,
          read: false
        }))
      );
    };

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(20);
  
    return(
        <>
          <IconButton
        ref={anchorRef}
        size="large"
        color={open ? 'primary' : 'default'}
        onClick={handleOpen}
        sx={{
          ...(open && {
            bgcolor: (theme) => alpha(theme.palette.primary.main, theme.palette.action.focusOpacity)
          })
        }}
      >
        <Badge badgeContent={totalUnRead} color="error">
          <Icon icon={bellFill} width={20} height={20} />
        </Badge>
      </IconButton>
      <MenuPopover
        open={open}
        onClose={handleClose}
        anchorEl={anchorRef.current}
        sx={{ width: 360 }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', py: 2, px: 2.5 }}>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="subproductName1">Notifications</Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              You have {totalUnRead} unread messages
            </Typography>
          </Box>

          {totalUnRead > 0 && (
            <Tooltip productName=" Mark all as read">
              <IconButton color="primary" onClick={handleMarkAllAsRead}>
                <Icon icon={doneAllFill} width={20} height={20} />
              </IconButton>
            </Tooltip>
          )}
        </Box>

        <Divider />

        <Scrollbar>
          
          <List
            disablePadding
            subheader={
              <ListSubheader disableSticky sx={{ py: 1, px: 2.5, typography: 'overline' }}>
               NOTIFICATIONS
              </ListSubheader>
            }
          >
            {notifications.slice(0,5).map((notification) => (
             <>
             <NotificationItem key={notification.id} notification={notification}>
                </NotificationItem>
                </>
            ))}
          </List>
        </Scrollbar>

        <Divider />

        <Box sx={{ p: 1 }}>
        </Box>
      </MenuPopover>
  
        </>
    );
  }  
