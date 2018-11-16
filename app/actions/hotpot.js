import { createAction } from 'redux-act'

import Modals from '../modals';
import { addHotspotToKrpano, selectHotspotInKrpano, removeHotspotFromKrpano, updateHotspotIcon } from '../utils/krpanoFunctions'
import { getHotspotPath } from '../native/pathUtils'
import Hashid from '../utils/generateHashId'

export const dAddHotpot = createAction('add_hotpot')
export const dDeleteHotpot = createAction('delete_hotpot')
export const dUpdateAllHotpot = createAction('update_all_hotpot')
export const dUpdateHotpotSelect = createAction('update_hotpot_select')

export function updateAllHotpot(arr) {
    return (dispatch) => {
        arr.sort((item1, item2) => {
            return item1.timestamp > item2.timestamp
        })
        dispatch(dUpdateAllHotpot(arr))
    }
}

export function updateAllHotpot2() {
    return (dispatch, getState) => {
        let selectSceneId = getState().scene.sceneSelected
        Modals.Hotpot.findBySceneId(selectSceneId)
            .then(list => {
                dispatch(updateAllHotpot(list))
            })

    }
}

export function updateAllHotspot() {
    return (dispatch, getState) => {
        let selectSceneId = getState().scene.sceneSelected
        Modals.Hotpot.findBySceneId(selectSceneId)
            .then(list => {
                arr.sort((item1, item2) => {
                    return item1.timestamp > item2.timestamp
                })
                dispatch(dUpdateAllHotpot(arr))
            })

    }
}

export function updateHotspotSelect(id) {
    return (dispatch, getState) => {
        var krpano = getState().krpano.obj
        if (krpano) {
            selectHotspotInKrpano(krpano, id)
            dispatch(dUpdateHotpotSelect(id))
        }
    }
}

export function updateAllHotpotFromLocal() {
    return (dispatch) => {
        Modals.Hotpot.findAll()
            .then((list) => {
                dispatch(updateAllHotspot(list))
            })
    }
}


export function updateHotspotPosition(obj) {
    return (dispath, getState) => {
        Modals.Hotpot.update(obj)
            .then(() => {
                dispath(updateAllHotspot())
            })
    }
}
export function updateHotpotPos(obj) {
    return (dispatch) => {
        Modals.Hotpot.update(obj)
            .then(() => {
                return Modals.Hotpot.findAll()
            })
            .then((list) => {
                dispatch(updateAllHotpot(list))
            })
    }
}

export function addHotspots() {
    return (dispatch, getState) => {
        let krpano = getState().krpano.obj
        let hotSpots = getState().hotpot.list
        if (krpano && hotSpots.length) {
            let sceneSelected = getState().scene.sceneSelected
            let hSpots = hotSpots.filter((item) => {
                return item.sceneId == sceneSelected
            })
            hSpots.map(item => {
                var data = hSpots[i]
                data._id = data.id
                let icon = getHotspotPath(data.icon)
                addHotspotToKrpano(krpano, { ...data, icon: icon }, false)
            })
        }
    }
}

export function addHotpots() {
    return (dispatch, getState) => {
        let krpano = getState().krpano.obj
        let hotSpots = getState().hotpot.list
        if (krpano && hotSpots.length) {
            let sceneSelected = getState().scene.sceneSelected
            let hSpots = []
            for (let i = 0; i < hotSpots.length; i++) {
                if (hotSpots[i].sceneId == sceneSelected) {
                    hSpots.push(hotSpots[i])
                }
            }
            if (hSpots.length) {
                for (let i = 0; i < hSpots.length; i++) {
                    var data = hSpots[i]
                    data._id = data.id
                    let icon = getHotspotPath(data.icon)
                    addHotspotToKrpano(krpano, { ...data, icon: icon }, false)
                }
            }
        }
    }
}

