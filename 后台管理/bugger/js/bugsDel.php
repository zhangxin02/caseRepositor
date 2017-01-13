<?php 
 @header('content-type:text/html;charset=utf-8');

//需要知道数据库的  地址  用户名  密码   已经相关的数据库名称
$var_conn = mysql_connect("bdm259166531.my3w.com","bdm259166531","11111111");//1利用用户名和密码链接到指定的主机中去

mysql_select_db("bdm259166531_db",$var_conn); //2找到该主机下面指定的数据库

$id = $_GET["id"]; 

$var_sql = "DELETE FROM `bugs` where id = $id"; //3需要执行的sql语句  然后让该sql语句进行执行
$var_result=mysql_query($var_sql);   //4执行语句   返回的数据结果是一个资源
$count= mysql_affected_rows();

 if ($count) {  //1表示修改成功   0 表示修改失败
    echo 1;
  } else{
    echo 0;
  }

  ?>