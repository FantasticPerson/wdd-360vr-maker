import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import {action_consts} from '../actions/vr'

export default function vr(state=[],action) {
    switch(action.type) {
        case action_consts.UPDATE_ALL:
            return action.context;
        case action_consts.ADD_VR:
            return [...state,action.context];
        case action_consts.MODIFY_VR:
            let newArr = [...state]
            let item = newArr.find((item)=>{
                return item.id === action.context.id
            })
            Object.assign(item,...action.context)
            return newArr
        case action_consts.DEL_VR:
            let newArr2 = [...state]
            let item2 = newArr2.find((item)=>{
                return item.id === action.context.id
            })
            let index = newArr2.indexOf(item2)
            newArr2.splice(index,1)
            return newArr2
        default:
            return state
    }
}