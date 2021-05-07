//引入删除动画插件
domLastic.init({
  itemsClassnameToConnect: 'article_li',
});

//AJAX请求方法
function AjaxRequest(method,url,async,content_type,data,cfunction){
    var xhttp;
    if (window.XMLHttpRequest) {
        xhttp = new XMLHttpRequest();
    }
    else {
		xhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
	xhttp.open(method,url,async);
	if(content_type != undefined){
	    xhttp.setRequestHeader("Content-type", content_type);
	}
	if(method == "POST"){
		xhttp.send(data);
	}
	else if(method == "GET"){
		xhttp.send();
	}
	else{
		return;
	}
	xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            if(cfunction != undefined){
                cfunction(this);
            }
			return this.responseText;
		}
		else{
			return false;
		}
	}
}

/*复制函数，用来复制论坛号*/
function BbsnumberCopy(){
    let bbsnumber = document.getElementById('bbsnumber');
    let range = document.createRange();     //创建一个range对象，用来存要复制的数据
    let selection = window.getSelection();  //创建一个选择器，用来选中数据，以便后面复制
    let bbsText = bbsnumber.childNodes[0];  //获取bbsnumber的第0个子节点我标签名,此处为bbsnumber里面的文本
    range.setStart(bbsText,4);      //设置要存的文本字符串的起始点
    range.setEnd(bbsText,bbsText.length);  //设置要存的文本字符串的终止点
    selection.removeAllRanges();    //在选中前先清除上次复制选中的内容
    selection.addRange(range);      //将已经存好的数据装到选择器中使其选中
    document.execCommand('copy', false);    //执行复制操作，将复制选择器里面的内容
}

//对文章列表中的文章操作（加锁、删除、编辑）
function ArticleSetting(obj,item){
    if(item == 'editor'){
        window.location.href = '/editor/?change=1&index='+obj.value;
    }
    else if(item == 'delete'){
        delete_flag = window.confirm('确定要删除此文章吗？');
        if(delete_flag == true){
            let form_data = {
                'item': item,
                'index': obj.value
            };
            form_data = JSON.stringify(form_data);
            let ar = AjaxRequest('POST','#',true,"application/json",form_data,function(t){
                if(t.responseText == 'yes'){
                    //删除动画
                    domLastic.animateItems();
                    obj.parentNode.remove(); //删除文章列表中对应的那一项
                }
                else{
                    console.log(t.requestText);
                    window.alert('删除失败！');
                }
            });
        }
    }
    else if(item == 'addlock'){

    }
    else{
        return;
    }
}

