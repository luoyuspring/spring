<?php
  header('content-type:text/html;charset=utf-8');
  // php与数据交互工具函数封装
  // 1.定义常量
  define('HOST', '127.0.0.1');
  define('UNAME', 'root');
  define('PWD', 'root');
  define('DB', 'spring');

  // 2.封装增删改函数
  function my_exec($sql) {
    $link = @mysqli_connect(HOST, UNAME, PWD, DB);
    if (!$link) {
      echo '服务器连接失败';
      return false;
    }
    if (!mysqli_query($link, $sql)) {
      echo '操作失败: ' . mysqli_error($link);
      mysqli_close($link);
      return false;
    }
    mysqli_close($link);
    return true;
  }

  // 3.封装查询函数
  function my_query($sql) {
    $link = @mysqli_connect(HOST, UNAME, PWD, DB);
    if (!$link) {
      echo '服务器连接失败';
      return false;
    }
    $result = mysqli_query($link, $sql);
    if (!$result || mysqli_num_rows($result) == 0) {
      // echo '操作失败: ' . mysqli_error($link);
      mysqli_close($link);
      return false;
    }
    while ( $row = mysqli_fetch_assoc($result)) {
      $data[] = $row;
    }
    mysqli_close($link);
    return $data;
  }

  // 判断保持登录函数封装
  function isLogin() {
    if (!empty($_COOKIE['PHPSESSID'])) {
      session_start();
      if (empty($_SESSION['user_id'])) {
        header('location:login.php');
        die();
      } 
    } else {
      header('location:login.php');
      die();
    }
  }
?>
