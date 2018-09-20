let obj1 = require('./a.js');// node引入模块
console.log(obj1);
//引入第三方模块的时候，我们不需要添加路径，直接引用即可
//先在同级路径下的node_modules中查找，直到找到根路径
let jq = require('jquery');
console.log(obj1, jq);
// let react=require('react');
// console.log(react);