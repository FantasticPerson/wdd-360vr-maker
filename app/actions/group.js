import Modals from '../modals'

export const action_consts = {
    ADD_GROUP:'add_group',
    DELETE_GROUP:'delete_group',
    MODIFY_GROUP:'modify_group',
    UPDATE_ALL_GROUP:'update_all_group'
}

export function updateAllGroup(arr){
    return {
        type:action_consts.UPDATE_ALL_GROUP,
        context:arr
    }
}

export function findAddGroup(){
    return (dispatch)=>{
        Modals.Group.findAll()
        .then((list)=>{
            dispatch(updateAllGroup(list))
        })
    }
}

export function addGroup(obj){
    return (dispatch)=>{
        Modals.Group.add(obj)
        .then(()=>{
            return Modals.Scene.findAll()
        })
        .then((list)=>{
            dispatch(updateAllGroup(list))
        })
    }
}

export function delGroup(obj){
    return (dispatch)=>{
        Modals.Group.delete(obj.id)
        .then(()=>{
            return Modals.Group.findAll()
        })
        .then((list)=>{
            dispatch(updateAllGroup(list))
        })
    }
}

export function modifyGroup(obj){
    return (dispatch)=>{
        Modals.Group.update(obj)
        .then(()=>{
            return Modals.Group.findAll()
        })
        .then((list)=>{
            dispatch(updateAllGroup(list))
        })
    }
}