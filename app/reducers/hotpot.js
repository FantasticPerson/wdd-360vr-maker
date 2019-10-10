import { combineReducers } from 'redux';
import { createReducer } from 'redux-act'
import * as actions from '../actions/hotpot';

const defaultState = {
    list: [],
    selected: null
}

const hotpot = createReducer({
    [actions.dUpdateAllHotpot]: (state, list) => ({ ...state, list: list }),
    [actions.dUpdateHotpotSelect]: (state, id) => ({ ...state, selected: id })
}, defaultState)

export default hotpot