export default class Vr { }

Vr.store = null;

Vr.findAll = () => Vr.store.toArray();

Vr.add = (obj) => Vr.store.put(obj);

Vr.update = (obj) => {
    return Vr.store.where("id").equals(obj.id).modify({
        title:obj.title,
        brief:obj.brief,
        folderId:obj.folderId,
        headImg:obj.previewImg
    });
}

Vr.delete = (id) => Vr.store.delete(id);
