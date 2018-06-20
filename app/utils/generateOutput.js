const {
    native_require,
    electron_app_output_path,
    electron_app_scene_path,
    electron_app_pic_path,
    electron_app_audio_path,
    electron_app_vr_path,
    electron_app_root_path
} = window

import {IMG_NAME_ARR} from '../constants.js'
import FeatureXMLExport from '../../krpano/api_export.xml'
import {getProductionXml} from './xmlBuilder2'

const fse = require('fs-extra')
const fs = native_require('fs')
const path = native_require('path')
const swig = require('swig')

export function GenerateOutput(vrItem,sceneList,hotpotList){
    let config = {}
    let vrPath = path.resolve(electron_app_output_path,`./vr-${vrItem.id}`)
    let mediaPath = path.resolve(vrPath,'./media')
    let picPath = path.resolve(media,'./picture')
    let audioPath = path.resolve(media,'./audio')
    let scenePathArr = []
    let hotspots = []
    let picArr = []
    let audioArr = []
    for(let i=0;i<sceneList.length;i++){
        scenePathArr.push(sceneList[i].id)
    }
    for(let i = 0;i<sceneList.length;i++){
        for(let j=0;j<hotpotList.length;j++){
            if(hotpotList[j].sceneId == sceneList[i].id){
                hotspots.push(hotpotList[j])
            }
        }
    }
    for(let i = 0;i< hotspots.length;i++){
        let actionObj = JSON.parse(hotspots[i].action)
        if(actionObj.type == 'pictures'){
            let list = actionObj.pics
            for(let j=0;j<list.length;j++){
                if(picArr.indexOf(list[j]) < 0){
                    picArr.push(list[j])
                }
            }
        } else if(actionObj.type == 'picAndText'){
            let list = actionObj.picArr
            for(let j=0;j<list.length;j++){
                if(picArr.indexOf(list[j].pic) < 0){
                    picArr.push(list[j].pic)
                }
            }
        } else if(actionObj.type == 'audio'){
            audioArr.push(actionObj.url)
        }
    }

    if(!fs.existsSync(vrPath)){
        fs.mkdirSync(vrPath)
    }

    if(!fs.existsSync(mediaPath)){
        fs.mkdirSync(mediaPath)
    }

    for(let i = 0;i<sceneList.length;i++){
        let scene = sceneList[i]
        let srcPath = path.resolve(electron_app_vr_path,`./folder_${vrItem.folderId}_vr_${vrItem.id}/scene_${scene.id}`)
        let destPath = path.resolve(mediaPath,`./scene_${scene.id}`)
        if(!fs.existsSync(destPath)){
            fs.mkdirSync(destPath)
        }
        for(let j=0;j<IMG_NAME_ARR.length;j++){
            fse.copySync(path.resolve(srcPath,`./${IMG_NAME_ARR[j]}`),path.resolve(destPath,`./${IMG_NAME_ARR[j]}`))
        }
    }

    if(!fs.existsSync(picPath)){
        fs.mkdirSync(picPath)
    }

    for(let i=0;i<picArr.length;i++){
        let srcPath = path.resolve(electron_app_pic_path,`./${picArr[i]}`)
        let destPath = path.resolve(picPath,`./${picArr[i]}`)
        fse.copySync(srcPath,destPath)
    }

    if(!fs.existsSync(audioPath)){
        fs.mkdirSync(audioPath)
    }

    for(let i=0;i<audioArr.length;i++){
        let srcPath = path.resolve(electron_app_audio_path,`./${audioArr[i]}`)
        let destPath = path.resolve(audioPath,`./${audioArr[i]}`)
        fse.copySync(srcPath,destPath)
    }

    const dataOutputPath = ''
    const panoOutputPath = ''

    const template = swig.compileFile(path.resolve(electron_app_root_path, '../../html/pano.html'))

    fs.writeFileSync(path.resolve(dataOutputPath, './index.html'), template({ title: product.name }))
    fs.writeFileSync(path.resolve(dataOutputPath,'./api_export.xml'),FeatureXMLExport)
    fs.writeFileSync(path.resolve(dataOutputPath, './data.xml'), getProductionXml(vrItem,sceneList,hotpotList))

    fse.copySync(path.join(remote.getGlobal('sharedObj').appRoot, 'dist', 'offline.js'), path.join(productDataOutPath, 'offline.js'))
    fse.copySync(path.join(remote.getGlobal('sharedObj').appRoot, 'js', 'viewer.js'), path.join(productDataOutPath, 'viewer.js'))

    fse.copySync(path.join(remote.getGlobal('sharedObj').appRoot, 'krpano', 'krpano.js'), path.join(productDataOutPath, 'krpano.js'))
    fse.copySync(path.join(remote.getGlobal('sharedObj').appRoot, 'krpano', 'krpano.swf'), path.join(productDataOutPath, 'krpano.swf'))
    fse.copySync(path.join(remote.getGlobal('sharedObj').appRoot, 'krp'), path.join(productDataOutPath, 'krp'))
    fse.copySync(path.join(remote.getGlobal('sharedObj').appRoot, 'tools', '点击运行.app'), path.join(productOutPath, 'mac点击运行.app'))
    fse.copySync(path.join(remote.getGlobal('sharedObj').appRoot, 'tools', '点击运行.exe'), path.join(productOutPath, 'win点击运行.exe'))
    fse.copySync(path.join(remote.getGlobal('sharedObj').appRoot, 'tools', 'mac版离线包运行说明.pdf'), path.join(productOutPath, 'mac版离线包运行说明.pdf'))
    fse.copySync(path.join(remote.getGlobal('sharedObj').appRoot, 'tools', 'win版离线包运行说明.pdf'), path.join(productOutPath, 'win版离线包运行说明.pdf'))
}