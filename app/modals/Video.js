export default class Video { }

Video.store = null

Video.findAll = () => Video.store.toArray();
Video.add = (obj) => Video.store.put({...obj,timestamp:(new Date().valueOf())});
Video.delete = (id) => Video.store.delete(id);
Video.update = (obj) => {
    return Video.store.where("id").equals(obj.id).modify({title: obj.title});
}
