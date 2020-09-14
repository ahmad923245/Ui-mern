import axios from 'axios'
import {GET_ITEMS,ADD_ITEM,DELETE_ITEM,ITEMS_LOADING} from './types'
import {TokenConfig} from './AuthActions'
import{ returnErrors} from  './errorsActions'

export const getItems =() => dispatch =>{
    dispatch(setItemsLoading());
    axios
    .get('/api/items')
    .then(res=>dispatch({
        type:GET_ITEMS,
        payload:res.data
    }))
    .catch(err=>
        dispatch(returnErrors(err.response.data,err.response.status)));

};
export const addItems =item=> (dispatch,getState)=>{
    axios
    .post('/api/items',item,TokenConfig(getState))
    .then(res=>
        dispatch({
            type:ADD_ITEM,
            payload:res.data
        }))
        .catch(err=>
            dispatch(returnErrors(err.response.data,err.response.status)));
};
export const deleteItems =id=> (dispatch,getState) =>{
    axios.delete(`/api/items/${id}`,TokenConfig(getState)).then(res=>
        dispatch({
            type:DELETE_ITEM,
            payload:id
        }))
        .catch(err=>
            dispatch(returnErrors(err.response.data,err.response.status)));
};
export const setItemsLoading =()=>{
    return{
        type:ITEMS_LOADING
    };
};
