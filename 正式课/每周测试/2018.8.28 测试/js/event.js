function on(ele, style, f) {
    if (/^my/.test(style)) {
        ele[style] = ele[style] || [];
        var n = ele[style].indexOf(f);
        if (n = -1) {
            ele[style].push(f);
        }
    } else {
        if (/^on/.test(style)) {
            ele[style] = f;
        } else {
            ele['on' + style] = f;
        }
    }
}
function fire(ele, style) {
    ele[style] = ele[style] || [];
    ele[style].forEach((item)=> {
        item && item.call(ele);
    })
}
function off(ele, style, f) {
    if (/^my/.test(style)) {
        var n = ele[style].indexOf(f);
        if (n != -1) {
            ele[style].splice(n, 1);
        }
    } else {
        style = /^on/.test(style) ? stype : 'on' + style;
        ele[style] = null;
    }
}