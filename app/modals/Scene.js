export default class Scene { }

Scene.store = null;

Scene.findAll = () => Scene.store.toArray()
Scene.findAllSceneById = (id) => Scene.store.where('vrid').equals(id).toArray()
Scene.add = (obj) => Scene.findAllSceneById(obj.vrid).then((list) => {
    let index = list.length + 1
    return Scene.store.put({
        index:index,
        ...obj,
        timestamp: (new Date().valueOf())
    })
})

Scene.update = (obj) => Scene.add(obj);
Scene.delete = (id) => Scene.store.delete(id);
Scene.updateAllScene = (arr) => Promise.all(arr.map(obj => Scene.add(obj)))
