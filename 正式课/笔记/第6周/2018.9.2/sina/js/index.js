var $oul=$('.ulBox'),
    $listBox=$('.listBox');
//———轮播图———
function bannerFn(){
    var mySwiper=new Swiper('.bannerBox',{
        autoplay:{
            disableOnInteraction:false,
            delay:1000
        },
        loop:true,
        pagination: {
            el: '.pageBox',
            type: 'fraction',
            currentClass:'currentPage',
            totalClass:'totalPage'
        },
    });
}

//———获取数据———
/*$.ajax({
    type:'get',
    url:'json/banner.json',
    data:{t:123,q:456},
    success:function(data){
        giveHtml(data);
    },
    error:function(){}
});*/
//———展示数据———
function giveHtml(data){
    var str='';
    data=data||[];
    data.forEach((item)=>{
        str+=` <li class="swiper-slide">
                    <a href="#">
                        <img src="${item.img}" alt="">
                        <div>${item.title}</div>
                    </a>
                </li>`
    });
    $oul.html(str);
    // bannerFn();
}
//———promise方法———
var p=new Promise(function(resolve,reject){
    $.ajax({
        type:'get',
        url:'json/banner.json',
        success:function(data){
            resolve(data);
        },
        error:function(res){
            reject(res);
        }
    })
});
p.then(function(data){
    //———第一个参数：promise执行成功的函数———
    giveHtml(data);
    return data;
},function(){
    //———第二个参数：promise执行失败的函数———
}).then(function(data){
    bannerFn();
},function(res){});

var listPro=new Promise(function(resolve,reject){
    $.ajax({
        type:'post',
        url:'json/list.json',
        data:{t:1},
        success:function(data){
            resolve(data);
        },
        error:function(res){
            reject(res);
        }
    })
});
function giveListHtml(data){
    data=data||[];
    var str='';
    data.forEach((item)=>{
        switch(item.type){
            case 0:
                str+=`<a href="#">
            <div class="text_box">
                <p>${item.title}</p>
                <div class="comment_box">
                    <em class="">
                        <span class="">${item.num}</span>
                        <span class="icon_com"></span>
                    </em>
                </div>
            </div>
        </a>`;
                break;
            case 1:
                str+=`<a href="#">
            <div class="img_box">
                <img src="${item.img}" alt="">
            </div>
            <div class="text_box">
                <p>${item.title}</p>
                <div class="comment_box">
                    <em class="">
                        <span class="">${item.num}</span>
                        <span class="icon_com"></span>
                    </em>
                </div>
            </div>
        </a>`;
                break;
            case 3:
                str+=` <a href="#" class="three_box">
            <p>${item.title}</p>
            <div class="three_pic">
                <div>
                    <img src="${item.img[0]}" alt="">
                </div>
                <div>
                    <img src="${item.img[1]}" alt="">
                </div>
                <div>
                    <img src="${item.img[2]}" alt="">
                </div>
            </div>
            <div class="comment_box">
                <em class="">
                    <span class="">${item.num}</span>
                    <span class="icon_com"></span>
                </em>
            </div>
        </a>`;
                break;
        }
    });
    $listBox.html(str);
}
listPro.then(function(data){
    giveListHtml(data);
});