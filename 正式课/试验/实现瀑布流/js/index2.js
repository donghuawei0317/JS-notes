var box = document.getElementsByClassName('box')[0],
    oUl = box.getElementsByTagName('ul'),
    ulArry = toolBag.toArray(oUl),
    _img = document.getElementsByTagName('img'),
    data = null;

function getData() {
    var xhr = new XMLHttpRequest();
    xhr.open('get', 'JASON/data.json', false);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            data = JSON.parse(xhr.responseText);
        }
    };
    xhr.send();
}
getData();
console.log(data);
function littleUl() {
    ulArry.sort((a, b)=> {
        return a.clientHeight - b.clientHeight
    });
    return ulArry[0];
}
function giveHtml(data) {
    for (var i = 0; i < data.length; i++) {
        var str =`<li>
            <img src="img/default.gif" dataImg="${data[i].pic}" height="${data[i]}.height" alt="">
            <p>${data[i].title}</p>
        </li>`;
        littleUl().innerHTML += str;
    }
}
giveHtml(data);
giveHtml(data);
giveHtml(data);

function lazyImg(ele) {
    if (ele.loaded)return;
    var A = toolBag.offset(ele).t,
        B = toolBag.screenHeight() + toolBag.screenScrollH();
    if (A < B) {
        var tempImg = new Image(),
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
function loadAll(eles) {
    for (var i = 0; i < eles.length; i++) {
        lazyImg(eles[i]);
    }
}
loadAll(_img);
window.onscroll = function () {
    loadAll(_img);
    getMore();
};

function getMore() {
    var A = toolBag.offset(littleUl()).t + littleUl().clientHeight,
        B = toolBag.screenScrollH() + toolBag.screenHeight();
    if (A < B) {
        getData();
        giveHtml(data);
    }
}

function fadeIn(ele) {
    ele.style.opacity = 0;
    var opa = 0.1;
    var timer = window.setInterval(function () {
        opa += 0.1;
        ele.style.opacity = opa;
        if (opa >= 1) {
            ele.style.opacity = 1;
            window.clearInterval(timer);
        }
    }, 20);
}