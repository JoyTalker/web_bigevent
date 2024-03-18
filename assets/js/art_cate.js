$(function(){
    var layer=layui.layer
    var form=layui.form
    initArtCateList()
    //获取文章分类列表
    function initArtCateList() {
        $.ajax({
            method:'GET',
            url:'/my/userinfo',
            success:function(res){
                //不需要加引号
                var htmlStr=template('tpl-table',res)
                $('tbody').html(htmlStr)
            }
        })
      }
      //为添加类别按钮绑定点击事件
      $('#btnAddCate').on('click',function(){
        layer.open({
            type:1,
            area:['500px','250px'],
            title: '添加文章分类',
            content: $('#dialog-add').html()
          })    
            
      })
      //通过代理的形式，为form-add表单绑定submit事件
      //form-add表单是通过js生成的，在绑定的那一刻还没有表单
      $('body').on('submit','#form-add',function(e){
        e.preventDefault()
        $.ajax({
            method:'POST',
            url:'/my/cate/add',
            data:$(this).serialize(),
            success:function(res){
                if(res.code!==0){
                    return layer.msg('新增分类失败!')
                }
                initArtCateList()
                layer.msg('新增分类成功！')
                //根据索引，关闭对应的弹出层
                layer.close(indexAdd)
            }
        })
      })
      //通过代理的形式，为btn-edit按钮绑定点击事件
      $('tbody').on('click','.btn-edit',function(){
        //弹出一个修改文章的分类信息的层
        indexAdd = layer.open({
            type1,
            area:['500px','250px'],
            title:'添加文章分类',
            content:$('#dialog-edit').html()
        })
        var id=$(this).attr('data-id')
        //发起请求获取对应分类的数据
        $.ajax({
            method:'GET',
            url:'/my/cate/info'+id,
            success:function(res){
                form.val('form-edit',res.data)
            }
        })
      })
      //通过代理的形式，为修改分类的表单绑定 submit事件
      $('body').on('submit',function(e){
        e.preventDefault()
        $.ajax({
            method:'POST',
            url:'/my/cate/info',
            data:$(this).serialize(),
            success:function(res){
                if(res.code!==0){
                    return layer.msg('更新分类失败！')
                }
                layer.msg('更新分类成功！')
                layer.close(indexEdit)
                initArtCateList()
            }
        })
      })
      //通过代理的形式，为删除按钮绑定点击事件
      $('thody').on('click',function(){
        var id = $(this).attr('data-id')
        //提示用户是否要删除
        layer.confirm('确认删除？',{icon:3,title:'提示'},function(index){
            $.ajax({
                method:'GET',
                url:'/my/cate/del'+id,
                success:function(res){
                    if(res.code!==0){
                        return layer.msg('删除分类失败！')
                    }
                    layer.msg('删除分类成功！')
                    layer.close(index)
                    initArtCateList()
                }
            })
        })
      })
})
//在监测表单提交行为时，通常我们会在 <form> 标签上绑定事件监听器，而不是直接在提交按钮（<button type="submit">）上。这是因为用户可以通过多种方式触发表单的提交，例如：
//也可以绑定在提交按钮上，这样的话功能不强
// 点击类型为 submit 的按钮。
// 按下回车键（如果焦点位于一个可提交的输入元素上）。
// 通过JavaScript调用表单对象的 submit() 方法。
// HTML表单中，如果当前焦点在具有提交功能的输入元素上（如<input type="text">、<textarea>等），用户按下回车键通常会触发表单的提交行为。这遵循的是浏览器的标准行为。

// 具体来说：

// 当一个表单中只有一个可输入文本的字段时，按回车键默认会提交表单。
// 如果表单中有多个输入字段，并且其中一个字段获得焦点，只要没有其他明确阻止提交的设置或JavaScript处理程序，按回车键也会提交表单。
// 若要使表单中的某个按钮通过回车键来触发，可以确保有一个类型为 submit 的按钮 <button type="submit"> 或 <input type="submit" value="提交"> 存在于表单内。
// // 对于非表单组件（例如独立的按钮或其他UI元素），它们不会响应回车键作为提交操作，除非您在JavaScript中特别编写了这样的事件监听和处理逻辑。