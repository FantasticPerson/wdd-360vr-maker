export const action_consts = {
    ADD_FOLDER:'add_folder',
    DELETE_FOLDER:'delete_folder',
    UPDATE_ALL_FOLDER:'update_all_folder',
    MODIFY_FOLDER:'modify_folder',
}

import Modals from '../modals'

export function updateAllFolder(arr){
    return {
        type:action_consts.UPDATE_ALL_FOLDER,
        context:arr
    }
}

export function addFolder(obj){
    return (dispatch)=>{
        Modals.Folder.add(obj)
        .then(()=>{
            return Modals.Folder.findAll()
        })
        .then((list)=>{
            dispatch(updateAllFolder(list))
        })
    }
}

export function deleteFolder(obj){
    return (dispatch)=>{
        Modals.Folder.delete(obj.id)
        .then(()=>{
            return Modals.Folder.findAll()
        })
        .then((list)=>{
            dispatch(updateAllFolder(list))
        })
    }
}

export function updateFolder(obj){
    return (dispatch)=>{
        Modals.Folder.update(obj)
        .then(()=>{
            return Modals.Folder.findAll()
        })
        .then((list)=>{
            dispatch(updateAllFolder(list))
        })
    }
}