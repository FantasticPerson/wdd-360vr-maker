export default class Folder{ }

Folder.store = null

Folder.findAll = ()=>{
    return Folder.store.toArray()
}

Folder.add = (obj)=>{
    return Folder.store.put(obj)
}

Folder.update = (obj)=>{
    return Folder.store.add(obj)
}

Folder.delete = (id)=>{
    return Folder.store.delete(id)
}