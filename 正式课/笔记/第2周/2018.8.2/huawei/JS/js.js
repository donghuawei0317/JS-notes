var data = null;
var xhr = new XMLHttpRequest();
xhr.open('get', 'json/data.json', false);
xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
        data = JSON.parse(xhr.responseText);
    }
};
xhr.send();
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