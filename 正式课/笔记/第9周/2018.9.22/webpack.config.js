//需要有一个遵循commonJS规范的导出文件
let path=require('path');//node中用来处理文件路径的模块
console.log(path.resolve('./src'));
module.exports={
    mode:"development",
    entry:'./src/index.js',//打包的入口文件
    output:{
        filename:'index.js',//打包后的文件名
        path:path.resolve('./dist')//打包后的文件输出路径，在这里必须是一个绝对路径。没有这个文件夹时，会自动创建一个
    },
    module:{
        rules:[
            {
                test:/\.js$/,use:"babel-loader",exclude:/node_modules/
                //符和 .js 结尾的
            }
        ]
    }
};
