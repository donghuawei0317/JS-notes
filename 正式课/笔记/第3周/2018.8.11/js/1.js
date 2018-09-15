var reg=/w/;
console.dir(reg);
reg.test('qweasdzxc');

var reg2=/\w+/;
reg2.test('_');

var reg3=/\\w/;
console.dir(reg3);
console.dir(reg3.test('w'));
console.dir(reg3.test('\\w'));//true

var reg4=/^199|200$/;