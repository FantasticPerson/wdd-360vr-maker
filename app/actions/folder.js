import Modals from '../modals';
import { createAction } from 'redux-act'

const baseList =  [{
    id: 0,
    title: '默认文件夹'
}];

export const updateAllFolder = createAction('update_all_folder')
export const updateSelectedFolder = createAction('update_selected_folder')

export function updateSelected(id){
    return (dispatch) => {
        dispatch(updateSelectedFolder(id))
    }
}

export function updateFromLocal() {
    return (dispatch) => {
        Modals.Folder.findAll()
            .then((list) => {
                dispatch(updateAllFolder(baseList.concat(list)));
            });
    };
}

export function addFolder(obj) {
    return (dispatch) => {
        Modals.Folder.add(obj)
            .then(() => Modals.Folder.findAll())
            .then((list) => {
                dispatch(updateAllFolder(baseList.concat(list)));
            });
    };
}

export function deleteFolder(obj) {
    return (dispatch) => {
        Modals.Folder.delete(obj.id)
            .then(() => Modals.Folder.findAll())
            .then((list) => {
                dispatch(updateAllFolder(baseList.concat(list)));
            });
    };
}

export function updateFolder(obj) {
    return (dispatch) => {
        Modals.Folder.update(obj)
            .then(() => Modals.Folder.findAll())
            .then((list) => {
                dispatch(updateAllFolder(baseList.concat(list)));
            });
    };
}
