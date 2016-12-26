/**
 * Created by leson on 2016/12/26.
 */
var wrap = document.querySelector("#fengdajing");
var main = document.querySelector("#content");


var smallImg = null;
var content = null;
var shadow = null;
var bigImg = null;
var bigContent = null;
var footer = null;
var desc = null;
var price = null;
var num = null;


var p = new Promise(function (resolve, reject) {
    create();
    resolve();
}).then(function () {
    getId();
});
function getId() { //获取id 然后去重新加载数据
    var id = location.search.split("=")[1]//search ?id=0001  split   ["?id","0001"]   [1]  0001
//根据id去获取图片集合
    show(id);
}
function create() { //构建好页面框架
    content = document.createElement("div");
    content.className = "content";
    smallImg = new Image();
    smallImg.src = "img/small1.jpg";
    smallImg.className = "smallImg";
    shadow = document.createElement("div");
    shadow.className = "shadow";
    content.appendChild(smallImg);
    content.appendChild(shadow);
    wrap.appendChild(content);

    bigContent = document.createElement("div");
    bigContent.className = "bigContent";
    bigImg = new Image();
    bigImg.className = "bigImg";
    bigImg.src = "img/big1.jpg";
    bigContent.appendChild(bigImg);
    wrap.appendChild(bigContent);

    footer = document.createElement("ul");
    footer.className = "footer";
    wrap.appendChild(footer);


    desc = document.createElement("span");
    desc.className = "desc";
    main.appendChild(desc);

    price = document.createElement("span");
    price.className = "price";
    main.appendChild(price);

    num = document.createElement("span");
    num.className = "num";
    main.appendChild(num);


}

function show(id) {
    $.ajax({
        type: "get",
        url: "mockData/chaoshi.json",
        showData: function (data) {
            var obj = JSON.parse(data);
            if (obj["error_code"] == "1") {
                var list = obj["list"];
                for (var i = 0; i < list.length; i++) {
                    var tempObj = list[i];
                    var itemId = tempObj.itemId; //获取编号
                    if (itemId == id) {

                        desc.innerHTML ="描述"+ tempObj.desc;
                        price.innerHTML ="价格"+ tempObj.price;
                        num.innerHTML = "数量"+tempObj.num;

                        var smallPicList = tempObj["smallPic"];//小图片的集合
                        var bigPicList = tempObj["bigPic"];
                        //动态的生成content中的图片
                        init(smallPicList, bigPicList);
                        break;
                    }
                }
            }
        }
    })
}

function init(smallPicList, bigPicList) {
    smallImg.src = "img/" + smallPicList[0];
    bigImg.src = "img/" + bigPicList[0];
    for (var j = 0; j < smallPicList.length; j++) {  //动态生成下面的小图
        var smallSrc = "img/" + smallPicList[j];
        var bigSrc = "img/" + bigPicList[j];
        var li = document.createElement("li");
        var img = new Image();
        img.src = smallSrc;
        img.setAttribute("data-src", bigSrc);

        img.onmouseover = function () {
            smallImg.src = this.src;
            bigImg.src = this.getAttribute("data-src");
        }
        li.appendChild(img);
        footer.appendChild(li);
    }
}

content.onmousemove = function (e) {
    var evt = window.event || e;
    var x = evt.pageX - getStyle(shadow, "width") / 2 - getStyle(wrap, "margin-left");

    var y = evt.pageY - getStyle(shadow, "height") / 2 - getStyle(wrap, "margin-top");
    if (x <= 0) {
        x = 0;
    }
    if (y <= 0) {
        y = 0;
    }
    var maxX = getStyle(content, "width") - getStyle(shadow, "width");
    if (x >= maxX) {
        x = maxX;
    }

    var maxY = getStyle(content, "height") - getStyle(shadow, "height");
    if (y >= maxY) {
        y = maxY;
    }

    var bigX = -(getStyle(bigImg, "width") * x / getStyle(content, "width"));
    var bigY = -(getStyle(bigImg, "height") * y / getStyle(content, "height"));

    shadow.style.left = x + "px";
    shadow.style.top = y + "px";

    bigImg.style.left = bigX + "px";
    bigImg.style.top = bigY + "px";

    shadow.style.display = "block";
    bigContent.style.display = "block";
}

content.onmouseout = function () {
    shadow.style.display = "none";
    bigContent.style.display = "none";
}

function getStyle(obj, attr) {
    if (obj.currentStyle) {
        return parseInt(obj.currentStyle[attr]);
    } else {
        return parseInt(window.getComputedStyle(obj)[attr]);
    }
}