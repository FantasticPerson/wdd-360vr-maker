import { combineReducers } from 'redux';
import { createReducer } from 'redux-act'
import * as actions from '../actions/scene';

const defaultState = {
    list:[]
}

const scene = createReducer({
    [actions.updateAllScene]:(state,list)=>{
        return {...state,list:list}
    }
},defaultState)

export default scene
