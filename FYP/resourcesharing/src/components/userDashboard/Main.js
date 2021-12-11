import React, { Component, useContext, createContext,useState } from 'react'
import styled from "styled-components";
import { Button, Form, FormControl } from 'react-bootstrap';
import { IoSearch } from 'react-icons/io5';
import { SearchBar } from '../SearchBar';
import { SwitchLink } from '../SwitchLink';
import {connect} from 'react-redux';
import {
    Nav,
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    InputGroupAddon,
    InputGroup,
    Input,
    NavItem,
    NavLink,
} from "reactstrap";
import Categories from './Categories';
import Products from './Products';
import { BrowserRouter as Router, Switch, Route, Redirect, useLocation } from 'react-router-dom';
import DetailedShopProduct from '../Products/DetailedShopProduct';
import Navbar from '../../layouts/admin/Navbar';
import userRoutes from './userRoutes';
import dataService from '../../dataService'
import { Context } from '../Login/SignIn';

export const Appbar = styled.div`
background-color:#323232;
display: flex;
flex-direction: row;
flex-wrap: nowrap;
justify-content: space-between;
align-items: flex-start;
align-content: normal;
height: 88px;
`;
export const Center = styled.div`
margin-top:9px;
`;
export const LinkPosition = styled.div`
align-self:center;

padding: 6px 16px;




`;
const Logo = styled.div`
align-self:center;
display: block;
flex-grow: 0;
flex-shrink: 1;
flex-basis: auto;
order: 0;
background-color:white;
`;
const Container = styled.div`
display: flex;
flex-direction: column;
flex-wrap: nowrap;
justify-content: normal;
align-items: normal;
align-content: normal;
margin-top:100px;
`;


export default function Main() {
    const location = useLocation();
    // const data=location.state.users;
    const newC=useContext(Context)
    console.log(newC)
     const [post, setpost] = useState("sss");
    return (
        <>
                <Navbar />
                <Router>
                    <Switch>
                        {userRoutes.map((route, idx) => {
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
                        <Redirect from='/Main' to='/Main/Products' />

                    </Switch>


                </Router>
            {/* <Container>
                </Container> */}


        </>
    )
}

