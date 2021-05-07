import Timer from './timer.js';

var span_name1 = ["line_span1","line_span2","line_span3","line_span4","line_span5"];
var li_name1 =["ImgLi1","ImgLi2","ImgLi3","ImgLi4","ImgLi5"];
var span_name = document.querySelectorAll(".line span");
var li_name = document.querySelectorAll(".Img_list ul li");

/*改变导航整体宽*/
/*var screen_width = window.screen.width;
var navigation = document.querySelector('.navigation');
navigation.style.width = screen_width/16 + 'em';*/
/************改变span的颜色**********/
/*向左改变span的颜色函数*/
function Set_SpanLeft() {
    span_name1.push(span_name1.shift());
    Set_SpanName();
}
/*向右改变span的颜色*/
function  Set_SpanRight() {
    span_name1.unshift(span_name1.pop());
    Set_SpanName();
}
/*重新设置span的class值*/
function Set_SpanName() {

for (let i = 0,len = span_name1.length; i < len; i++) {
    span_name[i].className = span_name1[i];
}
}


/***********切换li的图片*************/
/*设置li向左切换图片*/
function Set_LiLeft() {
    let promise = new Promise((resolve,reject) => {
        li_name1.push(li_name1.shift());
        resolve();
    });
    promise.then((res,err) => {
        Set_LiName();
        Set_SpanLeft();
    });
}

/*向右切换Li的图片*/
function  Set_LiRight() {
    let promise = new Promise(((resolve, reject) => {
        li_name1.unshift(li_name1.pop());
        resolve();
    }));
    promise.then((res, err) => {
        Set_LiName();
        Set_SpanRight();
    });
}

/*重新设置li的class值*/
function Set_LiName() {
    for(let i = 0, len = li_name.length;i < len;i++) {
        li_name[i].className = li_name1[i];
    }
}

const left_btn = document.querySelector(".left_btn");
const right_btn = document.querySelector(".right_btn");




left_btn.onclick = Set_LiLeft;
right_btn.onclick = Set_LiRight;


var timer = new Timer(5, Set_LiRight);

window.onload = function() {
    // 轮播图定时任务
    timer.start();

};

const slideshow = document.querySelector(".Slideshow");



/**************轮播图自动播放与停止************/


/*当鼠标接触轮播图时停止自动播放*/
slideshow.onmouseenter = function () {
        left_btn.style.display = 'table';
        right_btn.style.display = 'table';
        console.log('停止播放！！！');
        timer.stop();
}

// /*当鼠标未接触轮播图时开始自动播放*/
slideshow.onmouseleave  = function () {
        timer.start();
        console.log('开始播放！！！');
        left_btn.style.display = 'none';
        right_btn.style.display = 'none';
        /*定义并调用自动播放函数*/
}



/******************退出登录**********************/
var log_out = document.getElementById('log_out');
if(log_out != null){
    log_out.onclick = function(){
    var xmlhttp;
    var form_data = {
        'logout': 'True'
    };

    if(window.XMLHttpRequest){
        xmlhttp = new XMLHttpRequest();
    }
    else{
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function(){
        if(this.readyState === 4 && this.status === 200)
        {
            console.log(xmlhttp.response);
            window.location.href = "/index";
        }
    }
    form_data = JSON.stringify(form_data);  //将json格式转化为字符串
    xmlhttp.open('POST','#',true);
    xmlhttp.setRequestHeader("Content-type","application/json");    // 设置请求响应类型
    xmlhttp.send(form_data);
}
}



/*鼠标悬浮在个人中心上，显示简易登录信息页*/
var personal = document.getElementById('personal');
var login_info = document.getElementById('login_info');
var mid = document.querySelector('.mid');
if(personal != null){
    personal.onmouseover = function(){
        login_info.style.top = '70px';
        login_info.style.opacity = '1';
    };
    mid.onclick = function(){
        login_info.style.top = '-105px';
        login_info.style.opacity = '0';
    };
}











