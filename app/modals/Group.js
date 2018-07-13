export default class Group{ }

Group.store = null;

Group.findAll = ()=> Group.store.toArray();

Group.add = (obj)=>Group.store.put({...obj,timestamp:(new Date().valueOf())})

Group.update = (obj)=>{
    return Group.store.where('id').equals(obj.id).modify({
        title:obj.title,
        folderId:obj.folderId,
        vrId:obj.vrId,
        music1:obj.music1,
        music2:obj.music2
    })
}

Group.updateAllGroup = (arr) => {
    let promiseArr = arr.map(obj=>{
        return Group.store.where('id').equals(obj.id).modify({
            title:obj.title,
            folderId:obj.folderId,
            vrId:obj.vrId,
            music1:obj.music1,
            music2:obj.music2
        })
    })
    return Promise.all(promiseArr)   
}

Group.delete = (id)=>Group.store.delete(id)