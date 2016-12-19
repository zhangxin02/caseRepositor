<?php
 @header('content-type:text/html;charset=utf-8');
 //$var_content = $_GET["content"];
$person = array(
            'office' => '办公室',  
            'family' => array(
            '爸爸',  '妈妈','yeye' => '爷爷','nn' => '奶奶',),   
            'jiaotong' => array('自行车','摩托车','汽车', '飞机')
            );
echo json_encode($person);
 ?>

