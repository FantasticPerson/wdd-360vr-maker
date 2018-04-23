const nativeRequire = window.native_require
const path = nativeRequire('path')

export default function getPathOfPreviewImg(isTmp,vrId){
    if(isTmp){
        return path.resolve(window.electron_app_tmp_path,'./thumb.jpg')
    } else {
        return ''
    }
}