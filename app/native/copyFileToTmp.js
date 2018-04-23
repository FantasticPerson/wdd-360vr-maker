import clearDir from './clearDir'
import {IMG_NAME_ARR} from '../constants'

const nativeRequire = window.native_require
const path = nativeRequire('path')
const fs = nativeRequire('fs')

export default function copyFileToTmp(src){
    return new Promise((resolve,reject)=>{
        clearDir(window.electron_app_tmp_path)
        .then(()=>{
            try{
                for(var i=0;i<IMG_NAME_ARR.length;i++){
                    let srcPath = path.resolve(src,'./'+IMG_NAME_ARR[i])
                    let destPath = path.resolve(window.electron_app_tmp_path,'./'+IMG_NAME_ARR[i])
                    fs.createReadStream(srcPath).pipe(fs.createWriteStream(destPath));
                }
                resolve()
            } catch(e){
                reject(e)
            }
        })
        .catch((e)=>{
            reject(e)
        })
    })
}