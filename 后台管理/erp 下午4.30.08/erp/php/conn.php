<?php
	$con = mysql_connect("bdm25860191.my3w.com","bdm25860191","zhouzhou00") or die('Could not connect: ' . mysql_error());
	
	mysql_select_db("bdm25860191_db",$con)or die ("db链接失败".mysql_error());

	mysql_query('SET NAMES UTF8')or die ("字符集设置错误"); 

	//mysql_close($con);
?>