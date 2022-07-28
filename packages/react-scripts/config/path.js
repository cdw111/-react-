
const path = require('path');
const appDirectory = process.cwd();//当前工作目录

const resolveApp = relativePath => path.resolve(appDirectory,relativePath)
module.exports = {
    appHtml: resolveApp('public/index.html'),
    appIndexJs: resolveApp('src/index.js'),
    appBuild: resolveApp('build'),
    appPublic: resolveApp('public'),
}

