<?php
 @header('content-type:text/html;charset=utf-8');

// while($var_i<=100){
//  // sum+=i;
//     $var_sum +=$var_i;
//     $var_i++;
// }
// echo "1-100的和为:".$var_sum;

for ($var_i=0,$var_sum = 0; $var_i<101; $var_i++) { 
    # code...
    $var_sum += $var_i;
}
echo "1到100的和为:".$var_sum; 
?>