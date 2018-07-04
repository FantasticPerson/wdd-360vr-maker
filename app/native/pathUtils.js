const nativeRequire = window.native_require
const path = nativeRequire('path')
const os = require('os')
const rootVrPath = window.electron_app_vr_path
const tmpPath = window.electron_app_tmp_path
const cPTmep = window.electron_app_cpano_path

export function getScenePath(sceneId){
    return path.resolve(rootVrPath,`./s_${sceneId}`)
}

export function getHeadImgUrl(sceneId){
    return path.resolve(rootVrPath,`./s_${sceneId}/thumb.jpg`)
}

export function getPreviewPath(){
    return path.resolve(tmpPath,'./thumb.jpg')
}

export function getPanoTool(){
    let toolPath = path.resolve(window.electron_app_root_path, window.NODE_ENV == 'prod' ? './app.asar/tools' : '../tools')

    const platform = os.platform()
    const arch = os.arch()

    if (platform === 'darwin') {
        return path.resolve(toolPath, './pano_tool_mac')
    } else if (platform === 'win32') {
        if (arch === 'ia32') {
            return path.resolve(toolPath, './pano_tool_windows_386.exe')
        } else {
            return path.resolve(toolPath, './pano_tool_windows_amd64.exe')
        }
    } else {
        return null
    }
}

export function getTmpPreviewPath(){
    return path.resolve(cPTmep,'./pano.tiles/thumb.jpg')
}