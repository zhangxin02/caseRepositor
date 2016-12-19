<?php
 @header('content-type:text/html;charset=utf-8');
//$meinv = array('杨幂','王珞丹','刘亦菲','黄圣依');
//echo  count($meinv);  获取数组的长度用count
//echo  sizeof($meinv);
/*
var  list= [];
list[0] = "aaa";
list.push("bbb");
list[list.length] = "cccc"
*/
//var list = [1,2,3,4,5];

//var list = [{"name":"leson","score":1},{"name":"leson","score":1},{"name":"leson","score":1}]

$rela = array(
    'leson' => '55', 
    'lulul' => '666',
    'lili' => '7777');
 echo $rela["leson"] ;
 ?>

