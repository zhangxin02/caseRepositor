<?php
	@header('content-type:text/html;charset=utf-8');
	@header("Access-Control-Allow-Origin: *");

	include '../conn.php';


	$id = $_GET["id"];

	$sql = "select * from good order by id";

	if($id){
		$sql = "select * from good where id=$id";
	}
	
	$result = mysql_query($sql);

	// $result = mysql_query("select * from good");

	//echo(json_encode($result));

	$arr = array();

	while($row = mysql_fetch_row($result)){
		$kid = $row[1];
		$sql = "select * from goodStore where id=$kid";
		$result2 = mysql_query($sql);
		$row2 = mysql_fetch_row($result2);
		$kname = $row2[1];
		$arr[] = array('id' => $row[0],
						'kid'=>$row[1],
						'gname'=>$row[2],
						'type'=>$row[3],
						'price'=>$row[4],
						'num'=>$row[5],
						'descs'=>$row[6],
						'kname'=>$kname
		 );
	}

	echo(json_encode($arr));

	//mysql_close($conn);
?>