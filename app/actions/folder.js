import { createAction } from 'redux-act'
import Modals from '../modals';
import { updateVrByFolderId } from './vr'
import Hashid from '../utils/generateHashId'

export const dUpdateAllFolder = createAction('update_all_folder')
export const dUpdateFolderSelected = createAction('update_selected_folder')

const baseList = [{ id: 0, title: '默认文件夹' }];

export function updateFolderFromLocal() {
    return (dispatch) => {
        Modals.Folder.findAll()
            .then((list) => {
                dispatch(dUpdateAllFolder(baseList.concat(list)));
                dispatch(updateVrByFolderId(0))
            });
    };
}

export function updateFolderSelected(id) {
    return (dispatch) => {
        dispatch(dUpdateFolderSelected(id))
        dispatch(updateVrByFolderId(id))
    }
}

export function addFolder(title) {
    return (dispatch) => {
        Modals.Folder.add({ title: title, id: `f_${new Hashid().encode()}` })
            .then(() => Modals.Folder.findAll())
            .then((list) => {
                dispatch(dUpdateAllFolder(baseList.concat(list)));
            });
    };
}

export function deleteFolder(obj) {
    return (dispatch, getState) => {
        let selectId = getState().folder.selectId
        Modals.Folder.delete(obj.id)
            .then(() => Modals.Folder.findAll())
            .then((list) => {
                dispatch(dUpdateAllFolder(baseList.concat(list)));
                if (selectId == obj.id) {
                    dispatch(dUpdateFolderSelected(0))
                }
            });
    };
}

export function updateFolder(obj) {
    return (dispatch) => {
        Modals.Folder.update(obj)
            .then(() => Modals.Folder.findAll())
            .then((list) => {
                dispatch(dUpdateAllFolder(baseList.concat(list)));
            });
    };
}
