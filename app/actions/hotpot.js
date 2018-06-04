import { createAction } from 'redux-act'

import Modals from '../modals';
import {addHotspotToKrpano,selectHotspotInKrpano,removeHotspotFromKrpano} from '../utils/krpanoFunctions'
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

export function addHotpots(){
    return (dispatch,getState)=>{
        console.log('addHotpots')
        var krpano = getState().krpano.obj
        var hotSpots = getState().hotpot.list
        console.log(hotSpots)
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
                    addHotspotToKrpano(krpano,data,false)
                }
            }
        }
    }
}

export function addHotpot(actionData) {
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
                action:JSON.stringify(actionData)
            }
            
            Modals.Hotpot.add({...data,sceneId:selectSceneId,id:data._id})
            .then(()=>{
                return Modals.Hotpot.findAll()
            })
            .then((list)=>{
                addHotspotToKrpano(krpano,data,false)
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
