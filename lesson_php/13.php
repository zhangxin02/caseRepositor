<?php
 @header('content-type:text/html;charset=utf-8');

 $arr=array(    '教学部'=>array(        array('李某','18','人妖'),        array('高某','20','男'),        array('张某','21','妖人'),    ),    '宣传部'=>array(        array('李某','18','人妖'),        array('高某','20','男'),        array('张某','21','妖人'),    ),    '财务部'=>array(        array('李某','18','人妖'),        array('高某','20','男'),        array('张某','21','妖人'),    ), );
echo json_encode($arr);
 ?>



