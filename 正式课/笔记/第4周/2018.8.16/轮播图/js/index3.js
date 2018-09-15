function Banner(id, url) {
    this.oUl = document.getElementsByClassName('img_box',this.oDiv)[0];
    this.oDiv = document.getElementById(id);
    this.tipBox = document.getElementsByClassName('tip_box',this.oDi)[0];
    this.tips = this.tipBox.getElementsByClassName('tip');
    this.leftBtn = document.getElementsByClassName('leftBtn', this.oDiv)[0];
    this.rightBtn = document.getElementsByClassName('rightBtn', this.oDiv)[0];
    this.boxW = toolBag.css(this.oUl, 'width');
    this.data = null;
    this.index = 0;//记录当前显示的图片的索引
    this.n = 0;//记录图片个数;
    this.timer = null;
    this.url=url;
    this.init();
}
Banner.prototype = {
    //———恢复原型链———
    constructor: Banner,
    //———获取数据———
    getData: function getData() {
        // var _this=this;
        var xhr = new XMLHttpRequest();
        xhr.open('get', this.url, false);
        xhr.onreadystatechange = () =>{
            if (xhr.readyState == 4 && xhr.status==200) {
                this.data = JSON.parse(xhr.responseText);
            }
        };
        xhr.send();
    },
    //———显示数据———
    giveHtml: function giveHtml() {
        var str = '',
            tipStr = '';
        console.log(this.data);
        this.data.push(this.data[0]);
        this.data.forEach((item, index)=> {
            str += `<li>
            <img src="${item.pic}" alt="">
            <p>${item.title}</p>
        </li>`;
            if (index < this.data.length - 1) {//index只能是0、1、2、3
                tipStr += ` <li class="tip ${index == 0 ? 'current' : null}">${index + 1}</li>`
            }
        });
        this.oUl.innerHTML = str;
        this.tipBox.innerHTML = tipStr;
        this.oUl.style.position = 'relative';
        this.n = this.data.length;//n=5
        this.oUl.style.width = this.boxW * this.n + 'px';//设置oUl的宽度
    },
    //———定时器———
    autoPlay: function autoPlay() {
        this.timer = window.setInterval( () =>{
            this.play();
        }, 3000);
    },
    //———播放———
    play: function play() {
        if (toolBag.css(this.oUl, 'left') % this.boxW != 0)return;
        this.index++;
        if (this.index == -1) {
            toolBag.css(this.oUl, 'left', -this.boxW * (this.n - 1));
            this.index = this.n - 2;
        }
        if (this.index == this.n) {// 往右走的右边界
            toolBag.css(this.oUl, 'left', 0);
            this.index = 1;
        }
        this.tips = toolBag.toArray(this.tips);
        console.log(this.tips);
        this.tips.forEach((item, index)=> {
            toolBag.deleteClass(item, 'current')
        });
        if (this.index == this.n - 1) {
            toolBag.addClass(this.tips[0], 'current');
        } else {
            toolBag.addClass(this.tips[this.index], 'current')
        }
        var curL = -this.boxW * this.index;//-600
        /*if (curL == -boxW * n) {
         index = 1;
         toolBag.css(oUl, 'left', 0);
         curL = -boxW;
         }*/
        // toolBag.css(oUl,'left',curL);
        myAnimate(this.oUl, 1000, {left: curL});
    },
    //———事件———
    eventFn: function eventFn() {
        this.rightBtn.onclick =  ()=> {
            if (toolBag.css(this.oUl, 'left') % this.boxW != 0)return;
            window.clearInterval(this.timer);
            this.play();
        };
        this.leftBtn.onclick =  ()=>{
            if (toolBag.css(this.oUl, 'left') % this.boxW != 0)return;
            window.setInterval(this.timer);
            this.index -= 2;
            this.play();
        };

        this.oDiv.onmouseenter =  () =>{
            clearInterval(this.timer);
            toolBag.css(this.leftBtn, 'display', 'block');
            toolBag.css(this.rightBtn, 'display', 'block');
        };
        this.oDiv.onmouseleave =  () =>{
            toolBag.css(this.leftBtn, 'display', 'none');
            toolBag.css(this.rightBtn, 'display', 'none');
            this.autoPlay();
        };
    },
    //———将tips的点击事件与index绑定———
    tipClick: function tipClick() {
        for (let i = 0; i < this.tips.length; i++) {
            this.tips[i].onclick =  ()=> {
                this.index = i - 1;
                this.play();
            }
        }
    },
    init: function () {
        this.getData();
        this.giveHtml();
        this.autoPlay();
        this.eventFn();
        this.tipClick();
    }
};