export default class Folder { }

Folder.store = null;

Folder.findAll = () => Folder.store.toArray();

Folder.add = (obj) => Folder.store.put(obj);

Folder.update = (obj) => Folder.store.add(obj);

Folder.delete = (id) => Folder.store.delete(id);
