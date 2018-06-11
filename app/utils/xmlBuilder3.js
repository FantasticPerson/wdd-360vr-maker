import Common from './common'
import { parseMediaPath } from './util'
import keyEncoder from '../utils/keyEncoder'
import FeatureXMLExport from '../krpano/api_export.xml'
import FeatureXMLOnline from '../krpano/api_online.xml'


const builder = require('xmlbuilder')
const path = require('path')

const replaceAll = (str, find, replace) => {
    return str.replace(new RegExp(escapeRegExp(find), 'g'), replace)
}
const escapeRegExp = (str) => {
    return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, '\\$1')
}

const replacePathForRegExp = (sourcePath, target, replace) => {
  sourcePath = sourcePath.replace(/[\\]/g, '/').replace(/\([^\)]*\)/g, '')
  target = target.replace(/[\\]/g, '/').replace(/\([^\)]*\)/g, '')

  let result = _.replace(sourcePath, new RegExp(target, 'g'), replace)
  return _.replace(result, new RegExp('https:/client', 'g'), 'https://client')
}

// 创建作品时的素材预览
export const createPreviewXml = (data) => {
  const krpano = builder.create('krpano')
  krpano.att('version', Common.KR_VERSION)

  const preview = krpano.ele('preview')
  preview.att('url', path.join(data.rootPath, 'pano.tiles', 'preview.jpg'))

  const view = krpano.ele('view')
  view.att('fov', Common.PANO_DEFAULT.fov)
  view.att('fovtype', 'MFOV')
  view.att('fovmin', Common.PANO_DEFAULT.fovMin)
  view.att('fovmax', Common.PANO_DEFAULT.fovMax)
  view.att('hlookat', Common.PANO_DEFAULT.hAov)
  view.att('vlookat', Common.PANO_DEFAULT.vAov)

  const image = krpano.ele('image')
  image.att('type', 'CUBE')
  image.att('multires', true)
  image.att('tilesize', 512)

  for (let i = 0; i < data.multires.length; i++) {
    const level = image.ele('level')
    level.att('tiledimagewidth', data.multires[i])
    level.att('tiledimageheight', data.multires[i])

    const cube = level.ele('cube')
    cube.att('url', path.join(data.rootPath, 'pano.tiles', `mres_%s/l${data.multires.length - i}/%v/l${data.multires.length - i}_%s_%v_%h.jpg`))
  }

  return krpano.doc().end()
}

export const getPanoXml = (data) => {
  const krpano = builder.create('krpano')
  krpano.att('version', Common.KR_VERSION)

  const scene = krpano.ele('scene')
  scene.att('name', 'scene_0')

  const preview = scene.ele('preview')
  preview.att('url', path.join(data.rootPath, 'pano.tiles', 'preview.jpg'))

  const view = scene.ele('view')
  view.att('fov', data.fov)
  view.att('fovtype', 'MFOV')
  view.att('fovmin', data.fovMin)
  view.att('fovmax', data.fovMax)
  view.att('hlookat', data.hAov)
  view.att('vlookat', data.vAov)
  view.att('vlookatmin', data.vAovMin)
  view.att('vlookatmax', data.vAovMax)
  view.att('limitview', 'lookat')

  const image = scene.ele('image')
  image.att('type', 'CUBE')
  image.att('multires', true)
  image.att('tilesize', 512)

  for (let i = 0; i < data.multires.length; i++) {
    const level = image.ele('level')
    level.att('tiledimagewidth', data.multires[i])
    level.att('tiledimageheight', data.multires[i])

    const cube = level.ele('cube')
    cube.att('url', path.join(data.rootPath, 'pano.tiles', `mres_%s/l${data.multires.length - i}/%v/l${data.multires.length - i}_%s_%v_%h.jpg`))
  }

  return krpano.doc().end()
}

