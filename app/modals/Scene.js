export default class Scene { }

Scene.store = null

Scene.findAll = ()=> {
    return Scene.store.toArray()
}

Scene.add = (obj)=>{
    return Scene.store.put(obj)
}

Scene.update = (obj)=>{
    return Scene.add(obj)
}

Scene.delete = (id)=>{
    return Scene.store.delete(id)
}