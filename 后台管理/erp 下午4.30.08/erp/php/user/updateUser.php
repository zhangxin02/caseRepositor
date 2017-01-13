<?php
	@header('content-type:text/html;charset=utf-8');
	@header("Access-Control-Allow-Origin: *");

	include '../conn.php';

	$uname = $_GET["uname"];
	$pwd = $_GET["pwd"];
	$kname = $_GET["kname"];
	$phone = $_GET["phone"];

	$sql = "update user set pwd='$pwd',kname='$kname',phone='$phone' where uname='$uname'";

	mysql_query($sql);

	echo(mysql_affected_rows());
?>