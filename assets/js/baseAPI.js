//注意：每次调用$.get()或$.post()或$.ajax()的时候
//会先调用这个函数
//在这个函数中，可以拿到我们给Ajax提供的配置对象$.ajax({})此{}里面的就包括url
$.ajaxPrefilter(function(options){
    // console.log(options.url)
    //在发起真正的Ajax请求之前，统一拼接请求的根路径
    //详情请见jQuery文档
    // options.url ='根路径'+options.url
    options.url ='https://big-event-vue-api-t.itheima.net/'+options.url
    //统一为有权限的接口，设置headers请求头
    if(options.url.indexOf('/my/')!==-1){
        options.headers={
        Authorization:localStorage.getItem('token')||''
    }
    //全局统一挂载 complete 回调函数
         options.complete=function(res){
            console.log('执行了complete回调函数')
            console.log(res)
            //在complete回调函数中，可以使用res.responseJSON 拿到服务器响应回来的数据
            if(res.responseSON.code===1&&res.responseJSON.message==='身份认证失败！'){
                //强制清空 token
                localStorage.removeItem('token')
                //强制跳转到登录页面
                location.href='/login.html'
            }
        }
    }
    
})