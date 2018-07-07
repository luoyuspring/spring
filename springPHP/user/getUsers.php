<?php
  // 1.引入连接数据库工具函数
  include_once '../fn.php';

  // 2.获取前端传入数据
  $page = $_GET['page'];
  $pageSize = $_GET['pageSize'];
  $start = ($page - 1) * $pageSize;

  // 3.请求数据获取全部用户信息,并返回给前端
  $userSql = "select * from users order by id desc limit $start, $pageSize";
  $totalSql = "select count(*) as total from users";
  $json = [
    'result' => my_query($userSql),
    'totalPage' => ceil(my_query($totalSql)[0]['total'] / $pageSize)
  ];
  echo json_encode($json);

?>