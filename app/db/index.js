import Dexie from 'dexie';
import migrations from './migrations';
import modals from '../modals';

export default () => {
    const app_db = new Dexie('wdd-vr-maker');
    window.app_db = app_db;

    migrations.forEach((migration, idx) => {
        migrationVersion(migration, app_db);
        binModelCls(migration.stores);
    });

    return app_db.open();
};

function migrationVersion(migration, app_db) {
    const stores = migration.stores;
    const newStores = {};
    Object.keys(stores).forEach(storeName => {
        newStores[storeName] = filterStoreIndex(stores[storeName]).join(',');
    });

    const dexieVersionInst = app_db.version(migration.ver);
    dexieVersionInst.stores(newStores);

    if (migration.upgrade) {
        dexieVersionInst.upgrade(migration.upgrade);
    }
}

let filterStoreIndex = (indexes) => indexes
    .filter((index) => {
        if (!index || '') return false;
        return !(index.charAt(0) === '!');
    });

function binModelCls(stores) {
    Object.keys(stores).forEach(storeName => {
        const modelName = uppercaseCapitalChar(storeName);
        const modelCls = modals[modelName];
        if (!modelCls) return;

        const storeIns = app_db[storeName];
        modelCls.store = storeIns;

        storeIns.mapToClass(modelCls, modelCls.schema);
    });
}

let uppercaseCapitalChar = (value) => {
    if (!value) return value;

    return value.charAt(0).toUpperCase() + value.substr(1);
};
