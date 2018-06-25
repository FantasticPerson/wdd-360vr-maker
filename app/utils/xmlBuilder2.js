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

    return krpano.doc().end()
}

export function getProductionXml(vrItem,sceneList,hotpotList){
    let productData = krpanoData(vrItem,sceneList,hotpotList)

    const krpano = xmlBuilder.create('krpano')
    krpano.att('version',Common.KR_VERSION)
    krpano.att('clientVersion',Common.KR_VERSION)

    const includeFeatureElement = krpano.ele('include')
    includeFeatureElement.att('url','./api_export.xml')

    const displayModeElement = krpano.ele('displayMode')
    displayModeElement.att('export',true)

    productData.panos.map(pano => {
        getSceneXmlData(pano, krpano)
    })
    
    configXmlData(productData,krpano)

    let xml = krpano.doc().end()

    return xml
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

function getSceneXmlData(pano,krpano){
    const scene = krpano.ele('scene')
    scene.att('name',`scene_${pano.scene.id}`)
    scene.att('pano_id',pano.scene.id)

    const preview = scene.ele('preview')
    preview.att('url',`./scene_${pano.scene.id}/preview.jpg`)

    const image = scene.ele('image')
    image.att('type', 'CUBE')
    image.att('multires', true)
    image.att('tilesize', 512)
    image.att('if', '!webvr.isenabled AND device.desktop')

    const cube = image.ele('cube')

    cube.att('url', `./scene_${pano.scene.id}/mobile_%s.jpg`)

    const imageMobile = scene.ele('image')
    // const imageMobile = scene.ele('image')
    imageMobile.att('if', 'webvr.isenabled OR !device.desktop')
  
    const mobile = imageMobile.ele('cube')
    
    mobile.att('url', `./scene_${pano.scene.id}/mobile_%s.jpg`)

    for (let i = 0; i < pano.hotspots.length; i++) {
        // if (pano.hotspots[i].error == '') {
            const hotspot = scene.ele('hotspot')
            hotspot.att('name', `hotspot_${i}`)
        // }
    }
}

function configXmlData(productData,krpano){
    const config = krpano.ele('config')
    infoXmlData(productData,config)
    authXmlData(productData,config)
    thumbsXmlData(productData,config)
    panosXmlData(productData,config)
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
    category.att('title','全景列表')
    category.att('thumb','')

    productData.panos.map((pano)=>{
        let panoElement = category.ele('pano')
        panoElement.att('name',`pano_${pano.scene.id}`)
        panoElement.att('title',pano.scene.name)

        panoElement.att('thumb',`./scene_${pano.scene.id}/thumb.jpg`)
        panoElement.att('pano_id',pano.scene.id)
    })
}

function panosXmlData(productData,config){
    // sceneArr.push({scene:sceneObj,hotspots:hotspots})

    const panos = config.ele('panos')
    productData.panos.map(pano=>{
        const panoElement = panos.ele('pano')
        panoElement.att('name',`scene_${pano.scene.id}`)

        const info = panoElement.ele('info')
        info.att('pano_id',pano.scene.id)
        info.att('title',pano.scene.name)

        const view = panoElement.ele('view')
        view.att('hloolat',pano.scene.hlookat || 0)
        view.att('vloolat',pano.scene.vlookat || 0)
        view.att('fov',pano.scene.fov || 75)
        view.att('fovtype','MFOV')
        view.att('maxpixelzoom',2.0)
        view.att('fovmin',pano.scene.fovmin || -5)
        view.att('fovmax',pano.scene.fovmax || 155)
        view.att('vlookatmin',pano.scene.vlookatmin || -90)
        view.att('vlookatmax',pano.scene.vlookatmax || 90)

        view.att('autorotatekeepview',0)
        view.att('loadscenekeepview',0)

        panoElement.ele('start_image_pc')
        panoElement.ele('start_image_mobile')

        const hotspots = panoElement.ele('hotspots')

        let hotspotIndex = 0
        pano.hotspots.map(hotspotData=>{
            let actionObj = JSON.parse(hotspotData.action)
            const hotspot = hotspots.ele('hotspot')
            hotspot.att('name', `hotspot_${hotspotIndex}`)
            hotspotIndex++
            if(hotspotData.animated){
                // hotspot.att('style_id',push.basename(hotspotData.icon,'.png'))
                // hotspot.att('style_id',`new_spotd01_gif`)
                // hotspot.att('image_type',1)


                hotspot.att('style_id', `new_spotd01_gif`)
                hotspot.att('image_type', 1)
                // hotspot.att('image_url', `./krp/hotspotIcons/new_spotd01_gif.png`)
            } else {
                // hotspot.att('style_id','')
                hotspot.att('image_type',2)
                hotspot.att('image_url', `./krp/hotspotIcons/new_spotd01_gif.png`)

                // parseMediaPath(memberWorkPath, allMedias, productData.rootPath, hotspotData.icon, false))
            }
            // hotspot.att('image_type',2)
            // hotspot.att('image_url', `./krp/hotspotIcons/new_spotd01_gif.png`)


            hotspot.att('ath',hotspotData.ath)
            hotspot.att('atv',hotspotData.atv)

            hotspot.att('show_txt',hotspotData.typeProps.showTitle ? 1: 0)
            hotspot.att('keep_view',0)

            hotspot.att('type',0)
            hotspot.att('title',actionObj.title || '123')
            hotspot.att('url','scene_2')
            hotspot.att('blend',0)
/*
            switch(actionObj.type){
                case 'switch':
                    hotspot.att('type',0)
                    hotspot.att('title',actionObj.title || '123')
                    hotspot.att('url',actionObj.toId)
                    hotspot.att('blend',0)
                    break
                case 'link':
                    hotspot.att('type',1)
                    hotspot.att('title',actionObj.title)
                    hotspot.att('url',actionObj.url)
                    hotspot.att('is_blank',actionObj.openInNewWindow)
                    break;
                case 'pictures':
                    hotspot.att('type',2)
                    hotspot.att('title',actionObj.title)
                    hotspot.att('url',actionObj.url ? actionObj.url : '')
                    hotspot.att('is_blank',actionObj.openInNewWindow)
                    let imageIndex = 0
                    actionObj.list.map((item)=>{
                        const imageElement = hotspot.ele('image')
                        imageElement.att('name',`image_${imageIndex}`)
                        imageElement.att('title','')
                        imageElement.att('url', '123456')
                        // imageElement.att('url', parseMediaPath(memberWorkPath, allMedias, productData.rootPath, imageURL, false))

                        imageIndex++
                    })
                    break
                case 'video':
                    hotspot.att('type',3)
                    hotspot.att('text',actionObj.url)
                    hotspot.att('title',actionObj.title)
                    hotspot.att('url','')
                    hotspot.att('is_blank',actionObj.openInNewWindow)
                    break
                case 'text':
                    hotspot.att('type',4)
                    hotspot.att('text',actionObj.content)
                    hotspot.att('title',actionObj.title)
                    hotspot.att('url','')
                    hotspot.att('is_blank',actionObj.openInNewWindow)
                    break
                case 'audio':
                    hotspot.att('type',5)
                    hotspot.att('title',actionObj.title)
                    hotspot.att('url',actionObj.url)
                    break
                case 'mix':
                    hotspot.att('type',6)
                    hotspot.att('title',actionObj.title)
                    hotspot.att('url','')
                    hotspot.att('is_blank',actionObj.openInNewWindow)

                    let mixIndex = 0
                    hotspot.list.map(item=>{
                        const imageElement = hotspot.ele('image')
                        imageElement.att('name',`image_${mixIndex}`)
                        imageElement.att('title','')
                        imageElement.att('url',item.pic)
                        imageElement.att('text',item.text)

                        mixIndex++
                    })
                    break
                case 'viewer':
                    break
            }*/

            /*if(pano.assets){
                const embeds = panoElement.ele('embeds')
                let embedIndex = 0

                pano.assets.map(embedData=>{
                    const embed = embeds.ele('embed')
                    embed.att('name',`embed_${embedIndex}`)
                    embedIndex++
                    
                    if(embedData.type == 'text'){
                        embed.att('embed_type',1)
                        embed.att('text',embedData.text)
                    } else if(embedData.type == 'image'){
                        embed.att('embed_type',2)
                        embed.att('play_type', embedData.playType == 'CLICK' ? 1 : 0)
                        embed.att('scale', embedData.scale)
                        embed.att('interval', embedData.interval)
                        let imageIndex = 0
                        
                    }

                })
            }*/

            
        })
    })
}

function parseMediaPath(memberWorkPath, allMedias, prefix, suffix, isPreview = true){
    const reg = new RegExp('^[a-z0-9]{18}$')
  
    if (isPreview) {
        if (reg.test(suffix)) {
            return path.join(memberWorkPath, Common.MEDIALIB_PATH, allMedias[`${suffix}`] ? allMedias[`${suffix}`].md5 : '')
        } else {
            return path.join(prefix, suffix)
        }
    } else {
        if (reg.test(suffix)) {
            return path.join('media', allMedias[`${suffix}`] ? allMedias[`${suffix}`].md5 : '')
        } else {
            return suffix
        }
    }
}