<?php
	@header('content-type:text/html;charset=utf-8');
	@header("Access-Control-Allow-Origin: *");

	include '../conn.php';

	$createtime = $_GET["createtime"];
	$gid = $_GET["gid"];
	$num = $_GET["num"];


	$sql2 = "select num from good where id=$gid";

	$result = mysql_query($sql2);

	$row = mysql_fetch_row($result);

	$db_num = $row[0];

	if(!$db_num){
		echo(-2);
	}else if($db_num<$num){
		echo(-1);
	}else{
		$sql = "insert into orders(createtime,status,num,gid) values('$createtime',0,$num,$gid)";

	// echo($sql);

		mysql_query($sql);

		echo(mysql_affected_rows());

		$new_num = $db_num - $num;

		$sql3 = "update good set num=$new_num where id=$gid";
		mysql_query($sql3);
	}

	
	//mysql_close($conn);
?>