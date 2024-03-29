$(function(){
    //点击“去注册账号”的链接
    $('#link_reg').on('click',function(){
        $('.login-box').hide()
        $('.reg-box').show()
    })
    //点击“去登录”的链接
    $('#link_login').on('click',function(){
        $('.login-box').show()
        $('.reg-box').hide()
    })
    // 从layui 中获取form对象
// 只要导入layui 就有layui这个对象了
var form =layui.form
var layer=layui.layer// 调用msg方法的前提
//通过form.verify()函数自定义校验规则
form.verify({
    pwd:[/^[\S]{6,12}$/,'密码必须6到12位且不能出现空格'],
    //校验两次密码是否一致的规则
    repwd: function(value){
        //通过形参拿到的是确认密码框中的内容
        //还需要拿到密码框中的内容
        //然后进行一次等于的判断
        // 如果判断失败，则return一个提示消息即可
        //[]是属性选择
        var pwd=$('.reg-box [name=password]').val()
        if(pwd !==value){
            return '两次密码不一致！'
        }
    }
})
//监听注册表单的提交事件
$('#form_reg').on('submit',function(e){
    //阻止默认提交行为
    e.preventDefault();
    //发起Ajax的post请求
    // $.post('https://big-event-api-t.itheima.net/api/reg',
    $.post('/api/reg',
    {username:$('#form_reg[name=username]').val(),password:$('#form_reg[name=password]').val()},function(res){
        if(res.code!== 0){//code 相当于status 自定义的 具体看接口文档
            return layer.msg(res.message) 
        }
        layer.msg('注册成功,请登录')
        //模拟人的点击行为，自动跳转到登录页面
        $('#link_login').click()

    })
    
})

//监听登录表单的提交事件
$('#form_login').submit(function(e){
    e.preventDefault()
    $.ajax({
        // url:'https://big-event-api-t.itheima.net/api/login', 此方法麻烦
        url:'/api/login',
        method:'POST',
        //快速获取表单中的数据
        data:$(this).serialize(),
        success:function(res){
            if(res.code !==0){
                return layer.msg('登录失败！')
            }
            layer.msg('登录成功')
            //将登录成功得到的token字符串，保存到localStorage中
            localStorage.setItem('token',res.token)
            //接口中的token通常是指用于身份验证和安全访问的令牌。 
            //在开发Web应用程序或API时，为了保护资源，通常会使用token来进行验证。
            //token也是接口文档标明的
            //调转到后台主页
            location.href='./index.html'
        }
    })
})
})

