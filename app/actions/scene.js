import Modals from '../modals';
import { createAction } from 'redux-act'

// export const action_consts = {
//     ADD_SCENE: 'add_scene',
//     DEL_SCENE: 'delete_scene',
//     MODIFY_SCENE: 'modify_scene',
//     UPDATE_ALL: 'update_all'
// };

export const updateAllScene = createAction('update_all_scene')

// export function updateAllScene(arr) {
//     return {
//         type: action_consts.UPDATE_ALL,
//         context: arr
//     };
// }

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
