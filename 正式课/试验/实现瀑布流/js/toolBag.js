var toolBag=(function(){
    //获取单个元素样式属性值：
    function getCss(ele,attr){
        var str=navigator.userAgent;
        var res=null;
        if(/MSIE *[6-8]/.test(str)){
            res=ele.currentStyle[attr];
        }else{
            res=getComputedStyle(ele)[attr];
        }
        //先用parseFloat这里这个字符串，若是NaN，则直接返回之前的字符串
        //用isNaN处理
        /*if(!isNaN(parseFloat(res))){
         res=parseFloat(res);
         }*/
        //用正则处理
        var reg=/^[+-]?(\d|[1-9]\d+)(\.\d+)?(px|rem|em|pt)?$/;
        res=reg.test(res)?parseFloat(res):res;
        return res;
    }
    //给单个元素设置样式属性：
    function setCss(ele,attr,value){
        var reg=/width|height|padding|margin|left|right|top|bottom|fontsize/i;
        if(reg.test(attr)){
            value=parseFloat(value)+'px';
        }
        ele.style[attr]=value;
    }
    //给某个元素同时设置多个样式属性：
    function setGroup(ele,obj){
        if(Object.prototype.toString.call(obj)=='[object Object]'){
            for(var k in obj){
                if(obj.hasOwnProperty(k)){
                    setCss(ele,k,obj[k]);
                }
            }
        }
    }
    //获取或者给元素设置属性：
    function css(...arg){
        if(arg.length==2){
            if(typeof arg[1]=='string'){
                return getCss(arg[0],arg[1]);
            }
            setGroup(arg[0],arg[1]);
        }else{
            setCss(arg[0],arg[1],arg[2]);
        }
    }
    //将类数组转换成数组：
    function toArray(arg) {
        return Array.prototype.slice.call(arg,0);
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
        while (temp && temp.nodeName.toLowerCase() != 'body'){
            l += temp.offsetLeft + temp.clientLeft;
            t += temp.offsetTop + temp.clientTop;
            temp = temp.offsetParent;
        }
        return {
            l,t
        }
    }
    //获取当前屏幕的高度：
    function screenHeight(){
        return document.documentElement.clientHeight || document.body.clientHeight;
    }
    //获取文档的高度：
    function textHeight(){
        return document.documentElement.scrollHeight || document.body.scrollHeight;
    }
    //获取卷上去的页面的高度：
    function screenScrollH(){
        return document.documentElement.scrollTop || document.body.scrollTop;
    }
    //获取元素子节点
    function children(ele){
        var childs=ele.children;
        var ary=[];
        for(var i=0;i<childs.length;i++){
            if(childs[i].nodeType==1){
                ary.push(childs[i]);
            }
        }
        return ary;
    }
    return {
        getCss,setCss,setGroup,css,toArray,toJSON,offset,screenHeight,textHeight,screenScrollH,children
    }
})();
