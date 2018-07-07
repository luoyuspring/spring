<?php
  header('content-type:text/html;charset=utf-8');
  // 1.引入连接数据工具函数
  include_once '../fn.php';

  // 2.获取前端传入数据
  $email = $_POST['email'];

  // 3.根据获取的数据查找数据,如果存在返回true,没有返回false
  $sql = "select email from users where email = '$email'";

  if (my_query($sql)) {
    echo json_encode(["valid" => true]);
  } else {
    echo json_encode(["valid" => false]);
  }
?>