const tempPath = window.electron_app_tmp_path
const nativeRequire = window.native_require
import {IMG_NAME_ARR} from '../constants.js'

var path = nativeRequire('path')
var fs = nativeRequire('fs')

export default function copyImageToScene(dest){
    if(!fs.existsSync(dest)){
        fs.mkdirSync(dest)
    }
    return new Promise((resolve,reject)=>{
        try{
            for(var i=0;i<IMG_NAME_ARR.length;i++){
                let srcPath = path.resolve(tempPath,`./${IMG_NAME_ARR[i]}`)
                let destPath = path.resolve(dest,`./${IMG_NAME_ARR[i]}`)
                fs.createReadStream(srcPath).pipe(fs.createWriteStream(destPath));
            }
            resolve()
        } catch(e){
            reject(e)
        }
    })
}