import { app, BrowserWindow,globalShortcut } from 'electron';
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

function copyFolder(src,dst){
    let fs=require('fs');
    let stat=fs.stat;

    let copy=function(src,dst){
        //读取目录
        fs.readdir(src,function(err,paths){
            console.log(paths)
            if(err){
                throw err;
            }
            paths.forEach(function(path){
                var _src=src+'/'+path;
                var _dst=dst+'/'+path;
                var readable;
                var writable;
                stat(_src,function(err,st){
                    if(err){
                        throw err;
                    }
                    
                    if(st.isFile()){
                        readable=fs.createReadStream(_src);//创建读取流
                        writable=fs.createWriteStream(_dst);//创建写入流
                        readable.pipe(writable);
                    }else if(st.isDirectory()){
                        exists(_src,_dst,copy);
                    }
                });
            });
        });
    }

    let exists=function(src,dst,callback){
        //测试某个路径下文件是否存在
        fs.exists(dst,function(exists){
            if(exists){//不存在
                callback(src,dst);
            }else{//存在
                fs.mkdir(dst,function(){//创建目录
                    callback(src,dst)
                })
            }
        })
    }

    exists(src,dst,copy)
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
    global.electron_app_tmp_path = path.resolve(global.electron_app_assets_path,'./tmp')
    global.electron_app_vr_path = path.resolve(global.electron_app_assets_path,'./vr')
    global.electron_app_krp_path = path.resolve(global.electron_app_root_path,'../krp');
    global.electron_app_krpano_path = path.resolve(global.electron_app_root_path,'../../krpano');
    global.electron_app_pic_path = path.resolve(global.electron_app_assets_path,'./pic')
    global.electron_app_pic_tmp = path.resolve(global.electron_app_assets_path,'./picTmp')
    global.electron_app_audio_path = path.resolve(global.electron_app_assets_path,'./audio')
    global.electron_app_audio_tmp = path.resolve(global.electron_app_assets_path,'./audioTmp')
    global.electron_app_output_path = path.resolve(global.electron_app_assets_path,'./output')
    global.etectron_app_vr_output = path.resolve(global.electron_app_assets_path,'./vrOutput')
    global.electron_app_cpano_path = path.resolve(global.electron_app_root_path,'./cpano')
};

const initDir = async () => {  
    if (!fs.existsSync(global.electron_app_assets_path)) {
        fs.mkdirSync(global.electron_app_assets_path);
    }
    if(!fs.existsSync(global.etectron_app_vr_output)){
      fs.mkdirSync(global.etectron_app_vr_output) 
    }
    if(!fs.existsSync(global.electron_app_output_path)){
        fs.mkdirSync(global.electron_app_output_path)
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
    if(!fs.existsSync(global.electron_app_pic_path)){
        fs.mkdirSync(global.electron_app_pic_path)
    }
    if(!fs.existsSync(global.electron_app_pic_tmp)){
        fs.mkdirSync(global.electron_app_pic_tmp)
    }
    if(!fs.existsSync(global.electron_app_audio_path)){
        fs.mkdirSync(global.electron_app_audio_path)
    }
    if(!fs.existsSync(global.electron_app_audio_tmp)){
        fs.mkdirSync(global.electron_app_audio_tmp)
    }
    if(!fs.existsSync(global.electron_app_cpano_path)){
        fs.mkdirSync(global.electron_app_cpano_path)
    }

    if(global.NODE_ENV !== 'dev' && !fs.exists(path.resolve(global.electron_app_root_path,'./tools'))){
        let src = path.resolve(global.electron_app_root_path,'./app.asar/tools')
        let dst = path.resolve(global.electron_app_root_path,'./tools')


        console.log(src,dst)

        copyFolder(src,dst)
    }
    
};

app.on('will-quit', () => {
    globalShortcut.unregisterAll()
  })

app.on('window-all-closed', () => {
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
    } else {
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

    // mainWindow.openDevTools()
    const ret = globalShortcut.register('ctrl+m', () => {
        if(mainWindow){
            mainWindow.openDevTools()
        }
    })
    if(!ret){
        console.log('register shortcut failed')
    }
});
