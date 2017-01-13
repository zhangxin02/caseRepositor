<?php
	@header('content-type:text/html;charset=utf-8');
	@header("Access-Control-Allow-Origin: *");

	include '../conn.php';

	$uname = $_GET["uname"];
	$pwd = $_GET["pwd"];


	$sql = "select pwd from user where uname = '$uname'";
	
	$result = mysql_query($sql);

	$row = mysql_fetch_row($result);
	$db_pwd = $row[0];

	if(!$db_pwd){
		echo(0);
	}else if($db_pwd!=$pwd){
		echo(1);
	}else{
		echo(2);

		session_start();
		$_SESSION['uname']=$uname;
	}

	//mysql_close($con);
?>