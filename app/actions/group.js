import { createAction } from 'redux-act'
import {updateDAllScene} from './scene'

import Modals from '../modals';
import Hashid from '../utils/generateHashId'

export const dUpdateAllGroup = createAction('update_all_group')
export const dUpdateSelectedGroup = createAction('update_selected_group')

export function updateGroupSelected(id) {
    return (dispatch) => {
        dispatch(dUpdateSelectedGroup(id))
        dispatch(updateDAllScene(id))
    }
}

export function updateGroupByVrid(vrId = null) {
    return (dispatch, getState) => {
        let selectedVrId = vrId == null ? getState().router.location.pathname.split('/')[2] : vrId
        if (selectedVrId) {
            Modals.Group.findByVrid(selectedVrId)
                .then((list) => {
                    dispatch(dUpdateAllGroup(list));
                })
        }
    }
}

export function addGroup(title, vrId, groupId) {
    return (dispatch) => {
        Modals.Group.add({ title: title, id: groupId, vrId: vrId })
            .then(() => {
                dispatch(updateGroupByVrid())
            })
    };
}

export function deleteGroup(obj) {
    return (dispatch, getState) => {
        Modals.Group.delete(obj.id)
            .then(() => {
                dispatch(updateGroupByVrid())
            })
    };
}

export function updateAllGroupMusic(arr, music1, music2) {
    let objArr = arr.map(item => {
        return { ...item, music1, music2 }
    })
    return (dispatch) => {
        Modals.Group.updateAllGroup(objArr)
            .then(() => {
                dispatch(updateGroupByVrid())
            })
    }
}

export function updateGroupMusic(obj, music1, music2) {
    return (dispatch) => {
        Modals.Group.update({ ...obj, music1, music2 })
            .then(() => {
                dispatch(updateGroupByVrid())
            })
    }
}

export function updateGroup(obj) {
    return (dispatch) => {
        Modals.Group.update(obj)
            .then(() => {
                dispatch(updateGroupByVrid())
            })
    };
}
