import {combineReducers} from 'redux'
//imported
import itemReducers from './itemReducers'
import authReducers from './authReducers'
import errorReducers from './errorReducers'




export default combineReducers({
    item :itemReducers,
    auth:authReducers,
    error:errorReducers
})