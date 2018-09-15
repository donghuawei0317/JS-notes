var data = null,
    box=document.getElementsByClassName('box')[0],
    imgBox=box.getElementsByClassName('imgBox')[0],
    tipBox=box.getElementsByClassName('tipBox')[0],
    tips=tipBox.getElementsByTagName('li');
    btnBox=box.getElementsByClassName('btnBox')[0],
    leftBtn=btnBox.getElementsByClassName('leftBtn')[0],
    rightBtn=btnBox.getElementsByClassName('rightBtn')[0],
    boxW=toolBag.css(box,'width'),
    index=0,
    n=0;
//———获取数据———
function getData() {
    var xhr = new XMLHttpRequest();
    xhr.open('get', 'JSON/data.json', false);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            data=JSON.parse(xhr.responseText);
        }
    };
    xhr.send();
}
getData();
//———展示数据———
function giveHtml(){
    var str=``,
        tipStr=``;
    data.push(data[0]);
    data.forEach(function(item,index){
        str+=`<li>
            <img src="${item.pic}" alt="">
            <p>${item.title}</p>
        </li>`;
        if(index<data.length-1){
            tipStr+=`<li class="${index==0?'current':null}">${index+1}</li>`;
        }
    });
    n=data.length;
    toolBag.css(imgBox,'width',boxW*n);
    imgBox.innerHTML=str;
    tipBox.innerHTML=tipStr;
}
giveHtml();
//———动作设置———
function play(){
    if(toolBag.css(imgBox,'left')%boxW!==0)return;
    index++;
    if(index==n){
        toolBag.css(imgBox,'left',0);
        index=1;
    }
    if(index==-1){
        toolBag.css(imgBox,'left',-boxW*(n-1));
        index=n-2;
    }
    tips=toolBag.toArray(tips);
    for(var i=0;i<tips.length;i++){
        toolBag.deleteClass(tips[i],'current');
    }
    if(index==n-1){
        toolBag.addClass(tips[0],'current');
    }else{
        toolBag.addClass(tips[index],'current');
    }
    // toolBag.css(imgBox,'left',-boxW*index);
    myAnimate({
        curEle:imgBox,
        target:{left:-boxW*index},
        effect:animateEffect.Bounce.easeOut,
        duration:2000
    })
}
//———自动播放———
function autoPlay(){
    box.timer=setInterval(function(){
        play();
    },2000);
}
autoPlay();
//———点击事件———
leftBtn.onclick=function(){
    if(toolBag.css(imgBox,'left')%boxW!==0)return;
    index-=2;
    play();
};
rightBtn.onclick=function(){
    if(toolBag.css(imgBox,'left')%boxW!==0)return;
    play();
};
for(let i=0;i<tips.length;i++){
    tips[i].onclick=function(){
        if(toolBag.css(imgBox,'left')%boxW!==0)return;
        if(i==0){
            if(index==n-1){
                toolBag.css(imgBox,'left',0);
                index=-1;
            }else{
                index=-1;
            }
        }else{
            index=i-1;
        }
        play();
    }
}
//———鼠标移动———
box.onmouseenter=function(){
    clearInterval(box.timer);
    toolBag.css(leftBtn,'display','block');
    toolBag.css(rightBtn,'display','block');
};
box.onmouseleave=function(){
    toolBag.css(leftBtn,'display','none');
    toolBag.css(rightBtn,'display','none');
    autoPlay();
};