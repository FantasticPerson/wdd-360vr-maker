const nativeRequire = window.native_require
const path = nativeRequire('path')
const rootVrPath = window.electron_app_vr_path
export default function getScenePath(folderId,vrId,sceneId){
    return path.resolve(rootVrPath,`./folder_${folderId}_vr_${vrId}/scene_${sceneId}`)
}