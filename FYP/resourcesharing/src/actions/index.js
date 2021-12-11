import {useSelector} from 'react-redux'
export const fetchdata=(hello)=>{
    return{
        type:"FETCHDATA",
        helloarray:hello
        
    }
}
export const logindata=(data)=>{
    return{
        type:"LOGINDATA",
        logininfo:data
    }
}
export const getdata=()=>{
    
    return{
        type:"GETDATA",
    
    }
}
export const filterdata=(data)=>{
    
    return{
        type:"FILTERDATA",
        filtereddata:data
    
    }
}
