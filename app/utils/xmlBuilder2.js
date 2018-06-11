const xmlBuilder = require('xmlbuilder')
import Common from '../common'
import { builder } from './xmlBuilder';

export function getPanoXml(data){
    const krpano = xmlBuilder.create('krpano')
    krpano.att('version',Common.KR_VERSION)

    const scene = krpano.ele('scene')
    scene.att('name','scene_0')

    const preview = scene.ele('preview')
    preview.att('url','')

    const view = scene.ele('view')

    // view.att('hlookat', '1')
    view.att('fovtype', 'MFOV')
    view.att('fovmin', 70)
    view.att('fovmax', 140)
    // view.att('hlookat', data.hAov)
    // view.att('vlookat', data.vAov)
    // view.att('vlookatmin', data.vAovMin)
    // view.att('vlookatmax', data.vAovMax)
    // view.att('limitview', 'auto')
    view.att('limitview', 'lookat')

    const image = scene.ele('image')
    image.att('type', 'CUBE')
    // image.att('multires', true)
    // image.att('tilesize', 512)

    const cube = image.ele('cube')
    cube.attribute('url',`${data.scenePath}/mobile_%s.jpg`)

    // for (let i = 0; i < data.multires.length; i++) {
    //     const level = image.ele('level')
    //     level.att('tiledimagewidth', data.multires[i])
    //     level.att('tiledimageheight', data.multires[i])

    //     const cube = level.ele('cube')
    //     cube.att('url', path.join(data.rootPath, 'pano.tiles', `mres_%s/l${data.multires.length - i}/%v/l${data.multires.length - i}_%s_%v_%h.jpg`))
    // }

    return krpano.doc().end()
}

export function getProductionXml(vrItem,sceneList,hotpotList){
    let productData = krpanoData(vrItem,sceneList,hotpotList)

    const krpano = builder = builder.create('krpano')
    krpano.att('version',Common.KR_VERSION)
    krpano.att('clientVersion',Common.KR_VERSION)

    const includeFeatureElement = krpano.ele('include')
    includeFeatureElement.att('url','api_export.xml')

    const displayModeElement = krpano.ele('displayMode')
    displayModeElement.att('export',true)
}

function krpanoData(vrItem,sceneList,hotpotList){
    let sceneArr = []
    for(let i = 0;i<sceneList.length;i++){
        let sceneObj = sceneList[i]
        let hotspots = getHotspotList(hotpotList,sceneObj.id)
        sceneArr.push({scene:sceneObj,hotspots:hotspots})
    }

    return {item:vrItem,panos:sceneArr}

    function getHotspotList(list,id){
        return list.filter((item)=>{
            return item.sceneId == id
        })
    }
}

function getSceneXmlData(krpano){


    das
}

function configXmlData(productData,krpano){
    const config = krpano.ele('config')
    infoXmlData(productData,config)
    authXmlData(productData,config)
    thumbsXmlData(productData,config)
} 

function infoXmlData(productData,config){
    const info = config.ele('info')
    info.att('id',productData.item.id)
    info.att('title',productData.item.title)
    info.att('desc',productData.item.brief)
}

function authXmlData(productData,config){
    const auth = config.ele('auth')
    auth.att('auth_name','中威科技')
}

function thumbsXmlData(productData,config){
    const thumbs = config.ele('thumbs')
    thumbs.att('title','全景列表')
    thumbs.att('show_thumb',1)
    
    let category = thumbs.ele('category')
    category.att('name','category0')
    category.att('title','groupName')
    category.att('thumb','')

    productData.panos.map((pano)=>{
        let panoElement = category.ele('pano')
        panoElement.att('name',`pano_${pano.scene.id}`)
        panoElement.att('title',pano.scene.name)

        panoElement.att('thumb','test')
        panoElement.att('pano_id',pano.id)
    })
}

function panosXmlData(productData,config){
    
}