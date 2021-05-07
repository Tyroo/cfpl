//引入删除动画插件
domLastic.init({
    itemsClassnameToConnect: 'wait_reply_span',
    itemsJointStrength: 10,
    animationSpeed: 400,
    animationIntensity: 0.6,
    animationDirection: 'horizontal'
});

 //强制改变超过980px宽度的图片的宽度为980px
 function ImgWidth_Change()
{
    let img = document.querySelectorAll('#main_content .line-numbers img');
    if(img)
    {
        for(var i=0;i<img.length;i++)
        {
            if (img[i].offsetWidth>980)
            {
                img[i].style.width = '980px';
            }
        }
    }
}



//自动生成目录，仅对H2标签有效
function Autogeneration_Catalog()
{
    let article_content = document.getElementById('article_content').getElementsByTagName('*');
    let tagflag_h = [false,false,false,false,false,false];
    let catalog_box = document.querySelector('.catalog_box');

    for(let i=0;i<article_content.length;i++){
        let AT = article_content[i].tagName;

        switch(AT){
            case 'H1':
                article_content[i].setAttribute('id','H1_'+i);
                tagflag_h[0] = true;
                break;
            case 'H2':
                article_content[i].setAttribute('id','H2_'+i);
                tagflag_h[1] = true;
                break;
            case 'H3':
                article_content[i].setAttribute('id','H3_'+i);
                tagflag_h[2] = true;
                break;
            case 'H4':
                article_content[i].setAttribute('id','H4_'+i);
                tagflag_h[3] = true;
                break;
            case 'H5':
                article_content[i].setAttribute('id','H5_'+i);
                tagflag_h[4] = true;
                break;
            case 'H6':
                article_content[i].setAttribute('id','H6_'+i);
                tagflag_h[5] = true;
                break;
            default:
                break;
        }
    }

    for(let i=0;i<tagflag_h.length;i++){
        if (tagflag_h[i]==true){
            let tag_h = document.getElementById('article_content').getElementsByTagName('h2');

            for(let j=0;j<tag_h.length;j++){
                let catalog_box_a = document.createElement('a'); //向目录栏中插入a标签
                catalog_box_a.innerHTML = tag_h[j].innerText;
                catalog_box_a.setAttribute('id','catalog_'+tag_h[j].id);
                catalog_box_a.href = '#'+tag_h[j].id;
                catalog_box_a.style.display = 'block';
                catalog_box_a.style.margin = '10px auto';
                catalog_box_a.style.color = '#555';
                catalog_box_a.style.fontSize = '16px';
                catalog_box.appendChild(catalog_box_a);
            }
        break;
        }
    }
}


//点击更改背景按钮后，改变背景图片以及颜色
var img_n = 0;          //图片索引
var change_bg = document.getElementById('change_bg');
change_bg.onclick = function()
{
    let body1 = document.querySelector('body');
    let main_content = document.querySelector('#main_content');
    let left_column = document.querySelector('#left_column');
    let head1 = document.querySelector('#head');
    let p_tag = document.querySelectorAll('#article_content p');
    let bg_tag_list = [head1,main_content,left_column,p_tag];

    img_n%=4;       //4为背景的个数
    body1.style.background = "url('../static/img/article_bg"+(img_n+1)+".jpg')";
    if(img_n==0){
        for(let i=0;i<bg_tag_list.length;i++){
            if(i>2){
                 for(let j=0;j<bg_tag_list[i].length;j++){
                    bg_tag_list[i][j].style.color = '#777';
                 }
            }
            else{
                bg_tag_list[i].style.background = 'rgba(51,51,51,0.82)';
            }
        }
    }
    else{
         for(let i=0;i<bg_tag_list.length;i++){
            if(i==0){
                bg_tag_list[i].style.background = '#ebebeb';
            }
            else{
                if(i>2){
                    for(let j=0;j<bg_tag_list[i].length;j++){
                        bg_tag_list[i][j].style.color = 'black';
                    }
                }
                else{
                    bg_tag_list[i].style.background = 'rgba(255,255,255,0.82)';
                }
            }
        }
    }
    img_n++;
}

