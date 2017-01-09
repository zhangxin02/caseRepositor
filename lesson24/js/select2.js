/**
 * Created by leson on 2016/12/30.
 */
function $(eleName) {
    return new ele(eleName)
};

function ele(eleName) {
    this.parent = document.querySelector(eleName);
    this.height = this.getStyleAttr(this.parent, "height");
    this.width = this.getStyleAttr(this.parent, "width");
    this.tip = "请选择";
    var style = {
        position: "relative",
        border: "1px solid #cdcdcd",
        "line-height": this.height + "px",
        "text-align": "center"
    };
    this.setStyle(this.parent, style);
};
ele.prototype.getValue = function () {
    return this.parent.querySelector("input").value;
};
ele.prototype.setStyle = function (obj, json) {//给一个对象设置一系列的style值
    for (var i in json) {
        obj.style[i] = json[i];
    }
};
ele.prototype.getStyleAttr = function (obj, attr) {
    if (window.getComputedStyle) {
        return parseInt(window.getComputedStyle(obj)[attr]);
    } else {
        return parseInt(obj.currentStyle[attr]);
    }
};


ele.prototype.select = function (data, tip,fn) {
    if (tip) {
        this.tip = tip;
    }
    this.setDefault();
    this.create();
    this.bind(data,fn);
    return this;
};
ele.prototype.bind = function (data,fn) {
    var that = this;
    this.content.onclick = this.arrow.onclick = function (e) {
        var evt = window.event || e;
        evt.stopPropagation();
        that.option.style.display = "block";
    }
    data.forEach(function (obj) {
        var value = obj.value;
        var text = obj.text;
        var li = document.createElement("li");
        li.value = value;
        li.innerHTML = text;
        that.option.appendChild(li);
        var liStyle = {
            width: this.width * 0.9 + "px",
            "background-color": "rgba(150, 50, 50, 0.2)",
            "text-align": "left",
            cursor: "pointer"
        }
        that.setStyle(li, liStyle);
        li.onclick = function (e) {
            var evt = window.event || e;
            evt.stopPropagation();
            var text = this.innerHTML;
            that.content.value = text;
            that.option.style.display = "none";
            if (fn){
                fn(text);
            }
        }

        li.onmouseover = function () {
            this.style.backgroundColor = "rgba(150, 50, 50, 0.3)"
        }
        li.onmouseout = function () {
            this.style.backgroundColor = "rgba(150, 50, 50, 0.2)"
        }
    })

    document.onclick = function () {
        that.option.style.display = "none";
    }
    return this;
};
ele.prototype.create = function () {
    this.parent.appendChild(this.content);
    var contentStyle = {
        height: this.height + "px",
        width: this.width * 0.9 + "px",
        position: "absolute",
        left: 0,
        border: 0,
        outline: "none",
    }
    this.setStyle(this.content, contentStyle);
    this.parent.appendChild(this.arrow);

    var arrowStyle = {
        position: "absolute",
        height: this.height + "px",
        width: this.width * 0.1 + "px",
        left: this.width * 0.9 + "px",
        background: 'url("../lesson24/img/icon.png") no-repeat 5px 5px'
    }
    this.setStyle(this.arrow, arrowStyle);
    this.parent.appendChild(this.option);
    var optionStyle = {
        position: "absolute",
        "list-style": "none",
        "top": this.height + "px",
        width: this.width * 0.9 + "px",
        display: "none",
    }
    this.setStyle(this.option, optionStyle);
    return this;
};
ele.prototype.setDefault = function () {
    var content = document.createElement("input");
    content.placeholder = this.tip;
    this.content = content;

    var arrow = document.createElement("span"); //箭头
    this.arrow = arrow;

    var option = document.createElement("ul");
    this.option = option;
    return this;
};