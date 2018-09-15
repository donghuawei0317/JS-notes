//获取字符串中出现次数最多的字符，并记录其出现次数
var str='asdzxcasdasdqwes';
var obj={};
for(let i=0;i<str.length;i++){
    if(obj.hasOwnProperty(str[i])){
        obj[str[i]]++;
    } else{
        obj[str[i]]=1;
    }
}
console.log(obj);
var n=1;
var str1='';
for(var k in obj){
    if(obj[k]>n){
        n=obj[k];
        str1=k;
    }
}
console.log(str1, n);