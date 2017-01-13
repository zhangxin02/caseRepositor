<?php
	@header('content-type:text/html;charset=utf-8');
	@header("Access-Control-Allow-Origin: *");

	include '../conn.php';

	$id = $_GET["id"];
	$status = $_GET["status"];

	$sql = "select * from orders order by id";

	if($id){
		$sql += "select * from orders where id=$id";
	}

	if($status==0||$status==1){
		$sql = "select * from orders where status=$status order by id ";
	}
	
	$result = mysql_query($sql);

	// $result = mysql_query("select * from orders");

	//echo(json_encode($result));

	$arr = array();

	while($row = mysql_fetch_row($result)){
		$gid = $row[4];
		$sql = "select * from good where id=$gid";
		$result2 = mysql_query($sql);
		$row2 = mysql_fetch_row($result2);
		$gname = $row2[2];
		$arr[] = array('id' => $row[0],
						'createtime'=>$row[1],
						'status'=>$row[2],
						'num'=>$row[3],
						'gid'=>$row[4],
						'gname'=>$gname,
		 );
	}

	echo(json_encode($arr));

	//mysql_close($conn);
?>