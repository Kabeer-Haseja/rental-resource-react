import changeTheData from './fetchdata'
import getTheData from './getdata';
import filterdata from './filterdata'
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
    changeTheData,
    getTheData,
    filterdata

})
export default rootReducer;