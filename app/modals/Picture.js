export default class Picture { }

Picture.store = null

Picture.findAll = ()=> Picture.store.toArray();
Picture.add = (obj)=> Picture.store.put({...obj,timestamp:(new Date().valueOf())})
Picture.delete = (id) => Picture.store.delete(id)