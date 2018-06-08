import { createAction } from 'redux-act'
import {addRainEffect,addSnowEffect} from '../utils/krpanoFunctions'

export const dUpdateKrpano = createAction('update_krpano')

export function updateKrpano(krpano){
    return (dispatch) => {
        dispatch(dUpdateKrpano(krpano))
    }
} 

export function AddEffect(type,level){
    return (dispatch,getState) => {
        var krpano = getState().krpano.obj
        if(krpano){
            if(type == 'rain'){
                addRainEffect(krpano,level)
            } else if(type == 'snow'){
                addSnowEffect(krpano,level)
            }
        }
    }
}