<?php
 @header('content-type:text/html;charset=utf-8');
$meinv = array('杨幂','王珞丹','刘亦菲','黄圣依');
//echo  count($meinv);  获取数组的长度用count
//echo  sizeof($meinv);
/*
var  list= [];
list[0] = "aaa";
list.push("bbb");
list[list.length] = "cccc"
*/
$meinv[] = "范冰冰";
$meinv[1] = '范爷';

echo  var_dump($meinv)


 ?>
