const path = require('path');
const webpack = require("webpack");
const merge = require("webpack-merge");
const webpackConfigBase = require('./webpack.base.conf');
const webpackConfigDev = {
    mode: 'development', // 通过 mode 声明开发环境
    output: {
        path: path.resolve(__dirname, '../dist_h5'),
        // 打包多出口文件
        filename: 'js/[name].[hash:5].js'
    },
    devServer: {
        contentBase: path.join(__dirname, "../src/pages/index"),
        publicPath: '/',
        host: "0.0.0.0", //这里修改自己电脑ip
        port: "8088",
        overlay: true, // 浏览器页面上显示错误
        // open: true, // 开启浏览器
        // stats: "errors-only", //stats: "errors-only"表示只打印错误：
        //服务器代理配置项
        proxy: {
            '/testing/*': {
                target: '',
                secure: true,
                changeOrigin: true
            }
        }
    },
}
module.exports = merge(webpackConfigBase, webpackConfigDev);