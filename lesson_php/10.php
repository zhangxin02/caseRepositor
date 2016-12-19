<?php
 @header('content-type:text/html;charset=utf-8');
 //$var_content = $_GET["content"];
$arrayName = array('hubei'=>array("wuhan","jingzhou"),'hunan'=>array("changsha","yueyang") );
//echo json_encode($arrayName['hubei']);
//如果请求省份 就返回省份
//如果请求城市 就返回传过省份下面的所有城市

echo sizeof($arrayName);
 ?>

