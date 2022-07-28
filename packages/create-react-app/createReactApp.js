const { default: chalk } = require('chalk');
const {Command} = require('commander');
const packageJSON =  require('./package.json')
const fs = require('fs-extra');
const { ftruncateSync } = require('fs-extra');
const spawn = require('cross-spawn');

function init() {
    let projectName;

    new Command(packageJSON.name)
        .version(packageJSON.version)//设置版本号
        .arguments('<project-directory>')//项目的目录名
        .usage(`${chalk.green('<project-directory>')}`)//设置字体颜色
        .action(name => {
            projectName = name;//执行的方法
        }).parse(process.argv)//node完整路径，当前node脚本的路径，...其他参数
        
    createApp(projectName);//创建项目

}


function createApp(appName) {
    let root = path.resolve(appName) //的到生成项目的绝对路径
    fs.ensureDirSync(appName)//确保该目录存在  不存在则创建
    //创建package.json文件
    const packageJSON = {
        name: appName,
        version: "1.0.0",
        private: true
    }

    fs.writeFileSync(
        path.join(root,'package.json'),
        JSON.stringify(packageJSON,null,2)
    )



    const orginalDirectory = process.cwd();//原始命令的工作目录
    process.chdir(root)//改变工作目录到当前目录


    return(root,appName,orginalDirectory)
}

async function run(root,appName,orginalDirectory) {
    let scriptName = 'react-script'; //create生成的代码里，源文件编译，启动服务的文件
    let templeteName = 'cra-template';//模板的位置
    const allDependences = ['react','react-dom',scriptName,templeteName];

    //安装包
    await install(root,allDependences);
    let data = [root,appName,true,orginalDirectory,templeteName];
    let source = `
    var inint = require('${scriptName}/scipts/init.js');
    init.apply(null,JSON.parse(process.argv[1]));
    `

    await executeNodeScript({
        cwd:process.cwd()
    },data,source)

    process.exit(0);
}

async function executeNodeScript({cwd},data,source) {
    return new Promise(resolve => {
        const child = spawn(
            process.execPath,//node可执行文件的目录
            ['-e',source,'--',JSON.stringify(data)],
            {cwd,stdio: 'inherit'}
            );
        child.on('close',resolve)
    })
}

async function install(root,allDependences) {
    return new Promise(resolve => {
        const command = "yarnpkg";
        const args = ['add','--exact',...allDependences,'--cwd',root]
        const child = spawn(command,args,{stdio: 'inherit'})//使子进程也打印在父进程目录中
        child.on('close',resolve);
    
    })
}

module.exports = {
    init,
}