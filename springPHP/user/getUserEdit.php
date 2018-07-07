<?php
  // 1.引入连接数据库工具函数
  include_once '../fn.php';

  // 2.获取前端传入数据
  $id = $_GET['userId'];

  // 3.根据获取id,连接数据库,获取对应用户信息返回给前端
  $sql = "select * from users where id = $id";
  $json = [
    'result' => my_query($sql),
  ];
  echo json_encode($json);

?>