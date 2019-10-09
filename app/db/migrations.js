export default [
    {
        ver: 1,
        stores: {
            userInfo: [
                'id',
                'name',
                'avatar',
                'timestamp'
            ],
            vr: [
                'id',
                'title',
                'brief',
                'folderId',
                'headImg',
                'tabs',
                'music1',
                'music2',
                'timestamp',
                'state' // 0 => 未保存 1 => 已保存
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
                'effectLevel',
                'timestamp',
                'sunlight',
                'music1',
                'music2',
                'index'
            ],
            folder: [
                'id',
                'name',
                'timestamp'
            ],
            group: [
                'id',
                'title',
                'vrId',
                'timestamp',
                'music1',
                'music2',
                'sceneListIds'
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
                'sceneId',
                'timestamp'
            ],
            audio:[
                'id',
                'extension',
                'timestamp',
                'showName'
            ],
            video:[
                'id',
                'url',
                'timestamp'
            ],
            picture:[
                'id',
                'extension',
                'timestamp',
                'showName'
            ]
        },
        upgrade: null
    }
];
