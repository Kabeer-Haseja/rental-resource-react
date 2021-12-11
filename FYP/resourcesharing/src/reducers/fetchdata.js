import axios from 'axios'
const data=JSON.parse(localStorage.getItem('ssd'));
  
const initialState=[];

const changeTheData=(state=initialState,action)=>{
        
    switch(action.type){
        case "FETCHDATA":
            console.log(action.helloarray)
       return  action.helloarray
       case "LOGINDATA":
           return action.logininfo
        

        default:return state
           
    }
}
export default changeTheData;