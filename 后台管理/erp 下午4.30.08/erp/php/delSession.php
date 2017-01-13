<?php
	@header('content-type:text/html;charset=utf-8');
	@header("Access-Control-Allow-Origin: *");

	session_start();

	session_unset(); 
	session_destroy(); 

	echo(1);
?>