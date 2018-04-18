export const action_consts = {
    ADD_SCENE:'add_scene',
    DEL_SCENE:'delete_scene',
    MODIFY_SCENE:'modify_scene',
    UPDATE_ALL:'update_all'
}

export function updateAllScene(arr){
    return {
        type:action_consts.UPDATE_ALL,
        context:arr
    }
}

export function addScene(obj){
    return {
        type:action_consts.ADD_SCENE,
        context:obj
    }
}

export function delScene(obj){
    return {
        type:action_consts.DEL_SCENE,
        context:obj
    }
}

export function modifyScene(obj){
    return {
        type:action_consts.MODIFY_SCENE,
        context:obj
    }
}