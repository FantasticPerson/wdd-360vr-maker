const nativeRequire = window.native_require
const krpPath = window.electron_app_krp_assets_path
const path = nativeRequire('path')

export default function getHotspotIconPath(){
    return path.resolve(krpPath,'./hotspotIcons/new_spotd01_gif.png')
}