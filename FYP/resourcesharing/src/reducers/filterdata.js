import axios from 'axios'
const data = JSON.parse(localStorage.getItem('ssd'));

const initialState = [];

const filterdata = (state = initialState, action) => {

    switch (action.type) {
        case "FILTERDATA":
            console.log(action.filtereddata);
            return action.filtereddata


        default:
            return state

    }
}
export default filterdata;