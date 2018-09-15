var oUl = document.getElementsByClassName('img_box')[0],
    oDiv = document.getElementById('div1'),
    tipBox = document.getElementsByClassName('tip_box')[0],
    tips = tipBox.getElementsByClassName('tip'),
    leftBtn = document.getElementsByClassName('leftBtn')[0],
    rightBtn = document.getElementsByClassName('rightBtn')[0],
    boxW = toolBag.css(oUl, 'width'),
    data = null,
    index = 0,//记录当前显示的图片的索引
    n = 0,//记录图片个数;
    timer = null;
//———获取数据———
function getData() {
    var xhr = new XMLHttpRequest();//新建实例
    xhr.open('get', 'JSON/data.json', false);//从后台获取数据
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            data = JSON.parse(xhr.responseText);
        }
    };
    xhr.send();//发送请求
}
getData();
//———把数据显示在页面上———
function giveHtml() {
    var str = '',//显示标题的字符串
        tipStr = '';//数字导航的字符串
    data.push(data[0]);//往数据的最后添加数据的第一项来实现无缝滚动
    data.forEach(function (item, index) {//item是数据data的每一项，index是每一项所对应的索引值
        str += `<li>
            <img src="${item.pic}" alt="">
            <p>${item.title}</p>
        </li>`;
        if (index < data.length - 1) {//index只能是0、1、2、3   对应每一张图片
            tipStr += ` <li class="tip ${index == 0 ? 'current' : ''}">${index + 1}</li>`
        }
    });
    oUl.innerHTML = str;
    tipBox.innerHTML = tipStr;
    oUl.style.position = 'relative';
    n = data.length;//n=5
    oUl.style.width = boxW * n + 'px';//设置oUl的宽度
}
giveHtml();
//———定时器———
function autoPlay() {
    timer = window.setInterval(function () {
        play();
    }, 3000);
}
autoPlay();
//———播放———
function play() {
    // if((toolBag.offset(oDiv).l-toolBag.offset(oUl).l)%600!=0)return;
    if (toolBag.css(oUl, 'left') % boxW != 0)return;
    index++;

    if (index == -1) {//———有点击事件时才会用到———
        toolBag.css(oUl, 'left', -boxW * (n - 1));//因为点击事件，当显示第一张图片的时候，index=-1，此时图片会瞬间跳转到第五张（第五张和第一张是同一张图片），且不经过动画
        index = n - 2;//给index赋值3，在接下来的动画中，oUl会从left=-2400的位置在1秒内移动到left=-1800的位置
    }
    if (index == n) {// 往右走的右边界
        toolBag.css(oUl, 'left', 0);//当index=5的时候，oUl会瞬间跳转到第一张图片，不经过动画！
        index = 1;//给index赋值1，在接下来的动画中，oUl会从left=0的位置在1秒内走到left=-600的位置
    }
    tips=toolBag.toArray(tips);//类数组转化为数组
    tips.forEach((item,index)=>{toolBag.deleteClass(item,'current')});//清除每一项的className：‘current’
    if (index == n - 1) {
        toolBag.addClass(tips[0], 'current');//当index=4的时候，给tips[0]添加className：‘current’
    } else {
        toolBag.addClass(tips[index],'current');//给当前的tips添加className：‘current’
    }
    var curL = -boxW * index;//-600.-1200,-1800,-2400
    myAnimate(oUl, 1000, {left: curL});//动画，oUl在一秒内从当前位置走到目标位置
}
//———点击事件———
rightBtn.onclick = function () {
    if (toolBag.css(oUl, 'left') % boxW != 0)return;
    window.clearInterval(timer);
    play();
};
leftBtn.onclick = function () {
    if (toolBag.css(oUl, 'left') % boxW != 0)return;
    window.clearInterval(timer);
    index -= 2;
    play();
};
//———鼠标移上事件———
oDiv.onmouseenter = function () {
    clearInterval(timer);//鼠标移到元素上的时候，停止计时器
    toolBag.css(leftBtn, 'display', 'block');
    //——— ↕ 此时显示左右两边的箭头———
    toolBag.css(rightBtn, 'display', 'block');
};
//———鼠标移出事件———
oDiv.onmouseleave = function () {
    toolBag.css(leftBtn, 'display', 'none');
    //——— ↕ 鼠标移出时隐藏两边的箭头———
    toolBag.css(rightBtn, 'display', 'none');
    autoPlay();//启动自动播放
};
//———将tips点击事件与index绑定———
for (let i = 0; i < tips.length; i++) {
    tips[i].onclick = function () {
        index = i - 1;
        play();
    }
}