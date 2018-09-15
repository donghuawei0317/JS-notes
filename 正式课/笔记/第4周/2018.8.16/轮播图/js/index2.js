//———高级单例模式———
var banner = (function () {
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
        var xhr = new XMLHttpRequest();
        xhr.open('get', 'JSON/data.json', false);
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                data = JSON.parse(xhr.responseText);
            }
        };
        xhr.send();
    }
    //———将数据显示在页面上———
    function giveHtml() {
        var str = '',
            tipStr = '';
        data.push(data[0]);
        data.forEach(function (item, index) {
            str += `<li>
            <img src="${item.pic}" alt="">
            <p>${item.title}</p>
        </li>`;
            if (index < data.length - 1) {//index只能是0、1、2、3
                tipStr += ` <li class="tip ${index == 0 ? 'current' : ''}">${index + 1}</li>`
            }
        });
        oUl.innerHTML = str;
        tipBox.innerHTML = tipStr;
        oUl.style.position = 'relative';
        n = data.length;//n=5
        oUl.style.width = boxW * n + 'px';//设置oUl的宽度
    }
    //———定时器———
    function autoPlay() {
        timer = window.setInterval(function () {
            play();
        }, 3000);
    }
    //———播放———
    function play() {
        // if((toolBag.offset(oDiv).l-toolBag.offset(oUl).l)%600!=0)return;
        if (toolBag.css(oUl, 'left') % boxW != 0)return;
        index++;
        if (index == -1) {
            toolBag.css(oUl, 'left', -boxW * (n - 1));
            index = n - 2;
        }
        if (index == n) {// 往右走的右边界
            toolBag.css(oUl, 'left', 0);
            index = 1;
        };
        tips=toolBag.toArray(tips);
        tips.forEach((item,index)=>{toolBag.deleteClass(item,'current')});
        if (index == n - 1) {
            toolBag.addClass(tips[0], 'current');
        } else {
            toolBag.addClass(tips[index],'current')
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
    //———事件———
    function eventFn(){
        //———点击事件———
        rightBtn.onclick = function () {
            if (toolBag.css(oUl, 'left') % boxW != 0)return;
            window.clearInterval(timer);
            play();
        };
        leftBtn.onclick = function () {
            if (toolBag.css(oUl, 'left') % boxW != 0)return;
            window.setInterval(timer);
            index -= 2;
            play();
        };
        //———鼠标移上事件———
        oDiv.onmouseenter = function () {
            clearInterval(timer);
            toolBag.css(leftBtn, 'display', 'block');
            toolBag.css(rightBtn, 'display', 'block');
        };
        //———鼠标移出事件———
        oDiv.onmouseleave = function () {
            toolBag.css(leftBtn, 'display', 'none');
            toolBag.css(rightBtn, 'display', 'none');
            autoPlay();
        };
    }
    //———将tips点击事件与index绑定———
    function tipClick(){
        for (let i = 0; i < tips.length; i++) {
            tips[i].onclick = function () {
                index = i - 1;
                play();
            }
        }
    }
    //———输出———
    return {
        init:function(){
            getData();//获取数据
            giveHtml();//显示数据
            autoPlay();//定时器
            eventFn();//事件
            tipClick();//tios点击事件与index绑定
        }
    }
})();
//———执行函数———
banner.init();