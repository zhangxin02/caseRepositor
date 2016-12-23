/**
 * Created by leson on 2016/8/12.
 */
function show() {
    var navList = document.getElementById("nav").getElementsByTagName("li");
    var smallImg = document.getElementById("smallImg");
    var bigImg = document.getElementById("bigImg");
    var small = document.getElementById("small");
    var mark = document.getElementById("mark");
    var warp = document.getElementById("warp");
    for (var i in navList) {
        navList[i].onclick = function () {
            var src = this.children[0].src;
            smallImg.src = src;
            var bigSrc = this.children[0].getAttribute("data-info");
            bigImg.src = bigSrc;
        }
    }

    document.getElementById("small").onmousemove = function (ev) {
        mark.style.display = "block";
        bigImg.style.display = "block";
        var evt = window.event || ev;
        var x = evt.clientX - parseFloat(getStyle(warp, "margin-left")) - mark.offsetWidth / 2;
        var y = evt.clientY - parseFloat(getStyle(warp, "margin-top")) - mark.offsetHeight / 2;

        var maxX = small.offsetWidth - mark.offsetWidth;
        var maxY = small.offsetHeight - mark.offsetHeight;
        if (x <= 0) {
            x = 0
        }
        if (x >= maxX) {
            x = maxX
        }
        if (y <= 0) {
            y = 0;
        }
        if (y >= maxY) {
            y = maxY;
        }

        mark.style.left = x + "px";
        mark.style.top = y + "px";

        var bigX = -( x / small.offsetWidth * bigImg.offsetWidth) + "px";
        var bigY = -( y / small.offsetHeight * bigImg.offsetHeight) + "px";

        bigImg.style.left = bigX;
        bigImg.style.top = bigY;

    }

    document.getElementById("small").onmouseout = function () {
        mark.style.display = "none";
        bigImg.style.display = "none";
    }

    function getStyle(obj, attr) {
        if (obj.currentStyle) {
            return obj.currentStyle[attr];
        } else {
            return window.getComputedStyle(obj)[attr];
        }

    }
}