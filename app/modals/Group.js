export default class Group { }

Group.store = null;

Group.findAll = () => Group.store.toArray();
Group.findByVrid = (id)=>Group.store.where('vrId').equals(id).toArray();
Group.add = (obj) => Group.store.put({ ...obj, timestamp: (new Date().valueOf()) })
Group.delete = (id) => Group.store.delete(id)
Group.updateAllGroup = (arr) => Promise.all(arr.map(obj => Group.update(obj)))
Group.update = (obj) => {
    return Group.store.where('id').equals(obj.id).modify({
        title: obj.title,
        folderId: obj.folderId,
        vrId: obj.vrId,
        music1: obj.music1,
        music2: obj.music2,
        sceneListIds: obj.sceneListIds
    })
}
