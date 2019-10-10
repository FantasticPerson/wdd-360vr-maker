import { createReducer } from 'redux-act'
import * as actions from '../actions/audio'

const defaultState = {
    list: []
}

const audio = createReducer({
    [actions.dUpdateAllAudio]: (state, arr) => ({ ...state, list: arr })
}, defaultState)

export default audio 