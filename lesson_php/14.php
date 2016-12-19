<?php
 @header('content-type:text/html;charset=utf-8');
list($one , $two , $three) = array('张三' ,'李四' ,'王五');
//再次声明：单引号不结释变量，所以输出的是字符串
echo '$one----'.$one.'<br />'; 
echo '$two----'.$two.'<br />'; 
echo '$three----'.$three.'<br />';
?>


