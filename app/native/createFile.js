const nativeRequire = window.native_require;

const path = nativeRequire('path');
const fs = nativeRequire('fs');

export default function createFile(dest) {
    const basepath = window.electron_app_assets_path;
    const destpath = path.resolve(basepath, dest);

    return new Promise((resolve, reject) => {
        try {
            if (!fs.existsSync(destpath)) {
                fs.mkdirSync(destpath);
            }
            resolve();
        } catch (e) {
            reject(e);
        }
    });
}
