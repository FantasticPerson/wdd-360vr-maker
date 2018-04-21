import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import { action_consts } from '../actions/vr';

export default function vr(state = [], action) {
    switch (action.type) {
    case action_consts.UPDATE_ALL:
        return action.context;
    case action_consts.ADD_VR:
        return [...state, action.context];
    case action_consts.MODIFY_VR:
        const newArr = [...state];
        const item = newArr.find((item) => item.id === action.context.id);
        Object.assign(item, ...action.context);
        return newArr;
    case action_consts.DEL_VR:
        const newArr2 = [...state];
        const item2 = newArr2.find((item) => item.id === action.context.id);
        const index = newArr2.indexOf(item2);
        newArr2.splice(index, 1);
        return newArr2;
    default:
        return state;
    }
}
