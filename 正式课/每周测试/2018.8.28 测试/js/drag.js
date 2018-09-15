function start(e) {
    e = e || window.event;
    var tar = e.target || e.srcElement;
    this.startX = this.offsetLeft;
    this.startY = this.offsetTop;
    this.mx = e.pageX;
    this.my = e.pageY;
    on(document, 'mousemove', move.bind(this));
    on(document, 'mouseup', end.bind(this));
    fire(this, 'myChangezIndex');

    this.style.boxShadow = '5px 5px 10px 0';
    $(this).animate({
        left: this.startX - 5,
        top: this.startY - 5
    },100);
}
function move(e) {
    e.preventDefault();
    e = e || window.event;
    var tar = e.target || e.srcElement;
    var x = e.pageX - this.mx,
        y = e.pageY - this.my;
    this.style.left = this.startX + x - 5 + 'px';
    this.style.top = this.startY + y - 5 + 'px';


    if (!this.prevX) {
        this.prevX = 0;
    }
    this.speed = e.pageX - this.prevX;
    this.prevX = e.pageX;
    fire(this, 'myIsHit');
}
function end() {
    off(document, 'mousemove', move);
    off(document, 'mouseup', end);
    fire(this,'myIsHit');
    fire(this, 'myChangePos', changePos);

    this.style.boxShadow=null;
}