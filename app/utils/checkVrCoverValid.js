let getPixels = require('get-pixels')

export default function checkVrCoverValid(imgPath){
    return new Promise((resolve,reject)=>{
        getPixels(imgPath,function(err,pixels){
            if(err){
                reject('上传出错')
            }
            let shape = pixels.shape
            if(shape[0] == 512 && shape[1] == 512){
                resolve(imgPath)
            } else {
                reject('上传图片尺寸不对!')
            }
        })
    })
}