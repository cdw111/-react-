//设置环境变量
process.env.NODE_ENV = "development"

const webpack = require('webpack')
//获取webpack的配置文件
const configFactory = require("../config/webpack.config");
const DVconfigFactory = require("../config/webpackDevServer.config");
const config = configFactory('production')
const serverConfig = DVconfigFactory()
//创建compiler
const compiler = webpack(config);
//获取devServer并启动
const webPackDevServer = require('webpack-dev-server')


new webPackDevServer(compiler,serverConfig);
webPackDevServer.listen(3000,() => {
    console.log("is running")
})