import React from 'react';
import { filter } from 'lodash';
import { Icon } from '@iconify/react';
import { sentenceCase } from 'change-case';
import { useState,useEffect } from 'react';
import plusFill from '@iconify/icons-eva/plus-fill';
import { Link as RouterLink } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

// material
import {
  Card,
  Table,
  Stack,
  Avatar,
  Button,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination
} from '@material-ui/core';
import Page from '../Page';
import Label from '../userDashboard/Label';
import Scrollbar from '../Scrollbar';
import SearchNotFound from '../SearchNotFound';
import ProductListToolbar from '../ProductsTable/ProductListToolbar';
import ProductListHead from '../ProductsTable/ProductListHead';
import ProductMoreMenu from '../ProductsTable/ProductMoreMenu';
import {useDispatch,useSelector,connect} from "react-redux"

import store from '../../store';
import {fetchdata, getdata, logindata} from '../../actions/index'
import axios from 'axios';
const TABLE_HEAD = [
    { id: 'productName', label: 'Product Name', alignRight: false },
    { id: 'orderstatus', label: 'Order Status', alignRight: false },
    { id: 'requestdate', label: 'Request Date', alignRight: false }
    ];

  function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }
  
  function getComparator(order, orderBy) {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }
  
  function applySortFilter(array, comparator, query) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    if (query) {
      return filter(array, (_user) => _user.username.toLowerCase().indexOf(query.toLowerCase()) !== -1);
      }
    return stabilizedThis.map((el) => el[0]);
  }
 
 const RequestsApproval  =  () => {
  
 const dispatch=useDispatch()
   const [prod, setprod] = useState([]);
  const [refresh,setrefresh]=useState(true);

  // const mystate = useSelector(state => state.changeTheData)
  const data=JSON.parse(localStorage.getItem('ssd'));
       axios.get(`http://localhost:8080/RequestsApproval`).then((response)=>{
        setprod(response.data)
      })     

  const [page, setPage] = useState(0);
    const [order, setOrder] = useState('asc');
    const [selected, setSelected] = useState([]);
    const [orderBy, setOrderBy] = useState('name');
    const [filterName, setFilterName] = useState('');
    const [rowsPerPage, setRowsPerPage] = useState(20);
  
    const handleRequestSort = (event, property) => {
      const isAsc = orderBy === property && order === 'asc';
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(property);
    };
  
    const handleSelectAllClick = (event) => {
      if (event.target.checked) {
         const newSelecteds = prod.map((n) => n.username);
         setSelected(newSelecteds);
      
        return;
      }
      setSelected([]);
    };
  
    const handleClick = (event, name) => {
      const selectedIndex = selected.indexOf(name);
      let newSelected = [];
      if (selectedIndex === -1) {
        newSelected = newSelected.concat(selected, name);
      } else if (selectedIndex === 0) {
        newSelected = newSelected.concat(selected.slice(1));
      } else if (selectedIndex === selected.length - 1) {
        newSelected = newSelected.concat(selected.slice(0, -1));
      } else if (selectedIndex > 0) {
        newSelected = newSelected.concat(
          selected.slice(0, selectedIndex),
          selected.slice(selectedIndex + 1)
        );
      }
      setSelected(newSelected);
    };
  
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };
  
    const handleFilterByName = (event) => {
      setFilterName(event.target.value);
    };
  
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - prod.length) : 0;
  
    const filteredUsers = applySortFilter(prod, getComparator(order, orderBy), filterName);
  
    const isUserNotFound = filteredUsers.length === 0;
    const history = useHistory();
  
  const lenderborrowerdetail=(row)=>{
    localStorage.setItem("rowdetail",JSON.stringify(row))

    history.push({
        pathname:'/superadmin/borrowerlander',
   
      })
  }
   
    return (
      <>
      <Page>
          <Container style={{marginTop:'65px',marginLeft: 40 }}>
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
        Customer Approved
                   </Typography>
        
              </Stack>
   
              <Card>
                  <ProductListToolbar
                         numSelected={selected.length}
                         filterName={filterName}
                         onFilterName={handleFilterByName}
                    />  
                         <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <ProductListHead
                    order={order}
                    orderBy={orderBy}
                    headLabel={TABLE_HEAD}
                    rowCount={prod.length}
                    numSelected={selected.length}
                    onRequestSort={handleRequestSort}
                    onSelectAllClick={handleSelectAllClick}
                  />
                <TableBody>
                  {filteredUsers
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      const { id, productName,orderstatus, requestDate} = row;
                      const isItemSelected = selected.indexOf(productName) !== -1;

                      return (
                        <TableRow
                          hover
                          key={id}
                          tabIndex={-1}
                          onClick={()=>lenderborrowerdetail({row})}
                          role="checkbox"
                          selected={isItemSelected}
                          aria-checked={isItemSelected}
                        >
                          <TableCell component="th" scope="row" padding="none">
                            <Stack direction="row" alignItems="center" spacing={2}>
                              <Avatar alt={productName} src="{avatarUrl}" />
                              <Typography variant="subtitle2" noWrap>
                                {productName}
                              </Typography>
                            </Stack>
                          </TableCell>
                          <TableCell align="left">{orderstatus}</TableCell>
                          <TableCell align="left">{requestDate}</TableCell>
                          
                          
                     
                        </TableRow>
                      );
                    })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
                {isUserNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <SearchNotFound searchQuery={filterName} />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>  
                    </Card>
              </Container>
      </Page>
      </>
    );
                
}
export default RequestsApproval;
