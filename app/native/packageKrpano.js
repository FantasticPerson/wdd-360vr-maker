const nativeRequire = window.native_require
const {dialog} = nativeRequire('electron')
let assetsPath = window.electron_app_assets_path
let copyFile = require('fs-copy-file');
let path = nativeRequire('path')
const fse = require('fs-extra')

import Hashid from '../utils/generateHashId'

export default function packageKrpano(id){
    let vrPath = path.resolve(electron_app_output_path,`./vr-${id}`)
    dialog.showOpenDialog({properties: ['openDirectory']},function(p){
        if(p && p.length >=0){
            let dPath = p[0]
            // let vrPath = path.resolve(assetsPath,'./krpano/360viewer.zip')

            const dest = `vr-${id}-${new Hashid().encode()}`

            fse.copySync(vrPath,path.resolve(dPath,dest))
            // copyFile(vrPath,path.resolve(dPath,'./package-krpano.zip'), function (err) {
            //     if (err) {
            //         console.log(err)
            //         alert('打包失败，是不忘记充值了');
            //     }
            //     else {
            //         alert('打包完成')
            //         console.log('copy success');
            //     }
            // });
        }
    })
}