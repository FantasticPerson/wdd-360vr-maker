import { createReducer } from 'redux-act'
import * as actions from '../actions/group'

const defaultState = {
    list : [],
    selectId : undefined
}

const folder = createReducer({
    [actions.updateAllGroup]:(state,list)=>{
        return {...state,'list':list}
    },
    [actions.updateSelectedGroup]:(state,id)=>{
        return {...state,'selectId':id}
    }
},defaultState)

export default folder
