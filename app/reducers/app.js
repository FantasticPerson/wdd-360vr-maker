import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import {action_consts} from '../actions/app'

export default function app(state={title:'VR 制作工具',showBack:false},action){
    switch(action.type){
        case action_consts.APP_UPDATE_TITLE:
            return {
                ...state,
                title:action.context
            }
        case action_consts.APP_UPDATE_SHOW_BACK:
            return {
                ...state,
                showBack:action.context
            }
        default:
            return state
    }
}