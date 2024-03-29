const nativeRequire = window.native_require
const {dialog} = nativeRequire('electron')

export default function openFolder(){
    return new Promise((resolve,reject)=>{
        try{
            dialog.showOpenDialog({properties: ['openFile'],filters:[{
                name:'Images',
                extensions:['jpg', 'png', 'gif','jpeg']
            }]},(res)=>{
                resolve(res)
            })
        } catch(e){
            reject(e)
        }
    })
}