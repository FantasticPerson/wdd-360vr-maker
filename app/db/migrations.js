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
                'vrid'
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
            ]
            
        },
        upgrade: null
    },
    {
        ver: 2,
        stores: {
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
            ]
        }
    },
    {
        ver: 3,
        stores: {
            picture:[
                'id',
                'extension'
            ]
        }
    },
    {
        ver: 4,
        stores: {
            audio:[
                'id',
                'extension'
            ],
            video:[
                'id',
                'url'
            ]
        }
    }
];
