import { createAction } from 'redux-act'
import Modals from '../modals';
import {addHotspotToKrpano,removeHotspotFromKrpano} from '../utils/krpanoFunctions'

export const dAddHotpot = createAction('add_hotpot')
export const dDeleteHotpot = createAction('delete_hotpot') 
export const dUpdateAllHotpot = createAction('update_all_hotpot')

export const action_consts = {
    ADD_HOTPOT: 'add_hotpot',
    DEL_HOTPOT: 'delete_hotpot',
    MODIFY_HOTPOT: 'modify_hotpot',
    UPDATE_ALL_HOTPOT: 'update_all_hotpot'
};

export function updateAllHotpot(arr) {
    return (dispatch)=>{
        dispatch(dUpdateAllHotpot(arr))
    }
}

export function updateAllHotpotFromLocal(){
    return (dispatch)=>{
        Modals.Hotpot.findAll()
        .then((list)=>{
            dispatch(updateAllHotpot(list))
        })
    }
}

export function addHotpot(obj) {
    return (dispatch,getState) => {
        Modals.Hotpot.add(obj)
        .then(()=>{
            return Modals.Hotpot.findAll()
        })
        .then((list)=>{
            dispatch(updateAllHotpot(list))
            if(getState().krpano.obj){
                addHotspotToKrpano(getState().krpano.obj,obj,true)
            }
        })
    }
}

export function delHotpot(obj) {
    return (dispatch)=>{
        Modals.Hotpot.delete(obj.id)
        .then(()=>{
            return Modals.Hotpot.findAll()
        })
        .then((list)=>{
            dispatch(updateAllHotpot(list))
        })
    }
}

export function modifyHotpot(obj) {
    return (dispatch)=>{
        Modals.Hotpot.update(obj)
        .then(()=>{
            return Modals.Hotpot.findAll()
        })
        .then((list)=>{
            dispatch(updateAllHotpot (list))
        })
    }
}
