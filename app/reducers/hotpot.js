import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import { action_consts } from '../actions/hotpot';
import Modals from '../modals';

export default function hotpot(state = [], action) {
    switch (action.type) {
    case action_consts.UPDATE_ALL_HOTPOT:
        return action.context;
    default:
        return state;
    }
}