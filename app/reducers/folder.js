import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import { action_consts } from '../actions/folder';
import Modals from '../modals';

export default function folder(state = [], action) {
    switch (action.type) {
    case action_consts.UPDATE_ALL_FOLDER:
        return action.context;
    default:
        return state;
    }
}
