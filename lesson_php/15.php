<?php
 @header('content-type:text/html;charset=utf-8');
//定义一个变量叫$kongjie(空姐)
 $kongjie=array('gao'=>'chuanheiyifu',    
                'shou'=>'退特别长特别细',    
                'mei'=>'好白', 
                'pl'=>'五官端正',    
                'type'=>'那就是女神',  
                '我是吊丝不敢跟女神搭讪');
//第一次each
 $data = each($kongjie);
//echo '<pre>'; var_dump($data); echo '</pre>';
 echo json_encode($data);
?>

