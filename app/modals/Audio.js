export default class Audio { }

Audio.store = null

Audio.findAll = () => Audio.store.toArray();
Audio.add = (obj) => Audio.store.put({...obj,timestamp:(new Date().valueOf())});
Audio.update = (obj) => Audio.store.where("id").equals(obj.id).modify({title: obj.title});
Audio.delete = (id) => Audio.store.delete(id);