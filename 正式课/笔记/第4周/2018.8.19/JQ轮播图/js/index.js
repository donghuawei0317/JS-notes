var $box = $('#box'),//获取id=‘box’的元素
    $ul = $box.children('.img_box'),//获取#box中的className=‘img_box’的子元素
    $lis = $ul.children('li'),//获取标签名为‘li’的子元素(！没有映射！)
    $left = $box.find('.leftBtn'),//获取类名为leftBtn的子元素
    $right = $box.find('.rightBtn'),//获取类名为rightBtn的子元素
    $tipBox = $box.find('.tip_box'),//获取类名为tip_box的子元素
    $tip = $tipBox.find('.tip'),//获取类名为‘tip’的子元素
    index = 0,//显示图片的索引
    n = 0,//图片的个数
    timer = null;
console.log($lis);
//———Ajax获取后台数据———
$.ajax({
    type: 'get',
    url: 'JSON/data.json',
    data: {q: 1},
    success: function (data) {
        giveHtml(data);
    },
    error: function () {

    }
});
//———在页面上显示数据———
function giveHtml(data) {
    var str = '',
        tipStr = '';
    $.each(data, function (index, item) {
        str += `<li>
            <img src="${item.pic}" alt="">
            <p>${item.title}</p>
        </li>`;
        tipStr += `<li class='tip ${index == 0 ? 'current' : ''}'>${index + 1}</li>`;
    });
    $ul.html(str);
    $tipBox.html(tipStr);
    n = data.length;
    $tip = $tipBox.find('.tip');
    init();
}
//———初始化数据———
function init() {
    console.log($lis);
    //———设置默认显示第一张图片———
    $lis = $ul.children('li');
    console.log($lis);
    $lis.eq(0).css('zIndex', 10).siblings().css({zIndex: 1, opacity: 0});
    //——————
    autoplay();
    evenFn();
    tipClick();
}
//———播放动作———
function play() {
    if ($box.running)return;//若box还在运行，则返回
    $box.running = true;//第一次进来，给running赋值true
    index++;
    if (index == n) {
        index = 0;//显示第一张图片
    }
    if (index <= -1) {
        index = n - 1;//显示最后一张图片
    }
    $tip.eq(index).addClass('current').siblings().removeClass('current');//给当前tip添加类名，并移出其同级邻居元素的对应类名
    $lis.eq(index).css({zIndex: 10}).siblings().css({zIndex: 1});//，由于图片都是叠加在一起的，所以要通过更改优先级来控制显示的图片
    //———设置动画———
    $lis.eq(index).animate({opacity: 1}, 500, function () {
        $(this).siblings().css({opacity: 0});
        $box.running = false;
    });
}
//———定时器自动循环播放———
function autoplay() {
    timer = setInterval(function () {
        play();
    }, 2000)
}
//———事件动作———
function evenFn() {
    //———鼠标移上———
    $box.on('mouseenter', function () {
        $left.show();
        $right.show();
        console.log(1);
        clearInterval(timer);
    });
    //———鼠标移出———
    $box.on('mouseleave', function () {
        $left.hide();
        $right.hide();
        autoplay();
    });
    //———鼠标点击———
    $left.on('click', function () {
        if ($box.running)return;
        index -= 2;
        play();
    });
    $right.on('click', function () {
        play();
    })
}
//———tip绑定———
function tipClick() {
    $tip.on('click', function () {
        var $this = $(this);
        var n = $this.index();
        index = n - 1;
        play();
    })
}