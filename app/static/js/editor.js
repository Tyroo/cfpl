

var affirm_issue = document.getElementById('affirm_issue');
var pop_windows = document.getElementById('pop_windows');
var pop_windows_content_h3 = document.querySelector('#pop_windows_content h3');
var pop_windows_content_h4 = document.querySelector('#pop_windows_content h4');

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
			cfunction(this);
			return this.responseText;
		}
		else{
			return false;
		}
	}
}

function ha1(t){
    console.log(JSON.parse(t.responseText));

}

function IssueVerdict(t){
    if (t.responseText != 'yes'){
        pop_windows_content_h3.innerHTML = '✘';
        pop_windows_content_h3.style.color = '#cc183d';
        pop_windows_content_h3.style.borderColor = '#cc183d';
        pop_windows_content_h4.innerHTML = '发布失败！';
    }
    else{
        pop_windows_content_h3.innerHTML = '✔';
        pop_windows_content_h3.style.color = '#00ff00';
        pop_windows_content_h3.style.borderColor = '#00ff00';
        pop_windows_content_h4.innerHTML = '发布成功！';
    }
    pop_windows.style.display = 'block';
    FadeInOut(pop_windows,0.1);
}

window.onload = function(){
    let textarea = document.getElementById("former_article");
    if(textarea != undefined){
        tinyMCE.activeEditor.setContent(textarea.innerText);
    }
    AjaxRequest('GET','/editor_data/',true,undefined,undefined,ha1);

    affirm_issue.addEventListener('click',function(){
        var select = document.querySelectorAll('.select select');
        var content = tinyMCE.activeEditor.getContent(); //获取富文本框的内容
        //tinyMCE.activeEditor.setContent('设置内容'); //设置富文本编辑框中的内容
        content = String(content);
        console.log(content);
        var title = document.querySelector('#title');
        var url = document.location.toString();  //获取当前页面url
        var re1 = new RegExp('change'+"(=\\d+)");
        var change = re1.exec(url);
        var form_data = {
                        'index': "",
                        'title': title.value,
                        'content': content,
                        'plate': select[0].value,
                        'classify': select[1].value
        };
        if(change != null && change[0].split('=')[1] === '1'){
            var re2 = new RegExp('index'+"(=[A-z]+)");
            let index = re2.exec(url);
            form_data['index'] = index[0].split('=')[1];
        }
        form_data = JSON.stringify(form_data);
        AjaxRequest('POST','#',true,"application/json",form_data,IssueVerdict);
    });
}

/*淡入淡出方法*/
function FadeInOut(elem,value){  //value为淡入淡出精度，淡入时设置为正值，反之为负值，推荐绝对值0.01
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


var pop_windows_btn = document.getElementById('pop_windows_btn');

pop_windows_btn.addEventListener('click',function(){
    FadeInOut(pop_windows,-0.1);
    pop_windows.style.display = 'none';
})






