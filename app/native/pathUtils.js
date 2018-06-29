const nativeRequire = window.native_require
const path = nativeRequire('path')
const rootVrPath = window.electron_app_vr_path
const tmpPath = window.electron_app_tmp_path

export function getScenePath(sceneId){
    return path.resolve(rootVrPath,`./s_${sceneId}`)
}

export function getHeadImgUrl(sceneId){
    return path.resolve(rootVrPath,`./s_${sceneId}/thumb.jpg`)
}

export function getPreviewPath(){
    return path.resolve(tmpPath,'./thumb.jpg')
}