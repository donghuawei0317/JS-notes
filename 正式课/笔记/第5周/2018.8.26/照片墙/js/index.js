var oLis = document.getElementsByTagName('li'),
    n = 1;//增加zIndex
//———将每个li定位———
[...oLis].reverse().forEach((item)=> {
    item.style.left = item.offsetLeft + 'px';
    item.style.top = item.offsetTop + 'px';
    item.style.position = 'absolute';
    on(item, 'mousedown', dragStart);//点击
    on(item, 'myIndex', addzIndex);//优先显示
    on(item, 'myHit', isHit);//接触
    on(item, 'myChangePos', changePos);//交换位置
});
//———改变点击的元素的显示的优先级别———
function addzIndex() {
    this.style.zIndex = n++
}
//———设置接触时的动作———
function isHit() {
    //———点击的元素———
    this.sl = this.offsetLeft;//拖动元素的左边到父级盒子的距离
    this.el = this.sl + this.offsetWidth;//拖动元素的右边到父级盒子的距离
    this.st = this.offsetTop;//拖动元素的上边到父级盒子的距离
    this.et = this.st + this.offsetHeight;//拖动元素的下边到父级盒子的距离
    //———其他的元素———
    //需要用拖动元素与其他元素作比较，查看是否碰撞
    this.ary = [];//存放与拖拽元素产生碰撞的元素
    [...oLis].forEach((item)=> {
        if (item === this)return;//不能与自己作比较
        item.sl = item.offsetLeft;
        item.el = item.sl + item.offsetWidth;
        item.st = item.offsetTop;
        item.et = item.st + item.offsetHeight;
        if (this.sl > item.el || this.el < item.sl || this.st > item.et || this.et < item.st) {
            //没有与点击的元素接触时
            item.style.background ='';
        } else {
            //与点击的元素接触时
            item.style.background = 'red';
            this.ary.push(item);
        }
    });
}
//———将点击的元素与最近的元素交换位置———
function changePos() {
    //距离拖动元素最近的的那个元素交换位置
    this.ary.forEach((item)=> {
        var l = this.offsetLeft - item.offsetLeft,
            t = this.offsetTop - item.offsetTop;
        item.style.background = '';//松开鼠标时，将元素背景色恢复
        item.instance = Math.pow(l, 2) + Math.pow(t, 2);//勾股定理
    });
    //根据instance排序，顺序是从小到大
    this.ary.sort((a, b)=> {
        return a.instance - b.instance;
    });
    //this.ary[0]就是与拖动的元素最近的元素，将其与拖动元素交换位置
    //防止获取到的数组为空数组
    if (!this.ary.length) {
        $(this).animate({
            left: this.startX,
            top: this.startY
        }, 200);
        // this.style.left=this.startX+'px';
        // this.style.top=this.startY+'px';
    } else {
        $(this).animate({
            left: this.ary[0].offsetLeft,
            top: this.ary[0].offsetTop
        }, 200);
        $(this.ary[0]).animate({
            left: this.startX,
            top: this.startY
        }, 200);
        // this.style.left=this.ary[0].offsetLeft+'px';
        // this.style.top=this.ary[0].offsetTop+'px';
        // this.ary[0].style.left=this.startX +'px';
        // this.ary[0].style.top=this.startY+'px'
    }
}