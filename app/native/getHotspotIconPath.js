const nativeRequire = window.native_require
const krpPath = window.electron_app_krp_assets_path
const path = nativeRequire('path')

export default function getHotspotIconPath(){
    if(window.NODE_ENV == 'dev'){
        console.log(path.resolve(krpPath,'./hotspotIcons/new_spotd01_gif.png'))
        return path.resolve(krpPath,'./hotspotIcons/new_spotd01_gif.png')
        
    } else {
        let appRootPath = window.electron_app_root_path
        return path.resolve(appRootPath,'./app.asar/krp/hotspotIcons/new_spotd01_gif.png')
    }
}