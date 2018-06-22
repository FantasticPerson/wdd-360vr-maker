import Modals from '../modals'
import { createAction } from 'redux-act'

export const updateAllVr = createAction('update_all_vr')

export function updateVrFromLocal(){
    return (dispatch)=>{
        Modals.Vr.findAll()
        .then((list)=>{
            dispatch(updateAllVr(list))
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
                dispatch(updateAllVr(list));
            });
        }
    }
}

export function addVr(vrObj) {
    return (dispatch) => {
        Modals.Vr.add(vrObj)
            .then(() => Modals.Vr.findAll())
            .then((list) => {
                dispatch(updateAllVr(list));
            });
    };
}

export function delVr(vrObj) {
    return (dispatch) => {
        Modals.Vr.delete(vrObj.id)
            .then(() => Modals.Vr.findAll())
            .then((list) => {
                dispatch(updateAllVr(list));
            });
    };
}

export function modifyVr(vrObj) {
    return (dispatch) => {
        Modals.Vr.update(vrObj)
            .then(() => Modals.Vr.findAll())
            .then((list) => {
                dispatch(updateAllVr(list));
            });
    };
}
