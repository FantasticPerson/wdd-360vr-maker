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
    }
];
