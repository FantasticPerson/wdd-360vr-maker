import {createAction} from 'redux-act'
import Modals from '../modals'

export const dUpdateAllPicture = createAction('update_all_picture')

export function updateAllPicture(arr){
    return (dispatch)=>{
        arr.sort((item1,item2)=>{
            return item1.timestamp - item2.timestamp
        })
        dispatch(dUpdateAllPicture(arr))
    }
}

export function addPicture(obj){
    return (dispatch)=>{
        Modals.Picture.add(obj)
        .then(()=>{
            return Modals.Picture.findAll()
        })
        .then((arr)=>{
            dispatch(updateAllPicture(arr))
        })
    }
}

export function updatePictureFromLocal(){
    return (dispatch)=>{
        Modals.Picture.findAll()
        .then((arr)=>{
            dispatch(updateAllPicture(arr))
        })
    }
}