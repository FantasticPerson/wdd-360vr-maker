export default class Vr { }

Vr.store = null

Vr.findAll = ()=>{
    return Vr.store.toArray()
}

Vr.add = (obj)=>{
    return Vr.store.put(obj)
}

Vr.update = (obj)=>{
    return Vr.add(obj)
}

Vr.delete = (id)=>{
    return Vr.store.delete(id)
}