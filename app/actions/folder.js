import Modals from '../modals';

export const action_consts = {
    ADD_FOLDER: 'add_folder',
    DELETE_FOLDER: 'delete_folder',
    UPDATE_ALL_FOLDER: 'update_all_folder',
    MODIFY_FOLDER: 'modify_folder',
};

export function updateAllFolder(arr) {
    const baseList = [{
        id: 0,
        title: '默认文件夹'
    }];
    return {
        type: action_consts.UPDATE_ALL_FOLDER,
        context: baseList.concat(arr)
    };
}

export function updateFromLocal() {
    return (dispatch) => {
        Modals.Folder.findAll()
            .then((list) => {
                dispatch(updateAllFolder(list));
            });
    };
}

export function addFolder(obj) {
    return (dispatch) => {
        Modals.Folder.add(obj)
            .then(() => Modals.Folder.findAll())
            .then((list) => {
                dispatch(updateAllFolder(list));
            });
    };
}

export function deleteFolder(obj) {
    return (dispatch) => {
        Modals.Folder.delete(obj.id)
            .then(() => Modals.Folder.findAll())
            .then((list) => {
                dispatch(updateAllFolder(list));
            });
    };
}

export function updateFolder(obj) {
    return (dispatch) => {
        Modals.Folder.update(obj)
            .then(() => Modals.Folder.findAll())
            .then((list) => {
                dispatch(updateAllFolder(list));
            });
    };
}
