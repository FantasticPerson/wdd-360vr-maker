const {spawn} = require('child_process')

console.log(spawn)

const originPath = `D:\\projects\\your-project-name\\app\\dist\\cpano\\origin.jpg`
const cPTmep = `D:\\projects\\your-project-name\\app\\dist\\cpano`
// const tool = `D:\\projects\\your-project-name\\app\\tools\\pano_tool_windows_amd64.exe`
const tool = `D:\\projects\\your-project-name\\app\\tools\\krpano-1.19\\krpanotools64.exe`

var ls= spawn(tool,['sphere2cube','cube',`${originPath}`,`${cPTmep}/mobile`])

var ls2= spawn(tool,['makepreview',`${originPath}`])


ls.stdout.on('data', (data) => {
  console.log(`stdout: ${data}`);
});

ls2.stdout.on('data', (data) => {
  console.log(`stdout: ${data}`);
});

  

// const { spawn } = require('child_process');
// const ls = spawn('ls', ['-lh', '/usr']);

// ls.stdout.on('data', (data) => {
//     console.log(`stdout: ${data}`);
//   });
  
//   ls.stderr.on('data', (data) => {
//     console.error(`stderr: ${data}`);
//   });
  
//   ls.on('close', (code) => {
//     console.log(`子进程退出，退出码 ${code}`);
//   });