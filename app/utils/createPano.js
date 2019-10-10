import { getPanoTool } from '../native/pathUtils';
const spawn = window.native_remote.require('child_process').spawn;
const path = window.native_require('path');
const fs = window.native_require('fs');
const readline = require('readline');
const _ = require('lodash');
const cPTmep = window.electron_app_cpano_path;
const fse = require('fs-extra');

let isDone1 = false;
let isDone2 = false;

export default function createPano(src) {
  isDone1 = false;
  isDone2 = false;

  fse.removeSync(cPTmep);
  if (!fs.existsSync(cPTmep)) {
    fs.mkdirSync(cPTmep);
  }

  let dest = path.resolve(cPTmep, './origin.jpg');
  fs.createReadStream(src).pipe(fs.createWriteStream(dest));

  let tool = getPanoTool();
  let originPath = path.resolve(cPTmep, './origin.jpg');

  // let cmd = spawn(tool,[`-in=${originPath}`,`-out=${cPTmep}/`,'-mode=1'])

  let cmd = spawn(tool, [
    'sphere2cube',
    'cube',
    `${originPath}`,
    `${cPTmep}/mobile`
  ]);

  let cmd2 = spawn(tool, ['makepreview', `${originPath}`]);
  let cmd1Promise = execCMD(cmd, 1);
  let cmd2Promise = execCMD(cmd2, 2);

  return Promise.all([cmd1Promise, cmd2Promise]);
}

function execCMD(cmd, type) {
  return new Promise((resolve, reject) => {
    cmd.on('close', code => {
      console.log('close')
      resolve();
    });
  });
}
