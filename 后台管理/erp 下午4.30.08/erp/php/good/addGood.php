<?php
	@header('content-type:text/html;charset=utf-8');
	@header("Access-Control-Allow-Origin: *");

	include '../conn.php';

	$id = $_GET["id"];
	$kid = $_GET["kid"];
	$gname = $_GET["gname"];
	$price = $_GET["price"];
	$num = $_GET["num"];
	$desc = $_GET["desc"];
	$type = $_GET["type"];
	$flag = true;


	// echo($kid."-".$gname."-".$type."-".$price."-".$num."-".$desc);


	$result = mysql_query("select gname,num,kid from good where id=$id");

	$list = mysql_fetch_row($result);
	$db_gname = $list[0];
	$db_num = $list[1];
	$db_kid = $list[2];


	

	if($db_gname){
		if($num){
			$num2 = $num+ $db_num;
			$sql = "update good set num=$num2 where id=$id";
		}else{
			$sql = "update good set kid=$kid,gname='$gname',descs='$desc',price=$price,types='$type' where id=$id";
		}
		$kid = $db_kid;
	}else{
		$sql = "insert into good(kid,gname,price,num,descs,types) values($kid,'$gname',$price,$num,'$desc','$type')";
		// echo($sql);
	}


	$result2 = mysql_query("select maxNum,num from goodStore where id=$kid");
	$row = mysql_fetch_row($result2);
	$db_maxNum = $row[0];
	$db_stroeNum = $row[1];
	$new_num = $num+$db_stroeNum;
	if($row[0]<$new_num){
		$flag = false;
	}

	if($flag){
		mysql_query($sql);

		echo(mysql_affected_rows());

		$sql2 = "update goodStore set num=$new_num where id=$kid";
		mysql_query($sql2);
	}else{
		echo(-1);
	}
	
	//mysql_close($conn);
?>