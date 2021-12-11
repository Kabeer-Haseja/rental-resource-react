import { Icon } from '@iconify/react';
import pieChart2Fill from '@iconify/icons-eva/pie-chart-2-fill';
import peopleFill from '@iconify/icons-eva/people-fill';
import shoppingBagFill from '@iconify/icons-eva/shopping-bag-fill';
import fileTextFill from '@iconify/icons-eva/file-text-fill';
import lockFill from '@iconify/icons-eva/lock-fill';
import personAddFill from '@iconify/icons-eva/person-add-fill';
import alertTriangleFill from '@iconify/icons-eva/alert-triangle-fill';

// ----------------------------------------------------------------------

const getIcon = (name) => <Icon icon={name} width={22} height={22} />;

const superAdminSideBarConfig = [
  {
    title: 'dashboard',
    path: '/superadmin/dashboard',
    icon: getIcon(pieChart2Fill)
  },
  {
    title: ' Users',
    path: '/superadmin/userlist',
    icon: getIcon(peopleFill)
  },
  {
    title: ' Customer Approved',
    path: '/superadmin/requestapproval',
    icon: getIcon(peopleFill)
  },
  {
    title: ' Admin Approved',
    path: '/superadmin/adminapproval',
    icon: getIcon(peopleFill)
  },
  {
    title: ' Complete Order',
    path: '/superadmin/completeorders',
    icon: getIcon(peopleFill)
  },
  
  
 
 
];

export default superAdminSideBarConfig;
