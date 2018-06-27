const nativeRequire = window.native_require
const krpPath = window.electron_app_krp_assets_path
const path = nativeRequire('path')

export default function getHotspotIconPath(icon){
    let iconRes = String(icon).length == 1 ? 0+''+icon : String(icon)
    if(window.NODE_ENV == 'dev'){
        return path.resolve(krpPath,`./hotspotIcons/new_spotd${iconRes}_gif.png`)
    } else {
        let appRootPath = window.electron_app_root_path
        return path.resolve(appRootPath,`./app.asar/krp/hotspotIcons/new_spotd${iconRes}_gif.png`)
    }
}