import { combineReducers } from 'redux';
import { createReducer } from 'redux-act'
import * as actions from '../actions/hotpot';

const defaultState = {
    list:[]
}

const hotpot = createReducer({
    [actions.dUpdateAllHotpot]:(state,list)=>{
        return {...state,list:list}
    }
},defaultState)

export default hotpot