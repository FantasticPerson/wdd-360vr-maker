import { createAction } from 'redux-act'

import Modals from '../modals';
import {addHotspotToKrpano,selectHotspotInKrpano,removeHotspotFromKrpano,updateHotspotIcon} from '../utils/krpanoFunctions'
import getPathOfHotSpotIconPath from '../native/getHotspotIconPath'
import Hashid from '../utils/generateHashId'

export const dAddHotpot = createAction('add_hotpot')
export const dDeleteHotpot = createAction('delete_hotpot') 
export const dUpdateAllHotpot = createAction('update_all_hotpot')
export const dUpdateHotpotSelect = createAction('update_hotpot_select')

export function updateAllHotpot(arr) {
    return (dispatch)=>{
        dispatch(dUpdateAllHotpot(arr))
    }
}

export function updateHotspotSelect(id){
    return (dispatch,getState)=>{
        var krpano = getState().krpano.obj
        if(krpano){
            selectHotspotInKrpano(krpano,id)
            dispatch(dUpdateHotpotSelect(id))
        }
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

export function updateHotpotPos(obj){
    return (dispatch)=>{
        Modals.Hotpot.update(obj)
        .then(()=>{
            return Modals.Hotpot.findAll()
        })
        .then((list)=>{
            dispatch(updateAllHotpot(list))
        })
    }
}

export function addHotpots(){
    return (dispatch,getState)=>{
        var krpano = getState().krpano.obj
        var hotSpots = getState().hotpot.list
        if(krpano && hotSpots.length){
            var sceneSelected = getState().scene.sceneSelected
            var hSpots = []
            for(let i=0;i<hotSpots.length;i++){
                if(hotSpots[i].sceneId == sceneSelected){
                    hSpots.push(hotSpots[i])
                }
            }
            if(hSpots.length){
                for(let i = 0;i<hotSpots.length;i++){
                    var data = hotSpots[i]
                    data._id = data.id
                    let icon = getPathOfHotSpotIconPath(data.icon)
                    addHotspotToKrpano(krpano,{...data,icon:icon},false)
                }
            }
        }
    }
}

export function addHotpot(actionData,icon) {
    return (dispatch,getState) => {
        var krpano = getState().krpano.obj
        var selectSceneId = getState().scene.sceneSelected
        if(krpano && selectSceneId != -10){
            const _id = `hs${new Hashid().encode()}`
            const ath = krpano.get('view.hlookat')
            const atv = krpano.get('view.vlookat')
            // const icon = getPathOfHotSpotIconPath()
            let data = {
                _id,
                ath,
                atv,
                icon:icon,
                animated: true,
                type: undefined,
                typeProps: '',
                action:actionData
            }
            
            Modals.Hotpot.add({...data,sceneId:selectSceneId,id:data._id})
            .then(()=>{
                return Modals.Hotpot.findAll()
            })
            .then((list)=>{
                let icon = getPathOfHotSpotIconPath(data.icon)
                addHotspotToKrpano(krpano,{...data,icon:icon},false)
                dispatch(updateAllHotpot(list))
                updateHotspotSelect(data.id)
            })
        }
    }
}

export function delHotpot(id) {
    return (dispatch,getState)=>{
        var krpano = getState().krpano.obj
            if(krpano){
            Modals.Hotpot.delete(id)
            .then(()=>{
                return Modals.Hotpot.findAll()
            })
            .then((list)=>{
                dispatch(updateAllHotpot(list))
                removeHotspotFromKrpano(krpano,id)
            })
        }
    }
}

export function modifyHotpot(obj,updateIcon) {
    return (dispatch,getState)=>{
        var krpano = getState().krpano.obj
        if(krpano){
            Modals.Hotpot.update(obj)
            .then(()=>{
                return Modals.Hotpot.findAll()
            })
            .then((list)=>{
                let icon = getPathOfHotSpotIconPath(obj.icon)
                // addHotspotToKrpano(krpano,{...data,icon:icon},false)
                updateHotspotIcon(krpano,obj.id,icon,true)
                dispatch(updateAllHotpot (list))
            })
        }
    }
}
