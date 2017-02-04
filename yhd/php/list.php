<?php
@header('content-type:text/html;charset=utf-8'); 
@header('Access-Control-Allow-Origin:*');

$db_connect=mysql_connect('bdm256530110.my3w.com','bdm256530110','87654321');//建立连接
mysql_select_db('bdm256530110_db',$db_connect);//找到主机下指定的数据库
mysql_query("set character set 'utf8'");
$type=$_GET["type"];
if($type=="one"){//只查询一条数据
	$id=$_GET["id"];
	$sql="SELECT id,picurl,price,proname,storename from goods where id='$id'";
	
}else{
	$sql="SELECT id,picurl,price,proname,storename from goods";
}
$result=mysql_query($sql);//执行sql语句
$arr=array(); //存放所有数据 
while ($row=mysql_fetch_row($result)){
	$arr[]=$row;	
}	
echo json_encode($arr);
?>