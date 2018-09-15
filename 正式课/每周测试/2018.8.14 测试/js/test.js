var box=document.getElementsByClassName('box')[0],
    oUl=box.getElementsByTagName('ul'),
    ulArray=utils.toArray(oUl),
    _img=document.getElementsByTagName('img'),
    data=null;
//——————
function getData(){
    var xhr=new XMLHttpRequest();
    xhr.open('get','JSON/data.json',false);
    xhr.onreadystatechange=function(){
        if(xhr.readyState==4&&xhr.status==200){
            data=JSON.parse(xhr.responseText);
        }
    };
    xhr.send();
}
getData();
//——————
function littleUl(){
    ulArray.sort((a,b)=>{return a.clientHeight-b.clientHeight});
    return ulArray[0];
}
function giveHtml(data){
    for(var i=0;i<data.length;i++){
        var li=document.createElement('li');
        var str=`
            <img src="img/default.gif" dataImg="${data[i].pic}" height="${data[i].height}" alt="">
            <p>${data[i].title}</p>
        `;
        li.innerHTML=str;
        littleUl().appendChild(li);
    }
}
giveHtml(data);
//——————
function lozyImg(ele){
    if(ele.loaded)return;
    var A=utils.offset(ele).t,
        B=utils.clientH()+utils.scrollT();
    if(A<B){
        var tempImg=new Image,
            dataImg=ele.getAttribute('dataImg');
        tempImg.src=dataImg;
        tempImg.onload=function(){
            ele.src=dataImg;
            ele.loaded=true;
            fadeIn(ele);
        };
        tempImg=null;
    }
}
function loadAll(eles){
    for(var i=0;i<eles.length;i++){
        lozyImg(eles[i]);
    }
}
loadAll(_img);
//——————
function getMore(){
    var A=utils.offset(littleUl()).t+littleUl().clientHeight,
        B=utils.scrollT()+utils.clientH();
    if(A<B){
        getData();
        giveHtml(data);
    }
}
//——————
window.onscroll=function(){
    loadAll(_img);
    getMore();
};
//——————
function fadeIn(ele){
    ele.style.opacity=0;
    var opa=0.05;
    var timer=window.setInterval(function(){
        opa+=0.05;
        ele.style.opacity=opa;
        if(opa>=1){
            ele.style.opacity=1;
            clearInterval(timer);
        }
    },20)
}
