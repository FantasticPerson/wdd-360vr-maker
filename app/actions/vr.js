import { createAction } from 'redux-act'

import Modals from '../modals'
import Hashid from '../utils/generateHashId'

export const updateAllVr = createAction('update_all_vr')

export function updateAllDVr(list){
    return (dispatch)=>{
        list.sort((item1,item2)=>{
            return item1.timestamp > item2.timestamp
        })
        dispatch(updateAllVr(list))
    }
}

export function updateVrFromLocal(){
    return (dispatch)=>{
        Modals.Vr.findAll()
        .then((list)=>{
            list.sort((item1,item2)=>{
                return item1.timestamp > item2.timestamp
            })
            dispatch(updateAllDVr(list))
        })
    }
}

export function addMusic(vrId,music1,music2){
    return (dispatch,getState)=>{
        let vrItem = getState().vr.list.find(item=>item.id == vrId)
        if(vrItem){
            vrItem.music1 = music1
            vrItem.music2 = music2
            Modals.Vr.update(vrItem)
            .then(() => Modals.Vr.findAll())
            .then((list) => {
                dispatch(updateAllDVr(list));
            });
        }
    }
}

export function addVr(vrObj) {
    return (dispatch,getState) => {
        let selectFolderId = getState().folder.selectId
        Modals.Vr.add({...vrObj,folderId:selectFolderId})
        .then(() => Modals.Vr.findAll())
        .then((list) => {
            dispatch(updateAllDVr(list));
        });
    };
}

export function delVr(vrObj) {
    return (dispatch) => {
        Modals.Vr.delete(vrObj.id)
        .then(() => Modals.Vr.findAll())
        .then((list) => {
            dispatch(updateAllDVr(list));
        });
    };
}
 
export function modifyVr(vrObj) {
    return (dispatch) => {
        Modals.Vr.update(vrObj)
        .then(() => Modals.Vr.findAll())
        .then((list) => {
            dispatch(updateAllDVr(list));
        });
    };
}
