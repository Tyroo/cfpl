/*
* HTTP请求封装
*/

class Xhttp {
    constructor() {
        // 实例化xhttp对象
        this.xhttp = this.createXhttp();
        this.delay = 8; // 响应异常拦截延时(单位秒)
    }

    /*
    *功能：请求构造器
    *参数：
    *返回：XMLHttpRequest对象实例
    */
    createXhttp() {
        let xhttp;
        if (window.XMLHttpRequest) {
            // 针对现代浏览器
            xhttp = new XMLHttpRequest();
        } else {
            // 针对IE6、IE5
            xhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        xhttp.addEventListener('error', function () {
            throw new Error('请求失败，请检查网络状态！');
        });
        return xhttp;
    }

    /*
    *功能：发送get请求
    *参数：<url>请求的url，<args>json格式的请求参数，<async>请求是否为异步，默认异步
    *返回：json格式响应数据
    */
    get(url, nextBack, async= true) {
        let that = this;
        this.xhttp.onreadystatechange = function() {
            if (this.readyState === 4 && this.status === 200) {
                nextBack(this.responseText);  // 响应成功执行
            } else {
                that.interceptor(this.status);  // 响应异常拦截
            }
        }
        this.xhttp.open("GET", url, async);
        this.xhttp.send();
    }

    /*
    *功能：发送post请求
    *参数：<args>json格式的请求参数，<async>请求是否为异步，默认异步
    *返回：json格式响应数据
    */
    post(url, args, nextBack, async= true) {
        let that = this;
        this.xhttp.onreadystatechange = function() {
            if (this.readyState === 4 && this.status === 200) {
                nextBack(JSON.parse(this.responseText));  // 响应成功执行
            } else {
                if (this.readyState === 4) {
                    that.interceptor(this.status);  // 响应异常拦截
                }
            }
        }
        args = JSON.stringify(args);  // json格式转化为字符串
        this.xhttp.open('POST', url, async);
        this.xhttp.setRequestHeader("Content-type","application/json");
        this.xhttp.send(args);
    }

    /*
    *功能：发送put请求
    *参数：<args>json格式的请求参数
    *返回：json格式响应数据
    */
    put(url, args) {
        // pass
    }

    /*
    *功能：发送del请求
    *参数：<args>json格式的请求参数
    *返回：n/y
    */
    del(url, args) {
        // pass
    }

    /*
    * 功能：响应拦截，处理异常响应（可被重写）
    * 参数：<stateCode>响应状态码，<delay>延时（单位秒）
    * 返回值：
    */
    interceptor(stateCode, delay= this.delay) {
        window.setTimeout(function () {
            this.xhttp.abort(); // 取消请求
            if (499 < stateCode < 600) {
                // 服务端异常
                switch (stateCode) {
                    case 500:
                        throw new Error("服务器无法处理该请求！");
                    case 503:
                        throw new Error("服务器维护中！");
                    case 501:
                        throw new Error("此请求方式不被支持！");
                    default:
                        throw new Error("服务端异常！")
                }
            } else if (399 < stateCode < 500) {
                // 客户端异常
                switch (stateCode) {
                    case 401:
                        throw new Error("登录失效，请重新登录！");
                    case 403:
                        throw new Error("请求被拒绝！");
                    case 404:
                        throw new Error("未找到资源！");
                    default:
                        throw new Error("客户端请求异常！")
                }
            } else {
                throw new Error("未知错误！")
            }

        }, delay*1000);
    }
}


var xhttp = new Xhttp();
xhttp.get('#',function (data) {
    console.log(data);
});

// export default Xhttp
