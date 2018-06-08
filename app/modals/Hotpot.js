export default class Hotpot { }

Hotpot.store = null;

Hotpot.findAll = () => Hotpot.store.toArray();

Hotpot.add = (obj) => Hotpot.store.put(obj);

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

Hotpot.delete = (id) => Hotpot.store.delete(id); 