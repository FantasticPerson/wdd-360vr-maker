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
                'tabs',
                'music1',
                'music2'
            ],
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
            ],
            picture:[
                'id',
                'extension'
            ]
        },
        upgrade: null
    }
];
