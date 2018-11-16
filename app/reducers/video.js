import { createReducer } from 'redux-act'
import * as actions from '../actions/video'

const defaultState = {
    list: []
}

const video = createReducer({
    [actions.dUpdateAllVideo]: (state, arr) => ({ ...state, list: arr })
}, defaultState)

export default video 