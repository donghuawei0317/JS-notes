var oLis=document.getElementsByTagName('li')[0];
for(let i=0;i<oLis.length;i++){
    oLis[i].onclick=function(){
        alert(i+1);
    }
}
$('ul>li').on('click',function(index){
    console.log($(this).index() + 1);
});
//$()   参数接收css选择器，接收原生JS对象
var oDiv=document.getElementById('div1');
console.log($(oDiv));//把原生对象转换成jQuery对象
console.log($('ul>li')[0]);
console.log($($('ul>li')[0]));
console.log($('ul>li').eq(0));