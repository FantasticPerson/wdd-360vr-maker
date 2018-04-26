export default function getSceneServerPath(folderId,vrId,sceneId){
    return `http://127.0.0.1:${window.electron_app_server_port}/assets/vr/folder_${folderId}_vr_${vrId}/scene_${sceneId}`
}