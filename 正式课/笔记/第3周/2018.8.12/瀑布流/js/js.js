//1、从后台获取数据
var data = null;
/*var xhr = new XMLHttpRequest();
 xhr.open('get', 'JASON/data.json', false);
 xhr.onreadystatechange = function () {
 if (xhr.readyState == 4 && /^2\d{2}$/.test(xhr.status)) {
 data = toolBag.toJSON(xhr.responseText);
 }
 };
 xhr.send();*/
function getData() {
    var xhr = new XMLHttpRequest();
    xhr.open('get', 'JASON/data.json', false);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && /^2\d{2}$/.test(xhr.status)) {
            data = toolBag.toJSON(xhr.responseText);
        }
    };
    xhr.send();
}
getData();
//2、将数据渲染到页面上
var box = document.getElementsByClassName('box')[0];
var oUls = document.getElementsByTagName('ul');
var ulAry = toolBag.toArray(oUls);//把类数组转换成数组
var oImgs = document.getElementsByTagName('img');
/*data.forEach(function (item, index) {
 //index是从0到data.length；要知道每一条数据放到哪个ul里，我们在这里，把前四条依次放到四个ul中；后四条再一次放图四个ul中
 var {pic,title}=item;//对象的结构赋值
 var str = `<li>
 <img src="${pic}" alt="">
 <p>${item.title}</p>
 </li>`;
 var n=index%4;
 oUls[n].innerHTML+=str;
 });*/
/*function giveHTML(data) {
    data.forEach(function (item, index) {
        //index是从0到data.length；要知道每一条数据放到哪个ul里，我们在这里，把前四条依次放到四个ul中；后四条再一次放图四个ul中
        var {pic, title, height}=item;//对象的结构赋值
        var str = `<li>
               <img src="img/default.gif" realSrc="${pic}" height="${height}" alt="">
               <p>${title}</p>
               </li>`;
        //挨个依次排会导致长短差距越来越大
        getMinUl().innerHTML += str;
        //排序方法换为按照长短排
    });
}*/
function giveHTML2(data) {
    data.forEach(function (item, index) {
        //index是从0到data.length；要知道每一条数据放到哪个ul里，我们在这里，把前四条依次放到四个ul中；后四条再一次放图四个ul中
        var {pic, title, height}=item;//对象的结构赋值
        var li=document.createElement('li');
        var str = `
               <img src="img/default.gif" realSrc="${pic}" height="${height}" alt="">
               <p>${title}</p>
               `;
        li.innerHTML=str;
        getMinUl().appendChild(li);
        //排序方法换为按照长短排
    });
}
//找个子最低的ul
function getMinUl() {
    ulAry.sort((a, b)=> {
        return a.clientHeight - b.clientHeight;
    });
    return ulAry[0];
}
giveHTML2(data);
giveHTML2(data);
giveHTML2(data);
giveHTML2(data);
giveHTML2(data);
//实现图片的懒加载，我们需要先把真实路径存放到img自定义属性上,给img一个默认的小图
function loadImg(ele) {
    if (ele.loaded)return;
    var scrT = toolBag.screenScrollH();
    var cliH = toolBag.screenHeight();
    var tarT = toolBag.offset(ele).t;
    if (scrT + cliH > tarT) {
        var temp = document.createElement('img');
        var realSrc = ele.getAttribute('realSrc');
        temp.src = realSrc;
        temp.onload = function () {
            ele.src = realSrc;
            ele.loaded = true;
            fadeIn(ele);
        };
        temp = null;
    }
}
function loadAll(eles) {
    for (var i = 0; i < eles.length; i++) {
        loadImg(eles[i]);
    }
}
loadAll(oImgs);
window.onscroll = function () {
    loadAll(oImgs);
    getMore();
};
//加载新数据
function getMore(){
    var scrT=toolBag.screenScrollH();
    var cliH=toolBag.screenHeight();
    var temp=getMinUl();
    var tarT=temp.clientHeight+toolBag.offset(temp).t;//ul最低的高度
    if(scrT+cliH>tarT){
        getData();//获取新数据
        giveHTML2(data);
    }
}
function fadeIn(ele){
    ele.style.opacity=0;
    var opa=0.1;
    var timer=window.setInterval(function(){
        opa+=0.1;
        ele.style.opacity=opa;
        if(opa>=1){
            clearInterval(timer);
            ele.style.opacity=1;
        }
    },20);
}