import { createAction } from 'redux-act'

import Modals from '../modals';
import Hashid from '../utils/generateHashId'


export const updateAllGroup = createAction('update_all_group')
export const updateSelectedGroup = createAction('update_selected_group')

export function updateSelected(id){
    return (dispatch) => {
        dispatch(updateSelectedGroup(id))
    }
}

export function dUpdateAllGroup(list){
    return (dispatch)=>{
        list.sort((item1,item2)=>{
            return item1.timestamp > item2.timestamp
        })
        dispatch(updateAllGroup(list));
    }
}

export function updateGroupFromLocal() {
    return (dispatch) => {
        Modals.Group.findAll()
        .then((list) => {
            dispatch(dUpdateAllGroup(list));
        });
    };
}

export function addGroup(title,vrId,groupId) {
    return (dispatch) => {
        Modals.Group.add({title:title,id:groupId,vrId:vrId})
        .then(() => Modals.Group.findAll())
        .then((list) => {
            dispatch(dUpdateAllGroup(list));
        });
    };
}

export function deleteGroup(obj) {
    return (dispatch,getState) => {
        let selectId = getState().folder.selectId
        Modals.Group.delete(obj.id)
        .then(() => Modals.Group.findAll())
        .then((list) => {
            dispatch(dUpdateAllGroup(list));
        });
    };
}

export function updateAllGroupMusic(arr,music1,music2){
    let objArr = arr.map(item=>{
        return {...item,music1,music2}
    })
    return (dispatch)=>{
        Modals.Group.updateAllGroup(objArr)
        .then(() => Modals.Group.findAll())
        .then((list) => {
            dispatch(dUpdateAllGroup(list));
        });
    }
}

export function updateGroupMusic(obj,music1,music2){
    return (dispatch)=>{
        Modals.Group.update({...obj,music1,music2})
        .then(() => Modals.Group.findAll())
        .then((list) => {
            dispatch(dUpdateAllGroup(list));
        });
    }
}

export function updateGroup(obj) {
    return (dispatch) => {
        Modals.Group.update(obj)
        .then(() => Modals.Group.findAll())
        .then((list) => {
            dispatch(dUpdateAllGroup(list));
        });
    };
}
