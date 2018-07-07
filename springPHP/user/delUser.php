<?php
  header('content-type:text/html;charset=utf-8');
  // 1.引入连接数据库工具函数
  include_once '../fn.php';

  // 2.获取前端传入数据
  $id = $_GET['userId'];
  $pageSize = $_GET['pageSize'];

  // 3.根据获取id,连接数据库,删除对应数据
  $sql = "delete from users where id in ($id)";
  my_exec($sql);

  // 4.获取数据库中用户总条数如果
  $totalSql = "select count(*) as total from users";
  $total = my_query($totalSql)[0]['total'];
  if ($total % $pageSize == 0) {
    echo json_encode(['int' => $total / $pageSize]);
  } else {
    echo json_encode(['int' => 'false']);
  }
?>