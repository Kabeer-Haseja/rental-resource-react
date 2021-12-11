import { Icon } from '@iconify/react';
import { useRef, useState } from 'react';
import editFill from '@iconify/icons-eva/edit-fill';
import { Link as RouterLink,useLocation } from 'react-router-dom';
import trash2Outline from '@iconify/icons-eva/trash-2-outline';
import moreVerticalFill from '@iconify/icons-eva/more-vertical-fill';
import swal from 'sweetalert2';

// material
import { Menu, MenuItem, IconButton, ListItemIcon, ListItemText } from '@material-ui/core';
import axios from 'axios';
import ProductListTable from '../admin/ProductListTable';

// ----------------------------------------------------------------------
function sweetConfirm(title, message, callback) {
  swal({
      title: title,
      text: message,
      type: 'warning',
      showCancelButton: true
  }).then((confirmed) => {
      console.log("True")
  });
}

export default function ProductMoreMenu(props) {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const hello=()=>{
    swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((confirmed) => {
      if(confirmed.value){
       
        axios.delete(`http://localhost:8080/deleteproductbyid/${props.message.id}`).then((response)=>{
          swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
         
           
        }
        )
      
      }
      else{
        console.log("Deleted not Called");
     
      }
        // swal.fire(
        //   'Deleted!',
        //   'Your file has been deleted.',
        //   'success'
        // )
    }) 
  } 
    
  const hw=()=>{
    return   
  }
  return (
    <>
    
      <IconButton ref={ref} onClick={() => setIsOpen(true)}>
        <Icon icon={moreVerticalFill} width={20} height={20} />
      </IconButton>

      <Menu
        open={isOpen}
        anchorEl={ref.current}
        onClose={() => setIsOpen(false)}
        PaperProps={{
          sx: { width: 200, maxWidth: '100%' }
        }}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem sx={{ color: 'text.secondary' }}>
          <ListItemIcon>
            <Icon icon={trash2Outline} width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Delete" onClick={hello} primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>

        <MenuItem component={RouterLink} to={{pathname:'/admin/UpdateProduct',state:{from: props.message}}}   sx={{ color: 'text.secondary' }}>
          <ListItemIcon>
            <Icon icon={editFill} width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Edit"  primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>
      </Menu>
    </>
  );
}
