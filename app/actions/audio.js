import { createAction } from 'redux-act'
import Modals from '../modals'

export const dUpdateAllAudio = createAction('update_all_audio')

export function updateAllAudio(arr){
    return (dispatch)=>{
        dispatch(dUpdateAllAudio(arr))
    }
}

export function addAudio(obj){
    return (dispatch)=>{
        Modals.Audio.add(obj)
        .then(()=>{
            return Modals.Audio.findAll()
        })
        .then((arr)=>{
            dispatch(updateAllAudio(arr))
        })
    }
}

export function updateAudioFromLocal(){
    return (dispatch)=>{
        Modals.Audio.findAll()
        .then((arr)=>{
            dispatch(updateAllAudio(arr))
        })
    }
}