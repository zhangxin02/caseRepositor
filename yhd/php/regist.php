<?php
@header('content-type:text/html;charset=utf-8'); 
$var_conn=mysql_connect('bdm256530110.my3w.com','bdm256530110','87654321');
mysql_select_db('bdm256530110_db',$var_conn);

$type=$_GET["type"];
if($type=="add"){
	$phone=$_GET["phone"];
	$pwd=$_GET["pwd"];
	$username=$_GET["username"];
	$yzm=$_GET["yzm"];
	$sql="INSERT `userinfo-yhd`(username,pwd,phone,yzm) VALUE('$username','$pwd','$phone','$yzm')";	
	$result=mysql_query($sql);
	$count= mysql_affected_rows();
	if ($count) {  //1表示修改成功   0 表示修改失败
	    echo 1;
	  } else{
	    echo 0;
	}
}else if($type=="ckname"){
	$username=$_GET["username"];
	$sql="select count(*) from `userinfo-yhd` where username='$username'";
	$result=mysql_query($sql);//执行sql语句
	$arr=array(); //存放所有数据 
	while ($row=mysql_fetch_row($result)){
		$arr[]=$row;	
	}	
	echo json_encode($arr[0]);
}else if($type=="login"){
	$username=$_GET["username"];
	$sql="select * from `userinfo-yhd` where username='$username'";
	$result=mysql_query($sql);//执行sql语句
	$arr=array(); //存放所有数据 
	while ($row=mysql_fetch_row($result)){
		$arr[]=$row;	
	}	
	echo json_encode($arr);
}

mysql_close($var_conn);	
?>