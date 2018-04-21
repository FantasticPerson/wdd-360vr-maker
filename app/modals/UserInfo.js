export default class UserInfo { }

UserInfo.store = null;

UserInfo.findAll = () => UserInfo.store.toArray();

UserInfo.add = (obj) => UserInfo.store.put(obj);

UserInfo.update = (obj) => UserInfo.add(obj);

UserInfo.delete = (id) => UserInfo.store.delete(id);
