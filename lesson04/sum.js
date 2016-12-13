/**
 * Created by leson on 2016/12/1.
 */

function sum(start, end) {
    var sum = 0;
    for (var i = start; i <= end; i++) {
        sum += i;
    }
    return sum;
}


function show() {
    document.write("欢迎来到1608班学习javascript");
}

function sum2(input1, input2) {
    var value1 = input1.value * 1;//函数内部的变量 先找函数内部 如果内部没有再找外部
    var value2 = input2.value * 1;
    var result = value1 + value2;
    return result;
}
