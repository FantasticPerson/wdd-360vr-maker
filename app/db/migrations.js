export default [
    {
        ver: 1,
        stores: {
            userInfo: [
                'id',
                'name',
                'avatar'
            ],
            vr: [
                'id',
                'title',
                'brief',
                'folderId',
                'headImg',
                'tabs'
            ],
            scene: [
                'id',
                'name',
                'vrid',
                'action',
                'groupId'
            ],
            folder: [
                'id',
                'name'
            ],
            group: [
                'id',
                'name',
                'folderId',
                'vrId'
            ],
            hotpot:[
                'id',
                'type',
                'typeProps',
                'animated',
                'icon',
                'ath',
                'atv',
                'action',
                'sceneId'
            ],
            audio:[
                'id',
                'extension'
            ],
            video:[
                'id',
                'url'
            ]
            
        },
        upgrade: null
    },{
        ver: 2,
        stores: {
            picture:[
                'id',
                'extension'
            ]
        }
    },{
        ver: 3,
        stores: {
            scene: [
                'id',
                'name',
                'vrid',
                'action',
                'groupId',
                'hlookat',
                'vlookat',
                'fov',
                'fovmin',
                'fovmax',
                'vlookatmin',
                'vlookatmax'
            ]
        }
    },{
        ver: 4,
        stores: {
            scene: [
                'id',
                'name',
                'vrid',
                'action',
                'groupId',
                'hlookat',
                'vlookat',
                'fov',
                'fovmin',
                'fovmax',
                'vlookatmin',
                'vlookatmax',
                'effectType',
                'effectLevel'
            ]
        }
    },{
        ver: 5,
        stores:{
            vr: [
                'id',
                'title',
                'brief',
                'folderId',
                'headImg',
                'tabs',
                'music1',
                'music2'
            ]
        }
    }
];
