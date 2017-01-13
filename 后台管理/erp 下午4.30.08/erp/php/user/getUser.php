<?php
	@header('content-type:text/html;charset=utf-8');
	@header("Access-Control-Allow-Origin: *");

	include '../conn.php';

	session_start();

	$uname = $_SESSION['uname'];

	$sql = "select * from user where uname = '$uname'";

	$result = mysql_query($sql);

	$row = mysql_fetch_row($result);

	$pwd = $row[2];
	$kname = $row[3];
	$phone = $row[5];

	$arr = array('uname' => $uname, 
					'pwd' => $pwd, 
					'kname' => $kname, 
					'phone' => $phone, 
		);

	echo(json_encode($arr));
?>