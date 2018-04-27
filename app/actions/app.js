export const action_consts = {
    APP_UPDATE_TITLE : 'app_update_title',
    APP_UPDATE_SHOW_BACK : 'app_update_show_back'
};

export function updateAppTitle(title){
    return (dispatch)=>{
        dispatch({
            type:action_consts.APP_UPDATE_TITLE,
            context:title
        })
    }
}

export function updateAppShowBack(bool){
    return (dispatch)=>{
        dispatch({
            type:action_consts.APP_UPDATE_SHOW_BACK,
            context:bool
        })
    }
}