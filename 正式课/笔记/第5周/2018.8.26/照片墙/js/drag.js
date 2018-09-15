function dragStart(e) {
    e = e || window.event;
    e.preventDefault();
    //document.onmousemove = dragMove.bind(this);
    on(document, 'mousemove', dragMove.bind(this));
    //document.onmouseup = dragEnd.bind(this);
    on(document, 'mouseup', dragEnd.bind(this));
    //盒子的初始位置
    this.startX = this.offsetLeft;
    this.startY = this.offsetTop;
    //鼠标的初始位置
    this.mx = e.pageX;
    this.my = e.pageY;

    fire(this, 'myIndex');
    //———↓———
    this.style.boxShadow = '5px 5px 10px 0 ';
    /*this.style.left=this.startX-5+'px';
     this.style.top=this.startY-5+'px';*/
    $(this).animate({
        left: this.startX - 5,
        top: this.startY - 5
    }, 100);
    //———↑———
}
function dragMove(e) {
    e.preventDefault();
    e = e || window.event;
    var x = e.pageX - this.mx,
        y = e.pageY - this.my;
    /*this.style.left = this.startX + x + 'px';
     this.style.top = this.startY + y + 'px';*/
    //———↓———
    this.style.left = this.startX + x - 5 + 'px';
    this.style.top = this.startY + y - 5 + 'px';
    //———↑———
    //求速度
    //prevX：上一次move触发时 鼠标X的距离
    if (!this.prevX) {
        this.prevX = 0;
    }
    this.speed = e.pageX - this.prevX;//两次move触发时移动的距离当作速度
    this.prevX = e.pageX;
    fire(this, 'myHit');
}
function dragEnd() {
    //document.onmousemove = null;
    off(document, 'mousemove');
    //document.onmouseup = null;
    off(document, 'mouseup');
    this.maxL = (document.documentElement.clientWidth || document.body.clientWidth) - this.offsetWidth;
    this.maxT = (document.documentElement.clientHeight || document.body.clientHeight) - this.offsetHeight;
    if (!this.running) {
        //fly.call(this);
        fire(this, 'myFly')
    }
    //drop.call(this);
    fire(this, 'myDrop');
    fire(this, 'myHit');
    fire(this, 'myChangePos');
    //———↓———
    this.style.boxShadow = '';
    //———↑———
}
