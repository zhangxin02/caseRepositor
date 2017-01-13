<?php 
 @header('content-type:text/html;charset=utf-8');

//需要知道数据库的  地址  用户名  密码   已经相关的数据库名称
$var_conn = mysql_connect("bdm259166531.my3w.com","bdm259166531","11111111");//1利用用户名和密码链接到指定的主机中去

mysql_select_db("bdm259166531_db",$var_conn); //2找到该主机下面指定的数据库

$var_sql = "select * FROM  `bugs` "; //3需要执行的sql语句  然后让该sql语句进行执行

$var_result =mysql_query($var_sql);   //4执行语句   返回的数据结果是一个资源

$rst = array();
while ($row = mysql_fetch_row($var_result)) {  //5解析返回的资源  重新放入一个集合中
       # code...
      $rst[] = $row;
}
echo json_encode($rst); //6将指定的集合 转成json格式输出
   // 释放资源
    mysql_free_result($var_result);
    // 关闭连接
    mysql_close($var_conn);  
 ?>