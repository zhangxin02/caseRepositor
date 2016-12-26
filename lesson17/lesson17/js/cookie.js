/**
 * Created by leson on 2016/12/22.
 */
function getCookie(key) {
    var str = document.cookie; //获取全部的cookie值 是一个字符串类型   "username=leson; nickname=大大雷"
    var list = str.split(";"); //[username=leson,nickname=大大雷];
    for (var i = 0; i < list.length; i++) {
        var objStr = list[i]; //username=leson    nickname = 大大雷
        var minList =objStr.split("="); //["username","leson"]
        var sKey = minList[0].trim();//username
        var sValue= minList[1].trim();//leson
        if (sKey == key){
            return sValue;
        }
    }
    return "";
}
function setCookie(key,value,days){
    var date = new Date();
    date.setDate(date.getDate()+days); //设置的过期时间
    document.cookie =key+"="+value+";expires="+date;
}
//setCookie("username","aaa",-1)