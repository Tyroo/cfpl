var mid = document.querySelector('#mid');
var special_class = document.querySelector('#special_class');
var special_radio = document.querySelectorAll('#special_class .SpecialRadio');
var special_span_label_a = document.querySelectorAll('#special_class span label a');
var theme_span_label = document.querySelector('.theme span label');

/*点击网站中部任意位置，收回专题分类栏*/
mid.onclick = function () {
    var change_special = document.querySelector('#change_special');
    change_special.checked = false;   //取消专题分类复选框的选中状态
}

/*点击专题分类栏中的专题，导航栏中显示所点击的专题*/
function RadioSpecial(argName,obj) {
    ChangeUrlArg(argName,obj.value);
}

/*进入文章列表页后，获取当前页面url的参数*/
function GetUrlArg(argName) {

    var url = document.location.toString();  //获取当前页面url
    var args = url.split('?')[1];
    if (argName == 'all'){
        return args;
    }
    else{
        var re = new RegExp(argName+"(=\\d+)");
        var values = re.exec(url);
        if (values != null){
            var value = Number(values[0].split('=')[1]);
            if ((values[0].split('=')[0] == argName)&&(Number.isInteger(value) == true)){
                return value;
            }
            else{
                return null;
            }
        }
        else{
            return 'none';
        }
    }

}

/*修改url参数值，并返回参数链*/
function ChangeUrlArg(argName,Value){
    var url = document.location.toString();

    switch(argName){
        case 'section':
            url = '/index/special/?'+argName+'='+Value;
            break;
        default: {
            var re = new RegExp(argName+"(=\\d+)");
            if (re.exec(url) == null) {
                url = url + '&class=1&sort=1&page=1';
            }
            url = url.replace(re,argName+'='+Value);
            break;
        }
    }
    window.location.href = url;
}

/*通过url参数判断用户所选择的板块，并使url对应的板块单选按钮选中*/
function SectionElect(){
    var ARG1 = GetUrlArg('section');
    if((ARG1 != null) && (0<ARG1) && (ARG1<special_radio.length+1)){
        special_radio[ARG1-1].checked = true;
        theme_span_label.innerText = special_span_label_a[ARG1-1].innerText;
    }
}

/*通过板块生成对应的分类,并使url对应的分类单选按钮选中*/
function ClassElect(){
    var ARG1 = GetUrlArg('section');
    var ARG2 = GetUrlArg('class');
    var class_tag = document.querySelectorAll('#mid #article_head ul li label a');   //获取分类栏中的a标签
    var class_list = [];
    switch(ARG1){
        case 1:         //当选择板块1（话题板块）时加载对应的分类列表
            class_list = ['全部','学习','闲聊','其他'];
            break;
        case 2:         //当选择板块2（话题板块）时加载对应的分类列表
            class_list = ['全部','校内','校外','其他'];
            break;
        case 3:         //当选择板块3（话题板块）时加载对应的分类列表
            class_list = ['全部','XX墙','XX墙','XX墙'];
            break;
        case 4:         //当选择板块4（话题板块）时加载对应的分类列表
            class_list = ['全部','学习','闲聊','其他'];
            break;
        default:
            class_list = null;
            break;
    }

    for(var i=0;i<class_tag.length;i++){
        if(class_list != null){
            class_tag[i].innerText = class_list[i];
            document.getElementById('article_head').style.display = 'block';
        }
        else{
            document.getElementById('article_head').style.display = 'none';
            break;
        }
    }

    if((ARG2 != null) && (0<ARG2) && (ARG2<article_head_ul_radio.length+1)){
        article_head_ul_radio[ARG2-1].checked = true;
    }
    else if(ARG2 == 'none'){
        article_head_ul_radio[0].checked = true;
    }
    else{
        window.location.href = '/index/';
    }
}

var article_head_select_option = document.querySelector('#mid #article_head select option');


/*当点击分类栏中的任意一项时,获取url参数链并且加载对应内容*/

var article_head_ul_radio = document.querySelectorAll('#mid #article_head ul input');

function RadioEvent(argName,obj){
    ChangeUrlArg(argName,obj.value);
}

/*插入文章列表，从服务器获取文章后，让每篇文章生成一个列表项*/



window.onload = function(){
    SectionElect();
    ClassElect();
}

