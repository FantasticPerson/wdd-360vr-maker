import { createAction } from 'redux-act'
import Modals from '../modals'
import Hashid from '../utils/generateHashId'
import * as VrStateConstants from '../constants/vrState'

export const dUpdateAllVr = createAction('update_all_vr')

export function updateVrByFolderId(fId = null) {
    return (dispatch, getState) => {
        let id = fId == null ? getState().folder.selectId : fId
        Modals.Vr.findByFolderId(id)
            .then((list) => {
                list.sort((item1, item2) => (item1.timestamp > item2.timestamp))
                dispatch(dUpdateAllVr(list))
            })
    }
}

export function addMusic(vrId, music1, music2) {
    return (dispatch, getState) => {
        let vrItem = getState().vr.list.find(item => item.id == vrId)
        if (vrItem) {
            vrItem.music1 = music1
            vrItem.music2 = music2
            Modals.Vr.update({ ...vrItem, state: VrStateConstants.VR_STATE_UNSAVED })
                .then(() => {
                    dispatch(updateVrByFolderId())
                })
        }
    }
}

export function addVr(vrObj) {
    return (dispatch, getState) => {
        let selectFolderId = getState().folder.selectId
        Modals.Vr.add({ ...vrObj, folderId: selectFolderId, state: VrStateConstants.VR_STATE_UNSAVED })
            .then(() => {
                dispatch(updateVrByFolderId())
            })
    };
}

export function delVr(vrObj) {
    return (dispatch) => {
        Modals.Vr.delete(vrObj.id)
            .then(() => {
                dispatch(updateVrByFolderId())
            })
    };
}

export function modifyVr(vrObj) {
    return (dispatch) => {
        Modals.Vr.update({ ...vrObj, state: VrStateConstants.VR_STATE_SAVED })
            .then(() => {
                dispatch(updateVrByFolderId())
            })
    };
}
