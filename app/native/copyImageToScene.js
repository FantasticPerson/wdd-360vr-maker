// const tempPath = window.electron_app_tmp_path
const nativeRequire = window.native_require
import {IMG_NAME_ARR} from '../constants.js'
const cPTmep = window.electron_app_cpano_path

var path = nativeRequire('path')
var fs = nativeRequire('fs')

export default function copyImageToScene(dest){
    if(!fs.existsSync(dest)){
        fs.mkdirSync(dest)
    }
    return new Promise((resolve,reject)=>{
        try{
            for(var i=0;i<IMG_NAME_ARR.length;i++){
                let srcPath = path.resolve(cPTmep,`./${IMG_NAME_ARR[i]}`)
                let destPath = path.resolve(dest,`./${IMG_NAME_ARR[i]}`)
                if(IMG_NAME_ARR[i] == 'origin_preview.jpg'){
                    destPath = path.resolve(dest,`./thumb.jpg`)
                }
                fs.createReadStream(srcPath).pipe(fs.createWriteStream(destPath));
            }
            resolve()
        } catch(e){
            reject(e)
        }
    })
}