import { createReducer } from 'redux-act'
import * as actions from '../actions/app'

const defaultState = {
    title: 'VR 制作工具',
    showBack: false,
    showType: 1
}

const app = createReducer({
    [actions.dUpdateAppTitle]: (state, title) => ({ ...state, title: title }),
    [actions.dUpdataAppShowBack]: (state, showBack) => ({ ...state, showBack: showBack }),
    [actions.dUpdateAppShowType]: (state, type) => ({ ...state, showType: type })
}, defaultState)

export default app