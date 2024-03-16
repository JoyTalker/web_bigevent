$(function(){
    //调用 getUserInfo 获取用户基本信息
    getUserInfo()
})
//获取用户基本信息
function getUserInfo(){
    $.ajax({
        method:'GET',
        url:'/my/userinfo',
        //headers 就是请求头配置对象
        headers:{
            //token 本地浏览器application中localstorage的值（一个键，名字叫做token）
            // Authorization:localStorage.getItem('token')||''
        },
        success:function(res){
            if(res.code!==0){
                return layui.layer.msg('获取用户信息失败！')
            }
            //调用redenerAvatar渲染用户的头像
            renderAvater(res.data)
        },
        //不论成功还是失败，最终都会调用complete回调函数
        // complete:function(res){
        //     console.log('执行了complete回调函数')
        //     console.log(res)
        //     //在complete回调函数中，可以使用res.responseJSON 拿到服务器响应回来的数据
        //     if(res.responseISON.status===1&&res.responseISON.message==='身份认证失败！'){
        //         //强制清空 token
        //         localStorage.removeItem('token')
        //         //强制跳转到登录页面
        //         location.href='/login.html'
        //     }
        // }

    })
}
//大事件接口说明:

//1.项目的请求根路径为 http://big-event-vue-api-t.itheima.net

//2.以 /api开头的请求路径，不需要访问权限

//3.以/my开头的请求路径，需要在请求头中携带 Authorization 身份认证字段，才能正常访问成功
//渲染用户头像
function renderAvater(user){
    //获取用户的名称
    var  name=user.nickname||user.username
    //设置欢迎的文本
    $('#welcome').html('欢迎&nbsp;&nbsp;'+name)
    //按需渲染用户的头像
    if(user.user_pic!==null){
        //渲染图片头像
        $('.layui-nav-img').attr('src',user.user_pic).show()
        $('.text-avater').hide()
    }else{
        //渲染文本头像
        $('.layui-nav-img').hide()
        var first =name[0].toUppperCase()
        $('.text-avatar').html(first).show()
    }
}
// 在JavaScript中获取字符串的第一个字母，可以使用以下几种方法：

// 1. **下标索引**：
//    ```javascript
//    var str = "Hello, World!";
//    var firstLetter = str[0]; // 输出: "H"
//    ```

// 2. **charAt() 方法**：
//    ```javascript
//    var str = "Hello, World!";
//    var firstLetter = str.charAt(0); // 输出: "H"
//    ```

// 3. **substring() 方法**（虽然这个方法主要用于提取子串，但也可以用于获取单个字符）：
//    ```javascript
//    var str = "Hello, World!";
//    var firstLetter = str.substring(0, 1); // 输出: "H"
//    ```

// 4. **String.prototype.charCodeAt()**：
//    如果需要获取第一个字母的Unicode编码，可以使用 `charCodeAt()`：
//    ```javascript
//    var str = "Hello, World!";
//    var firstCharCode = str.charCodeAt(0); // 输出: 72 (这是大写字母'H'的Unicode编码)
//    var firstLetter = String.fromCharCode(firstCharCode); // 输出: "H"
//    ```

// 请注意，在JavaScript中，字符串的索引是从0开始的，所以访问第一个字符时应当传入0作为索引值。以上所有示例都返回字符串中的第一个字母“H”。

//点击按钮退出功能
$('#btnLogout').on('click',function(){
    // console.log('11')
    //提示用户是否退出
    layer.confirm('确定退出登录?', {icon: 3, title:'提示'}, 
    function(index){
        //do something
        //清空本地存储中的 token
        localStorage.removeItem('token')
        //重新跳转到登录页面
        location.href='/login.html'
        //关闭confirm询问框
        layer.close(index);
      });
})

