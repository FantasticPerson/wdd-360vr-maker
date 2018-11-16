import { combineReducers } from 'redux';
import { createReducer } from 'redux-act'
import * as actions from '../actions/scene';

const defaultState = {
    list: [],
    sceneSelected: -10
}

const scene = createReducer({
    [actions.updateAllScene]: (state, list) => ({ ...state, list: list }),
    [actions.dUpdateSceneSelected]: (state, id) => ({ ...state, sceneSelected: id })
}, defaultState)

export default scene
