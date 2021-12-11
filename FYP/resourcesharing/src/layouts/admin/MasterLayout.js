import React,{useState} from 'react'
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Footer from './Footer';
import '../../assests/admin/css/styles.css';
import '../../assests/admin/js/scripts'
import routes from '../../routes/routes'
import superadminroutes from '../../routes/superadminroutes';
import { BrowserRouter as Router,Switch,Route,Redirect } from 'react-router-dom';
import Dashboard from '../../components/admin/Dashboard';
import DashboardSidebar from './DashboardSidebar';
import { useDispatch,useSelector } from 'react-redux';
import { fetchdata } from '../../actions';
import SuperAdminNavBar from '../../SuperAdmin/SAdmin/SuperAdminNavBar';
import SuperAdminDashboardSidebar from '../../SuperAdmin/SAdmin/SuperAdminDashboardSidebar';
const MasterLayout=()=> {
    const [open, setOpen] = useState(false);
    const dispatch=useDispatch();
    const hi=()=>{
    alert()
        dispatch(fetchdata())
        
    }
    const data=JSON.parse(localStorage.getItem('ssd'));
  if(data.username=="hello")
  {
      return(
        <>

        <div className="sb-nav-fixed">
            <SuperAdminNavBar onOpenSidebar={() => setOpen(true)}/>
        
            <div id="layoutSidenav">

              <div id="layoutSidenav_nav">
                 
                    <SuperAdminDashboardSidebar  isOpenSidebar={false} onCloseSidebar={() => setOpen(true)}/>
           
           
                </div>
            
                <div id="layoutSidenav_content">
                    <main>

                             <Switch>
                            {superadminroutes.map((route,idx)=>{
                                return(
                                    route.component &&(
                                     
                                        <Route 
                                            key={idx}
                                            path={route.path}
                                            exact={route.exact}
                                            name={route.name}

                                            render={(props)=>(
                                                <route.component {...props} onClick={hi}/>
                                            )

                                            
                                            }
                                        />

                                        
                                    )
                                )
                            })
                            }
                            <Redirect from ='/superadmin' to='/superadmin/dashboard'/>
                        </Switch> 

                        </main>
                    {/* <Footer/>
                */}
                </div>
            </div>
        </div>
   </>
      )
  }
  else{
   return (
        <>

        <div className="sb-nav-fixed">
            <Navbar onOpenSidebar={() => setOpen(true)}/>
        
            <div id="layoutSidenav">

              <div id="layoutSidenav_nav">
                 
                    <DashboardSidebar  isOpenSidebar={true} onCloseSidebar={() => setOpen(false)}/>
           
           
                </div>
            
                <div id="layoutSidenav_content">
                    <main>

                             <Switch>
                            {routes.map((route,idx)=>{
                                return(
                                    route.component &&(
                                     
                                        <Route 
                                            key={idx}
                                            path={route.path}
                                            exact={route.exact}
                                            name={route.name}

                                            render={(props)=>(
                                                <route.component {...props} onClick={hi}/>
                                            )

                                            
                                            }
                                        />

                                        
                                    )
                                )
                            })
                            }
                            <Redirect from ='/admin' to='/admin/dashboard'/>
                        </Switch> 

                        </main>
                    {/* <Footer/>
                */}
                </div>
            </div>
        </div>
   </>
        )
            }
}
export default MasterLayout