function on(ele, type, f) {
    if (/^my/.test(type)) {
        ele[type] = ele[type] || [];
        var n = ele[type].indexOf(f);
        if (n > -1)return;
        ele[type].push(f);
    } else {
        //需要判断type是否带"on"，有的话就直接用，没有的话就补上
        if (!/^(on)/.test(type)) {
            ele['on' + type] = f;
        }else{
            ele[type] = f;
        }
        //ele.addEventListener(type,f,false);
    }

}
function fire(ele, type) {
    ele[type] = ele[type] || [];
    ele[type].forEach((item)=> {
        item && item.call(ele);
    });
}
function off(ele, type, f) {
    if(/^my/.test(type)){
        ele[type] = ele[type] || [];
        var n = ele[type].indexOf(f);
        if (n != -1) {
            ele[type].splice(n, 1);
        }
    }else{
        //证明是原生的事件
        type=/^on/.test(type)?type:'on'+type;
        ele[type]=null;
    }
}
