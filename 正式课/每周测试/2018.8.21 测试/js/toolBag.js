var toolBag = (function () {
    //获取单个元素样式属性值：
    function getCss(ele, attr) {
        var str = navigator.userAgent;
        var res = null;
        if (/MSIE *[6-8]/.test(str)) {
            res = ele.currentStyle[attr];
        } else {
            res = getComputedStyle(ele)[attr];
        }
        //先用parseFloat这里这个字符串，若是NaN，则直接返回之前的字符串
        //用isNaN处理
        /*if(!isNaN(parseFloat(res))){
         res=parseFloat(res);
         }*/
        //用正则处理
        var reg = /^[+-]?(\d|[1-9]\d+)(\.\d+)?(px|rem|em|pt)?$/;
        res = reg.test(res) ? parseFloat(res) : res;
        return res;
    }

    //给单个元素设置样式属性：
    function setCss(ele, attr, value) {
        var reg = /width|height|padding|margin|left|right|top|bottom|fontsize/i;
        if (reg.test(attr)) {
            value = parseFloat(value) + 'px';
        }
        ele.style[attr] = value;
    }

    //给某个元素同时设置多个样式属性：
    function setGroup(ele, obj) {
        if (Object.prototype.toString.call(obj) == '[object Object]') {
            for (var k in obj) {
                if (obj.hasOwnProperty(k)) {
                    setCss(ele, k, obj[k]);
                }
            }
        }
    }

    //获取或者给元素设置属性：
    function css(...arg) {
        if (arg.length == 2) {
            if (typeof arg[1] == 'string') {
                return getCss(arg[0], arg[1]);
            }
            setGroup(arg[0], arg[1]);
        } else {
            setCss(arg[0], arg[1], arg[2]);
        }
    }

    //将类数组转换成数组：
    function toArray(arg) {
        var ary=[];
        try{
            ary=Array.prototype.slice.call(arg, 0);
        }catch(e){
            for (var i = 0; i < arg.length; i++) {
                ary[ary.length]=arg[i];
            }
        }
        return ary;
    }

    //将JSON字符串转换为JSON对象：
    function toJSON(str) {
        var obj = null;
        try {
            obj = JSON.parse(str);
        } catch (e) {
            obj = eval(`(${str})`);
        }
        return obj;
    }

    //获取盒子外边框到body的距离：
    function offset(ele) {
        var l = ele.offsetLeft;
        var t = ele.offsetTop;
        var temp = ele.offsetParent;
        while (temp && temp.nodeName.toLowerCase() != 'body') {
            l += temp.offsetLeft + temp.clientLeft;
            t += temp.offsetTop + temp.clientTop;
            temp = temp.offsetParent;
        }
        return {
            l, t
        }
    }

    //获取当前屏幕的高度：
    function screenHeight() {
        return document.documentElement.clientHeight || document.body.clientHeight;
    }

    //获取当前屏幕宽度
    function screenWidth() {
        return document.documentElement.clientWidth || document.body.clientWidth;
    }

    //获取文档的高度：
    function textHeight() {
        return document.documentElement.scrollHeight || document.body.scrollHeight;
    }

    //获取卷上去的页面的高度：
    function screenScrollH() {
        return document.documentElement.scrollTop || document.body.scrollTop;
    }

    //根据标签名获取元素子节点
    function children(ele, tagName) {
        var childs = ele.childNodes;
        var ary = [];
        for (var i = 0; i < childs.length; i++) {
            if (childs[i].nodeType == 1) {
                if (typeof tagName !== 'undefined') {
                    if (childs[i].tagName.toLowerCase() === tagName.toLowerCase()) {
                        ary.push(childs[i]);
                    }
                    continue;
                }
                ary.push(childs[i]);
            }
        }
        return ary;
    }

    //单方向限时运动（要移动的元素，限制的时间，属性，目标位置，时间间隔）
    function move(ele, duration, attr, tar, T) {
        var beginL = css(oDiv, 'left');
        var changeL = tar - beginL;
        var times = 0;
        var speed = changeL / duration;
        var timer = setInterval(function () {
            times += T;
            if (times >= duration) {
                clearInterval(timer);
                times = duration;
            }
            //当前位置=运动距离+初始位置
            var curPos = linear(times, changeL, duration, beginL);
            css(ele, attr, curPos);
        }, T);

        function linear(time, changeL, duration, beginL) {
            return changeL / duration * time + beginL;
        }
    }

    //删除某个className
    function deleteClass(ele, str) {
        str = str.replace(/^ +| +$/g, '');
        if (!hasClass(ele, str))return;
        var ary = str.split(/ +/g);
        for (var i = 0; i < ary.length; i++) {
            var reg = new RegExp('(^| +)' + ary[i] + '( +|$)', 'g');
            ele.className = ele.className.replace(reg, ' ');
        }
    }

    //添加className
    function addClass(ele, str) {
        str = str.replace(/^ +| +$/g, '');//去除首位空格
        if (hasClass(ele, str))return;//如果之前有这个类名，直接return
        var ary = str.split(/ +/);//把str分割成数组，每一项都是类名
        for (var i = 0; i < ary.length; i++) {
            if (!hasClass(ele, ary[i])) {
                ele.className += (' ' + ary[i]);
            }
        }
    }

    //判断元素有没有某个className
    function hasClass(ele, str) {
        str = str.replace(/^ +| +$/g, '');
        var ary = str.split(/ +/g);
        for (var i = 0; i < ary.length; i++) {
            var reg = new RegExp('(^| +)' + ary[i] + '( +|$)');
            if (!reg.test(ele.className)) {
                return false;
            }
        }
        return true;
    }

    //获取所有或者指定某个元素下的含某个className的元素
    function getEleByClass(strClass, ele) {
        ele = ele || document;
        var result = [],
            nodeList = ele.getElementsByTagName('*');
        strClass = strClass.replace(/^\s+|\s+$/g, '').split(/ +/);
        for (var i = 0; i < nodeList.length; i++) {
            var item = nodeList[i],
                itemClass = item.className,
                flag = true;
            for (var k = 0; k < strClass.length; k++) {
                var reg = new RegExp('(^| +)' + strClass[k] + '( +|$)');
                if (!reg.test(itemClass)) {
                    flag = false;
                    break;
                }
            }
            flag ? result.push(item) : null;
        }
        return result;
    }

    return {
        getEleByClass,
        hasClass,
        addClass,
        getCss,
        setCss,
        setGroup,
        css,
        toArray,
        toJSON,
        offset,
        screenHeight,
        textHeight,
        screenScrollH,
        children,
        screenWidth,
        move,
        deleteClass
    }
})();
