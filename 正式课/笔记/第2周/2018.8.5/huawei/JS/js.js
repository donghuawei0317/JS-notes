var data = null;
var xhr = new XMLHttpRequest();//步骤一
xhr.open('get', 'json/data.json', false);//步骤二
//步骤三
xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
        data = JSON.parse(xhr.responseText)
    }
};
xhr.send();//步骤四
console.log(data);
oUl = document.getElementsByClassName('ul_box')[0];
oBtn = document.getElementById('b');
oLis = oBtn.getElementsByTagName('li');
function giveHTML(data) {
    var str = '';
    for (var i = 0; i < data.length; i++) {
        str += ` <li>
            <div class="img_box"><img src="${data[i].picImg}"></div>
            <div class="til">${data[i].title}</div>
            <div class="price_box public" >
                价格：<span>￥${data[i].price}.00</span>
            </div>
            <div class="desc_box public">
                评价数：<span>${data[i].hot}</span>
            </div>
            <div class="time_box public">
                上架时间：<span>${data[i].time}</span>
            </div>
        </li>`
    }
    oUl.innerHTML = str;
}
giveHTML(data);
/*
* 上个思路是直接改变原数据，改变后直接让数据重新放到页面上
* DOM重绘和回流
* DOM的重绘：改变，背景色，color...
* 回流：DOM位置改变、添加元素、删除元素；
* 减少页面的回流是前端优化的一个方向。
* */
var flag = 0;
//按照价格排序：
oLis[0].onclick = function () {
    if(flag==0){
        data.sort(function (a, b) {
            return a.price - b.price;
        });
        flag=1;
    }else{
        data.sort(function (a, b) {
            return b.price - a.price;
        });
        flag=0;
    }
    giveHTML(data);
};
//按照热度排序：
oLis[1].onclick = function () {
    if(flag==0){
        data.sort(function (a, b) {
            return a.hot - b.hot;
        });
        flag=1;
    }else{
        data.sort(function (a, b) {
            return b.hot - a.hot;
        });
        flag=0;
    }
    giveHTML(data);
};
//按照上架时间排序：
oLis[2].onclick = function () {
    if(flag==0){
        data.sort(function (a, b) {
            return new Date(a.time) - new Date(b.time);
        });
        flag=1;
    }else{
        data.sort(function (a, b) {
            return new Date(b.time) - new Date(a.time);
        });
        flag=0;
    }
    giveHTML(data);
};
//直接操作DOM实现排序：
var a=oUl.getElementsByTagName('li');//获取要排序的DOM元素
var liAry=utils.listToArray(a);//为了下边方便操作，把类数组改为数组
//把数组里的li按照指定要求排序
liAry.sort((a,b)=>{return a.getAttribute('price')-b.getAttribute('ptice')});
console.log(liAry);

liAry.forEach(function (item, index) {
    oUl.appendChild(item);
    //若页面上又该元素;那么再去 appendChild 时；只是会改变该元素在页面中位置
});










