/**
 * Created by leson on 2016/12/29.
 */
function ele(parent, child) {
    var context = null;
    if (!child) {
        context = document;
        this.element = context.querySelectorAll(parent);
    } else {
        context = document.querySelector(parent);
        this.element = context.querySelectorAll(child);
    }

    return this;
}


ele.prototype.hide = function () {
    this.each(function () {
        this.style.display = "none";
    })
}

ele.prototype.show = function () {
//        for (var i = 0; i < this.element.length; i++) {
//            this.element[i].style.display = "block";
//        }

    this.each(function () {
        this.style.display = "block";
    })
}
ele.prototype.html = function (html) {
//        for (var i = 0; i < this.element.length; i++) {
//            this.element[i].innerHTML = html;
//        }
    if (html) {
        this.each(function () {
            this.innerHTML = html;
        });
    } else {
        debugger;
        return this.element[0].innerHTML;
    }

    return this;


}
ele.prototype.className = function (className) {
//        debugger;
//        for (var i = 0; i < this.element.length; i++) {
//            this.element[i].className = className;
//        }
    if (className) {
        this.each(function () {
            this.className = className;
        });
    } else {
        return this.element[0].className;
    }


    return this;
}
ele.prototype.click = function (fn) {
    //var that = this;
    this.each(function () {
        this.onclick = function () {
            fn(this);
        }
    })
}
ele.prototype.eq = function (index) {
    var list = [];
    list[list.length] = this.element[index];
    this.element = list;
    return this;
}

ele.prototype.each = function (fn) {
    for (var i = 0; i < this.element.length; i++) {
        fn.call(this.element[i], i);
    }

}
//少一个给所有的元素 设一个属性 并且绑定值
ele.prototype.setIndex = function () {
    this.each(function (i) {
        this["index"] = i;
    });
    return this;
}


/**
 *
 * @param parent
 * @param child
 * @returns {ele}
 */
function $(parent, child) {
    return new ele(parent, child);
}