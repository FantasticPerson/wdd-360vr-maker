import { createReducer } from 'redux-act'
import * as actions from '../actions/group'

const defaultState = {
    list: [],
    selectId: undefined
}

const folder = createReducer({
    [actions.dUpdateAllGroup]: (state, list) => ({ ...state, 'list': list }),
    [actions.dUpdateSelectedGroup]: (state, id) => ({ ...state, 'selectId': id })
}, defaultState)

export default folder
