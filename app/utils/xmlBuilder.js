const xmlBuilder = require('xmlbuilder');
import Common from '../common'

export function builder(data) {
    const krpano = xmlBuilder.create('krpano');

    const include = krpano.ele('include');
    include.att('url', 'default');

    const skinSetting = krpano.ele('skin_settings');
    const settingData = data.setting;

    Object.keys(settingData).forEach(key => {
        skinSetting.att(key, settingData[key]);
    });
}

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

export function getProductionXml(vrId,sceneList,hotpotList){
    const krpano = builder.create('krpano')
    krpano.att('version', Common.KR_VERSION)
    krpano.att('clientVersion', Common.VERSION)

    const includeFeatureElement = krpano.ele('include')
    includeFeatureElement.att('url', 'api_export.xml')

    const displayModeElement = krpano.ele('displayMode')
    displayModeElement.att('export', true)

    let useLensflare = false
    productData.panoGroups.map(group => {
        group.panos.map(pano => {
            sceneXmlData(pano, krpano, options.memberWorkPath, options.allMedias, options.isPreview)
            useLensflare = pano.effects.sunlightShow ? true : useLensflare
        })
    })

    if (useLensflare) {
        const includeFeatureElement = krpano.ele('include')
        
        includeFeatureElement.att('url', 'krp/lensflare/lensflare.xml')
    }

    configXmlData(productData, krpano, options.memberWorkPath, options.allMedias, options.isExport)

    let xml = krpano.doc().end()

    if (options.isExport) {
        xml = replacePathForExport(productData, xml)
    } else if (!options.isPreview) {
        xml = replacePathFor720(productData, options.memberWorkPath, xml)
    } else if (options.isPreview) {
        xml = replacePathForPreview(options.memberWorkPath, xml)
    }

    let xmlFormat = xml.replace(/&#xd;/g, '&#xa;')
    xmlFormat = xmlFormat.replace(/(&#x[^a|A];|&#x.{2};)/g, '')

    return xmlFormat
}

function sceneXmlData(pano, krpanoXmlNode, memberWorkPath, allMedias, isPreview){
    const scene = krpanoXmlNode.ele('scene')
    scene.att('name', `scene_${pano._id}`)
    scene.att('pano_id', pano._id)
  
    const preview = scene.ele('preview')

    preview.att('url', `${pano.rootPath}/pano.tiles/preview.jpg`)
    
    const image = scene.ele('image')
    image.att('type', 'CUBE')
    image.att('multires', true)
    image.att('tilesize', 512)
    image.att('if', '!webvr.isenabled AND device.desktop')
  
    for (let i = 0; i < pano.multires.length; i++) {
        const level = image.ele('level')
        level.att('tiledimagewidth', pano.multires[i])
        level.att('tiledimageheight', pano.multires[i])
    
        const cube = level.ele('cube')
        cube.att('url', `${pano.rootPath}/pano.tiles/mres_%s/l${pano.multires.length - i}/%v/l${pano.multires.length - i}_%s_%v_%h.jpg`)
    }
  
    const imageMobile = scene.ele('image')
    imageMobile.att('if', 'webvr.isenabled OR !device.desktop')
  
    const mobile = imageMobile.ele('cube')
    
    mobile.att('url', `${pano.rootPath}/pano.tiles/mobile_%s.jpg`)
  
    for (let i = 0; i < pano.hotspots.length; i++) {
        if (pano.hotspots[i].error == '') {
                const hotspot = scene.ele('hotspot')
                hotspot.att('name', `hotspot_${i}`)
        }
    }
}

function configXmlData(productData, krpanoXmlNode, memberWorkPath, allMedias, isExport){
    const config = krpanoXmlNode.ele('config')
  
    infoXmlData(productData, config, memberWorkPath, allMedias, isExport)
    authXmlData(productData, config, memberWorkPath, allMedias, isExport)
    featureXmlData(productData, config, memberWorkPath, allMedias, isExport)
    qrXmlData(productData, config, memberWorkPath, allMedias, isExport)
    logoXmlData(productData, config, memberWorkPath, allMedias, isExport)
    thumbsXmlData(productData, config, memberWorkPath, allMedias, isExport)
    linksXmlData(productData, config, memberWorkPath, allMedias, isExport)
    panosXmlData(productData, config, memberWorkPath, allMedias, isExport)
}

function replacePathForPreview(memberWorkPath, xml){

    // 为避免将rootPath中的()替换，用一个特殊临时字符串将rootPath替换
    let tempRootPath = '-R-0O-t_P-aT-H-'
    if (memberWorkPath.indexOf('(') !== -1) {
        xml = replaceAll(xml, memberWorkPath, tempRootPath)
    }

    xml = replacePathForRegExp(xml, '%$PLAYER_DOMAIN%/krp', 'krp')
    xml = replacePathForRegExp(xml, '%$PLAYER_DOMAIN%/krp/1.19-pr10', 'krp')

    // 将正确的rootPath替换回来
    if (memberWorkPath.indexOf('(') !== -1) {
        xml = replaceAll(xml, tempRootPath, memberWorkPath)
    }

    return xml
}

function infoXmlData(productData, configXmlNode){
    const info = configXmlNode.ele('info')
    info.att('pid', productData.pid)
    info.att('id', productData.dbId ? productData.dbId : productData._id)
    info.att('title', productData.name)
    info.att('desc', productData.desc)
}
  
function authXmlData(productData, configXmlNode){
    const auth = configXmlNode.ele('auth')
    auth.att('auth_name', productData.member.property.nickname)
    auth.att('uid', productData.member.property.uid)
    auth.att('status', productData.member.type)
    auth.att('link', `https://720yun.com/u/${productData.member.property.uid}`)
}
  
function featureXmlData(productData, configXmlNode){
    const feature = configXmlNode.ele('feature')
    feature.att('enable_comment', productData.enableComment === false ? 0 : 1)
    feature.att('show_comment', productData.showComment === false ? 0 : 1)
    feature.att('enable_vr', productData.vr === false ? 0 : 1)
    feature.att('enable_like', productData.like === false ? 0 : 1)
    feature.att('show_pv', productData.pv === false ? 0 : 1)
    if (productData.password && productData.password != '') {
        feature.att('enable_password', 1)
    } else {
        feature.att('enable_password', 0)
    }
    if (productData.desc && productData.desc != '') {
        feature.att('enable_intro', 1)
    } else {
        feature.att('enable_intro', 0)
    }
  
    feature.att('enable_selected', '0')
    feature.att('show_auth', productData.author === false ? 0 : 1)
    feature.att('enable_gyro', productData.gyroscope === true ? 1 : 0)
    feature.att('enable_littleplanet', productData.starView === false ? 0 : 1)
    feature.att('enable_share', (productData.share === false || productData.qrLogo == undefined) ? 0 : 1)
    feature.att('enable_autorotate', productData.autoTour === false ? 0 : 1)
}
  
function qrXmlData(productData, configXmlNode){
    const qrImage = configXmlNode.ele('qr')
    qrImage.att('url', 'http://static-qiniu.720static.com/qrlogo.png')
    if (productData.member.property.avatar != undefined && productData.member.property.avatar != '' ) {
        qrImage.att('url', `%$AVATAR_DOMAIN%${productData.member.property.avatar}`)
    }
    if (productData.qrLogo != undefined && productData.qrLogo != '' ) {
        qrImage.att('url', `${Common.PRODUCT_DOMAIN}/@/${productData.member.property.uid}/${productData._id}/${productData.qrLogo}`)
    }
}
  
function logoXmlData(productData, configXmlNode, memberWorkPath, allMedias, isExport){
    const logo = configXmlNode.ele('logo')
    if (productData.logo) {
        if (productData.logo.img === '') {
            logo.att('enabled', 0)
        } else {
            logo.att('enabled', 1)
            logo.att('align', 1)
            if (productData.logo.img === '/media/720yunLOGO.png') {
                logo.att('is_720', 1)
            } else {
                logo.att('is_720', 0)
            }
            logo.att('url', parseMediaPath(memberWorkPath, allMedias, productData.rootPath, productData.logo.img, false))

            logo.att('link', productData.logo.url)
        }
  
    } else {
        logo.att('enabled', 1)
        logo.att('align', 1)
        logo.att('is_720', 1)
        logo.att('link', productData.logo.url)
    }
}
  
function thumbsXmlData(productData, configXmlNode, memberWorkPath, allMedias, isExport){
    const thumbs = configXmlNode.ele('thumbs')
    thumbs.att('title', '全景列表')
    thumbs.att('show_thumb', productData.showMenu === false ? 0 : 1)
  
    let categoryIndex = 0
    productData.panoGroups.map(group => {
        if (group.panos.length > 0) {
            let category = thumbs.ele('category')
            category.att('name', `category${categoryIndex}`)
            category.att('title', group.name)
            category.att('thumb', '')
            categoryIndex++
    
            group.panos.map(pano => {
                let panoElement = category.ele('pano')
                panoElement.att('name', `pano_${pano._id}`)
                panoElement.att('title', pano.name)
    
                panoElement.att('thumb', `${pano.rootPath}${parseMediaPath(memberWorkPath, allMedias, pano.rootPath, pano.thumb, false)}`)
                
                panoElement.att('pano_id', pano._id)
        
            })
        }
    })
}
  
function linksXmlData(productData, configXmlNode, memberWorkPath, allMedias, isExport){ 
    const links = configXmlNode.ele('links')
    if (productData.linkAndPhone) {
        let linkIndex = 0
        productData.linkAndPhone.map(link => {
            if (link.value != '' && link.title != '') {
                const linkElement = links.ele('link')
                linkElement.att('name', `link_${linkIndex}`)
                linkIndex++
                linkElement.att('title', link.title)

                linkElement.att('url', parseMediaPath(memberWorkPath, allMedias,productData.rootPath, link.icon, false))
              
                linkElement.att('link_type', 1)
                linkElement.att('link', link.value)
            }
        })
    }
}
