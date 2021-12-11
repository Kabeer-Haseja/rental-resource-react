import axios from 'axios'
const data=JSON.parse(localStorage.getItem('ssd'));
  
const initialState=66;

const getTheData=(state=initialState,action)=>{
        
    switch(action.type){
        case "GETDATA":
            console.log(action.gett)
       return   axios.get(`http://localhost:8080/get/product/66`).then((response)=>{
            
      })


        default:return state
           
    }
}
export default getTheData;