//文章长度收展方法
// function unfold_packup(oper){
//
//     var get_height = document.getElementById('article_content').offsetHeight;	  //获取全文实际的高度；
//     var multiplier = 1;	//高度展开倍数；
//     var unfold_button = document.getElementById('unfold_button');
//     var packup_button = document.getElementById('packup_button');
//
//     if (oper === 'unfold' && 5000*multiplier < get_height)
//     {
//         if(get_height >= 5000*(multiplier+1))
//         {
//             unfold_button.disabled = false;
//             multiplier++;
//             console.log(multiplier);
//             document.getElementById('article_content').style.height = 5000*multiplier+'px';
//         }
//         else
//         {
//             unfold_button.disabled = true;
//             document.getElementById('article_content').style.height = get_height+'px';
//             console.log('已经展开全部！');
//         }
//         if(multiplier > 1)
//         {
//             packup_button.disabled = false;
//         }
//     }
//     else if(oper === 'packup' && multiplier>1)
//     {
//         if(unfold_button.disabled === false)
//         {
//             multiplier--;
//             if(multiplier === 1)
//             {
//                 packup_button.disabled = true;
//             }
//         }
//         unfold_button.disabled = false;
//         document.getElementById('article_content').style.height = 5000*multiplier+'px';
//     }
//     else
//     {
//         if (5000 < get_height)
//         {
//             unfold_button.disabled = false;
//             document.getElementById('article_content').style.height = 5000 + 'px';
//         }
//         else
//         {
//             unfold_button.disabled = true;
//             document.getElementById('article_content').style.height = get_height + 'px';
//         }
//         packup_button.disabled = true;
//     }
// }

//创建一级评论列表项
function CreateOneComment(user,content,imgurl)
{
    //获取一级评论内容区容器对象
    var comment_content = document.querySelector('#comment #comment_content');
    //创建元素对象
    let comment_list1 = document.createElement('div');
    comment_list1.setAttribute('class','comment_list1');

    let img_span = document.createElement('span');
    img_span.setAttribute('class','img_span');

    let img = document.createElement('img');
    img.src = imgurl;

    let list1_right = document.createElement('div');
    list1_right.setAttribute('class','list1_right');

    let sender_user_span1 = document.createElement('span');
    sender_user_span1.setAttribute('class','sender_user_span1');
    sender_user_span1.setAttribute("onclick","CreateWaitReplySpan(this)");
    sender_user_span1.innerText = user+':';
    sender_user_span1.title = '回复Ta~';

    let comment_content1 = document.createElement('div');
    comment_content1.insertAdjacentHTML('afterBegin', content);  //向comment_content1最后一个子节点的后面插入元素
    comment_content1.setAttribute('class','line-numbers comment_content1');

    let comment_list2 = document.createElement('div');
    comment_list2.setAttribute('class','comment_list2');
    let ul = document.createElement('ul');

    //将元素插入到对应容器中
    img_span.appendChild(img);
    comment_list2.appendChild(ul);
    let element_ls = [sender_user_span1,comment_content1,comment_list2];
    for(let i=0;i<element_ls.length;i++)
    {
        list1_right.appendChild(element_ls[i]);
    }
    comment_list1.appendChild(img_span);
    comment_list1.appendChild(list1_right);
    comment_list1.style.opacity = 0;
    comment_content.appendChild(comment_list1);
    FadeInOut(comment_list1,0.01);
}

//创建二级评论列表项
 function CreateTwoComment(elem,sender_user,receiver_user,content)
 {
    let ul = 0;
    //获取二级评论内容区容器对象ul
     if(elem.getAttribute('class') === 'sender_user_span1')
         ul = elem.nextSibling.nextSibling.firstChild;  //获得ul节点
     else
         ul = elem.parentNode.parentNode; //获得ul节点

     let list2_right = document.createElement('li');
     list2_right.setAttribute('class','list2_right');

     let sender_user_span2 = document.createElement('span');
     sender_user_span2.setAttribute('class','sender_user_span2');
     sender_user_span2.innerText = sender_user;

     let reply_button = document.createElement('span');
     reply_button.setAttribute('class','reply_button');
     reply_button.setAttribute("onclick","CreateWaitReplySpan(this.previousSibling)");
     reply_button.innerText = '回复';

     let receiver_user_span2 = document.createElement('span');
     receiver_user_span2.setAttribute('class','receiver_user_span2');
     receiver_user_span2.innerText = receiver_user;

     let comment_content2 = document.createElement('div');
     comment_content2.insertAdjacentHTML('afterBegin', content);  //向comment_content1最后一个子节点的后面插入元素
     comment_content2.setAttribute('class','comment_content2');

     let element_ls = [sender_user_span2,reply_button,receiver_user_span2,comment_content2];

     for(let i=0;i<element_ls.length;i++)
     {
        list2_right.appendChild(element_ls[i]);
     }
     ul.appendChild(list2_right);
     /*let class_value = obj[0].parentNode.getAttribute('class');
     if(class_value === '')
     {

     }*/

 }


//删除对应待回复对象函数
function RemoveWaitReplySpan(v)
{
	let wait_reply_ls = document.querySelectorAll("#wait_reply span");
    wait_reply_ls = Array.prototype.slice.call(wait_reply_ls);  //将NodeList对象转为数组
	let index = wait_reply_ls.indexOf(v);
	domLastic.animateItems();
    v.remove();
    ObjectThis.splice(index,1);
}

var ObjectThis = [];   //创建全局数组,用来存储创建wait_reply_span用到的被点击对象


