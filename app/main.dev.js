/* eslint global-require: 0, flowtype-errors/show-errors: 0 */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `npm run build` or `npm run build-main`, this file is compiled to
 * `./app/main.prod.js` using webpack. This gives us some performance wins.
 *
 * @flow
 */
import { app, BrowserWindow,globalShortcut } from 'electron';
import MenuBuilder from './menu';
import { globalAgent } from 'http';
import initServer from './server'

const path = require('path');
const fs = require('fs');

let mainWindow = null;

if (process.env.NODE_ENV === 'production') {
    const sourceMapSupport = require('source-map-support');
    sourceMapSupport.install();
}

if (process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true') {
    require('electron-debug')();
    const path = require('path');
    const p = path.join(__dirname, '..', 'app', 'node_modules');
    require('module').globalPaths.push(p);
}

const installExtensions = async () => {
    const installer = require('electron-devtools-installer');
    const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
    const extensions = [
        'REACT_DEVELOPER_TOOLS',
        'REDUX_DEVTOOLS'
    ];

    return Promise
        .all(extensions.map(name => installer.default(installer[name], forceDownload)))
        .catch(console.log);
};

const initConfig = async () => {
    global.__ELECTRON__ == true;
    global.electron = require('electron');
    global.electron_app = global.electron.app;
    global.electron_app_path = electron_app.getAppPath();


    if (process.env.NODE_ENV === 'development') {
        global.electron_app_root_path = path.resolve(electron_app.getPath('exe'), '../../../../app/dist');
    } else {
        global.electron_app_root_path = path.resolve(electron_app.getPath('exe'), '..');
    }
    global.electron_app_assets_path = path.resolve(global.electron_app_root_path, './assets');
    global.electron_app_krpano_path = path.resolve(global.electron_app_assets_path, './krpano');
    global.electron_app_scene_path = path.resolve(global.electron_app_assets_path, './scene');
    global.electron_app_tmp_path = path.resolve(global.electron_app_assets_path,'./tmp')
    global.electron_app_vr_path = path.resolve(global.electron_app_assets_path,'./vr')
    global.electron_app_krp_path = path.resolve(global.electron_app_root_path,'../../krp');
    global.electron_app_krpano_path = path.resolve(global.electron_app_root_path,'../../krpano');
    global.eletron_app_pic_path = path.resolve(global.electron_app_assets_path,'./pic')
    global.eletron_app_pic_tmp = path.resolve(global.electron_app_assets_path,'./picTmp')
};


const initDir = async () => {
    console.log(global.eletron_app_pic_path)
    console.log(global.eletron_app_pic_tmp)
    console.log(global.electron_app_assets_path)
    if (!fs.existsSync(global.electron_app_assets_path)) {
        fs.mkdirSync(global.electron_app_assets_path);
    }
    if (!fs.existsSync(global.electron_app_krpano_path)) {
        fs.mkdirSync(global.electron_app_krpano_path);
    }
    if (!fs.existsSync(global.electron_app_scene_path)) {
        fs.mkdirSync(global.electron_app_scene_path);
    }
    if(!fs.existsSync(global.electron_app_tmp_path)) {
        fs.mkdirSync(global.electron_app_tmp_path)
    }
    if(!fs.existsSync(global.electron_app_vr_path)){
        fs.mkdirSync(global.electron_app_vr_path)
    }
    if(!fs.existsSync(global.eletron_app_pic_path)){
        fs.mkdirSync(global.eletron_app_pic_path)
    }
    if(!fs.existsSync(global.eletron_app_pic_tmp)){
        fs.mkdirSync(global.eletron_app_pic_tmp)
    }
};

/**
 * Add event listeners...
 */

app.on('will-quit', () => {
    // Unregister a shortcut.
    // globalShortcut.unregister('CommandOrControl+X')
  
    // Unregister all shortcuts.
    globalShortcut.unregisterAll()
  })

app.on('window-all-closed', () => {
    // Respect the OSX convention of having the application in memory even
    // after all windows have been closed
    if (process.platform !== 'darwin') {
        app.quit();
    }
});


app.on('ready', async () => {
    if (process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true') {
        await installExtensions();
        await initConfig();
        await initDir();
        await initServer(global.electron_app_root_path,global)
    }

    mainWindow = new BrowserWindow({
        show: false,
        width: 1024,
        height: 728
    });

    mainWindow.loadURL(`file://${__dirname}/app.html`);

    // @TODO: Use 'ready-to-show' event
    //        https://github.com/electron/electron/blob/master/docs/api/browser-window.md#using-ready-to-show-event
    mainWindow.webContents.on('did-finish-load', () => {
        if (!mainWindow) {
            throw new Error('"mainWindow" is not defined');
        }
        mainWindow.show();
        mainWindow.focus();
    });

    mainWindow.on('closed', () => {
        mainWindow = null;
    });

    // const menuBuilder = new MenuBuilder(mainWindow);
    // menuBuilder.buildMenu();
    const ret = globalShortcut.register('ctrl+m', () => {
        if(mainWindow){
            mainWindow.openDevTools()
        }
    })
    if(!ret){
        console.log('register shortcut failed')
    }
});
