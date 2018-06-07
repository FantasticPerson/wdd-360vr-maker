import clearDir from './clearDir'
const nativeRequire = window.native_require
const path = nativeRequire('path')
const fs = nativeRequire('fs')
import Hashid from '../utils/generateHashId'

export default function copyAudioToTmpAudio(filePath){
    let extension = filePath.substr(filePath.lastIndexOf('.')+1)
    return new Promise((resolve,reject)=>{
        clearDir(window.eletron_app_pic_tmp)
        .then(()=>{
            let id = `audio${new Hashid().encode()}`
            let destPath = path.resolve(window.eletron_app_audio_tmp,'./'+id+'.'+extension)
            fs.createReadStream(filePath).pipe(fs.createWriteStream(destPath));
            resolve(`${id}.${extension}`)
        })
    })
}