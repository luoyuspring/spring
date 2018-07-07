<?php
  header('content-type:text/html;charset=utf-8');
  // 1.引入连接数据库工具
  include_once '../fn.php';

  // 2.获取前端传入数据
  $id = $_POST['id'];
  $slug = $_POST['slug'];
  $email = $_POST['email'];
  $password = $_POST['password'];
  $nickname = $_POST['nickname'];
  $sex = $_POST['sex'];

  $avatar = '';
  $file = $_FILES['avatar'];
  if ($file['error'] === 0) {
    $ftmp = $file['tmp_name'];
    $ext = strrchr($file['name'], '.');
    $newName = 'uploads/' . time() . rand(1000, 9999) . $ext;
    move_uploaded_file($ftmp, '../../' . $newName);
    $avatar = $newName;
  }

  // 3.设置sql语句,判断照片是否为空,如果为空,则不更改照片信息
  if (empty($avatar)) {
    $sql = "update users set email = '$email', slug = '$slug', password = '$password', nickname = '$nickname', sex = '$sex' where id = $id";
  } else {
    $sql = "update users set email = '$email', slug = '$slug', password = '$password', nickname = '$nickname', avatar='$avatar', sex = '$sex' where id = $id";
  }
  my_exec($sql);

?>