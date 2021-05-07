var error_tag1 = document.querySelectorAll(".Sign .frame div a");
var error_tag2 = document.querySelectorAll(".Login .frame div a");
/*清除登录/注册界面中所有输入框和错误框中的内容*/
function ClearText(tag1,tag2){
    for(var i=1;i<10;i++){
            document.getElementById("ls_input" + i).value = "";
    }
    for(var j=0;j<4;j++){
        if(j<2){
            tag1[j].innerText = "";
            tag2[j].innerText = "";
        }
        else{
            tag1[j].innerText = "";
        }

    }
    send_auth.style.display = 'none';
}

var sign_btn = document.getElementById("sign_btn");
var return_loginbtn = document.getElementById("returnlogin_btn");

/**当点击注册或返回登录按钮时清空输入框的所有数据*/
sign_btn.onclick = function(){
                                ClearText(error_tag1,error_tag2);
                             }
return_loginbtn.onclick = function(){
                                        ClearText(error_tag1,error_tag2);
                                }




var input_tag1 = document.querySelectorAll(".Sign .frame div input");


/*跳转主页函数*/
function Ship(Data,values){      //Data为判断对象，value为条件值，即Data==value时跳转
        if (String(Data) === values)
        {
            sign_submit.onclick = false;
            window.location.href = "/index";
            return;
        }
}


/*按键防恶意点击方法*/
var send_auth = document.getElementById("send_auth");
var time1 = 30;
function ButtonStart(){ //按键状态控制函数
    time1--;
    if(time1<1){
        time1 = 30;
        $('#send_auth').attr("disabled",false);
        send_auth.style.color = 'white';
        send_auth.style.background = '#cc183d';
        send_auth.innerHTML = "发送";
        clearInterval(tipld);
    }
    else{
        send_auth.style.color = '#262626';
        send_auth.style.background = '#555555';
        send_auth.innerHTML = time1+"s";
    }
}
function TimeButton(){  //点击按钮后每秒改变一次按键状态
    tipld = setInterval("ButtonStart()",1000);
}

/*ajax异步处理请求函数*/
function AjaxVerify(ls_input,i,error_tag,flagvalue,data_data,values){

        if(ls_input === "NO"){
            var text = "88888888";
        }
        else
        {
            var text = String(ls_input.value);
        }


        if(text.length<=16)
        {
          if(text.length>0)
            {
                $.ajax({
                    type: 'post',
                    cache: false,
                    data: data_data,
                    success:function(data){
                        var data = eval("("+data+")");
                        Ship(data.State,values);
                        var DU2 = String(data.username2);
                        var DP2 = String(data.password2);
                        var DM2 = String(data.mail2);
                        if(flagvalue === "username")
                        {
                                if (DU2 === "correct")
                                {
                                        error_tag[1].innerText = "✔";     //修改a标签中的内容
                                        error_tag[1].style.color = "#00ff00";
                                }
                                else if(DU2 === "error")
                                {
                                        error_tag[1].innerText = "✘";
                                        error_tag[1].style.color = "#cc183d";
                                }
                                else
                                {
                                    error_tag[1].innerText = "";
                                }
                        }
                        else if(flagvalue === "affirmsign")
                        {

                                if(DM2 === "correct")
                                {
                                    error_tag[0].innerText = "✔";
                                    error_tag[0].style.color = "#00ff00";
                                }
                                else if(DM2 === "error")
                                {
                                      error_tag[0].innerText = "✘";
                                      error_tag[0].style.color = "#cc183d";
                                }
                                else
                                {
                                    error_tag[0].innerText = "";
                                }
                                if(DP2 === 'correct')
                                {
                                       error_tag[3].innerText = "✔";
                                       error_tag[2].innerText = "✔";
                                       error_tag[2].style.color = "#00ff00";
                                       error_tag[3].style.color = "#00ff00";
                                }
                                else if(DP2 === 'unlikeness')
                                {
                                      error_tag[2].innerText = "";
                                      error_tag[3].innerText = "✘";
                                      error_tag[3].style.color = "#cc183d";
                                }
                                else if(DP2 === 'beyond')
                                {
                                      error_tag[2].innerText = "✘";//密码超出范围(9≤length≤17),或含有空格
                                      error_tag[3].innerText = "";
                                      error_tag[2].style.color = "#cc183d";
                                }
                                else if(DP2 === 'blank')
                                {
                                    error_tag[2].innerText = "✘     【含有空格】";
                                    error_tag[3].innerText = "";
                                    error_tag[2].style.color = "#cc183d";
                                }
                                else
                                {
                                    error_tag[2].innerText = "✘";
                                    error_tag[3].innerText = "";
                                    error_tag[2].style.color = "#cc183d";
                                }
                        }
                        else
                        {
                            //console.log(DU2,DP2);
                            if(DU2 === "correct")
                            {
                                if(DP2 === "correct")
                                {
                                    error_tag[0].innerText = "✔";
                                    error_tag[1].innerText = "✔";
                                    error_tag[0].style.color = "#00ff00";
                                    error_tag[1].style.color = "#00ff00";
                                }
                                else
                                {
                                    error_tag[0].innerText = "";
                                    error_tag[1].innerText = "✘";
                                    error_tag[0].style.color = "#cc183d";
                                    error_tag[1].style.color = "#cc183d";
                                }
                            }
                            else
                            {
                                error_tag[0].innerText = "✘";
                                error_tag[1].innerText = "";
                                error_tag[0].style.color = "#cc183d";
                                error_tag[1].style.color = "#cc183d";
                            }
                        }
                    },
                    error: function(){
                        console.log('Request error!!!');
                    }
                });
            }
          else
            {
                error_tag[i].innerText = "";
                error_tag[i].style.color = "#cc183d";
            }
        }
        else
        {
            error_tag[i].innerText = "✘     【长度>16】";
            error_tag[i].style.color = "#cc183d";
        }
}



