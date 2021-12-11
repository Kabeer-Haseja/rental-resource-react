import Dashboard from '../components/admin/Dashboard';
import AddProduct from '../components/admin/AddProduct';
import ProductListTable from '../components/admin/ProductListTable';
import UpdateProduct from '../components/admin/UpdateProduct';
import OrderTable from '../components/admin/OrderTable';
import AccountInfo from '../components/admin/AccountInfo';
import PendingRequests from '../components/admin/PendingRequests';

const routes = [

    { path: '/admin', exact: true, name: 'Admin' },
    { path: '/admin/dashboard', exact: true, name: 'Dashboard', component: Dashboard },
    { path: '/admin/AddProduct', exact: true, name: 'Profile', component: AddProduct },
    { path: '/admin/productListTable', exact: true, name: 'ProductList', component: ProductListTable },
    { path: '/admin/UpdateProduct', exact: true, name: 'ProductUpdate', component: UpdateProduct },
    { path: '/admin/OrderTable', exact: true, name: 'Orders', component: OrderTable },
    { path: '/admin/AccountInfo', exact: true, name: 'AccountInfo', component: AccountInfo },
    { path: '/admin/PendingRequests', exact: true, name: 'PendingRequests', component: PendingRequests },
    
    


]
export default routes;