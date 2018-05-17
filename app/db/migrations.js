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
            ],
            hotpot:[
                'id',
                'name',
                'targetId',
                'sceneId'
            ]
        },
        upgrade: null
    }
];
