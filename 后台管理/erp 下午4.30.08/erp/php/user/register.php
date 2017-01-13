<?php
	@header('content-type:text/html;charset=utf-8');
	@header("Access-Control-Allow-Origin: *");

	include '../conn.php';

	$uname = $_GET["uname"];
	$pwd = $_GET["pwd"];
	$kname = $_GET["kname"];
	$phone = $_GET["phone"];

	// echo($uname."-".$pwd."-".$kkpname."-".$phone);

	$result = mysql_query("select uname from user where uname = '$uname'");

	$row = mysql_fetch_row($result);
	$db_uname = $row[0];


	if($db_uname){
		echo("0");
	}else{
		mysql_query("insert into user(uname,pwd,kname,phone,status) values('$uname','$pwd','$kname','$phone',1)");

		echo(mysql_affected_rows());

		session_start();
		$_SESSION['uname']=$uname;
	}

	//mysql_close($conn);
?>