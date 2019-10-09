const nativeRequire = window.native_require
const {dialog} = nativeRequire('electron')

export default function openFolder(type=['openFile'],filters=[{name: 'All Files', extensions: ['*']}]){
    return new Promise((resolve,reject)=>{//, 'openDirectory'
        try{
            dialog.showOpenDialog({properties: type,filters:filters},(res)=>{
                resolve(res)
            })
        } catch(e){
            reject(e)
        }
    })
}