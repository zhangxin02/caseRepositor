window.onload = function() {
		xxk();
		hdzs();
	}

//选择卡
function xxk() {
	var tab = document.getElementById("tab");
	var alist = tab.children[0].getElementsByTagName("a");
	var divlist = tab.children[1].getElementsByTagName("div");
	var tabclick = function() {
		for(var i = 0; i < alist.length; i++) {
			alist[i].index = i;
			alist[i].onmouseover = function() {
				for(var j = 0; j < divlist.length; j++) {
					divlist[j].style.display = "none";
				}
				divlist[this.index].style.display = "block";
			}
		}
	}
	tabclick();
}

//			openorclose();
//			//展开、收起
//			function openorclose() {
//				var openOrClose = document.querySelector(".openOrClose");
//				openOrClose.onclick = function() {
//					this.innerHTML = this.innerHTML == "展开" ? "收起" : "展开";
//					next(this).style.display = next(this).style.display == "block" ? "none" : "block";
//					next(next(this)).style.display = next(next(this)).style.display == "none" ? "block" : "none";
//				}
//			}

//你的活动专属
function hdzs() {
	var prev = document.querySelector(".hdzs-em-left");
	var next = document.querySelector(".hdzs-em-right");
	var ul = document.querySelector(".hdzs-midle-ul");
	var maxLength = (ul.offsetWidth / 2); //最大宽度				
	var timer = 0;
	var speed = -20;
	timer = setInterval(show, 200);
	var bool = false;

	function show() {
		if(ul.offsetLeft == -maxLength) { //向左边走
			ul.style.left = 0;
		}
		if(ul.offsetLeft == 0 && bool == false) {
			ul.style.left = "-1000px";
		}
		ul.style.left = ul.offsetLeft - speed + "px";
	}
	prev.onclick = function() {
		bool = true;
		speed = 20;
	}
	next.onclick = function() {
		speed = -20;
		bool = false;
		show();
	}
}

function shopCartClick() {
	$("#shopCart").click(function() {
		if(getCookie("username") == "") {
			location.href = "emptyShop.html";
		} else {
			location.href = "shopCart.html"
		}
	})
}