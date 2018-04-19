export default class UserInfo { }

UserInfo.store = null 

UserInfo.findAll = ()=>{
    return UserInfo.store.toArray()
}

UserInfo.add = (obj)=>{
    return UserInfo.store.put(obj)
}

UserInfo.update = (obj)=>{
    return UserInfo.add(obj)
}

UserInfo.delete = (id)=>{
    return UserInfo.store.delete(id)
}