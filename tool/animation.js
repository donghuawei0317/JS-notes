(function () {
    var moveType = {
        linear: function (time, changeL, duration, beginL) {
            return changeL / duration * time + beginL;
        },
        easeIn: function (t, c, d, b) {
            return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
        },
        easeOut: function (t, c, d, b) {
            return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
        },
        easeInOut: function (t, c, d, b) {
            if ((t /= d / 2) < 1) {
                return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
            }
            return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
        }
    };
    function move(ele,duration,obj,moveT,callBack){
        var beginL={};
        var changeL={};
        moveT=moveT||'linear';
        for(var k in obj){
            if(obj.hasOwnProperty(k)){
                beginL[k]=toolBag.css(ele,k);
                changeL[k]=obj[k]-beginL[k];
            }
        }
        var times=0;
        var timer=window.setInterval(function(){
            times+=20;
            if(times>=duration){
                clearInterval(timer);
                times=duration;
                callBack&&callBack()
            }
            for(var k in obj){
                if(obj.hasOwnProperty(k)){
                    var curPos=moveType[moveT](times,changeL[k],duration,beginL[k]);
                    toolBag.css(ele,k,curPos);
                }
            }
        },20);
    }
    window.myAnimate=move;
})();
