import Modals from '../modals';
import { createAction } from 'redux-act'
import {addHotspotToKrpano} from '../utils/krpanoFunctions'
import Hashid from '../utils/generateHashId'
import getPathOfHotSpotIconPath from '../native/getHotspotIconPath'
import getPathOfSceneHeadImg from '../native/getPathOfSceneHeadImg'
import getScenePath from '../native/getScenePath'
import {getPanoXml} from '../utils/xmlBuilder'
import {addHotpots} from './hotpot'

export const updateAllScene = createAction('update_all_scene')
export const dUpdateSceneSelected = createAction('update_scene_selected')

export function updateSceneSelected(id,vrId,folderId){
    return (dispatch,getState)=>{
        let krpano = getState().krpano.obj
        if(krpano){
            let scenePath = getScenePath(folderId,vrId,id)
            if(krpano){
                const xml = getPanoXml({
                    scenePath:scenePath
                })
                krpano.call(`load_pano_by_multils(${xml})`)
            }
            dispatch(dUpdateSceneSelected(id))
            dispatch(addHotpots())
        }
    }
}

export function updateAllSceneFromLocal(){
    return (dispatch)=>{
        Modals.Scene.findAll()
        .then((list)=>{
            dispatch(updateAllScene(list))
        })
    }
}

export function addScene(obj) {
    return (dispatch) => {
        Modals.Scene.add(obj)
        .then(()=>{
            return Modals.Scene.findAll()
        })
        .then((list)=>{
            dispatch(updateAllScene(list))
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
            dispatch(updateAllScene(list))
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
            dispatch(updateAllScene(list))
        })
    }
}
