/**
 * Created by leson on 2016/12/30.
 */

function daleiSelect(data){
var parent = document.getElementsByClassName("select")[0];
var optionlist =data;
var content = document.createElement("input");
content.className = "content";
content.placeholder = "请选择省份";
parent.appendChild(content);
var arrow = document.createElement("span"); //箭头
arrow.className = "arrow";
parent.appendChild(arrow);

var option = document.createElement("ul");
option.className = "option";
optionlist.forEach(function (obj) {
    var value = obj["value"];
    var text = obj["text"];
    var li = document.createElement("li");
    li.value = value;
    li.innerHTML = text;
    option.appendChild(li);
    li.onclick = function (e) {
        var evt = window.event || e;
        evt.stopPropagation();
        var text = this.innerHTML;
        content.value = text;
        option.style.display = "none";
    }


});
parent.appendChild(option);
//    var selectLi = select.querySelectorAll("li");
content.onclick = arrow.onclick = function (e) {
    var evt = window.event || e;
    evt.stopPropagation();
    option.style.display = "block";
}

document.onclick = function () {
    option.style.display = "none";
}
}