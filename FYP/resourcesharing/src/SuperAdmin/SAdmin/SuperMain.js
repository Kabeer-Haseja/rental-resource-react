import React, { useState } from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Navbar from './Navbar'
import DashboardSidebar from './SuperAdminDashboardSidebar'
import SuperAdminRoutes from './SuperAdminRoutes';
import SuperAdminNavBar from './SuperAdminNavBar';
import SuperAdminDashboardSidebar from './SuperAdminDashboardSidebar';
const SuperMain = () => {
    const [open, setOpen] = useState(false);
    return (
        <div className="sb-nav-fixed">
            <SuperAdminNavBar onOpenSidebar={() => setOpen(true)} />
            <div id="layoutSidenav">

                <div id="layoutSidenav_nav">

                    {/* <Sidebar isOpenSidebar={open} onCloseSidebar={() => setOpen(false)}/>
  */}
                    <SuperAdminDashboardSidebar isOpenSidebar={open} onCloseSidebar={() => setOpen(false)} />

                    <div id="layoutSidenav_content">
                        <main>
                            <Switch>
                                {SuperAdminRoutes.map((route, idx) => {
                                    return (
                                        route.component && (
                                            <Route
                                                key={idx}
                                                path={route.path}
                                                exact={route.exact}
                                                name={route.name}
                                                render={(props) => (
                                                    <route.component {...props} />
                                                )


                                                }
                                            />


                                        )
                                    )
                                })
                                }
                                      <Redirect from='/SuperAdmin' to='/SuperAdmin/dashboard' />

                            </Switch>

                        </main>
                        {/* <Footer/>
                */}
                    </div>
                </div>
            </div>

        </div>
    )
}
export default SuperMain