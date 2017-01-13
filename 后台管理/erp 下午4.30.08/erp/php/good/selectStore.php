<?php
	@header('content-type:text/html;charset=utf-8');
	@header("Access-Control-Allow-Origin: *");

	include '../conn.php';

	$id = $_GET["id"];

	$sql = "select * from goodStore order by id";

	if($id){
		$sql = "select * from goodStore where id=$id";
	}
	
	$result = mysql_query($sql);

	//echo(json_encode($result));

	$arr = array();

	while($row = mysql_fetch_row($result)){
		$arr[] = array('id' => $row[0],
						'num'=>$row[3],
						'descs'=>$row[1],
						'maxNum'=>$row[2]
		 );
	}

	echo(json_encode($arr));

	//mysql_close($conn);
?>