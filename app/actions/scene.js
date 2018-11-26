import Modals from '../modals';
import { createAction } from 'redux-act'
import {addHotspotToKrpano} from '../utils/krpanoFunctions'
import Hashid from '../utils/generateHashId'
import getPathOfHotSpotIconPath from '../native/getHotspotIconPath'
import getPathOfSceneHeadImg from '../native/getPathOfSceneHeadImg'
import {getPanoXml} from '../utils/xmlBuilder'
import {addHotspots} from './hotpot'

import {getScenePath} from '../native/pathUtils'

import {AddSunlight,RemoveSunlight} from './krpano'

export const updateAllScene = createAction('update_all_scene')
export const dUpdateSceneSelected = createAction('update_scene_selected')

export function updateDAllScene(list){
    return (dispatch)=>{
        list.sort((item1,item2)=>{
            return item1.timestamp > item2.timestamp
        })
        dispatch(updateAllScene(list))
    }
}

export function updateSceneSelected(id){
    return (dispatch,getState)=>{
        let krpano = getState().krpano.obj
        if(krpano){
            let scenePath = getScenePath(id)
            if(krpano){
                const xml = getPanoXml({
                    scenePath:scenePath
                })
                krpano.call(`load_pano_by_multils(${xml})`)
            }
            dispatch(dUpdateSceneSelected(id))
            dispatch(addHotspots(id))
        }
    }
}

export function updateInitViewPort(sceneId){
    return (dispatch,getState)=>{
        let krpano = getState().krpano.obj
        let sceneList = getState().scene.list
        let sceneItem = sceneList.find(item=>item.id == sceneId)

        if(krpano && sceneItem){
            var hAov= krpano.get('view.hlookat')
            var vAov= krpano.get('view.vlookat')

            sceneItem.vlookat = vAov
            sceneItem.hlookat = hAov

            Modals.Scene.update(sceneItem)
            .then(()=>{
                return Modals.Scene.findAll()
            })
            .then((list)=>{
                dispatch(updateDAllScene(list))
            })
        }
    }
}

export function updateViewRange(id,fov,fovmax,fovmin,vlookatmin,vlookatmax){
    return (dispatch,getState)=>{
        let sceneList = getState().scene.list
        let sceneItem = sceneList.find(item=>item.id == id)

        if(sceneItem){
            sceneItem.fov = fov
            sceneItem.fovmin = fovmin
            sceneItem.fovmax = fovmax
            sceneItem.vlookatmin = vlookatmin
            sceneItem.vlookatmax = vlookatmax

            Modals.Scene.update(sceneItem)
            .then(()=>{
                return Modals.Scene.findAll()
            })
            .then((list)=>{
                dispatch(updateDAllScene(list))
            })
        }
    }
}

export function updateEffect(id,type,level){
    return (dispatch,getState)=>{
        let sceneList = getState().scene.list
        let sceneItem = sceneList.find(item=>item.id == id)

        if(sceneItem){ 
            sceneItem.effectType = type
            sceneItem.effectLevel = level

            Modals.Scene.update(sceneItem)
            .then(()=>{
                return Modals.Scene.findAll()
            })
            .then((list)=>{
                dispatch(updateDAllScene(list))
            })
        }
    }
}

export function addSunlight(id){
    return (dispatch,getState)=>{
        let sceneList = getState().scene.list
        let sceneItem = sceneList.find(item=>item.id == id)

        var krpano = getState().krpano.obj

        if(sceneItem && krpano){
            const ath = krpano.get('view.hlookat')
            const atv = krpano.get('view.vlookat')

            let newItem = {...sceneItem,sunlight:JSON.stringify({ath,atv})}

            dispatch(AddSunlight({ath,atv}))

            Modals.Scene.add(newItem)
            .then(()=>{
                return Modals.Scene.findAll()
            })
            .then((list)=>{
                dispatch(updateDAllScene(list))
            })
        }
    }
}

export function updateSunlight(id,ath,atv){
    return (dispatch,getState)=>{
        let sceneList = getState().scene.list
        let sceneItem = sceneList.find(item=>item.id == id)

        var krpano = getState().krpano.obj

        if(sceneItem && krpano){
            let newItem = {...sceneItem,sunlight:JSON.stringify({ath,atv})}

            Modals.Scene.update(newItem)
            .then(()=>{
                return Modals.Scene.findAll()
            })
            .then((list)=>{
                dispatch(updateDAllScene(list))
            })
        }
    }
}

export function removeSunlight(id){
    return (dispatch,getState)=>{
        let sceneList = getState().scene.list
        let sceneItem = sceneList.find(item=>item.id == id)

        var krpano = getState().krpano.obj

        if(sceneItem && krpano){
            let newItem = {...sceneItem,sunlight:null}
            dispatch(RemoveSunlight())
            Modals.Scene.update(newItem)
            .then(()=>{
                return Modals.Scene.findAll()
            })
            .then((list)=>{
                dispatch(updateDAllScene(list))
            })
        }
    }
}

export function updateAllSceneFromLocal(){
    return (dispatch)=>{
        Modals.Scene.findAll()
        .then((list)=>{
            dispatch(updateDAllScene(list))
        })
    }
}

export function addScene(obj) {
    let sceneObj = {
        ...obj,fov:75,fovmax:155,fovmin:-5,hlookat:0,vlookat:0,vlookatmax:90,vlookatmin:-90
    }
    return (dispatch) => {
        Modals.Scene.add(sceneObj)
        .then(()=>{
            return Modals.Scene.findAll()
        })
        .then((list)=>{
            dispatch(updateDAllScene(list))
        })
    }
}

export function delScene(obj) {
    return (dispatch)=>{
        Modals.Scene.delete(obj.id)
        .then(()=>{
            return Modals.Scene.findAll()
        })
        .then((list)=>{
            dispatch(updateDAllScene(list))
        })
    }
}

export function modifyScene(obj) {
    return (dispatch)=>{
        Modals.Scene.update(obj)
        .then(()=>{
            return Modals.Scene.findAll()
        })
        .then((list)=>{
            dispatch(updateDAllScene(list))
        })
    }
}

export function updateAllMusic(arr,music1,music2){
    let objArr = arr.map(item=>{
        return {...item,music1,music2}
    })
    return (dispatch)=>{
        Modals.Scene.updateAllScene(objArr)
        .then(()=>{
            return Modals.Scene.findAll()
        })
        .then((list)=>{
            dispatch(updateDAllScene(list))
        })
    }
}

export function updateSceneMusic(obj,music1,music2){
    return (dispatch)=>{
        Modals.Scene.update({...obj,music1,music2})
        .then(()=>{
            return Modals.Scene.findAll()
        })
        .then((list)=>{
            dispatch(updateDAllScene(list))
        })
    }
}
