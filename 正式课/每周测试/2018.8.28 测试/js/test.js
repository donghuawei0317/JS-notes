var oLis = document.getElementsByTagName('li'),
    n = 1;
[...oLis].reverse().forEach((item)=> {
    item.style.left = item.offsetLeft + 'px';
    item.style.top = item.offsetTop + 'px';
    item.style.position = 'absolute';
    on(item, 'mousedown', start);
    on(item, 'myChangezIndex', changezIndex);
    on(item,'myIsHit',isHit);
    on(item,'myChangePos',changePos);
});
function changezIndex() {
    this.style.zIndex = n++;
}
function isHit() {
    this.zl = this.offsetLeft;
    this.yl = this.zl + this.offsetWidth;
    this.sl = this.offsetTop;
    this.xl = this.sl + this.offsetHeight;
    this.ary = [];
    [...oLis].forEach((item)=> {
        if(this==item)return;
        item.zl = item.offsetLeft;
        item.yl = item.zl + item.offsetWidth;
        item.sl = item.offsetTop;
        item.xl = item.sl + item.offsetHeight;
        if (this.zl > item.yl || this.yl < item.zl || this.sl > item.xl || this.xl < item.sl) {
            item.style.background = '';
        } else {
            item.style.background = 'red';
            this.ary.push(item);
        }
    })
}
function changePos(){
    this.ary=this.ary||[];
    this.ary.forEach((item)=>{
        item.style.background='';
        var x=this.offsetLeft-item.offsetLeft,
            y=this.offsetTop-item.offsetTop;
        item.instance=Math.pow(x,2)+Math.pow(y,2);
    });
    this.ary.sort((a,b)=>{
        return a.instance-b.instance;
    });
    if(!this.ary.length){
        $(this).animate({
            left:this.startX,
            top:this.startY
        },500);
    }else{
        $(this).animate({
            left:this.ary[0].offsetLeft,
            top:this.ary[0].offsetTop
        },500);
        $(this.ary[0]).animate({
            left:this.startX,
            top:this.startY
        },500);
    }
}