import Modals from '../modals';

export const action_consts = {
    ADD_HOTPOT: 'add_hotpot',
    DEL_HOTPOT: 'delete_hotpot',
    MODIFY_HOTPOT: 'modify_hotpot',
    UPDATE_ALL_HOTPOT: 'update_all_hotpot'
};

export function updateAllHotpot(arr) {
    return {
        type: action_consts.UPDATE_ALL_HOTPOT,
        context: arr
    };
}

export function updateAllHotpotFromLocal(){
    return (dispatch)=>{
        Modals.Hotpot.findAll()
        .then((list)=>{
            dispatch(updateAllHotpot(list))
        })
    }
}

export function addHotpot(obj) {
    return (dispatch) => {
        Modals.Hotpot.add(obj)
        .then(()=>{
            return Modals.Hotpot.findAll()
        })
        .then((list)=>{
            dispatch(updateAllHotpot(list))
        })
    }
}

export function delHotpot(obj) {
    return (dispatch)=>{
        Modals.Hotpot.delete(obj.id)
        .then(()=>{
            return Modals.Hotpot.findAll()
        })
        .then((list)=>{
            dispatch(updateAllHotpot(list))
        })
    }
}

export function modifyHotpot(obj) {
    return (dispatch)=>{
        Modals.Hotpot.update(obj)
        .then(()=>{
            return Modals.Hotpot.findAll()
        })
        .then((list)=>{
            dispatch(updateAllHotpot (list))
        })
    }
}
