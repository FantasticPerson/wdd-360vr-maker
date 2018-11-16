import { createReducer } from 'redux-act'
import * as actions from '../actions/picture'

const defaultState = {
    list: []
}

const picture = createReducer({
    [actions.dUpdateAllPicture]: (state, arr) => ({ ...state, list: arr })
}, defaultState)

export default picture 