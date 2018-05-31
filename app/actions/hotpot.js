import { createAction } from 'redux-act'
import Modals from '../modals';
import {addHotspotToKrpano,removeHotspotFromKrpano} from '../utils/krpanoFunctions'

export const dAddHotpot = createAction('add_hotpot')
export const dDeleteHotpot = createAction('delete_hotpot') 
export const dUpdateAllHotpot = createAction('update_all_hotpot')

import getPathOfHotSpotIconPath from '../native/getHotspotIconPath'
import Hashid from '../utils/generateHashId'

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

export function addHotpot() {
    return (dispatch,getState) => {
        var krpano = getState().krpano.obj
        var selectSceneId = getState().scene.sceneSelected
        if(krpano && selectSceneId != -10){

            const _id = `hs${new Hashid().encode()}`
            const ath = krpano.get('view.hlookat')
            const atv = krpano.get('view.vlookat')
            const icon = getPathOfHotSpotIconPath()
            let data = {
                _id,
                ath,
                atv,
                icon,
                animated: true,
                type: undefined,
                typeProps: '',
                action:''
            }
            
            Modals.Hotpot.add({...data,sceneId:selectSceneId,id:data._id})
            .then(()=>{
                return Modals.Hotpot.findAll()
            })
            .then((list)=>{
                dispatch(updateAllHotpot(list))
                addHotspotToKrpano(krpano,data,true)
            })
        }
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