/*AJAX异步加载，实现注册时实时判断用户名是否已存在或者不符合规范，并反馈给注册界面错误信息*/

var ls_input7 = input_tag1[4];
$(document).ready(function(){

    ls_input7.addEventListener("keyup",function(){
        AjaxVerify(ls_input7,
                            1,
                    error_tag1,
                    "username",
                    {
                        name1: String(input_tag1[0].value),
                        studentnumber1: String(input_tag1[1].value),
                        username1: String(input_tag1[4].value),
                        password1: String(input_tag1[5].value),
                        affirmpassword1: String(input_tag1[6].value),
                        flag1: 'username'     //当flagvalue为'username'时代表验证用户名请求，
                                            //为'affirmsign'时代表确认注册请求。
                },
                "succeed"
                );
        });
    });

/*当邮箱输入框有文字时显示出发送按钮*/

input_tag1[2].addEventListener("keyup",function(){
    if (String(input_tag1[2].value) !==''){
        send_auth.style.display = 'inline-block';
    }
    else{
        send_auth.style.display = 'none';
    }
});


/*发送按钮按下发送验证码请求给服务器并接收到正确响应后按钮变为30s内不可在次被按下状态*/
//function Ajax2(){
//                    $.ajax({
//                    type: 'post',
//                    cache: false,
//                    data: {
//                      mail1: String(input_tag1[2].value),
//                      flag1: "authcode"
//                    },
//                    success:function(data){
//                        var data = eval("("+data+")");
//                        var DM2 = String(data.mail2);
//                        console.log("HHHHHHHHHHHHHHHHHHHHHHHH");
//                        if(MD2 = "correct"){
//                             TimeButton();
//                            }
//                        }
//                    });
//}
//提交发送验证码请求函数
send_auth.addEventListener("click",function(){
                send_auth.style.color = '#262626';
                send_auth.style.background = '#555555';
                $('#send_auth').attr("disabled",true);
                $.ajax({
                    type: 'post',
                    cache: false,
                    data: {
                      mail1: String(input_tag1[2].value),
                      flag1: "authcode"
                    },
                    success:function(data){
                        var data = eval("("+data+")");
                        var DM2 = String(data.mail2);
                        if(DM2 === "correct"){
                             TimeButton();
                            }
                        else{
                            $('#send_auth').attr("disabled",false);
                            send_auth.style.color = 'white';
                            send_auth.style.background = '#cc183d';
                        }
                        },
                    error:function (XMLHttpRequest){
                        $('#send_auth').attr("disabled",false);
                        send_auth.style.color = 'white';
                        send_auth.style.background = '#cc183d';
                    }
                    });

                   });



/*当点击确定注册按钮时发送异步请求给服务器，准备注册*/
var sign_submit = document.getElementById("sign_submit");
var ls_input8 = document.getElementById("ls_input8");

sign_submit.onclick = function(){
    AjaxVerify(ls_input8,
                        2,
                error_tag1,
                "affirmsign",
                {
                    name1: String(input_tag1[0].value),
                    studentnumber1: String(input_tag1[1].value),
                    mail1: String(input_tag1[2].value),
                    authcode1: String(input_tag1[3].value),
                    username1: String(input_tag1[4].value),
                    password1: String(input_tag1[5].value),
                    affirmpassword1: String(input_tag1[6].value),
                    flag1: 'affirmsign'     //当flagvalue为'username'时代表验证用户名请求，
                                            //为'affirmsign'时代表确认注册请求。
                },
                "succeed"
                );
}

/*当点击登录按钮时发送异步请求给服务器，准备登录*/
var login_submit = document.getElementById("login_submit");
var ls_input2 = document.getElementById("ls_input2");

var input_tag2 = document.querySelectorAll(".Login .frame div input");

var base64 = new Base64();
//1.点击登陆按钮后登录
login_submit.onclick = LoginSubmit;
//2.在登录界面的密码框中敲击回车触发登陆操作
ls_input2.addEventListener('keyup',function(event){
    if(event.key === 'Enter'){
        LoginSubmit();
    }
})

function LoginSubmit(){
    var username = input_tag2[0].value;
    var password = input_tag2[1].value;
    AjaxVerify(
        ls_input2,
                1,
        error_tag2,
        "login",
        {
            username1: base64.encode((username)),
            password1: base64.encode((password)),
            flag1:"login"
        },
        "succeed"
    );
}

