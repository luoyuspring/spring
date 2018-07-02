/**
 * Created by dell on 2018/6/30.
 */

$(function () {

  // ---------------  左侧侧边栏区域 -------------------
  // 功能一: 点击文章或设置,显示隐藏子菜单
  $('.w-aside .post').on('click', function () {
    $(this).next().toggleClass('current');
    $('.w-aside .option').next().removeClass('current');
    $('.w-aside .nav a').removeClass('current');
    $(this).addClass('current');
  });
  $('.w-aside .option').on('click', function () {
    $(this).next().toggleClass('current');
    $('.w-aside .post').next().removeClass('current');
    $('.w-aside .nav a').removeClass('current');
    $(this).addClass('current');
  });


  // ----------------  主题区域头部  ---------------------
  // 功能一: 点击左侧按钮显示或隐藏侧边栏
  $('.w-main .icon-menu').on('click', function () {
    $('.w-aside,.w-main,.w_topbar').toggleClass('current');
  });

  // 功能二: 点击右侧退出按钮弹出模态框
  //         点击模态框确认按钮退出登录
  $('.w-main .icon-logout').on('click', function () {
    // 1.显示模态框
    $('#logoutModal').modal('show');
    // 2.点击模态框退出按钮发送ajax请求,退出登录
    $('#logoutBtn').on('click', function () {
      $.ajax({
        type : 'get',
        url : '',
        dataType : 'json',
        success : function (info) {
          if (info.success) {
            // 3.退出完成关闭模态框
            $('#logoutModal').modal('hide');
          }
        }
      });
    })
  })

});