export function addHotspot(actionData, icon) {
    return (dispatch, getState) => {
        var krpano = getState().krpano.obj
        var selectSceneId = getState().scene.sceneSelected
        if (krpano && selectSceneId != -10) {
            const _id = `hs${new Hashid().encode()}`
            const ath = krpano.get('view.hlookat')
            const atv = krpano.get('view.vlookat')
            let data = {
                _id,
                ath,
                atv,
                icon: icon,
                animated: true,
                type: undefined,
                typeProps: '',
                action: actionData
            }

            Modals.Hotpot.add({ ...data, sceneId: selectSceneId, id: data._id })
                .then(() => {
                    return Modals.Hotpot.findBySceneId(selectSceneId)
                })
                .then((list) => {
                    let icon = getHotspotPath(data.icon)
                    dispatch(updateAllHotpot(list))

                    addHotspotToKrpano(krpano, { ...data, icon: icon }, false)
                    updateHotspotSelect(data.id)
                })
        }
    }
}

export function addHotpot(actionData, icon) {
    return (dispatch, getState) => {
        var krpano = getState().krpano.obj
        var selectSceneId = getState().scene.sceneSelected
        if (krpano && selectSceneId != -10) {
            const _id = `hs${new Hashid().encode()}`
            const ath = krpano.get('view.hlookat')
            const atv = krpano.get('view.vlookat')
            let data = {
                _id,
                ath,
                atv,
                icon: icon,
                animated: true,
                type: undefined,
                typeProps: '',
                action: actionData
            }

            Modals.Hotpot.add({ ...data, sceneId: selectSceneId, id: data._id })
                .then(() => {
                    return Modals.Hotpot.findBySceneId(selectSceneId)
                })
                .then((list) => {
                    let icon = getHotspotPath(data.icon)
                    dispatch(updateAllHotpot(list))

                    addHotspotToKrpano(krpano, { ...data, icon: icon }, false)
                    updateHotspotSelect(data.id)
                })
        }
    }
}

export function delHotspot(id) {
    return (dispatch, getState) => {
        var krpano = getState().krpano.obj
        var selectSceneId = getState().scene.sceneSelected
        if (krpano) {
            Modals.Hotpot.delete(id)
                .then(() => {
                    return Modals.Hotpot.findBySceneId(selectSceneId)
                })
                .then((list) => {
                    dispatch(updateAllHotpot(list))

                    removeHotspotFromKrpano(krpano, id)
                })
        }
    }
}

export function delHotpot(id) {
    return (dispatch, getState) => {
        var krpano = getState().krpano.obj
        var selectSceneId = getState().scene.sceneSelected
        if (krpano) {
            Modals.Hotpot.delete(id)
                .then(() => {
                    return Modals.Hotpot.findBySceneId(selectSceneId)
                })
                .then((list) => {
                    dispatch(updateAllHotpot(list))

                    removeHotspotFromKrpano(krpano, id)
                })
        }
    }
}

export function modifyHotspot(obj, updateIcon) {
    return (dispatch, getState) => {
        var krpano = getState().krpano.obj
        var selectSceneId = getState().scene.sceneSelected
        if (krpano) {
            Modals.Hotpot.update(obj)
                .then(() => {
                    return Modals.Hotpot.findBySceneId(selectSceneId)
                })
                .then((list) => {
                    let icon = getHotspotPath(obj.icon)
                    dispatch(updateAllHotpot(list))

                    updateHotspotIcon(krpano, obj.id, icon, true)
                })
        }
    }
}

export function modifyHotpot(obj, updateIcon) {
    return (dispatch, getState) => {
        var krpano = getState().krpano.obj
        var selectSceneId = getState().scene.sceneSelected
        if (krpano) {
            Modals.Hotpot.update(obj)
                .then(() => {
                    return Modals.Hotpot.findBySceneId(selectSceneId)
                })
                .then((list) => {
                    let icon = getHotspotPath(obj.icon)
                    dispatch(updateAllHotpot(list))

                    updateHotspotIcon(krpano, obj.id, icon, true)
                })
        }
    }
}
