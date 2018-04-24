const nativeRequire = window.native_require
const rootVrPath = window.electron_app_vr_path
const path = nativeRequire('path')
const fs = nativeRequire('fs')

export default function GenerateVrFolder(folderId,vrId,sceneId){
    return new Promise((resolve,reject)=>{
        try{
            let destVrPath = path.resolve(rootVrPath,`./folder_${folderId}_vr_${vrId}`)
            if(!fs.existsSync(destVrPath)){
                fs.mkdirSync(destVrPath)
            }
            let destScenePath = path.resolve(destVrPath,`./scene_${sceneId}`)
            if(!fs.existsSync(destScenePath)){
                fs.mkdirSync(destScenePath)
            }
            resolve()
        } catch(e){
            reject(e)
        }
    })
}