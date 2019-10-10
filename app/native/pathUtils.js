const nativeRequire = window.native_require
const path = nativeRequire('path')
const os = require('os')
const rootVrPath = window.electron_app_vr_path
const tmpPath = window.electron_app_tmp_path
const cPTmep = window.electron_app_cpano_path

export function getScenePath(sceneId) {
    return path.resolve(rootVrPath, `./s_${sceneId}`)
}

export function getHeadImgUrl(sceneId) {
    return path.resolve(rootVrPath, `./s_${sceneId}/thumb.jpg`)
}

export function getPreviewPath() {
    return path.resolve(tmpPath, './thumb.jpg')
}

export function getTmpImagePath(name) {
    return path.resolve(window.electron_app_pic_tmp, `./${name}`)
}

export function getPanoTool() {
    let toolPath = path.resolve(window.electron_app_root_path, window.NODE_ENV == 'prod' ? './tools/krpano-1.19' : '../tools/krpano-1.19')

    const platform = os.platform()
    const arch = os.arch()

    if (platform === 'darwin') {
        return path.resolve(toolPath, './pano_tool_mac')
    } else if (platform === 'win32') {
        if (arch === 'ia32') {
            return path.resolve(toolPath, './krpanotools32.exe')
        } else {
            return path.resolve(toolPath, './krpanotools64.exe')
        }
    } else {
        return null
    }
}

export function getTmpPreviewPath() {
    return path.resolve(cPTmep, './origin_preview.jpg')
}

export function getImagePath(name) {
    return path.resolve(window.electron_app_pic_path, './' + name)
}

export function getAudioPath(name) {
    return path.resolve(window.electron_app_audio_path, './' + name)
}

export function getPreviewUrl(id) {
    return `http://127.0.0.1:${window.electron_app_server_port}/assets/output/vr-${id}/index.html`
}

export function getHotspotIconPath(id) {
    const krpPath = window.electron_app_krp_assets_path
    let iconPath = path.resolve(krpPath, `./hotspotIcons/new_spotd${id}.png`)

    if (window.NODE_ENV == 'prod') {
        let appRootPath = window.electron_app_root_path
        iconPath = path.resolve(appRootPath, `./app.asar/krp/hotspotIcons/new_spotd${id}.png`)
    }

    return iconPath
}

export function getHotspotPath(icon){
    const krpPath = window.electron_app_krp_assets_path
    let iconRes = String(icon).length == 1 ? 0+''+icon : String(icon)
    if(window.NODE_ENV == 'dev'){
        return path.resolve(krpPath,`./hotspotIcons/new_spotd${iconRes}_gif.png`)
    } else {
        let appRootPath = window.electron_app_root_path
        return path.resolve(appRootPath,`./app.asar/krp/hotspotIcons/new_spotd${iconRes}_gif.png`)
    }
}