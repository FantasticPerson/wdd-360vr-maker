import { createAction } from 'redux-act'

export const dUpdateAppTitle = createAction('app_update_title')
export const dUpdataAppShowBack = createAction('app_update_show_back')


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