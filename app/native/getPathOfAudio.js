import getSceneServerPath from './getSceneServerPath'

const nativeRequire = window.native_require
const path = nativeRequire('path')


export default function getPathOfImg(isTmp,name){
    if(isTmp){
        return `http://127.0.0.1:${window.electron_app_server_port}/assets/audioTmp/${name}`
    } else {
        return `http://127.0.0.1:${window.electron_app_server_port}/assets/audio/${name}`
    }
}