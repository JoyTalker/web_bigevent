$(function(){
    var form = layui.form
    var layer = layui.layer
    form.verify({
        nickname:function(value){
            if(value.length>6){
                return '昵称必须在1-6个字符之间!'
            }
        }
    })
    initUserInfo()
    //初始化用户的基本信息
    function initUserInfo(){
        $.ajax({
            method:'GET',
            url:'/my/userinfo',
            success:function(res){
                if(res.code!==0){
                    return layer.msg('获取用户信息失败！')

                }
                console.log(res)
                //调用form.val()快速为表单赋值
                form.val('formUserInfo',res.data)
            }
        })
    }
    $('btnReset').on('click',function(e){
        e.preventDefault()
        initUserInfo()
    })
    //监听表单的提交事件
    $('.layui-form').on('submit',function(e){
        e.preventDefault()
        //发起ajax请求
        $.ajax({
            method:'POST',
            url:'/my/userinfo',
            data:$(this).serialize(),
            success:function(res){
                if(res.code!==0){
                    return layer.msg('更新用户信息失败！')
                    //调用父页面中的方法，重新渲染用户的头像和用户信息
                    window.parent.getUserInfo()

                }
            }
        })
    })
})