//第一块：loading
let bell = $('#bell')[0],
    say = $('#say')[0],
    bgm = $('#music')[0];

let loading = function () {
    //进度条加载完成后，要让loading的这个块消失
    let $progressBar = $('.progress .progressBar'),
        $loadingBox = $('.loadingBox');
    //进度条的进度是由项目中所有图片加载完成来决定的
    let ary = ['phone-bg.jpg', 'phone-listen.png', 'phone-key.png', 'phone-logo.png', 'phone-name.png', 'message-head1.png', 'message-head2.png', 'message-keyboard.png', 'cube-bg.jpg', 'cube-img1.png', 'cube-img2.png', 'cube-img3.png', 'cube-img4.png', 'cube-img5.png', 'cube-img6.png', 'cube-tip.png', 'menu-icon.png', 'concat-address.png', 'concat-icon1.png', 'concat-icon2.png', 'course-icon1.png', 'course-icon2.png', 'course-icon3.png', 'course-icon4.png', 'course-icon5.png', 'course-icon6.png', 'course-icon7.png', 'course-pocket.png', 'school-bot1.png', 'school-bot2.png', 'school-img1.jpg', 'school-img2.jpg', 'school-img3.jpg', 'teacher-title.png', 'zf-detailsReturn.png', 'zf-jobTable.png', 'zf-teacher1.png', 'zf-teacher2.png', 'zf-teacher3.jpg', 'zf-teacher4.png', 'zf-teacher5.png', 'zf-teacher6.png'];
    let n = 0;//记录加载完成的图片数量
    ary.forEach((item)=> {
        let img = new Image();
        //让临时的img去请求图片
        img.src = `./images/` + item;
        img.onload = function () {
            load();
        }
    });
    function load() {
        n++;
        if (n == ary.length) {
            //说明所有图片已加载完毕
            $progressBar.css({
                width: '100%'
            });
            /*let timer1=setTimeout(function(){
             $loadingBox.css({
             opacity:0
             })
             },1000)*/
            let timer = setTimeout(function () {
                $loadingBox.hide();
                //第一个块隐藏，执行第二个块相关的函数
                phoneFn();
            }, 1800);
            $loadingBox.css({
                opacity: 0
            });
        } else {
            //没有加载完成
            $progressBar.css({
                width: n / ary.length * 100 + '%'
            })
        }
    }
};
loading();
//第二块
let phoneFn = function () {
    let $phoneBox = $('.phoneBox'),
        $listenBox = $('.listen_box'),
        $listenBtn = $('.listenBtn'),
        $noListenBox = $('.no_listen_box'),
        $noListenBtn = $('.no_listenBtn'),
        $timeBox = $('.phoneBox header h4');
    bell.play();
    // $listenBox.on('touchend')
    $listenBox.tap(function () {
        //点击接通按钮
        $listenBox.hide();
        $timeBox.show();
        $noListenBox.css({
            transform: 'translateY(0)'
        });
        bell.pause();
        say.play();
        let sayTimer = setInterval(function () {
            let t = say.currentTime;
            let str = '00:' + (Math.ceil(t) < 10 ? '0' + Math.ceil(t) : Math.ceil(t));
            $timeBox.html(str);

            if(say.ended){
                clearInterval(sayTimer);
                phoneFn();
            }
        }, 1000);
        $noListenBtn.on('touchend', function () {
            say.pause();
            phoneEnd();
        });
        function phoneEnd(){
            let h = document.documentElement.clientHeight || document.body.clientHeight;
            $phoneBox.css({
                transform: `translateY(${h}px)`
            });
            //设置定时器，等待0.8s后触发下一个函数
            setTimeout(function () {
                msgFn();
            }, 1000)
        }
    });

};

let msgFn = function () {
//让每一个li先都透明且下移，然后循环这些li，让这些li轮流上升且显示出来
    let $msgBox = $('.msgBox'),
        $ul = $msgBox.children('ul'),
        $lis = $ul.find('li'),
        $keyboard = $msgBox.children('.keyboard'),
        $textBox = $keyboard.find('.textBox'),
        $btn = $keyboard.find('.btn');
    bgm.play();
    let h = 0,
        n = 0;//存储当前要显示的那个li的索引
    let moveTimer = null;

    function move() {
        moveTimer = setInterval(function () {
            if (n == $lis.length) {//若已经走完，则直接清除定时器
                clearInterval(moveTimer);
                return;
            }
            $lis.eq(n).css({
                transform: 'translateY(0)',
                opacity: 1
            });
            //oul向上移动，根据索引：索引大于3，就让ul向上移动
            if (n >= 3) {
                h += $lis[n].clientHeight;
                $ul.css({
                    transform: `translateY(-${h}px)`
                })
            }
            if (n == 2) {
                $keyboard.css({
                    transform: 'translateY(0)'
                });
                clearInterval(moveTimer);
                //接下来让字体一次显示出来
                setTimeout(function () {
                    inputWord();
                }, 1600)
            }
            n++;
        }, 2000)
    }

    move();
    function inputWord() {
        //让字体依次显示出来
        let str = $lis[n].innerText;//要显示的全部内容
        let str2 = '';//当前要显示的字体内容
        let timer2 = null;
        let index = 0;//控制当前要显示的文字
        //现在我们让字体出现之后，按钮再显示
        timer2 = setInterval(function () {
            if (index == str.length) {
                clearInterval(timer2);
                $btn.show();
                $btn.tap(function () {
                    $textBox.html('');
                    $lis.eq(n).css({
                        opacity: 1,
                        transform: 'translateY(0)'
                    });
                    h += $lis[n].clientHeight;
                    $ul.css({
                        transform: `translateY(-${h}px)`
                    });
                    $keyboard.css({
                        transform: 'translateY(3.7rem)'
                    });
                    move();
                    n++;
                });//点击按钮，1、清空textBox内容；2、键盘下降隐藏；3、对话框继续弹出
                return;
            }
            str2 += str[index];
            $textBox.html(str2);
            index++;
        }, 200)
    }

    /*$lis.each(function (index, item) {
     setTimeout(function () {
     $(item).css({
     opacity: 1,
     transform: 'translateY(0)'
     });
     if (index >= 3) {
     h += item.clientHeight;
     $ul.css({
     transform: `translateY(-${h}px)`
     })
     }
     if(index==2){
     $keyboard.css({
     transform:'translateY(0)'
     })
     }
     }, index * 2000)
     })*/
};