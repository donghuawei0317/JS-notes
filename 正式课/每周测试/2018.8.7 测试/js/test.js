var xhr = new XMLHttpRequest;
xhr.open('get', '../json/data.json', false);
var data = null;
xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
        data = JSON.parse(xhr.responseText);
    }
};
xhr.send();
var otop = document.getElementsByClassName('top')[0],
    t_li = otop.getElementsByTagName('li'),
    obottom = document.getElementsByClassName('bottom')[0],
    b_ul = obottom.getElementsByTagName('ul')[0],
    b_li=b_ul.getElementsByTagName('li');

function a(data) {
    var str = '';
    for (let i = 0; i < data.length; i++) {
        str += `<li>
                <div class="pic">
                    <img src="${data[i].picImg}" alt="">
                </div>
                <div class="til">${data[i].title}</div>
                <div class="price">价格：<span>￥${data[i].price}</span>.00</div>
                <div class="hot">热度：<span>${data[i].hot}</span></div>
                <div class="time">上架时间：<span>${data[i].time}</span></div>
            </li>`
    }
    b_ul.innerHTML = str;
}
a(data);
var ary = ['price','hot','time'];
for(let i = 0; i < t_li.length; i++){
    var flag=0;
    t_li[i].onclick = function () {
        if(flag==0){
            data.sort(function (a,b) {
                return a[ary[i]].toString().replace(/-/g,'') - b[ary[i]].toString().replace(/-/g,'');
            });
            flag=1;
        }else{
            data.sort(function (a,b) {
                return b[ary[i]].toString().replace(/-/g,'') - a[ary[i]].toString().replace(/-/g,'');
            });
            flag=0;
        }
        a(data);
    };
}
