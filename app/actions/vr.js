import { createAction } from 'redux-act'
import Modals from '../modals'
import Hashid from '../utils/generateHashId'
import * as VrStateConstants from '../constants/vrState'

export const updateAllVr = createAction('update_all_vr')

export function updateAllDVr(list) {
    return (dispatch) => {
        list.sort((item1, item2) => {
            return item1.timestamp > item2.timestamp
        })
        dispatch(updateAllVr(list))
    }
}

export function updateVrByFolderId() {
    return (dispatch,getState) => {
        let id = getState().folder.selectId
        Modals.Vr.findVrByFolderId(id)
            .then((list) => {
                list.sort((item1, item2) => {
                    return item1.timestamp > item2.timestamp
                })
                dispatch(updateAllVr(list))
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
                .then(() => Modals.Vr.findAll())
                .then((list) => {
                    dispatch(updateVrByFolderId(list));
                });
        }
    }
}

export function addVr(vrObj) {
    return (dispatch, getState) => {
        let selectFolderId = getState().folder.selectId
        Modals.Vr.add({ ...vrObj, folderId: selectFolderId, state: VrStateConstants.VR_STATE_UNSAVED })
            .then(() => Modals.Vr.findAll())
            .then((list) => {
                dispatch(updateVrByFolderId(list));
            });
    };
}

export function delVr(vrObj) {
    return (dispatch) => {
        Modals.Vr.delete(vrObj.id)
            .then(() => Modals.Vr.findAll())
            .then((list) => {
                dispatch(updateVrByFolderId(list));
            });
    };
}

export function modifyVr(vrObj) {
    return (dispatch) => {
        Modals.Vr.update({ ...vrObj, state: VrStateConstants.VR_STATE_SAVED })
            .then(() => Modals.Vr.findAll())
            .then((list) => {
                dispatch(updateVrByFolderId(list));
            });
    };
}
