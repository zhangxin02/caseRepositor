<?php
	@header('content-type:text/html;charset=utf-8');
	@header("Access-Control-Allow-Origin: *");

	include '../conn.php';

	$id = $_GET["id"];

	$result = mysql_query("select kid,num from good where id=$id");
	$row = mysql_fetch_row($result);
	$kid = $row[0];
	$num = $row[1];

	$result2 = mysql_query("select num from goodStore where id=$kid");
	$row2 = mysql_fetch_row($result2);
	$db_num = $row2[0];

	$new_num = $db_num - $num;

	mysql_query("update goodStore set num=$new_num where id=$kid");

	mysql_query("delete from good where id=$id");

	echo(mysql_affected_rows());

	//mysql_close($conn);
?>