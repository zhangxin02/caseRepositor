var btnlogin = document.getElementById("btnlogin"); //登录按钮
var txtPwd = document.getElementById("txtPwd"); //密码
var txtName = document.getElementById("txtName"); //用户名
var logResult = document.getElementById("logResult"); //结果提示
var yz = document.querySelector(".yz"); //提示框
var check_agreement = document.querySelector(".check_agreement");
var auto_tips = document.querySelector(".auto_tips");

check_agreement.onclick = function() {
	setCookie("username", txtName.value, 7); //保存用户到cookie
	this.className = this.className == "active" ? "check_agreement" : "active";
	auto_tips.style.display = auto_tips.style.display == "inline-block" ? "none" : "inline-block";
}

var $ = {
	ajax: function(opt) {
		var req = new XMLHttpRequest();
		req.open(opt.method, opt.url,true);
		req.send();
		req.onreadystatechange = function() {
			if(req.readyState == 4 && req.status == 200) {
				opt.callback(req.responseText);
			}
		}
	}
};

btnlogin.onclick = function() {
	$.ajax({
		type: "get",
		url: "php/regist.php?type=login&username=" + txtName.value,
		callback: function(res) {
			var txt = JSON.parse(res);
			if(txt.length == 0) {
				yz.style.visibility = "visible";
				logResult.innerHTML = "用户名不存在";
			} else {
				if(txt[0][2] == txtPwd.value) {
					setCookie("username", txtName.value, 7); //保存用户到cookie
					location.href = "index.html";
				} else {
					yz.style.visibility = "visible";
					logResult.innerHTML = "密码错误";
				}
			}

		}
	});
}