import { createSelector } from 'reselect'

export const vrContainerConfig = {
    vrList: true,
    vrListToShow: true,
    sceneList: true,
    folderSelectedId: true,
    nextVrId: true,
    nextSceneId: true
}

export const editEffectConfig = {
    sceneSelectedItem: true,
    sceneSelected: true
}

export const panoConfig = {
    hotpotList: true,
    sceneSelected: true,
    sceneSelectedItem: true
}

export const editMusicConfig = {
    groupSelectId: true,
    groupList: true,
    vrItem: true,
    groupSelectItem: true,
    sceneSelected: true,
    sceneSelectedItem: true,
    sceneList: true
}

export function getSelector(config) {
    return createSelector(
        state => state.app.title,
        state => state.app.showBack,
        state => state.vr.list,
        state => state.hotpot.list,
        state => state.scene.list,
        state => state.router.location.pathname,
        state => state.folder.list,
        state => state.folder.selectId,
        state => state.hotpot.selected,
        state => state.scene.sceneSelected,
        state => state.krpano.obj,
        state => state.group.list,
        state => state.group.selectId,
        state => state.app.showType,
        state => state.picture.list,
        state => state.audio.list,

        (title, showBack, vrList, hotpotList, sceneList, pathname, folderList, folderSelectedId, hotpotSelectId, sceneSelected, krpano, groupList, groupSelectId, showType, picList, audioList) => {
            let result = {}
            if (config.title) result.title = title
            if (config.showBack) result.showBack = showBack
            if (config.vrList) result.vrList = vrList
            if (config.vrListToShow) result.vrListToShow = getVrByFolderId(vrList, folderSelectedId)
            if (config.vrId) result.vrId = pathname.split('/')[2]
            if (config.vrItem) result.vrItem = findVrItem(vrList, pathname)
            if (config.folderId) result.folderId = findFolderId(vrList, pathname)
            if (config.sceneList) result.sceneList = filterScene(sceneList, pathname, groupSelectId, groupList)
            if (config.allSceneList) result.allSceneList = filterAllScene(sceneList, pathname)
            if (config.hotpotList) result.hotpotList = hotpotList
            if (config.folderList) result.folderList = folderList
            if (config.folderSelectedId) result.folderSelectedId = folderSelectedId
            if (config.nextVrId) result.nextVrId = getNextId(vrList, 0)
            if (config.nextFolderId) result.nextFolderId = getNextId(folderList, 2)
            if (config.nextSceneId) result.nextSceneId = getNextId(sceneList, 0)
            if (config.sceneSelected) result.sceneSelected = sceneSelected
            if (config.hotpotSelectedId) result.hotpotSelectedId = hotpotSelectId
            if (config.hotpotSelected) result.hotpotSelected = getTheHotSpot(hotpotSelectId, sceneSelected, hotpotList)
            if (config.krpano) result.krpano = krpano
            if (config.sceneSelectedItem) result.sceneSelectedItem = getSceneSelectItem(sceneList, sceneSelected)
            if (config.groupList) result.groupList = getGroupList(groupList, pathname)
            if (config.groupSelectId) result.groupSelectId = groupSelectId
            if (config.groupSelectItem) result.groupSelectItem = getGroupSelectItem(groupList, groupSelectId)
            if (config.appShowType) result.showType = showType
            if (config.picList) result.picList = picList
            if (config.audioList) result.audioList = audioList

            return result
        }
    )
}

function getGroupSelectItem(list, id) {
    let item = list.find((item) => {
        return item.id == id
    })

    return item
}

function getGroupList(list, pathname) {
    let id = pathname.split('/')[2]
    return list.filter((item) => {
        return item.vrId === id
    })
}

function getVrByFolderId(list, id) {
    return list.filter((item) => {
        return item.folderId === id
    })
}

function getSceneSelectItem(list, id) {
    return list.find(item => item.id == id)
}

function getTheHotSpot(selectedId, sceneId, oList) {
    let list = filterHotSpot(oList, sceneId)
    let item = list.find((item) => {
        return item.id == selectedId
    })
    return item
}

function filterHotSpot(list, sceneSelected) {
    return list.filter((item) => {
        return item.sceneId == sceneSelected
    })
}

function findVrItem(vrList, pathname) {
    let vrId = pathname.split('/')[2]
    console.log(vrId)
    return vrList.find((item) => {
        return item.id == vrId
    })
}

function filterScene(list, pathname, groupId, groupList) {
    var vrId = pathname.split('/')[2]

    let groupItem = getGroupSelectItem(groupList, groupId)
    if (groupItem) {
        let ids = groupItem.sceneListIds || []
        return list.filter((item) => {
            return item.vrid == vrId && ids.indexOf(item.id) >= 0
        })
    }
    return []
}

function filterAllScene(list, pathname) {
    var vrId = pathname.split('/')[2]
    return list.filter((item) => {
        return item.vrid == vrId
    })
}

function findFolderId(vrList, pathname) {
    var vrId = pathname.split('/')[2]
    let item = vrList.find((item) => {
        return item.id == vrId
    })
    return item ? item.folderId : -1
}

function getNextId(arr, startIndex) {
    let id = startIndex;
    arr.map(item => {
        if (item.id > id) {
            id = item.id;
        }
    });
    return ++id;
};


