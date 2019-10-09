export default class Vr { }

Vr.store = null;

Vr.findAll = () => Vr.store.toArray();
Vr.findByFolderId = (folderId) => Vr.store.where('folderId').equals(folderId).toArray()
Vr.add = (obj) => Vr.store.put({ ...obj, timestamp: (new Date().valueOf()) });
Vr.delete = (id) => Vr.store.delete(id);
Vr.update = (obj) => {
    return Vr.store.where("id").equals(obj.id).modify({
        title: obj.title,
        brief: obj.brief,
        folderId: obj.folderId,
        headImg: obj.headImg,
        music1: obj.music1,
        music2: obj.music2
    });
}

