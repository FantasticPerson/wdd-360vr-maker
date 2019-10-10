/* eslint global-require: off */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `yarn build` or `yarn build-main`, this file is compiled to
 * `./app/main.prod.js` using webpack. This gives us some performance wins.
 *
 * @flow
 */
// import { app, BrowserWindow } from 'electron';
// import { autoUpdater } from 'electron-updater';
// import log from 'electron-log';
// import MenuBuilder from './menu';


import { app, BrowserWindow, globalShortcut } from 'electron';
import initServer from './server'
const path = require('path');
const fs = require('fs');

export default class AppUpdater {
  constructor() {
    log.transports.file.level = 'info';
    // autoUpdater.logger = log;
    // autoUpdater.checkForUpdatesAndNotify();
  }
}

let mainWindow = null;

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

if (
  process.env.NODE_ENV === 'development' ||
  process.env.DEBUG_PROD === 'true'
) {
  require('electron-debug')();
}

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ['REACT_DEVELOPER_TOOLS', 'REDUX_DEVTOOLS'];

  return Promise.all(
    extensions.map(name => installer.default(installer[name], forceDownload))
  ).catch(console.log);
};

/**
 * Add event listeners...
 */

app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});


function copyFolder(src, dst) {
  let fs = require('fs');
  let stat = fs.stat;

  let copy = function (src, dst) {
      //读取目录
      fs.readdir(src, function (err, paths) {
          if (err) {
              throw err;
          }
          paths.forEach(function (path) {
              var _src = src + '/' + path;
              var _dst = dst + '/' + path;
              var readable;
              var writable;
              stat(_src, function (err, st) {
                  if (err) {
                      throw err;
                  }

                  if (st.isFile()) {
                      readable = fs.createReadStream(_src);//创建读取流
                      writable = fs.createWriteStream(_dst);//创建写入流
                      readable.pipe(writable);
                  } else if (st.isDirectory()) {
                      exists(_src, _dst, copy);
                  }
              });
          });
      });
  }
  let exists = function (src, dst, callback) {
      //测试某个路径下文件是否存在
      fs.exists(dst, function (exists) {
          if (exists) {//不存在
              callback(src, dst);
          } else {//存在
              fs.mkdir(dst, function () {//创建目录
                  callback(src, dst)
              })
          }
      })
  }
  exists(src, dst, copy)
}

const initConfig = async () => {
  global.__ELECTRON__ == true;
  global.electron = require('electron');
  global.electron_app = global.electron.app;
  global.electron_app_path = electron_app.getAppPath();

  if (process.env.NODE_ENV === 'development') {
      global.electron_app_root_path = path.resolve(electron_app.getPath('exe'), '../../../../app/dist');

      global.NODE_ENV = 'dev'
  } else {
      global.electron_app_root_path = path.resolve(global.electron_app_path, '..');
      global.NODE_ENV = 'prod'
  }
  global.electron_app_assets_path = path.resolve(global.electron_app_root_path, './assets');
  global.electron_app_krpano_path = path.resolve(global.electron_app_assets_path, './krpano');
  global.electron_app_scene_path = path.resolve(global.electron_app_assets_path, './scene');
  global.electron_app_tmp_path = path.resolve(global.electron_app_assets_path, './tmp')
  global.electron_app_vr_path = path.resolve(global.electron_app_assets_path, './vr')
  global.electron_app_krp_path = path.resolve(global.electron_app_root_path, '../krp');
  global.electron_app_krpano_path = path.resolve(global.electron_app_root_path, '../../krpano');
  global.electron_app_pic_path = path.resolve(global.electron_app_assets_path, './pic')
  global.electron_app_pic_tmp = path.resolve(global.electron_app_assets_path, './picTmp')
  global.electron_app_audio_path = path.resolve(global.electron_app_assets_path, './audio')
  global.electron_app_audio_tmp = path.resolve(global.electron_app_assets_path, './audioTmp')
  global.electron_app_output_path = path.resolve(global.electron_app_assets_path, './output')
  global.etectron_app_vr_output = path.resolve(global.electron_app_assets_path, './vrOutput')
  global.electron_app_cpano_path = path.resolve(global.electron_app_root_path, './cpano')
};

const initDir = async () => {
  if (!fs.existsSync(global.electron_app_assets_path)) {
      fs.mkdirSync(global.electron_app_assets_path);
  }
  if (!fs.existsSync(global.etectron_app_vr_output)) {
      fs.mkdirSync(global.etectron_app_vr_output)
  }
  if (!fs.existsSync(global.electron_app_output_path)) {
      fs.mkdirSync(global.electron_app_output_path)
  }
  if (!fs.existsSync(global.electron_app_krpano_path)) {
      fs.mkdirSync(global.electron_app_krpano_path);
  }
  if (!fs.existsSync(global.electron_app_scene_path)) {
      fs.mkdirSync(global.electron_app_scene_path);
  }
  if (!fs.existsSync(global.electron_app_tmp_path)) {
      fs.mkdirSync(global.electron_app_tmp_path)
  }
  if (!fs.existsSync(global.electron_app_vr_path)) {
      fs.mkdirSync(global.electron_app_vr_path)
  }
  if (!fs.existsSync(global.electron_app_pic_path)) {
      fs.mkdirSync(global.electron_app_pic_path)
  }
  if (!fs.existsSync(global.electron_app_pic_tmp)) {
      fs.mkdirSync(global.electron_app_pic_tmp)
  }
  if (!fs.existsSync(global.electron_app_audio_path)) {
      fs.mkdirSync(global.electron_app_audio_path)
  }
  if (!fs.existsSync(global.electron_app_audio_tmp)) {
      fs.mkdirSync(global.electron_app_audio_tmp)
  }
  if (!fs.existsSync(global.electron_app_cpano_path)) {
      fs.mkdirSync(global.electron_app_cpano_path)
  }

  if (global.NODE_ENV !== 'dev' && !fs.exists(path.resolve(global.electron_app_root_path, './tools'))) {
      let src = path.resolve(global.electron_app_root_path, './app.asar/tools')
      let dst = path.resolve(global.electron_app_root_path, './tools')

      copyFolder(src, dst)
  }
};

app.on('ready', async () => {
  if (
    process.env.NODE_ENV === 'development' ||
    process.env.DEBUG_PROD === 'true'
  ) {
    // await installExtensions();
    await initConfig();
        await initDir();
        await initServer(global.electron_app_root_path, global)
  }

  mainWindow = new BrowserWindow({
    show: false,
    width: 1024,
    height: 728,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true
    }
  });

  mainWindow.loadURL(`file://${__dirname}/app.html`);

  // @TODO: Use 'ready-to-show' event
  //        https://github.com/electron/electron/blob/master/docs/api/browser-window.md#using-ready-to-show-event
  mainWindow.webContents.on('did-finish-load', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    if (process.env.START_MINIMIZED) {
      mainWindow.minimize();
    } else {
      mainWindow.show();
      mainWindow.focus();
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  // registerListeners()

  // const menuBuilder = new MenuBuilder(mainWindow);
  // menuBuilder.buildMenu();

  // Remove this if your app does not use auto updates
  // eslint-disable-next-line
  // new AppUpdater();
});

