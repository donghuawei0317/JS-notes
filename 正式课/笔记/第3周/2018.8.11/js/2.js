/*var reg=/\d+/;
var reg1=/(\d+)/;
var reg2=/(\d)+/;*/
/*
* exec：捕获
*     ·返回值：
*     第一项：大正则捕获的内容
*     index：符合正则的第一个字符的索引
*     input：要进行匹配捕获的整个字符串
*     lastIndex：下一次开始匹配的字符的索引
*     ·正则捕获的懒惰性：
*     用全局修饰符g解决
* */
function execAll(str) {
    if(!this.global){
        return this.exec(str);
    }
    var result=[];
    var ary=this.exec(str);
    while(ary){
        result.push(ary[0]);
        ary=this.exec(str);
    }
    return result;
}
RegExp.prototype.execAll=execAll;
var str='zxc123asd456qwe789';
var str2='zxcasdqwe';
var reg=/\d+/;
console.log(reg.execAll(str2));
