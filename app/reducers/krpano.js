import { createReducer } from 'redux-act'
import * as actions from '../actions/krpano'

const defaulState = {
    obj: null
}

const krpano = createReducer({
    [actions.dUpdateKrpano]: (state, obj) => ({ ...state, obj: obj })
}, defaulState)

export default krpano