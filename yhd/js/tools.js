// JavaScript Document

//查找指定元素的上一个兄弟节点
function previous(ele) {
	if(ele.previousElementSibling) {
		return ele.previousElementSibling;
	} else {
		return ele.previousSibling;
	}
}
//查找指定元素的下一个兄弟节点
function next(ele) {
	if(ele.nextElementSibling) {
		return ele.nextElementSibling;
	} else {
		return ele.nextSibling;
	}
}

//获取一个元素最终生效的样式
function getStyleByElement(ele, attr) {
	if(ele.currentStyle) { //判断是否有该属性，如果有就是IE8，没有就是高级浏览器
		return parseInt(ele.currentStyle[attr]);
	} else {
		return parseInt(window.getComputedStyle(ele)[attr]);
	}
}

//给指定的元素绑定一个事件
//ele:元素；type:事件名称;fn:事件触发时执行的函数
function eleBindFunction(ele, type, fn) {
	if(ele.addEventListener) {
		return ele.addEventListener(type, fn);
	} else {
		return ele.attachEvent("on" + type, fn);
	}
}
//保存修改删除cookie
//删除时将expires 设置为负数
function setCookie(key, value, expires) {
	var ddate = new Date();
	ddate.setDate(ddate.getDate() + expires);
	document.cookie = key + '=' + encodeURI(value) + ';expires=' + ddate;
}

//读取cookie
function getCookie(name) {
	var arrstr = document.cookie.split(';');
	for(var i = 0; i < arrstr.length; i++) {
		var arr = arrstr[i].split('=');
		if(arr[0].trim() == name) {
			return decodeURI(arr[1]);
		}
	}
	return "";
}

//运动框架封装,变速
//animate(div, {"height": 200, "width": 150, "margin-left": 30, "margin-top": 20}, 10, function () {
//          alert("aaa");
//      });
function animate(obj, json, time, fn) {
	clearInterval(obj.timer);
	obj.timer = setInterval(function() {
		var flag = true;
		for(var i in json) {
			var attr = i;
			var value = json[i];
			var balanceDistance = getStyleAttr(obj, attr);
			var speed = (value - balanceDistance) / time;
			speed = speed >= 0 ? Math.ceil(speed) : Math.floor(speed);
			obj.style[attr] = balanceDistance + speed + "px";
			if(balanceDistance != value) {
				flag = false;
			}
		}
		if(flag) {
			clearInterval(obj.timer);
			if(fn) {
				fn();
			}
		}
	}, 20);
}

/*运动框架封装，匀速
 * 如何调用
 * function moveStart() {
			move(box, {
					"height": 200,
					"width": 200,
					"margin-left": 200,
					"margin-top": 50
				}, 5, 20, function() {
					move(box, {
						"height": 100,
						"width": 100,
						"margin-left": 0,
						"margin-top": 0
					}, 5, 20, function() {
						moveStart();//回调，运动递归让运动无限次运动，因为没有给出口，所以递归会一直执行
					});
				});
		}*/
function move(obj, json, speed, time, fn) {
	clearInterval(obj.timer); //清除定时器
	obj.timer = setInterval(function() {
		//定个标量来记录所有的属性是否执行完成，所有的走完后，在去清除定时器
		var flag = true;
		for(var i in json) {
			var attr = i;
			var value = json[i];
			var currentValue = getStyleByElement(obj, attr);
			//目标值比当前属性所拥有的值要大，eg:box的left为100，此时需要变成200则说明需要+上给定的值speed向右边移动
			//若为-200,则说明向左边移动，就要减去speed
			if(value > currentValue) {
				speed = Math.abs(speed);
			} else {
				speed = -Math.abs(speed);
			}
			obj.style[attr] = getStyleByElement(obj, attr) + speed + "px";
			//避免速度直接冲出某个值，然后一直不停的进行数据增加或递减，因此加入这个判断
			if(speed > 0) {
				if(getStyleByElement(obj, attr) >= value) {
					obj.style[attr] = value + "px";
				} else {
					flag = false;
				}
			} else {
				if(getStyleByElement(obj, attr) <= value) {
					obj.style[attr] = value + "px";
				} else {
					flag = false;
				}
			}
		}
		if(flag) {
			clearInterval(obj.timer);
			if(fn) {
				fn();
			}
		}
	}, time)

}

/*
 * 抛物线
 	var circle = document.getElementById("circle");
			var speed = 0;
			var speedX = 5;
			var maxHeight = document.documentElement.clientHeight - circle.offsetHeight;
			var timer;
			timer = setInterval(function() {
				circle.style.top = circle.offsetTop + (speed++) + "px";
				circle.style.left = circle.offsetLeft + speedX + "px"
				if(circle.offsetTop >= maxHeight) {
					speed = -0.6 * speed;
					//console.log(circle.offsetTop + "/" + maxHeight);
					if(Math.abs(speed) <= 5) {//判断某一时刻冲出零界值的状态
						console.log(speed);
						clearInterval(timer);
					}
					circle.style.top = maxHeight + "px";
				}
			}, 30);
			
 */

//ajax的封装
/*调用方法
 * $.ajax({
	method: "get",
	url: "xxx.php",
	callback: function(res) {
		console.log(res);
	}
}
});*/
//var $ = {
//	ajax: function(opt) {
//		var req = new XMLHttpRequest();
//		req.open(opt.method, opt.url,true);
//		req.send();
//		req.onreadystatechange = function() {
//			if(req.readyState == 4 && req.status == 200) {
//				opt.callback(req.responseText);
//			}
//		}
//	}
//};

/*
 *通过父级和子元素的class类 获取该同类子元素的数组
 */
function getClassObj(parent, className) {
	var obj = parent.getElementsByTagName('*'); //获取 父级的所有子集
	var pinS = []; //创建一个数组 用于收集子元素
	for(var i = 0; i < obj.length; i++) {
		if(obj[i].className == className) {
			pinS.push(obj[i]);
		}
	};
	return pinS;
}

//事件冒泡兼容
/*xx.onclick=function(e){
	var evt=window.event||e;
	if(evt.stopPropagation){
		evt.stopPropagation();
	}else{
		evt.cancelBubble=true;
	}
}*/

//保存修改删除cookie
//删除时将expires 设置为负数
function setCookie(key, value, expires) {
	var ddate = new Date();
	ddate.setDate(ddate.getDate() + expires);
	document.cookie = key + '=' + encodeURI(value) + ';expires=' + ddate;
}

//读取cookie
function getCookie(name) {
	var arrstr = document.cookie.split(';');
	for(var i = 0; i < arrstr.length; i++) {
		var arr = arrstr[i].split('=');
		if(arr[0].trim() == name) {
			return decodeURI(arr[1]);
		}
	}
	return "";
}
