import getSceneServerPath from './getSceneServerPath'

const nativeRequire = window.native_require
const path = nativeRequire('path')


export default function getPathOfPreviewImg(isTmp,vrId){
    if(isTmp){
        return `http://127.0.0.1:${window.electron_app_server_port}/assets/tmp/thumb.jpg`
    } else {
        return ''
    }
}