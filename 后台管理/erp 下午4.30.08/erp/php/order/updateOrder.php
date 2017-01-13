<?php
	@header('content-type:text/html;charset=utf-8');
	@header("Access-Control-Allow-Origin: *");

	include '../conn.php';

	$id = $_GET["id"];
	$status = $_GET["status"];
	$num = $_GET["num"];
	$gid = $_GET["gid"];

	$num2 = $num;

	$sql4 = "select num from orders where id=$id";
	$result4 = mysql_query($sql4);
	$row = mysql_fetch_row($result4);
	$old_num = $row[0];

	$num = $num - $old_num;

	$sql2 = "select num,kid from good where id=$gid";

	$result2 = mysql_query($sql2);

	$row = mysql_fetch_row($result2);

	$db_num = $row[0];
	$kid = $row[1];

	if(!$db_num){
		echo(-2);
	}else if($db_num<$num){
		echo(-1);
	}else{

		$new_num = $db_num - $num;

		$sql3 = "update good set num=$new_num where id=$gid";
		mysql_query($sql3);

		if($status==1){
			$sql = "select num from goodStore where id=$kid";
			$result = mysql_query($sql);
			$row = mysql_fetch_row($result);

			$db_knum = $row[0];
			$new_knum = $db_knum - $num2;

			$sql = "update goodStore set num=$new_knum where id=$kid";
			mysql_query($sql);

		}

		$sql = "update orders set num=$num2,status=$status where id=$id";

		mysql_query($sql);

		echo(mysql_affected_rows());
	}

	
	//mysql_close($conn);
	
	
?>