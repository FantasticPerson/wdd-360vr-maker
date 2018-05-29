import { createAction } from 'redux-act'

export const dUpdateKrpano = createAction('update_krpano')

export function updateKrpano(krpano){
    return (dispatch) => {
        dispatch(dUpdateKrpano(krpano))
    }
} 