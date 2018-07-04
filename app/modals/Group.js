export default class Group{ }

Group.store = null;

Group.findAll = ()=> Group.store.toArray();

Group.add = (obj)=>Group.store.put({...obj,timestamp:(new Date().valueOf()))

Group.update = (obj)=>{
    return Group.store.where('id').equals(obj.id).modify({
        'name':obj.name,
        'folderId':obj.folderId,
        'vrId':obj.vrId
    })
}

Group.delete = (id)=>Group.store.delete(id)