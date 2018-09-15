var box = document.getElementsByClassName('box')[0],
    oUl = document.getElementsByTagName('ul'),
    ulArry = toolBag.toArray(oUl),
    _img = document.getElementsByTagName('img'),
    data = null;
//从后台获取数据
function getData() {
    var xhr = new XMLHttpRequest();
    xhr.open('get', 'JASON/data.json', false);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            data = toolBag.toJSON(xhr.responseText);
        }
    };
    xhr.send();
}
getData();
//获取最矮的ul
function littleUl() {
    ulArry.sort((a, b)=> {
        return a.clientHeight - b.clientHeight
    });
    return ulArry[0];
}
//将数据展示在页面上
function giveHtml(data) {
    for (var i = 0; i < data.length; i++) {
        var str = `<li>
            <img src="img/default.gif" dataImg='${data[i].pic}' height="${data[i].height}" alt="">
            <p>${data[i].title}</p>
        </li>`;
        littleUl().innerHTML += str;
    }
}
giveHtml(data);
giveHtml(data);
giveHtml(data);
giveHtml(data);
giveHtml(data);
//图片懒加载
function lazyImg(ele) {
    if (ele.loaded)return;
    var A = toolBag.offset(ele).t,
        B = toolBag.screenScrollH() + toolBag.screenHeight();
    if (A < B) {
        var tempImg = document.createElement('img'),
            dataImg = ele.getAttribute('dataImg');
        tempImg.src = dataImg;
        tempImg.onload = function () {
            ele.src = dataImg;
            ele.loaded = true;
            fadeIn(ele);
        };
        tempImg = null;
    }
}
function loadAll(ele) {
    for (var i = 0; i < ele.length; i++) {
        lazyImg(ele[i]);
    }
}
loadAll(_img);
window.onscroll = function () {
    loadAll(_img);
    getMore();
};
//获得更多数据
function getMore() {
    var A = toolBag.offset(littleUl()).t + littleUl().clientHeight,
        B = toolBag.screenScrollH() + toolBag.screenHeight();
    if (A < B) {
        getData();
        giveHtml(data);
    }
}
//图片渐显
function fadeIn(ele) {
    ele.style.opacity = 0;
    var opa = 0.01;
    var timer = setInterval(function () {
        opa += 0.01;
        ele.style.opacity = opa;
        if (opa >= 1) {
            ele.style.opacity = 1;
            window.clearInterval(timer);
        }
    }, 20);
}