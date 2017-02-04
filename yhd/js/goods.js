
function bindData() {
	$.ajax({
		type: "get",
		url: "php/list.php",
		data: "type=all",
		async: true,
		dataType: "json",
		success: function(res) {
			//console.log(res);
			for(var i = 0; i < res.length; i++) {
				var li = $("<li>");
				var alink = $("<a>");

				var div = $("<div>");
				div.addClass("dis_img");
				var img = $("<img>");
				img.attr("src", "img/" + res[i][1]);
				div.append(img);
				alink.append(div);

				var p = $("<p>");
				p.addClass("dis_name").html(res[i][3].substring(0, 9) + "...");
				alink.append(p);

				var p = $("<p>");
				p.addClass("dis_sale").html("加入购物车");
				p.attr("data-id", res[i][0]);
				alink.append(p);
				li.append(alink);
				$(".hdzs-midle-ul").append(li);
			}
		}
	});
	$(document).on("click", ".dis_sale", function() {
		addgood($(this).attr("data-id")); ////商品id
		$("#effect").show("shake", 500, function() {
			setTimeout(function() {
				$("#effect:visible").removeAttr("style").fadeOut();
			}, 1000);
		});
	})
}

//保存数量 
function addgood(id) {
	$.ajax({
		type: "get",
		url: "php/list.php",
		data: "type=one&id=" + id,
		dataType: "json",
		async: true,
		success: function(ressult) {
			//console.log(ressult);
			var getCok = document.cookie;
			var godId = getCookie(id + "_goodsId"); //得到cookie中的商品Id
			var godNum = getCookie(id + "_goodsNum"); //得到cookie中的商品数量
			if(id == godId) {
				setCookie(id + "_goodsNum", godNum * 1 + 1, 3); //直接累加商品
			} else {
				setCookie(id + "_goodsId", id, 3);
				setCookie(id + "_goodsName", ressult[0][3], 3);
				setCookie(id + "_goodsPic", ressult[0][1], 3);
				setCookie(id + "_goodsPrice", ressult[0][2], 3);
				setCookie(id + "_goodsNum", 1, 3);
			}
			//console.log(document.cookie);
		},
		error: function() {
			console.log("ss")
		}
	});
}

//猜你喜欢数量列表 控制左右移动
function shopCartMove() {
	//左
	var index = 0;
	var width = $(".hdzs-midle").width(); //每一次要移动的距离
	//最多点击的次数
	var maxNum = $(".hdzs-midle-ul").width() / width;

	$(".hdzs-em-left").click(function() {
		index++;
		if(index < maxNum) {
			console.log(index);
			$(".hdzs-midle-ul").stop().animate({
				"left": -index * width
			}, 1000);
		} else if(index == maxNum) {
			index = maxNum - 1;
		}
	});
	$(".hdzs-em-right").click(function() {
		if(index > 0) {
			index--;
			if(index <= maxNum - 1) {
				console.log(index);
				$(".hdzs-midle-ul").stop().animate({
					"left": parseInt($(".hdzs-midle-ul").css("left")) + width
				}, 1000);
			}
		}
	}); //右
}

function showData() {
	var str = document.cookie;
	var firstcode = "_goodsId";
	//显示数据列表
	for(var i = 0; i < str.length; i++) {
		var index = str.indexOf(firstcode, i);
		if(index == i) {
			var gId = str.substring(index - 4, index).trim();
			createGood($("tbody"), gId);
		}
	}
}

//创建商品
function createGood(parent, value) {
	var tr = $("<tr>");
	tr.attr("data-id", value);
	parent.append(tr);
	var td = $("<td>");
	td.addClass("checkbox");
	var ipt = $("<input>");
	ipt.addClass("check-one check").attr("type", "checkbox");
	td.append(ipt);
	tr.append(td);

	var td = $("<td>");
	td.addClass("goods");
	var img = $("<img>");
	img.attr({
		"src": "img/" + getCookie(value + "_goodsPic"),
		"width": 60,
		"height": 60,
		"alt": ""
	});
	td.append(img);
	var a = $("<a>");
	a.html(getCookie(value + "_goodsName").substring(0, 25) + "...");
	a.attr("href","detail.html");
	td.append(a);
	tr.append(td);

	var td = $("<td>");
	td.addClass("price");
	td.html(getCookie(value + "_goodsPrice"));
	tr.append(td);

	var td = $("<td>");
	td.addClass("count");
	var span = $("<span>");
	span.addClass("reduce").html("-").attr("data-id", value);
	td.append(span);
	var ipt = $("<input>");
	ipt.addClass("count-input").attr("type", "text").val(parseInt(getCookie(value + "_goodsNum")));
	td.append(ipt);
	var span = $("<span>");
	span.addClass("add").html("+").attr("data-id", value);
	td.append(span);
	tr.append(td);

	var td = $("<td>");
	td.addClass("subtotal").html(((getCookie(value + "_goodsPrice") * 1) * (getCookie(value + "_goodsNum") * 1)).toFixed(2));
	tr.append(td);

	var td = $("<td>");
	td.addClass("operation");
	var span = $("<span>");
	span.addClass("delete").html("删除").attr("data-id", value);
	td.append(span);
	tr.append(td);
}