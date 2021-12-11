import React,{useState} from 'react'
import { Link } from 'react-router-dom';
import styled from "styled-components";

const StyledLink = styled(Link)`
  color: #FEB049;
  
  font-weight: bold;
`;
var val='/Main';
var name="Switch to Landing"

export function SwitchLink(props) {
 const Toggle=()=>{
   if(val=='/Main')
   {
   val='/admin'
    name="Switch to Landing"
    }
   else{
     val='/Main'
     name="Switch to borrowing"
 
    }
 }

  return (
    <>
        
        <StyledLink to={val} onClick={Toggle}>{name}</StyledLink>
      
    </>
  )

}
