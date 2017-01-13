<?php
	@header('content-type:text/html;charset=utf-8');
	@header("Access-Control-Allow-Origin: *");

	include '../conn.php';

	$id = $_GET["id"];

	$sql = "select gid,num from orders where id=$id";

	$result = mysql_query($sql);

	$row = mysql_fetch_row($result);

	$gid = $row[0];
	$num = $row[1];

	$sql2 = "select num from good where id=$gid";

	$result2 = mysql_query($sql2);

	$row2 = mysql_fetch_row($result2);

	$db_num = $row2[0];

	$new_num = $db_num + $num;

	$sql3 = "update good set num=$new_num where id=$gid";

	mysql_query($sql3);

	mysql_query("delete from orders where id=$id");

	echo(mysql_affected_rows());

	//mysql_close($conn);
?>