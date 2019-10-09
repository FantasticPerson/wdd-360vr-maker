import { combineReducers } from 'redux';
import { createReducer } from 'redux-act'
import { fromJS } from 'immutable'
import * as actions from '../actions/vr';

const defaultState = {
    list: []
}

const vr = createReducer({
    [actions.dUpdateAllVr]: (state, list) => ({ ...state, 'list': list })
}, defaultState)

export default vr
