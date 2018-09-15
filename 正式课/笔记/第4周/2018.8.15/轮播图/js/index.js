var oUl = document.getElementsByClassName('img_box')[0],
    oDiv = document.getElementById('div1'),
    leftBtn = document.getElementsByClassName('leftBtn')[0],
    rightBtn = document.getElementsByClassName('rightBtn')[0],
    boxW = toolBag.css(oUl, 'width'),
    data = null,
    index = 0,//记录当前显示的图片的索引
    n = 0,//记录图片个数;
    timer = null;
//——————
function getData() {
    var xhr = new XMLHttpRequest();
    xhr.open('get', 'JSON/data.json', false);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            data = JSON.parse(xhr.responseText);
        }
    };
    xhr.send();
}
getData();
//——————
function giveHtml() {
    var str = '';
    data.push(data[0]);
    data.forEach(function (item, index) {
        str += `<li>
            <img src="${item.pic}" alt="">
            <p>${item.title}</p>
        </li>`
    });
    oUl.innerHTML = str;
    oUl.style.position = 'relative';
    n = data.length;//n=5
    oUl.style.width = boxW * n + 'px';//设置oUl的宽度
}
giveHtml();
//——————
timer = window.setInterval(function () {
    play();
}, 3000);
console.log(boxW);//600
function play() {
    // if((toolBag.offset(oDiv).l-toolBag.offset(oUl).l)%600!=0)return;
    index++;
    if (index == -1) {
        toolBag.css(oUl, 'left', -boxW * (n - 1));
        index = n - 2;
    }
    if (index == n) {// 往右走的右边界
        toolBag.css(oUl, 'left', 0);
        index = 1;
    }
    var curL = -boxW * index;//-600
    /*if (curL == -boxW * n) {
     index = 1;
     toolBag.css(oUl, 'left', 0);
     curL = -boxW;
     }*/
    // toolBag.css(oUl,'left',curL);
    myAnimate(oUl, 1000, {left: curL});
}
rightBtn.onclick = function () {
    if((toolBag.offset(oDiv).l-toolBag.offset(oUl).l)%600!=0)return;
    window.clearInterval(timer);
    play();
    timer = window.setInterval(function () {
        play();
    }, 3000);
};
leftBtn.onclick = function () {
    if ((toolBag.offset(oDiv).l - toolBag.offset(oUl).l) % 600 != 0)return;
    window.setInterval(timer);
    index -= 2;
    play();
    timer = window.setInterval(function () {
        play();
    }, 3000);
};