export default class Scene { }

Scene.store = null;

Scene.findAll = () => Scene.store.toArray();

Scene.add = (obj) => Scene.store.put(obj);

Scene.update = (obj) => Scene.add(obj);

Scene.delete = (id) => Scene.store.delete(id);
