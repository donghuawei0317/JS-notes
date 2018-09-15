var oLis = document.getElementsByTagName('li'),
    n = 1;
//———将每个li定位———
[...oLis].reverse().forEach((item)=> {
    item.style.left = item.offsetLeft + 'px';
    item.style.top = item.offsetTop + 'px';
    item.style.position = 'absolute';
    on(item, 'mousedown', dragStart);
    on(item, 'myzIndex', changezIndex);
    on(item, 'myisHit', isHit);
    on(item, 'myChangePos', changePos);
});
//———改变zIndex———
function changezIndex() {
    this.style.zIndex = n++;
}
//———碰触动作———
function isHit() {
    this.ary = [];
    this.zl = this.offsetLeft;
    this.yl = this.zl + this.clientWidth;
    this.sl = this.offsetTop;
    this.xl = this.sl + this.clientHeight;
    [...oLis].forEach((item)=> {
        if (item === this)return;
        item.zl = item.offsetLeft;
        item.yl = item.zl + item.clientWidth;
        item.sl = item.offsetTop;
        item.xl = item.sl + item.clientHeight;
        if (this.zl > item.yl || this.yl < item.zl || this.sl > item.xl || this.xl < item.sl) {
            item.style.background = '';
        } else {
            item.style.background = 'lightblue';
            this.ary.push(item);
        }
    });
}
//———交换位置———
function changePos() {
    this.ary = this.ary || [];
    this.ary.forEach((item)=> {
        item.style.background = '';
        var x = this.offsetLeft - item.offsetLeft,
            y = this.offsetTop - item.offsetTop;
        item.instance = Math.pow(x, 2) + Math.pow(y, 2);

    });
    this.ary.sort((a, b)=> {
        return a.instance - b.instance;
    });
    if (!this.ary.length) {
        $(this).animate({
            left: this.startX,
            top: this.startY
        }, 150);
        // this.style.left=this.startX+'px';
        // this.style.top=this.startY+'px';
    } else {
        $(this).animate({
            left: this.ary[0].offsetLeft,
            top: this.ary[0].offsetTop
        }, 150);
        $(this.ary[0]).animate({
            left: this.startX,
            top: this.startY
        }, 150);
        // this.style.left=this.ary[0].offsetLeft+'px';
        // this.style.top=this.ary[0].offsetTop+'px';
        // this.ary[0].style.left=this.startX+'px';
        // this.ary[0].style.top=this.startY+'px';
    }
}