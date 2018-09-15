function Banner(id, url) {
    this.url = url;
    this.box = document.getElementById(id);
    this.oUl = this.box.getElementsByTagName('ul')[0];
    this.data = null;
    this.boxW = toolBag.css(this.box, 'width');
    this.index = 0;
    this.n = 0;//存储图片的个数
    this.leftBtn = document.getElementsByClassName('leftBtn')[0];
    this.rightBtn = document.getElementsByClassName('rightBtn')[0];
    this.timer = null;
    this.tipBox = document.getElementsByClassName('tip_box')[0];
    this.tips = document.getElementsByClassName('tip');
    this.init();
}
Banner.prototype = {
    constructor: Banner,
    getData: function () {
        var xhr = new XMLHttpRequest();
        xhr.open('get', this.url, false);
        xhr.onreadystatechange = ()=> {
            if (xhr.readyState == 4 && xhr.status == 200) {
                this.data = toolBag.toJSON(xhr.responseText)
            }
        };
        xhr.send();
    },
    giveHtml: function () {
        var str = '',
            tipStr = '';
        this.data.push(this.data[0]);
        this.data.forEach((item, index)=> {
            var {pic, title}=item;
            str += `<li>
            <img src="${pic}" alt="">
            <p>${title}</p>
        </li>`;
            if (index < this.data.length - 1)
                tipStr += `<li class="tip ${index == 0 ? 'current' : null}">${index + 1}</li>`
        });
        this.n = this.data.length;
        toolBag.css(this.oUl, {width: this.n * this.boxW, position: 'relative'});
        this.oUl.innerHTML = str;
        this.tipBox.innerHTML = tipStr;

    },
    play: function () {
        if (toolBag.css(this.oUl, 'left') % this.boxW !== 0)return;
        this.index++;
        if (this.index == this.n) {
            toolBag.css(this.oUl, 'left', 0);
            this.index = 1;
        }
        if (this.index == -1) {
            toolBag.css(this.oUl, 'left', -this.boxW * (this.n - 1));
            this.index = this.n - 2;
        }
        [...this.tips].forEach((item, index)=> {
            toolBag.deleteClass(item, 'current');
        });
        if (this.index == this.n - 1) {
            toolBag.addClass(this.tips[0], 'current');
        } else {
            toolBag.addClass(this.tips[this.index], 'current');
        }
        myAnimate(this.oUl, 1000, {left: -this.boxW * this.index});
    },
    autoPlay: function () {
        this.timer = setInterval(() => {
            this.play();
        }, 3000);
    },
    eventFn: function () {
        this.box.onmouseenter = () => {
            toolBag.css(this.leftBtn, 'display', 'block');
            toolBag.css(this.rightBtn, 'display', 'block');
            clearInterval(this.timer);
            this.timer=null;
        };
        this.box.onmouseleave = ()=> {
            toolBag.css(this.leftBtn, 'display', 'none');
            toolBag.css(this.rightBtn, 'display', 'none');
            this.autoPlay()
        };
        this.rightBtn.onclick = ()=> {
            if (toolBag.css(this.oUl, 'left') % this.boxW !== 0)return;
            clearInterval(this.timer);
            this.timer=null;
            this.play();
        };
        this.leftBtn.onclick = ()=> {
            if (toolBag.css(this.oUl, 'left') % this.boxW !== 0)return;
            clearInterval(this.timer);
            this.timer=null;
            this.index -= 2;
            this.play();
        }
    },
    tipClick: function () {
        for (let i = 0; i < this.tips.length; i++) {
            this.tips[i].onclick = ()=> {
                if (this.index == this.n - 1) {
                    toolBag.css(this.oUl, 'left', 0)
                }
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
var banner = new Banner('box', 'JSON/data.json');
