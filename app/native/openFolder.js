const nativeRequire = window.native_require
const {dialog} = nativeRequire('electron')

export default function openFolder(){
    return new Promise((resolve,reject)=>{//, 'openDirectory'
        try{
            dialog.showOpenDialog({properties: ['openFile']},(res)=>{
                resolve(res)
            })
        } catch(e){
            reject(e)
        }
    })
}