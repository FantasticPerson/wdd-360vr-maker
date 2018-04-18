export const action_consts = {
    ADD_VR:'add_vr',
    DEL_VR:'del_vr',
    MODIFY_VR:'modify_vr',
    UPDATE_ALL:'update_all_vr'
}

export function updateAllVr(arr){
    return {
        type:action_consts.UPDATE_ALL,
        context:arr
    }
}

export function addVr(vrObj){
    return {
        type:action_consts.ADD_VR,
        context:vrObj
    }
}

export function delVr(vrObj){
    return {
        type:action_consts.DEL_VR,
        context:vrObj
    }
}

export function modifyVr(vrObj){
    return {
        type:action_consts.MODIFY_VR,
        context:vrObj
    }
}