// 生成下架的xml文件
export const getInvalidProductXml = () => {
  const krpano = builder.create('krpano')
  krpano.att('version', Common.KR_VERSION)

  const includeFeatureElement = krpano.ele('include')
  includeFeatureElement.att('url', 'https://ssl-player.720static.com/@/client/xml/api_%$API_VERSION%.xml')

  return krpano.doc().end()
}

// 生成漫游功能xml文件
export const getProductFeatureXml = (isExport) => {
  if (isExport) {
    return FeatureXMLExport
  } else {
    return FeatureXMLOnline
  }
}

// 生成漫游数据xml文件
// options.isPreview  true/false      是否客户端预览
// options.isExport   true/false      是否导出离线包
export const getProductDataXml = (productData, options = {}) => {
  const krpano = builder.create('krpano')
  krpano.att('version', Common.KR_VERSION)
  krpano.att('clientVersion', Common.VERSION)

  if (productData === undefined) {
    return krpano.doc().end()
  }

  if (typeof options.isPreview === 'undefined') {
    options.isPreview = false
  }

  if (typeof options.isExport === 'undefined') {
    options.isExport = false
  }

  if (options.isPreview) {
    // 预览
    const includeFeatureElement = krpano.ele('include')
    includeFeatureElement.att('url', '../krpano/api_local.xml')

    const displayModeElement = krpano.ele('displayMode')
    displayModeElement.att('preview', true)
  } else if (options.isExport) {
    // 离线导出
    const includeFeatureElement = krpano.ele('include')
    includeFeatureElement.att('url', 'api_export.xml')

    const displayModeElement = krpano.ele('displayMode')
    displayModeElement.att('export', true)
  } else {
    const includeFeatureElement = krpano.ele('include')

    //  client
    includeFeatureElement.att('url', '%$PLAYER_DOMAIN%/krp/player_1_%$PLAYER_VERSION%.xml')
    // includeFeatureElement.att('url', 'http://api-qiniu.local.720static.com/krp/api_%$API_VERSION%.xml')

    // local test
    // includeFeatureElement.att('url', 'http://api-qiniu.local.720static.com/krp/api.xml')
    // const includeTemplateElement = krpano.ele('include')
    // includeTemplateElement.att('url', 'http://api-qiniu.local.720static.com/krp/api_template_1.xml')

    // online
    // includeFeatureElement.att('url', 'http://api-qiniu2.720static.com/@/krp/api_%$API_VERSION%.xml')
    // const includeTemplateElement = krpano.ele('include')
    // includeTemplateElement.att('url', 'http://api-qiniu2.720static.com/@/krp/api_template_2_%$API_VERSION%.xml')

    const displayModeElement = krpano.ele('displayMode')
    displayModeElement.att('online', true)
  }

  let useLensflare = false
  productData.panoGroups.map(group => {
    group.panos.map(pano => {
      sceneXmlData(pano, krpano, options.memberWorkPath, options.allMedias, options.isPreview)
      useLensflare = pano.effects.sunlightShow ? true : useLensflare
    })
  })

  if (useLensflare) {
    const includeFeatureElement = krpano.ele('include')
    if (options.isPreview) {
      // preview
      includeFeatureElement.att('url', '%SWFPATH%/../krp/lensflare/lensflare.xml')
    } else if (options.isExport) {
      // export
      includeFeatureElement.att('url', 'krp/lensflare/lensflare.xml')
    } else {
      // online
      includeFeatureElement.att('url', '%$PLAYER_DOMAIN%/api/lensflare/lensflare.xml')
      includeFeatureElement.att('device', 'html5')
    }
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

const replacePathForPreview = (memberWorkPath, xml) => {

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

const replacePathForExport = (productData, xml) => {
  productData.panoGroups.map((group) => {
    group.panos.map((pano) => {
      xml = replacePathForRegExp(xml, pano.rootPath, `pano/${pano._id}`)
    })
  })
  xml = replacePathForRegExp(xml, `${productData.rootPath}/`, '')
  xml = replacePathForRegExp(xml, '/media', 'media')
  xml = replacePathForRegExp(xml, '%$PLAYER_DOMAIN%/krp', 'krp')
  xml = replacePathForRegExp(xml, '%$PLAYER_DOMAIN%/krp/1.19-pr10', 'krp')

  return xml
}

const replacePathFor720 = (productData, memberWorkPath, xml) => {

  productData.panoGroups.map(group => {
    group.panos.map(pano => {
      xml = replacePathForRegExp(xml, `${pano.rootPath}/`, `${Common.PRODUCT_DOMAIN}/@${productData.panoKeys[pano._id]}`)
    })
  })

  xml = replacePathForRegExp(xml, path.join(productData.rootPath, 'media', path.sep), `${Common.PRODUCT_DOMAIN}/@/${productData.member.property.uid}/${productData._id}/media/`)
  xml = replacePathForRegExp(xml, path.join(memberWorkPath, '.mediaLib', path.sep), `${Common.PRODUCT_DOMAIN}/@/${productData.member.property.uid}/media/`)
  xml = replacePathForRegExp(xml, '\'', '&apos;')
  // xml = replacePathForRegExp(xml, `${productData.rootPath}/`, '')
  // xml = replacePathForRegExp(xml, productData.rootPath, `${Common.PRODUCT_DOMAIN}/@/${productData.member.property.uid}/${productData._id}`)

  return xml
}

const sceneXmlData = (pano, krpanoXmlNode, memberWorkPath, allMedias, isPreview) => {
  const scene = krpanoXmlNode.ele('scene')
  scene.att('name', `scene_${pano._id}`)
  scene.att('pano_id', pano._id)

  const preview = scene.ele('preview')
  if (isPreview) {
    preview.att('url', path.join(pano.rootPath, 'pano.tiles', 'preview.jpg'))
  } else {
    preview.att('url', `${pano.rootPath}/pano.tiles/preview.jpg`)
  }

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
    if (isPreview) {
      cube.att('url', path.join(pano.rootPath, 'pano.tiles', `mres_%s/l${pano.multires.length - i}/%v/l${pano.multires.length - i}_%s_%v_%h.jpg`))
    } else {
      cube.att('url', `${pano.rootPath}/pano.tiles/mres_%s/l${pano.multires.length - i}/%v/l${pano.multires.length - i}_%s_%v_%h.jpg`)
    }
  }

  const imageMobile = scene.ele('image')
  imageMobile.att('if', 'webvr.isenabled OR !device.desktop')

  const mobile = imageMobile.ele('cube')
  if (isPreview) {
    mobile.att('url', path.join(pano.rootPath, 'pano.tiles', 'mobile_%s.jpg'))
  } else {
    mobile.att('url', `${pano.rootPath}/pano.tiles/mobile_%s.jpg`)
  }

  for (let i = 0; i < pano.hotspots.length; i++) {
    if (pano.hotspots[i].error == '') {
      const hotspot = scene.ele('hotspot')
      hotspot.att('name', `hotspot_${i}`)
    }
  }
}

export const configXmlData = (productData, krpanoXmlNode, memberWorkPath, allMedias, isExport) => {
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

export const infoXmlData = (productData, configXmlNode) => {
  const info = configXmlNode.ele('info')
  info.att('pid', productData.pid)
  info.att('id', productData.dbId ? productData.dbId : productData._id)
  info.att('title', productData.name)
  info.att('desc', productData.desc)
}

export const authXmlData = (productData, configXmlNode) => {
  const auth = configXmlNode.ele('auth')
  auth.att('auth_name', productData.member.property.nickname)
  auth.att('uid', productData.member.property.uid)
  auth.att('status', productData.member.type)
  auth.att('link', `https://720yun.com/u/${productData.member.property.uid}`)
}

export const featureXmlData = (productData, configXmlNode) => {
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

export const qrXmlData = (productData, configXmlNode) => {
  const qrImage = configXmlNode.ele('qr')
  qrImage.att('url', 'http://static-qiniu.720static.com/qrlogo.png')
  if (productData.member.property.avatar != undefined && productData.member.property.avatar != '' ) {
    qrImage.att('url', `%$AVATAR_DOMAIN%${productData.member.property.avatar}`)
  }
  if (productData.qrLogo != undefined && productData.qrLogo != '' ) {
    qrImage.att('url', `${Common.PRODUCT_DOMAIN}/@/${productData.member.property.uid}/${productData._id}/${productData.qrLogo}`)
  }
}

export const logoXmlData = (productData, configXmlNode, memberWorkPath, allMedias, isExport) => {
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

      if (isExport) {
        logo.att('url', parseMediaPath(memberWorkPath, allMedias, productData.rootPath, productData.logo.img, false))
      } else {
        logo.att('url', `${parseMediaPath(memberWorkPath, allMedias, productData.rootPath, productData.logo.img, true)}`)
      }
      logo.att('link', productData.logo.url)
    }

  } else {
    logo.att('enabled', 1)
    logo.att('align', 1)
    logo.att('is_720', 1)
    logo.att('link', productData.logo.url)
  }
}

export const thumbsXmlData = (productData, configXmlNode, memberWorkPath, allMedias, isExport) => {
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

        if (isExport) {
          // panoElement.att('thumb', path.join(pano.rootPath, pano.thumb))
          panoElement.att('thumb', `${pano.rootPath}${parseMediaPath(memberWorkPath, allMedias, pano.rootPath, pano.thumb, false)}`)
        } else {
          // panoElement.att('thumb', `${pano.rootPath}${pano.thumb}`)
          panoElement.att('thumb', `${parseMediaPath(memberWorkPath, allMedias, pano.rootPath, pano.thumb, true)}`)
        }
        panoElement.att('pano_id', pano._id)

      })
    }
  })
}

