export default class Common{ }

Common.KR_VERSION = '1.19-pr7'
Common.KR_EMBED = { 
    xml: './krpano/edit_api.xml', 
    html5: 'only+webgl+preservedrawingbuffer', 
    mobilescale: 1.0, 
    passQueryParameters: true 
}
Common.KR_EMBED_PREVIEW = { 
    xml: './krpano/krp_empty.xml', 
    html5: 'auto', 
    mobilescale: 1.0, 
    passQueryParameters: true 
}
Common.PANO_DEFAULT = {
    fov: 95,
    fovMin: 70,
    fovMax: 120,
    vAov: 0,
    vAovMin: -90,
    vAovMax: 90,
    hAov: 0,
    music: {},
    voice: {},
    effects: {},
    mask: {},
    hotspots: [],
    assets: [],
    sandTable: {}
}