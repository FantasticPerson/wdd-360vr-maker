import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import {action_consts} from '../actions/scene'

export default function scene(state=[],action){
    switch(action.type){
        case action_consts.UPDATE_ALL:
            return action.context
        case action_consts.ADD_SCENE:
            return [...state,action.context]
        case action_consts.DEL_SCENE:
            let newArr = [...state]
            let item = newArr.find((item)=>item.id === action.context.id)
            if(item){
                let index = newArr.indexOf(item)
                newArr.splice(index,1)
                return newArr
            }
        case action_consts.MODIFY_SCENE:
            let newArr2 = [...state]
            let item2 = newArr2.find((item)=>item.id===active.context.id)
            if(item2){
                Object.assign(item2,...action.context)
                return newArr2
            }
        default:
            return state    
    }
}