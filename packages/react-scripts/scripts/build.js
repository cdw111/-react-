//设置环境变量
process.env.NODE_ENV = "production"

const { fstat } = require("fs-extra");
const webpack = require('webpack')
//获取webpack的配置文件
const configFactory = require("../config/webpack.config");
const config = configFactory('production')
const paths = require('../config/path')
//如果build不为空清空build
fstat.emptyDirSync(paths.appBuild);
//拷贝public下的静态文件到bulid
copyPubilcFolder();
build();

//打包

function build() {
    let compiler = webpack(config);
    compiler.run((err,stats) => {

    })
}


function copyPubilcFolder() {
    fstat.copySync(paths.appPublic,paths.appBuild,{
        filter: file => file != paths.appHtml//过滤器
    })
}