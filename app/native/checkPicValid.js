 import {IMG_NAME_ARR} from '../constants'

const nativeRequire = window.native_require
const path = nativeRequire('path')
const fs = nativeRequire('fs')

export default function checkPicValid(rootPath){
    return new Promise((resolve,reject)=>{
        try{
            let fileArr = fs.readdirSync(rootPath)  
            for(let i=0;i<IMG_NAME_ARR.length;i++){
                if(fileArr.indexOf(IMG_NAME_ARR[i]) < 0){
                    reject('图片上传格式不正确')
                    return
                }
            }
            resolve({rootPath:rootPath,imgArr:IMG_NAME_ARR})
        } catch(e){
            reject(e)
        }
    })
}