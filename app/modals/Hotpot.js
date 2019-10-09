export default class Hotpot { }

Hotpot.store = null;

Hotpot.findAll = () => Hotpot.store.toArray();
Hotpot.findBySceneId = (id)=>{
    return Hotpot.store.where('sceneId').equals(id).toArray()
}
Hotpot.add = (obj) => Hotpot.store.put({...obj,timestamp:(new Date().valueOf())});
Hotpot.delete = (id) => Hotpot.store.delete(id); 
Hotpot.update = (obj) => {
    return Hotpot.store.where("id").equals(obj.id).modify({
        name:obj.name,
        targetId:obj.targetId,
        sceneId:obj.sceneId,
        action:obj.action,
        ath:obj.ath,
        atv:obj.atv,
        icon:obj.icon
    });
}
