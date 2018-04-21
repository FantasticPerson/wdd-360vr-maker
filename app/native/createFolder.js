const nativeRequire = window.native_require;

const path = nativeRequire('path');
const fs = nativeRequire('fs');

export default function createFolder(dest) {
    const basepath = window.electron_app_assets_path;
    return new Promise((resolve, reject) => {
        const destPath = path.resolve(basepath, dest);
        try {
            if (fs.existsSync(destPath)) {
                resolve();
            } else {
                fs.mkdirSync(destPath);
                resolve();
            }
        } catch (e) {
            reject(e);
        }
    });
}
