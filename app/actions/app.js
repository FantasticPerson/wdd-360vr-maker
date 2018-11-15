import { createAction } from 'redux-act'

export const dUpdateAppTitle = createAction('app_update_app_title')
export const dUpdataAppShowBack = createAction('app_update_app_show_back')
export const dUpdateAppShowType = createAction('app_update_app_show_type')

export const APP_SHOW_TYPE_VR = 1
export const APP_SHOW_TYPE_PIC = 2
export const APP_SHOW_TYPE_AUDIO = 3


export function updateAppTitle(title){
    return (dispatch)=>{
        dispatch(dUpdateAppTitle(title))
    }
}

export function updateAppShowBack(bool){
    return (dispatch)=>{
        dispatch(dUpdataAppShowBack(bool))
    }
}

export function updateAppShowType(type){
    return dispatch=>{
        dispatch(dUpdateAppShowType(type))
    }
}