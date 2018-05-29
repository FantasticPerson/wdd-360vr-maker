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
