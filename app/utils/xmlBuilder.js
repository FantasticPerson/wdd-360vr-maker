const xmlBuilder = require('xmlbuilder');

export default function builder(data) {
  const krpano = xmlBuilder.create('krpano');

  const include = krpano.ele('include');
  include.att('url', 'default');

  const skinSetting = krpano.ele('skin_settings');
  const settingData = data.setting;

  Object.keys(settingData).forEach(key => {
    skinSetting.att(key, settingData[key]);
  });
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
