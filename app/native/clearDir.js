const nativeRequire = window.native_require
const fs = nativeRequire('fs')
const path = nativeRequire('path')

export default function clearDir(src) {
    return new Promise((resolve, reject) => {
        try {
            let fileArr = fs.readdirSync(src)
            for (let i = 0; i < fileArr.length; i++) {
                fs.unlinkSync(path.resolve(src, './' + fileArr[i]))
            }
            resolve()
        } catch (e) {
            reject(e)
        }
    })
}