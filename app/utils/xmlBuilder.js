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
    cube.attribute('url','http://localhost:8000/assets/vr/folder_4_vr_11/scene_6/mobile_%s.jpg')

    // for (let i = 0; i < data.multires.length; i++) {
    //     const level = image.ele('level')
    //     level.att('tiledimagewidth', data.multires[i])
    //     level.att('tiledimageheight', data.multires[i])

    //     const cube = level.ele('cube')
    //     cube.att('url', path.join(data.rootPath, 'pano.tiles', `mres_%s/l${data.multires.length - i}/%v/l${data.multires.length - i}_%s_%v_%h.jpg`))
    // }

    return krpano.doc().end()
}

// 数据结构
/*
{
    "panoGroups": [
        {
            "_id": "ao7x7m65z2swtj",
            "name": "默认分组",
            "panos": [
                {
                    "hAov": 0,
                    "vAovMin": -90,
                    "effects": {},
                    "assets": [],
                    "hotspots": [],
                    "music": {},
                    "fovMin": 70,
                    "rootPath": "C:\\Program Files\\720yun\\d99jOdskzn6\\.panorama\\y5e2zeya38tp876yh8",
                    "multires": [
                        2560,
                        1024
                    ],
                    "imgRatio": "",
                    "gps": "",
                    "sandTable": {},
                    "createDate": 1522826882,
                    "pid": "y5e2zeya38tp876yh8",
                    "name": "mobile_",
                    "mask": {},
                    "fov": 95,
                    "exif": "",
                    "desc": "",
                    "voice": {},
                    "vAov": 0,
                    "vAovMax": 90,
                    "inTrash": false,
                    "thumb": "\\pano.tiles\\thumb.jpg",
                    "updateDate": 1522826882,
                    "fovMax": 120,
                    "_id": "oxgizHzxleKxwN9k",
                    "thumbPath": "C:\\Program Files\\720yun\\d99jOdskzn6\\.panorama\\y5e2zeya38tp876yh8\\pano.tiles\\thumb.jpg",
                    "imgType": 1
                }
            ]
        }
    ],
    "rootPath": "C:\\Program Files\\720yun\\d99jOdskzn6\\.product\\x7ene48olq0rgmoyu3",
    "usedMedia": {
        "basic": [],
        "edit": []
    },
    "processTitle": "",
    "folderId": "t7UEg7sN76rGEvJN",
    "createDate": 1524211594,
    "pid": "x7ene48olq0rgmoyu3",
    "logo": {
        "img": "\\media\\720yunLOGO.png",
        "url": "http://720yun.com"
    },
    "name": "阿斯顿按时【表情】",
    "panoDefault": {
        "hAov": 0,
        "vAovMin": -90,
        "effects": {},
        "assets": [],
        "hotspots": [],
        "music": {},
        "fovMin": 70,
        "sandTable": {},
        "mask": {},
        "fov": 95,
        "voice": {},
        "vAov": 0,
        "vAovMax": 90,
        "fovMax": 120
    },
    "isSyncCloud": false,
    "onProcess": false,
    "desc": "",
    "linkAndPhone": [
        {
            "icon": "\\media\\720yun_link.png",
            "typeName": "链接",
            "typeId": "link",
            "value": "",
            "title": ""
        },
        {
            "icon": "\\media\\720yun_link.png",
            "typeName": "链接",
            "typeId": "link",
            "value": "",
            "title": ""
        },
        {
            "icon": "\\media\\720yun_link.png",
            "typeName": "链接",
            "typeId": "link",
            "value": "",
            "title": ""
        }
    ],
    "inTrash": false,
    "thumb": "\\thumb.jpg",
    "updateDate": 1524211594,
    "_id": "1ke58Cby4fmyeMyC"
}
*/
