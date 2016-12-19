<?php
 @header('content-type:text/html;charset=utf-8');

$data =array ('fj' => 'fengjie', 'fr' => 'furong' );
$var_list=array();
foreach($data  as $a=>$b){    
// echo $key . '-------' . $value . '<br />';
    $var_list[]=$a;
  }
echo json_encode($var_list);
echo json_encode($data["fr"]);
//如果我们只想读取值的话，就可以把下面的$key => 给删除掉，读取的时候，就只读取值了。做完上面的实 验，你可以打开下面的代码再实验几次。
/* 
foreach($data  as  $value){     
   echo  $value . '<br />'; }  
as查找属性
*/
 ?>


