export default class Scene { }

Scene.store = null;

Scene.findAll = () => Scene.store.toArray()
Scene.add = (obj) => Scene.store.put({ ...obj, timestamp: (new Date().valueOf()) });
Scene.update = (obj) => Scene.add(obj);
Scene.delete = (id) => Scene.store.delete(id);
Scene.updateAllScene = (arr) => {
    let promiseArr = arr.map(obj => Scene.add(obj))
    return Promise.all(promiseArr)
}

