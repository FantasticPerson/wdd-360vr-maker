import path from 'path'

export function addHotspotToKrpano(krpano, data, autoSelect = false) {
  const icon = data.icon
//   const krpIcon = data.animated ? icon.replace(path.extname(icon), `_gif${path.extname(icon)}`) : icon
  krpano.call(`add_hotspot(${data._id},${icon},${data.ath},${data.atv},${data.animated},${autoSelect});`)
}

export function updateHotspotIcon(krpano, id, icon, animated) {
  const krpIcon = icon
  krpano.call(`update_hotspot_image(${id},${krpIcon},${animated})`)
}

export function updateHotspotText(krpano, id, text) {
  krpano.call(`update_hotspot_txt(${id},${text})`)
}

export function removeHotspotFromKrpano(krpano, id) {
  krpano.call(`remove_hotspot(${id});`)
}

export function selectHotspotInKrpano(krpano, id) {
  krpano.call(`update_hotspot_selected(${id});`)
}

export function changeKrpanoViewById(krpano, id) {
  krpano.call(`looktohotspot(${id});`)
}

export function addSunlightToKrpano(krpano, ath, atv) {
  krpano.call(`add_sun_hotspot(${ath},${atv});`)
}

export function removeSunlightFromKrpano(krpano) {
  krpano.call('remove_sun_hotspot();')
}

export function addMaskToKrpano(krpano, position, src, isFLoat) {
  krpano.call(`add_${position}_mask(${src},${isFLoat});`)
}

export function removeMaskFromKrpano(krpano, position) {
  krpano.call(`remove_${position}_mask();`)
}

export function updateMaskFloatInKrpano(krpano, position, isFLoat) {
  krpano.call(`update_${position}_mask_float(${isFLoat});`)
}

export function addRainEffect(krpano, level) {
  krpano.call(`add_rain(${level});`)
}

export function addSnowEffect(krpano, level) {
  krpano.call(`add_snow(${level});`)
}

export function addCustomEffect(krpano, src, level) {
  krpano.call(`add_image_rain(${src}, ${level});`)
}

export function turnViewToMask(krpano, position) {
  if (position === 'top') {
    krpano.call('lookto(get(view.hlookat),-90);')
  } else if (position === 'bottom') {
    krpano.call('lookto(get(view.hlookat),90);')
  }
}

export function addImageAssetToKrpano(krpano, data, img = null) {
  krpano.call(`add_embed_image(${data._id},${img},${data.ath},${data.atv},${data.props.scale});`)
}

export function addTextAssetToKrpano(krpano, data) {
  krpano.call(`add_embed_txt(${data._id},${data.props.text},${data.ath},${data.atv});`)
}

export function selectImageAssetInKrpano(krpano, id) {
  krpano.call(`update_embed_image_selected(${id});`)
}

export function selectTextAssetInKrpano(krpano, id) {
  krpano.call(`update_embed_txt_selected(${id});`)
}

export function unselectAssetInKrpano(krpano) {
  krpano.call('update_embed_image_selected(null);')
  krpano.call('update_embed_txt_selected(null);')
}

export function removeImageAssetFromKrpano(krpano, id) {
  krpano.call(`remove_embed_image(${id});`)
}

export function removeTextAssetFromKrpano(krpano, id) {
  krpano.call(`remove_embed_txt(${id});`)
}

export function updateImageAsset(krpano, data, img = null) {
  krpano.call(`update_embed_image(${data._id},${img},${data.ath},${data.atv},${data.props.scale})`)
}

export function updateTextAsset(krpano, data) {
  krpano.call(`update_embed_txt(${data._id},${data.props.text},${data.ath},${data.atv});`)
}