//生成对应待回复对象
function CreateWaitReplySpan(v){  //v:对象本身，值为：this
    let du = v.innerText;

    if(v.getAttribute('class') === 'sender_user_span1')
	    du = du.substr(0,du.length - 1);
	let due = document.getElementById("_?"+du+"?_");
	if(due === null && ObjectThis.length<3)
	{
		let wait_reply = document.querySelector("#wait_reply");
        let wait_reply_span = document.createElement("span");
        wait_reply_span.setAttribute("class","wait_reply_span");
        wait_reply_span.setAttribute("onclick","RemoveWaitReplySpan(this)");

        wait_reply_span.innerText = du;
        wait_reply_span.setAttribute("id","_?" + du + "?_");
        wait_reply_span.setAttribute("title","待回复对象："+du+'\n'+'(点击可移除)');
        //wait_reply_span.style.Width = "50px";
        wait_reply.appendChild(wait_reply_span);
        //window.alert(v.title);
        return ObjectThis.push(v);
	}
	else if(due === null)
    {
        window.alert("待回复列表已满！");
    }
	else
	{
		window.alert("待回复列表中已存在！");
	}
}


/*淡入淡出方法*/
function FadeInOut(elem,value){  //value为淡入淡出精度，淡入时设置为负值，反之为正值，推荐绝对值0.01
    let alpha = 0.5;
    if(value > 0)
        alpha = 0;
    else
        alpha = 1;
    let timer=setInterval(
    function(){
          alpha+=value;
          elem.style.opacity=alpha;
          if(alpha>=1||alpha<=0){
          clearInterval(timer);
         }
   },15);
}

//给Prism添加收展按钮
Prism.plugins.toolbar.registerButton('code unfold/packup', function(env) {
	var button = document.createElement('button')
    button.value = 'false';
	button.innerHTML = '展开';
	let article_content = document.getElementById('article_content');
	button.addEventListener('click', function () {
        let bvf = this.value;
        if(bvf === 'false')
        {
            this.parentNode.parentNode.previousSibling.style.overflow = 'auto';
            this.parentNode.parentNode.previousSibling.style.height = 'auto';
            this.value = 'true';
            this.innerHTML = '收起';
        }
        else
        {
            this.parentNode.parentNode.previousSibling.style.overflow = 'hidden';
            this.parentNode.parentNode.previousSibling.style.height = '16px';
            this.value = 'false';
            this.innerHTML = '展开';
        }
        article_content.style.height = 'auto';
	});

	return button;
});

/*****************************************************事件函数****************************************************/
//进入页面时的事件
window.onpageshow = function ()
{
    ImgWidth_Change();
}


//页面加载完成后的事件
window.onload = function()
{
    // unfold_packup('blank');
    Autogeneration_Catalog();
}

//点击发布按钮向评论中添加对应列表
var publish_comment = document.getElementById('publish_comment');
var browse_username = document.querySelector('.header').getAttribute('data-browse_username');

publish_comment.onclick = function (){
    let content = tinyMCE.activeEditor.getContent(); //获取富文本框的内容
    tinyMCE.activeEditor.setContent(''); //发送后设置富文本框的内容为空
    let wait_reply_ls = document.querySelectorAll("#wait_reply span");

    if(content !=='' && content.length > 11)
    {
        if(document.cookie)
        {
            if(wait_reply_ls.length === 0)
            {
                CreateOneComment(browse_username,content,'/static/img/headimg.jpg');
            }
            else
            {
                CreateTwoComment(ObjectThis[0],browse_username,ObjectThis[0].innerText,content);
            }
            let comment_content1_ls = document.querySelectorAll('.comment_content1 pre code');
            comment_content1_ls.forEach(Prism.highlightElement);
        }
        else
        {
            window.alert('请先登录后再发表评论！');
        }
    }
    else if(content === '')
    {
        window.alert('评论内容不可为空！');
    }
    else
    {
        window.alert('评论内容必须超过4个字符！');
    }
}

class NextMenu {

    constructor() {
        this.side_flag = false;     // 定义一个上下拉标志
        this.deviceHeight = window.innerHeight; // 获取窗口可视区域的高
        this.menu = document.querySelector('.menu_box');    // 获取菜单DOM对象
    }

    // 下拉菜单滑动操作方法
    menuSide() {
        this.side_flag = !this.side_flag;
        if (this.side_flag) {
            this.menu.style.height = `${(this.deviceHeight/16 - 3.5)}rem`;
            this.menu.style.opacity = '0.95';
        } else {
            this.menu.style.height = '0';
            this.menu.style.opacity = '0';
        }
    }
}

let menu_icon = document.querySelector('.menu_icon');   // 获取上下拉按钮DOM对象
let nextMenu = new NextMenu();  // 实例化一个NextMenu对象
menu_icon.onclick = nextMenu.menuSide.bind(nextMenu);


