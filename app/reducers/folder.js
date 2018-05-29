import { createReducer } from 'redux-act'
import * as actions from '../actions/folder'

const defaultState = {
    list : [],
    selectId : 0
}

const folder = createReducer({
    [actions.updateAllFolder]:(state,list)=>{
        return {...state,'list':list}
    },
    [actions.updateSelectedFolder]:(state,id)=>{
        return {...state,'selectId':id}
    }
},defaultState)

export default folder
