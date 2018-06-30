/**
 * Created by dell on 2018/6/30.
 */

$(function () {

  // 1.表单验证
  $('#form').bootstrapValidator({
    // 1.1 指定不校验的类型，默认为[':disabled', ':hidden', ':not(:visible)'],可以不设置
    excluded: [],

    // 1.2 指定校验时的图标显示，默认是bootstrap风格
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },

    // 1.3 校验
    fields : {
      username : {
        validators : {
          notEmpty : {
            message : '请输入用户名'
          },
          stringLength : {
            min : 6,
            max : 30,
            message : '用户名长度必须在6-30个字符之间'
          }
        }
      },
      password : {
        validators : {
          notEmpty : {
            message : '请输入密码'
          },
          stringLength : {
            min : 6,
            max : 8,
            message : '密码长度必须在6-8个字符之间'
          }
        }
      }
    }
  });

  // 2.

});