export default class Scene { }

Scene.store = null;

Scene.findAll = () => {
    return Scene.store.toArray()
}

Scene.add = (obj) => Scene.store.put({...obj,timestamp:(new Date().valueOf())});

Scene.update = (obj) => Scene.add(obj);

Scene.updateAllScene = (arr) => {
    let promiseArr = arr.map(obj=>{
        return  Scene.add(obj)
    })
    return Promise.all(promiseArr)   
}

Scene.delete = (id) => Scene.store.delete(id);
