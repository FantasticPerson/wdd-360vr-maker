import { createReducer } from 'redux-act'
import * as actions from '../actions/folder'

const defaultState = {
    list: [],
    selectId: 0
}

const folder = createReducer({
    [actions.dUpdateAllFolder]: (state, list) => ({ ...state, 'list': list }),
    [actions.dUpdateFolderSelected]: (state, id) => ({ ...state, 'selectId': id })
}, defaultState)

export default folder
