/**
 * 
 * @param {*} webpackEnv 环境信息
 */

const { pathExistsSync } = require("fs-extra");
const path = require("./path");



module.exports = function(webpackEnv) {
    const isEnvDevelopment = webpackEnv=='development';//是否开发
    const isEnvProduction = webpackEnv=='production';//是否生产
    return {
        mode: isEnvProduction? 'production' : isEnvDevelopment && 'development',
        output: {
            path: paths.appBuild
        },
        module: {
            rules:[
                //添加loader
            ]
        }
    }
}