import {getPanoTool} from '../native/pathUtils'
const spawn =  window.native_require('child_process').spawn
const path = window.native_require('path')
const fs = window.native_require('fs')
const readline = require('readline')
const _ = require('lodash')
const cPTmep = window.electron_app_cpano_path
const fse = require('fs-extra')

export default function createPano(src){
    fse.removeSync(cPTmep)
    if(!fs.existsSync(cPTmep)){
        fs.mkdirSync(cPTmep)
    }

    let dest = path.resolve(cPTmep,'./origin.jpg')
    fs.createReadStream(src).pipe(fs.createWriteStream(dest));
    console.log(dest,cPTmep)

    return new Promise((resolve,reject)=>{
        try {
            let tool = getPanoTool()
            let originPath = path.resolve(cPTmep,'./origin.jpg')
            let cmd = spawn(tool,[`-in=${originPath}`,`-out=${cPTmep}/`,'-mode=1'])
            let isDone = false
            readline.createInterface({
                input:cmd.stdout,
                terminal:false
            }).on('line',(line)=>{
                console.log(line)
                try{
                    if(_.startsWith(line,'Done:')){
                        isDone = true
                    }
                } catch(e){
                    reject(e)
                }
            })

            cmd.stderr.on('data', () => {
                reject('err')
            })

            cmd.on('close',(code)=>{
                if(isDone && code == 0){
                    resolve()
                } else {
                    reject('err')
                }
            })
        } catch (error) {
            reject(error)
        }
    })
}