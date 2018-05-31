import Modals from '../modals';
import { createAction } from 'redux-act'
import {addHotspotToKrpano} from '../utils/krpanoFunctions'
import Hashid from '../utils/generateHashId'
import getPathOfHotSpotIconPath from '../native/getHotspotIconPath'
import getPathOfSceneHeadImg from '../native/getPathOfSceneHeadImg'
import getScenePath from '../native/getScenePath'
import {getPanoXml} from '../utils/xmlBuilder'

export const updateAllScene = createAction('update_all_scene')
export const dUpdateSceneSelected = createAction('update_scene_selected')

export function updateSceneSelected(id,vrId,folderId){
    return (dispatch,getState)=>{
        let krpano = getState().krpano.obj
        if(krpano){
            // const _id = `hs${new Hashid().encode()}`
            // const ath = krpano.get('view.hlookat')
            // const atv = krpano.get('view.vlookat')
            // const icon = getPathOfHotSpotIconPath()
            // let data = {
            //     _id,
            //     ath,
            //     atv,
            //     icon,
            //     animated: true,
            //     type: undefined,
            //     typeProps: {},
            // }
            // addHotspotToKrpano(krpano, data, true)

            let scenePath = getScenePath(folderId,vrId,id)
            if(krpano){
                const xml = getPanoXml({
                    scenePath:scenePath
                })
                krpano.call(`load_pano_by_multils(${xml})`)
                // this.krpano.call('show_view_frame();')
            }
            dispatch(dUpdateSceneSelected(id))
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
