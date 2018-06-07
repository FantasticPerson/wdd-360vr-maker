const nativeRequire = window.native_require
const path = nativeRequire('path')
const fs = nativeRequire('fs')

export default function copyAudioTmpToAudio(name){
    return new Promise((resolve,reject)=>{
        let src = path.resolve(window.electron_app_audio_tmp,'./'+name)
        let dest = path.resolve(window.electron_app_audio_path,'./'+name)
        fs.createReadStream(src).pipe(fs.createWriteStream(dest));
        resolve()
    })
}