export const linksXmlData = (productData, configXmlNode, memberWorkPath, allMedias, isExport) => {
  const links = configXmlNode.ele('links')
  if (productData.linkAndPhone) {
    let linkIndex = 0
    productData.linkAndPhone.map(link => {
      if (link.value != '' && link.title != '') {
        const linkElement = links.ele('link')
        linkElement.att('name', `link_${linkIndex}`)
        linkIndex++
        linkElement.att('title', link.title)
        if (isExport) {
          linkElement.att('url', parseMediaPath(memberWorkPath, allMedias, productData.rootPath, link.icon, false))
        } else {
          linkElement.att('url', `${parseMediaPath(memberWorkPath, allMedias, productData.rootPath, link.icon, true)}`)
        }
        linkElement.att('link_type', 1)
        linkElement.att('link', link.value)
      }
    })
  }
}

export const panosXmlData = (productData, configXmlNode, memberWorkPath, allMedias, isExport) => {
  const panos = configXmlNode.ele('panos')

  productData.panoGroups.map(group => {
    group.panos.map(pano => {
      const panoElement = panos.ele('pano')
      panoElement.att('name', `scene_${pano._id}`)

      const info = panoElement.ele('info')
      info.att('pano_id', pano._id)
      info.att('title', pano.name)

      const view = panoElement.ele('view')
      view.att('hlookat', pano.hAov)
      view.att('vlookat', pano.vAov)
      view.att('fov', pano.fov)
      view.att('fovtype', 'MFOV')
      view.att('maxpixelzoom', 2.0)
      view.att('fovmin', pano.fovMin)
      view.att('fovmax', pano.fovMax)
      view.att('vlookatmin', pano.vAovMin)
      view.att('vlookatmax', pano.vAovMax)
      view.att('autorotatekeepview', 0)
      view.att('loadscenekeepview', 0)

      panoElement.ele('start_image_pc')
      panoElement.ele('start_image_mobile')

      const hotspots = panoElement.ele('hotspots')

      let hotspotIndex = 0
      pano.hotspots.map(hotspotData => {
        if (hotspotData.error == '') {
          const hotspot = hotspots.ele('hotspot')
          hotspot.att('name', `hotspot_${hotspotIndex}`)
          hotspotIndex++
          if (hotspotData.animated) {
            hotspot.att('style_id', path.basename(hotspotData.icon, '.png'))
            hotspot.att('image_type', 1)
          } else {
            hotspot.att('image_type', 2)
            if (isExport) {
              hotspot.att('image_url', parseMediaPath(memberWorkPath, allMedias, productData.rootPath, hotspotData.icon, false))
            } else {
              hotspot.att('image_url', `${parseMediaPath(memberWorkPath, allMedias, productData.rootPath, hotspotData.icon, true)}`)
            }
          }

          hotspot.att('ath', hotspotData.ath)
          hotspot.att('atv', hotspotData.atv)
          hotspot.att('show_txt', hotspotData.typeProps.showTitle ? 1 : 0)
          hotspot.att('keep_view', 0)
          switch (hotspotData.type) {
            case 'SWITCH':
              hotspot.att('type', 0)
              hotspot.att('title', hotspotData.typeProps.title)
              hotspot.att('url', hotspotData.typeProps.panoId)
              hotspot.att('blend', hotspotData.typeProps.switchTypeId ? hotspotData.typeProps.switchTypeId : 0 )
              break
            case 'LINK':
              hotspot.att('type', 1)
              hotspot.att('url', hotspotData.typeProps.url)
              hotspot.att('title', hotspotData.typeProps.title)
              hotspot.att('is_blank', hotspotData.typeProps.openInNewWindow ? 1 : 0)
              break
            case 'ALBUM':
              hotspot.att('type', 2)
              hotspot.att('url', hotspotData.typeProps.url ? hotspotData.typeProps.url : '')
              hotspot.att('title', hotspotData.typeProps.title)
              hotspot.att('is_blank', hotspotData.typeProps.openInNewWindow ? 1 : 0)
              let imageIndex = 0
              hotspotData.typeProps.images.map(imageURL => {
                const imageElement = hotspot.ele('image')
                imageElement.att('name', `image_${imageIndex}`)
                imageElement.att('title', '')
                if (isExport) {
                  imageElement.att('url', parseMediaPath(memberWorkPath, allMedias, productData.rootPath, imageURL, false))
                } else {
                  imageElement.att('url', `${parseMediaPath(memberWorkPath, allMedias, productData.rootPath, imageURL, true)}`)
                }
                imageIndex++
              })
              break
            case 'VIDEO':
              hotspot.att('type', 3)
              hotspot.att('text', hotspotData.typeProps.src)
              hotspot.att('title', hotspotData.typeProps.title)
              hotspot.att('url', hotspotData.typeProps.url)
              hotspot.att('is_blank', hotspotData.typeProps.openInNewWindow ? 1 : 0)
              break
            case 'TEXT':
              hotspot.att('type', 4)
              hotspot.att('text', hotspotData.typeProps.text)
              hotspot.att('title', hotspotData.typeProps.title)
              hotspot.att('url', hotspotData.typeProps.url ? hotspotData.typeProps.url : '')
              hotspot.att('is_blank', hotspotData.typeProps.openInNewWindow ? 1 : 0)
              break
            case 'AUDIO':
              hotspot.att('type', 5)
              if (isExport) {
                hotspot.att('url', parseMediaPath(memberWorkPath, allMedias, productData.rootPath, hotspotData.typeProps.src, false))
              } else {
                hotspot.att('url', `${parseMediaPath(memberWorkPath, allMedias, productData.rootPath, hotspotData.typeProps.src, true)}`)
              }
              hotspot.att('title', hotspotData.typeProps.title)
              break
            case 'MIX':
              hotspot.att('type', 6)
              hotspot.att('url', hotspotData.typeProps.url ? hotspotData.typeProps.url : '')
              hotspot.att('title', hotspotData.typeProps.title)
              hotspot.att('is_blank', hotspotData.typeProps.openInNewWindow ? 1 : 0)
              let mixIndex = 0
              hotspotData.typeProps.images.map(imageURL => {
                const imageElement = hotspot.ele('image')
                imageElement.att('name', `image_${mixIndex}`)
                imageElement.att('title', '')
                if (isExport) {
                  imageElement.att('url', parseMediaPath(memberWorkPath, allMedias, productData.rootPath, imageURL, false))
                } else {
                  imageElement.att('url', `${parseMediaPath(memberWorkPath, allMedias, productData.rootPath, imageURL, true)}`)
                }
                if (hotspotData.typeProps.textMap.hasOwnProperty(keyEncoder(imageURL))) {
                  imageElement.att('text', `${hotspotData.typeProps.textMap[keyEncoder(imageURL)]}`)
                }

                if (hotspotData.typeProps.textMap) {
                  for (let key in hotspotData.typeProps.textMap) {
                    if (hotspotData.typeProps.textMap.hasOwnProperty(key) && key == imageURL) {
                        imageElement.att('text', `${hotspotData.typeProps.textMap[key]}`)
                    }
                  }
                }
                mixIndex++
              })

              break
            case 'VIEWER':
              hotspot.att('type', 7)
              hotspot.att('url', hotspotData.typeProps.url)
              hotspot.att('title', hotspotData.typeProps.title)
              hotspot.att('text', hotspotData.typeProps.text)
              hotspot.att('is_blank', hotspotData.typeProps.openInNewWindow ? 1 : 0)
              const imageElement = hotspot.ele('image')
              if (isExport) {
                imageElement.att('imagePath', parseMediaPath(memberWorkPath, allMedias, productData.rootPath, hotspotData.typeProps.imagePath, false))
              } else {
                imageElement.att('imagePath', `${parseMediaPath(memberWorkPath, allMedias, productData.rootPath, hotspotData.typeProps.imagePath, true)}`)
              }
              imageElement.att('ext', hotspotData.typeProps.ext)
              imageElement.att('size', hotspotData.typeProps.size)
              break
          }
        }
      })


      if(pano.assets) {
        const embeds = panoElement.ele('embeds')
        let embedIndex = 0
        pano.assets.map(embedData => {
          const embed = embeds.ele('embed')
          embed.att('name', `embed_${embedIndex}`)
          embedIndex++
          if (embedData.type == 'TEXT') {
            embed.att('embed_type', 1)
            if (embedData.props.text) {
              embed.att('text', embedData.props.text)
            }
          } else if (embedData.type == 'IMAGE') {
            embed.att('embed_type', 2)
            embed.att('play_type', embedData.props.playType == 'CLICK' ? 1 : 0)
            embed.att('scale', embedData.props.scale)
            embed.att('interval', embedData.props.interval)
            let imageIndex = 0
            if(embedData.props.images) {
              embedData.props.images.map(imageURL => {
                const embedElement = embed.ele('image')
                embedElement.att('name', `image_${imageIndex}`)
                if (isExport) {
                  embedElement.att('url', parseMediaPath(memberWorkPath, allMedias, productData.rootPath, imageURL, false))
                } else {
                  embedElement.att('url', `${parseMediaPath(memberWorkPath, allMedias, productData.rootPath, imageURL, true)}`)
                }
                imageIndex++
              })
            }
          }
          embed.att('ath', embedData.ath)
          embed.att('atv', embedData.atv)
        })
      }


      if (pano.music.src) {
        const sound = panoElement.ele('sound')
        if (isExport) {
          sound.att('url', parseMediaPath(memberWorkPath, allMedias, productData.rootPath, pano.music.src, false))
        } else {
          sound.att('url', `${parseMediaPath(memberWorkPath, allMedias, productData.rootPath, pano.music.src, true)}`)
        }
      }



      if (pano.voice && pano.voice.src) {
        const voice = panoElement.ele('voice')
        if (isExport) {
          voice.att('url', parseMediaPath(memberWorkPath, allMedias, productData.rootPath, pano.voice.src, false))
        } else {
          voice.att('url', `${parseMediaPath(memberWorkPath, allMedias, productData.rootPath, pano.voice.src, true)}`)
        }
      }


      if (pano.mask && pano.mask.top) {
        const topCircle = panoElement.ele('top_circle')
        if(pano.mask.topFloat !== undefined) {
          topCircle.att('is_float', pano.mask.topFloat ? 1 : 0)
        } else {
          topCircle.att('is_float', 0)
        }
        topCircle.att('type', 2)
        if (isExport) {
          topCircle.att('url', parseMediaPath(memberWorkPath, allMedias, productData.rootPath, pano.mask.top, false))
        } else {
          topCircle.att('url', `${parseMediaPath(memberWorkPath, allMedias, productData.rootPath, pano.mask.top, true)}`)
        }
      }

      if (pano.mask && pano.mask.bottom) {
        const bottomCircle = panoElement.ele('bottom_circle')
        if(pano.mask.bottomFloat !== undefined) {
          bottomCircle.att('is_float', pano.mask.bottomFloat ? 1 : 0)
        } else {
          bottomCircle.att('is_float', 0)
        }
        bottomCircle.att('type', 2)
        if (isExport) {
          bottomCircle.att('url', parseMediaPath(memberWorkPath, allMedias, productData.rootPath, pano.mask.bottom, false))
        } else {
          bottomCircle.att('url', `${parseMediaPath(memberWorkPath, allMedias, productData.rootPath, pano.mask.bottom, true)}`)
        }
      }

      const sunlight = panoElement.ele('sun')
      if (pano.effects.sunlightShow) {
        sunlight.att('enabled', 1)
        sunlight.att('id', 2)
        sunlight.att('ath', pano.effects.sunlightAth)
        sunlight.att('atv', pano.effects.sunlightAtv)
      }


      if (pano.effects.rainLevel > 0) {
        const weather = panoElement.ele('weather')
        weather.att('id', 1)
        weather.att('size', pano.effects.rainLevel)
      } else if (pano.effects.snowLevel > 0) {
        const weather = panoElement.ele('weather')
        weather.att('id', 0)
        weather.att('size', pano.effects.snowLevel)
      } else if (pano.effects.customLevel > 0) {
        const weather = panoElement.ele('weather')
        weather.att('id', 4)
        weather.att('size', pano.effects.customLevel)
        if (isExport) {
          weather.att('url', parseMediaPath(memberWorkPath, allMedias, productData.rootPath, pano.effects.customSrc, false))
        } else {
          weather.att('url', `${parseMediaPath(memberWorkPath, allMedias, productData.rootPath, pano.effects.customSrc, true)}`)
        }
      }


      if (pano.sandTable && pano.sandTable.src) {
        const sandTable = panoElement.ele('radar')
        sandTable.att('enabled', 1)
        sandTable.att('opened', pano.sandTable.autoOpen ? 1 : 0)
        if (pano.sandTable.angle !== undefined) {
          sandTable.att('x', pano.sandTable.left * 480 )
          sandTable.att('y', pano.sandTable.top * 480 )
          sandTable.att('heading_offset', pano.sandTable.angle)
        }
        if (isExport) {
          sandTable.att('map_url', parseMediaPath(memberWorkPath, allMedias, productData.rootPath, pano.sandTable.src, false))
        } else {
          sandTable.att('map_url', `${parseMediaPath(memberWorkPath, allMedias, productData.rootPath, pano.sandTable.src, true)}`)
        }

        productData.panoGroups.map((group) => {
          group.panos.map((sandTablePano) => {
            if(sandTablePano.sandTable && sandTablePano.sandTable.src == pano.sandTable.src && sandTablePano != pano && sandTablePano.sandTable.angle !== undefined) {
              const sandTableSpot = sandTable.ele('radarspot')
              sandTableSpot.att('name', `r${sandTablePano._id}`)
              sandTableSpot.att('title', sandTablePano.name)
              sandTableSpot.att('x', sandTablePano.sandTable.left * 480)
              sandTableSpot.att('y', sandTablePano.sandTable.top * 480)
              sandTableSpot.att('linkedscene', sandTablePano._id)
            }
          })
        })
      }



    })
  })
}
