var data=null;
function getData(){
    var xhr=new XMLHttpRequest();
    xhr.open('get','JSON/data.json',false);
    xhr.onreadystatechange=function(){
        if(xhr.readyState==4&&xhr.status==200){
            data=toolBag.toJSON(xhr.responseText);
        }
    };
    xhr.send();
}
getData();
//----------
var box=document.getElementsByClassName('box')[0],
    oUls=box.getElementsByTagName('ul');
function giveHtml(){
    data.forEach(function(item,index){
        var {pic,title,height}=item,
            li=document.createElement('li');
        str=`<img src="http://www.sucaijishi.com/uploadfile/2013/0527/20130527034921885.gif" trueSrc="${pic}" height="${height}" alt="">
            <p>${title}</p>
        `;
        /*var n=index%4;
         oUls[n].innerHTML+=str;*/
        li.innerHTML=str;
        getMinUl().appendChild(li);
    });
}
giveHtml();
function getMinUl(){
    var ulAry=toolBag.toArray(oUls);
    ulAry.sort((a,b)=>{return a.clientHeight-b.clientHeight});
    return ulAry[0];
}
//----------
function loadImg(ele){
    if(ele.loaded)return;
    var scrT=toolBag.screenHeight(),
        cliH=toolBag.screenScrollH(),
        tarT=toolBag.offset(ele).t;
    if(scrT+cliH>=tarT){
        var trueSrc=ele.getAttribute('trueSrc');
        var temp=new Image;
        temp.src=trueSrc;
        temp.onload=function(){
            ele.src=trueSrc;
            ele.loaded=true;
            fadeIn(ele)
        };
        temp=null;
    }
}
function loadAll(eles){
    for(var i=0;i<eles.length;i++){
        loadImg(eles[i]);
    }
}
var oImgs=document.getElementsByTagName('img');
loadAll(oImgs);
window.onscroll=function(){
    loadAll(oImgs);
    getMore();
};
//-----------
function fadeIn(ele){
    ele.style.opacity=0;
    var opa=0.05;
    var timer=window.setInterval(function(){
        opa+=0.05;
        ele.style.opacity=opa;
        if(opa>=1){
            clearInterval(timer);
            ele.style.opacity=1;
        }
    },20);
}
//----------
function getMore(){
    var temp=getMinUl();
    var tarT=temp.clientHeight+toolBag.offset(temp).t;
    var srcT=toolBag.screenScrollH();
    var cliH=toolBag.screenHeight();
    if(srcT+cliH>tarT){
        getData();
        giveHtml();
    }
}