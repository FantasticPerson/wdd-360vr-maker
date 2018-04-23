import Modals from '../modals';

export const action_consts = {
    ADD_VR: 'add_vr',
    DEL_VR: 'del_vr',
    MODIFY_VR: 'modify_vr',
    UPDATE_ALL: 'update_all_vr'
};

export function updateAllVr(arr) {
    return {
        type: action_consts.UPDATE_ALL,
        context: arr
    };
}

export function updateVrFromLocal(){
    return (dispatch)=>{
        Modals.Vr.findAll()
        .then((list)=>{
            dispatch(updateAllVr(list))
        })
    }
}

export function addVr(vrObj) {
    return (dispatch) => {
        Modals.Vr.add(vrObj)
            .then(() => Modals.Vr.findAll())
            .then((list) => {
                dispatch(updateAllVr(list));
            });
    };
}

export function delVr(vrObj) {
    return (dispatch) => {
        Modals.vr.delVr(vrObj.id)
            .then(() => Modals.Vr.findAll())
            .then((list) => {
                dispatch(updateAllVr(list));
            });
    };
}

export function modifyVr(vrObj) {
    return (dispatch) => {
        Modals.Vr.update(vrObj)
            .then(() => Modals.Vr.findAll())
            .then((list) => {
                dispatch(updateAllVr(list));
            });
    };
}
