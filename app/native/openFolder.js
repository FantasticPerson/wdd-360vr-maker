const nativeRequire = window.native_require
const {dialog} = nativeRequire('electron')

export default function openFolder(type='openFile'){
    return new Promise((resolve,reject)=>{//, 'openDirectory'
        try{
            dialog.showOpenDialog({properties: [type]},(res)=>{
                resolve(res)
            })
        } catch(e){
            reject(e)
        }
    })
}