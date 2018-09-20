let str11=require('./b');
let obj = {
    name: '珠峰',
};
console.log(str11);
// module.exports = obj;
exports.a='培训';
exports.obj=obj;
exports.str11=str11;
//node的模块导出 exports导出