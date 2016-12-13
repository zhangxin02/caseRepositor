/**
 * Created by leson on 2016/12/5.
 */
var getSumByArr = function (arr) {
    var i = 0, sum = 0
    for (; i < arr.length; i++) {
        var num = arr[i];//表示取出每一个值
        sum = sum + num;
    }
    return sum;
}

var getAvgByArr = function (arr) {
    return getSumByArr(arr) / arr.length;
}

var reverseArr = function (arr) {

    for (var i = 0; i <= (arr.length - 1) / 2; i++) {  //0  1   2   //0  1   2
        var temp = arr[i];  //1    //2       // 3
        arr[i] = arr[arr.length - 1 - i]; //6   //  5   //4
        arr[arr.length - 1 - i] = temp;
    }
    return arr;
}

var spiceArr = function (arr, num) {

    //如何把4按照指定顺序的插入到数组中
    //第一步找到4的位置   循环的找出 第一个比4大的数
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] >= num) {
            break;
        }
    }

    //第二步  把i到length-1的下标 全部往后移动一位
    //    var   arr1= [1, 3, 5, 7, 9];
    //    var   arr2 = [1, 3,4, 5, 7, 9]
    for (var j = arr.length - 1; j >= i; j--) {

        // arr = [1, 3, 5, 7,, 9]
        // arr = [1,3,5,,7,9]
        // arr = [1,3,,5,7,9]

        var temp = arr[j + 1];
        arr[j + 1] = arr[j];
        arr[j] = temp;
    }
    arr[i] = num;

    return arr;

}
var sort = function (arr) {

    for (var i = 0; i < arr.length - 1; i++) {
        for (var j = i + 1; j < arr.length; j++) {
            /*
             var num = arr[i];
             var num1 = arr[j];
             if (num > num1) {
             var temp = num;
             arr[i] = num1;
             arr[j] = temp;
             }
             */
            if (arr[i] > arr[j]) {
                var temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp;
            }
        }
    }
    //冒泡排序
    return arr;
}

var join = function (arr, tag) {
    var str = "";
    //把每一个数链接起来   先找到每一个数
    for (var i = 0; i < arr.length; i++) {
        var num = arr[i];
        if (i == arr.length - 1) {
            str += num;
        } else {
            str += num + tag;
        }

    }
    return str;
}