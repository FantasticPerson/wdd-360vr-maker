let express = require('express')
const portfinder = require('portfinder')

const initServer = async (rootPath,global)=>{
    return new Promise((resolve,reject)=>{
        portfinder.getPortPromise()
        .then((port)=>{
            resolve({port:port,result:'success',res:''})
        })
        .catch((err)=>{
            resolve({port:4388,result:'fail',res:err})
        })
    })
    .then((res)=>{
        let port = res.port
        let webApp = express()
        webApp.use(express.static(rootPath, {
            //index: 'main.html',
            fallthrough: false,
            etag: false,
            //4 hours
            maxAge: 0//4 * 60 * 60 * 1000
        }));

        webApp.listen(port, () => {
            console.info(`start webserver with express on 127.0.0.1: ${port}`);
            global.electron_app_server_port = port
        });
    })
}

export default initServer
