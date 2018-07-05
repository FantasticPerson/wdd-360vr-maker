export default class Scene { }

Scene.store = null;

Scene.findAll = () => {
    return Scene.store.toArray()
}

Scene.add = (obj) => Scene.store.put({...obj,timestamp:(new Date().valueOf())});

Scene.update = (obj) => Scene.add(obj);

Scene.delete = (id) => Scene.store.delete(id);
