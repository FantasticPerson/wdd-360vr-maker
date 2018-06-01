import { combineReducers } from 'redux';
import { createReducer } from 'redux-act'
import * as actions from '../actions/hotpot';

const defaultState = {
    list:[],
    selected:null
}

const hotpot = createReducer({
    [actions.dUpdateAllHotpot]:(state,list)=>{
        return {...state,list:list}
    },
    [actions.dUpdateHotpotSelect]:(state,id)=>{
        return {...state,selected:id}
    }
},defaultState)

export default hotpot