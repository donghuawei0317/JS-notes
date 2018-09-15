var str='zxc123asd456qwe789';
var reg=/\d+/;
var reg1=/\d+/g;
var reg2=/(\d+)/g;
var reg3=/(\d+)(asd)/g;
//---split---
console.log(str.split(reg));//["zxc", "asd", "qwe", ""]
//---match---
console.log(str.match(reg));//["123", index: 3, input: "zxc123asd456qwe789", groups: undefined]
//正则没有全局修饰符g时，可以捕获到小分组匹配的内容
console.log(reg.exec(str));//["123", index: 3, input: "zxc123asd456qwe789", groups: undefined]
console.log(str.match(reg1));//(3) ["123", "456", "789"]
//---replace---
console.log(str.replace(reg, ','));//zxc,asd456qwe789
console.log(str.replace(reg1, ','));//zxc,asd,qwe,
console.log(str.replace(reg, function(){console.log(arguments)}));
console.log(str.replace(reg1, function(){console.log(arguments)}));
console.log(str.replace(reg2, function(){console.log(arguments)}));
console.log(str.replace(reg3, function(){console.log(arguments,RegExp.$2)}));

