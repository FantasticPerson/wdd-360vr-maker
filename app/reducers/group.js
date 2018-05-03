import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import {action_consts} from '../actions/group'
import Modals from '../modals'

export default function group(state=[],action){
    switch(action.type){
        case action_consts.UPDATE_ALL_GROUP:
            return action.context;
        default:
            return state;
    }
}