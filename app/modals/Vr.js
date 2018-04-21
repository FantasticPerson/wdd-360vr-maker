export default class Vr { }

Vr.store = null;

Vr.findAll = () => Vr.store.toArray();

Vr.add = (obj) => Vr.store.put(obj);

Vr.update = (obj) => Vr.add(obj);

Vr.delete = (id) => Vr.store.delete(id);
