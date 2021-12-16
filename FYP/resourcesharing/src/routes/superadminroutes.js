import AdminApproved from '../components/SAdmin/AdminApproved';
import CompleteOrder from '../components/SAdmin/CompletedOrder';
import Dashboard from '../components/SAdmin/Dashboard'
import LenderBorrowerDetail from '../components/SAdmin/LenderBorroweDetail';
import LenderBorroweDetailAdminApproved from '../components/SAdmin/LenderBorroweDetailAdminApproved';
import LenderBorroweDetailCompleteApproved from '../components/SAdmin/LenderBorroweDetailCompleteApproved';
import RequestsApproval from '../components/SAdmin/RequestsApproval';
import UserList from '../components/SAdmin/UsersList';
const superadminroutes = [

    { path: '/superadmin', exact: true, name: 'SuperAdmin' },
    { path: '/superadmin/dashboard', exact: true, name: 'Dashboard', component: Dashboard },
    { path: '/superadmin/userlist', exact: true, name: 'UserList', component: UserList },
    { path: '/superadmin/requestapproval', exact: true, name: 'UserList', component: RequestsApproval },
    { path: '/superadmin/borrowerlander', exact: true, name: 'UserList', component: LenderBorrowerDetail },
    { path: '/superadmin/borrowerlanderAdminApproved', exact: true, name: 'UserList', component: LenderBorroweDetailAdminApproved},
    { path: '/superadmin/borrowerlanderCompleteApproved', exact: true, name: 'UserList', component: LenderBorroweDetailCompleteApproved},
    
    { path: '/superadmin/adminapproval', exact: true, name: 'UserList', component: AdminApproved },
    { path: '/superadmin/completeorders', exact: true, name: 'UserList', component: CompleteOrder },


]
export default superadminroutes;