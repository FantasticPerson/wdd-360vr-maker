import Dexie from 'dexie'
import migrations from './migrations'
import modals from '../modals'

export default ()=>{
    let app_db = new Dexie('wdd-vr-maker')

    window.app_db = app_db

    migrations.forEach((migration,idx)=>{
        migrationVersion(migration,app_db);
        binModelCls(migration.stores)
    })

    return app_db.open()
}

function migrationVersion(migration,app_db){
    let stores = migration.stores
    let newStores = {}
    Object.keys(stores).forEach(storeName=>{
        newStores[storeName] = filterStoreIndex(stores[storeName]).join(',')
    })

    let dexieVersionInst = app_db.version(migration.ver);
    dexieVersionInst.stores(newStores);

    if(migration.upgrade){
        dexieVersionInst.upgrade(migration.upgrade)
    }
}

let filterStoreIndex = (indexes) => {
    return indexes
        .filter((index)=>{
            if(!index || '') return false;
            return !(index.charAt(0) === '!');
        })
}

function binModelCls(stores) {
    Object.keys(stores).forEach(storeName => {
      let modelName = uppercaseCapitalChar(storeName);
      let modelCls = modals[modelName];
      if(!modelCls) return;
  
      let storeIns = app_db[storeName];
      modelCls.store = storeIns;
  
      storeIns.mapToClass(modelCls, modelCls.schema);
    });
}

let uppercaseCapitalChar = (value) => {
    if(!value) return value;
  
    return value.charAt(0).toUpperCase() + value.substr(1);
}
