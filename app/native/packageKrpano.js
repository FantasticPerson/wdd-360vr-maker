const nativeRequire = window.native_require
const {dialog} = nativeRequire('electron')
let assetsPath = window.electron_app_assets_path
let copyFile = require('fs-copy-file');
let path = nativeRequire('path')

export default function packageKrpano(){
    dialog.showOpenDialog({properties: ['openDirectory']},function(p){
        if(p && p.length >=0){
            let dPath = p[0]
            let vrPath = path.resolve(assetsPath,'./krpano/360viewer.zip')
            copyFile(vrPath,path.resolve(dPath,'./package-krpano.zip'), function (err) {
                if (err) {
                    console.log(err)
                    alert('打包失败，是不忘记充值了');
                }
                else {
                    alert('打包完成')
                    console.log('copy success');
                }
            });
        }
    })
}