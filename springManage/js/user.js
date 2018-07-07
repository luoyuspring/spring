/**
 * Created by dell on 2018/7/2.
 */

$(function () {

  var currentPage = 1; // 当前页
  var pageSize = 5; // 每页条数
  var emailVal = null; // 存储修改前当前用户邮箱
  var slugVal = null; // 存储修改前当前用户别称

  // 功能一: 1.进入页面发送ajax请求获取用户数据,渲染到页面
  //         2.请求成功后,进行分页
  function render() {
    $.ajax({
      type : 'get',
      url : '/spring/springPHP/user/getUsers.php',
      data : {
        page : currentPage,
        pageSize : pageSize
      },
      dataType : 'json',
      success : function (info) {
        $('tbody').html(template('userTpl', info));

        // 实现分页
        $("#pagintor").bootstrapPaginator({
          bootstrapMajorVersion:3,
          currentPage: currentPage,
          totalPages: info.totalPage,
          size:"small",
          onPageClicked: function(event, originalEvent, type, page){
            currentPage = page;
            render();
          },
          itemTexts: function (type, page, current) {
            switch (type) {
              case "first":
                return "首页";
              case "prev":
                return "上一页";
              case "next":
                return "下一页";
              case "last":
                return "末页";
              case "page":
                return page;
            }
          },
          tooltipTitles: function (type, page, current) {
            switch (type) {
              case "first":
                return "首页";
              case "prev":
                return "上一页";
              case "next":
                return "下一页";
              case "last":
                return "末页";
              case "page":
                return page;
            }
          },
          useBootstrapTooltip: true
        });

        // 后补: 1.重新渲染完成,全部删除按钮隐藏
        //       2.全选按钮取消选中
        $('.btn-batch').hide();
        $('.chk-all').prop('checked', false);
      }
    });
  }
  render();


  // 功能二: 点击删除按钮,弹出模态框,再点击确定按钮发送ajax请求,删除对应id数据
  // 1.封装根据id删除用户信息方法
  function delUsers(userId) {
    $.ajax({
      type : 'get',
      url : '/spring/springPHP/user/delUser.php',
      data : {
        userId : userId,
        pageSize : pageSize
      },
      dataType : 'json',
      success : function (info) {
        $('#delModal').modal('hide');
        if (info.int < currentPage) {
          currentPage--;
          render();
        } else {
          render();
        }
      }
    });
  }
  $('tbody').on('click', '.btn-del', function () {
    // 显示模态框
    $('#delModal').modal('show');
    // 点击确定删除用户数据
    var id = $(this).parent().data('id');
    $('#delBtn').on('click', function () {
      delUsers(id);
    })
  });


  // 功能三: 点击编辑按钮,发送ajax请求,获取对应id用户数据,填充到添加用户表单
  $('tbody').on('click', '.btn-edit', function () {
    var id = $(this).parent().data('id');
    $.ajax({
      type : 'get',
      url : '/spring/springPHP/user/getUserEdit.php',
      data : {
        userId : id,
      },
      dataType : 'json',
      success : function (info) {
        emailVal = info.result[0].email;
        slugVal = info.result[0].slug;

        // 将后端返回用户数据填充到表单供修改
        $('#email').val(info.result[0].email);
        $('#nickname').val(info.result[0].nickname);
        $('#password').val(info.result[0].password);
        $('#slug').val(info.result[0].slug);
        $('#img').attr('src', '../' + info.result[0].avatar);
        if (info.result[0].sex == '男') {
          $('#man').prop('checked', true);
        } else {
          $('#lady').prop('checked', true);
        }
        // 将表单标题修改为'修改用户信息',按钮显示为'修改',显示放弃按钮
        $('#title').text('修改用户信息').css('color', 'red');
        $('.btn-add').hide();
        $('.btn-update,.btn-cancel').show();
        // 将当前id保存到隐藏域hidden里
        $('#id').val(id);
      }
    });
  });


  // 功能四: 1.点击放弃按钮放弃修改
  //         2.点击修改按钮,发送ajax请求,修改对应id数据,重新渲染页面
  // 放弃修改
  $('.btn-cancel').on('click', function () {
    $('#form')[0].reset();
    // 将表单标题修改为'添加新用户',按钮显示为'添加',隐藏放弃按钮,图片默认
    $('#title').text('添加新用户').css('color', 'black');
    $('.btn-add').show();
    $('.btn-update,.btn-cancel').hide();
    $('#img').attr('src', './images/default.png');
    $('#id').val(''); // 清除隐藏域保存的id
  });
  // 修改用户信息
  $('.btn-update').on('click', function () {
    var formData = new FormData($('#form')[0]);
    $.ajax({
      type : 'post',
      url : '/spring/springPHP/user/updateUser.php',
      data : formData,
      cache: false,       // 不缓存
      processData: false, // jQuery不要去处理发送的数据
      contentType: false, // jQuery不要去设置Content-Type请求头
      success : function () {
        $('.btn-cancel').click();
        $('#form').data('bootstrapValidator').resetForm(true);
        render();
      }
    });
  });


  // 功能五: 1.图片预览
  //         2.表单校验
  // 图片预览
  $('#avatar').on('change', function(){
    var files = this.files;
    var file;
    if (files && files.length) {
      file = files[0];
      if (/^image\/png$|jpeg$/.test(file.type)) {
        $('#img').attr('src', URL.createObjectURL(file));
      }
    }
  });
  // 表单校验
  $('#form').bootstrapValidator({

    // 1.指定校验时的图标显示，默认是bootstrap风格
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },

    // 2.指定校验字段
    fields : {
      email : {
        validators : {
          notEmpty : {
            message : '邮箱不能为空'
          },
          regexp : {
            regexp : /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/,
            message : '邮箱格式不正确(例:xxxxxxx@163.com)'
          },
        }
      },
      nickname : {
        validators : {
          notEmpty : {
            message : '昵称不能为空'
          },
          stringLength : {
            min : 2,
            max : 30,
            message : '昵称长度为2-30个字符'
          }
        }
      },
      password : {
        validators : {
          notEmpty : {
            message : '密码不能为空'
          },
          regexp : {
            regexp : /^[a-zA-Z0-9]{6,8}$/,
            message : '密码只能是6-8位字母或数字'
          },
        }
      },
      slug : {
        validators : {
          notEmpty : {
            message : '别称不能为空'
          },
          regexp : {
            regexp : /^[a-zA-Z]{2,12}$/,
            message : '别称是2-12位英文字母'
          },
        }
      }
    }
  });
  $(".btn-add").click(function () {
    $("#form").bootstrapValidator('validate');
    if ($("#form").data('bootstrapValidator').isValid()) {
      var formData = new FormData($('#form')[0]);
      $.ajax({
        type : 'post',
        url : '/spring/springPHP/user/addUser.php',
        data : formData,
        cache: false,       // 不缓存
        processData: false, // jQuery不要去处理发送的数据
        contentType: false, // jQuery不要去设置Content-Type请求头
        success : function () {
          currentPage = 1;
          $('#form').data('bootstrapValidator').resetForm(true);
          render();
        }
      });
    }
  });


  // 功能六: 注册表单失去焦点事件,发送ajax请求,验证邮箱或别称是否存在
  // 1.封装邮箱验证请求方法
  function checkEmail() {
    $.ajax({
      type: 'post',
      url: '/spring/springPHP/user/checkEmail.php',
      data: {email: $('#email').val()},
      dataType: 'json',
      success: function (info) {
        if (info.valid) {
          $('#emailSpan').css('display', 'block');
          $('#form').data('bootstrapValidator').updateStatus('email', 'INVALID', 'none');
          $('.btn-add,.btn-update').prop('disabled', true);
        } else {
          $('#emailSpan').css('display', 'none');
          $('.btn-add,.btn-update').prop('disabled', false);
        }
      }
    });
  }
  // 2.封装别名验证请求方法
  function checkSlug() {
    $.ajax({
      type : 'post',
      url : '/spring/springPHP/user/checkSlug.php',
      data : { slug : $('#slug').val()},
      dataType : 'json',
      success : function (info) {
        if (info.valid){
          $('#slugSpan').css('display', 'block');
          $('#form').data('bootstrapValidator').updateStatus('slug', 'INVALID', 'none');
          $('.btn-add,.btn-update').prop('disabled', true);
        } else {
          $('#slugSpan').css('display', 'none');
          $('.btn-add,.btn-update').prop('disabled', false);
        }
      }
    });
  }
  // 3.验证邮箱
  $('#email').on('blur', function () {
    if ($('#title').text() !== '修改用户信息' || $('#email').val() !== emailVal) {
      checkEmail();
    }
  });
  // 4.验证别名
  $('#slug').on('blur', function () {
    if ($('#title').text() !== '修改用户信息' || $('#slug').val() !== slugVal) {
      checkSlug();
    }
  });


  // 功能七: 批量删除
  // 1.实现全选与全取消,当有按钮被选中时显示批量删除按钮
  $('.chk-all').on('change', function () {
    $('.chk').prop('checked', $(this).prop('checked'));
    // 批量删除显示与隐藏
    if ($('.chk:checked').length > 0) {
      $('.btn-batch').show();
    } else {
      $('.btn-batch').hide();
    }
  });
  // 2.列表全选中,全选按钮选中,列表不全选中,全选按钮取消选中
  $('tbody').on('change', function () {
    if ($('.chk:checked').length < $('.chk').length ) {
      $('.chk-all').prop('checked', false);
    } else {
      $('.chk-all').prop('checked', true);
    }
    // 批量删除显示与隐藏
    if ($('.chk:checked').length > 0) {
      $('.btn-batch').show();
    } else {
      $('.btn-batch').hide();
    }
  });
  // 3.封装获取需要删除的用户id地址方法
  function getUsersId() {
    var arr = [];
    $('.chk:checked').each(function (i, v) {
      arr.push($(this).data('id'));
    })
    return arr.join(',')
  }
  // 4.点击批量删除按钮显示确认模态框,点击确认,发送ajax请求删除对应id数据
  $('.btn-batch').on('click', function () {
    // 显示模态框
    $('#delModal').modal('show');
    // 点击确定删除用户数据
    var id = getUsersId();
    $('#delBtn').on('click', function () {
      delUsers(id);
    })
  })

  
});