export default class Folder { }

Folder.store = null;

Folder.findAll = () => Folder.store.toArray();
Folder.add = (obj) => Folder.store.put({ ...obj, timestamp: (new Date().valueOf()) });
Folder.update = (obj) => Folder.store.where("id").equals(obj.id).modify({ title: obj.title });
Folder.delete = (id) => Folder.store.delete(id);
