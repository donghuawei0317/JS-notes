var reg = /(\w)(\w)\1/;//'\1'匹配第一个分组的字符
reg.test('qwq');
reg.test('qww');
var reg = /(\w)(\w)\2/;//'\2'匹配第二个分组的字符
reg.test('qwq');
reg.test('qww');
var reg = /(\w)(\w)\2\1/;
reg.test('abba');
var reg = /(\w)(\w)\1\2/;
reg.test('abab');

var str = 'qweewqasdzxcasdqwe';


var str2='1234567981';
