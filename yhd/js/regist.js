	var yzmspan = document.querySelector(".yzm-btn"); //验证码span
	yzmspan.innerHTML = Math.floor(Math.random() * 9000 + 1000);
	var txtName = document.getElementById("username"); //用户名		
	txtName.onblur = function() {
		var txt = this.value;
		if(txt.length < 4 || txt.length > 20) { //长度不够	
			show(this, "您输入的字符长度不合法");
		} else if(txt.indexOf("#") != -1 || txt.indexOf("%") != -1 || txt.indexOf("^") != -1 || txt.indexOf("&") != -1 || txt.indexOf("*") != -1 || txt.indexOf("@") != -1 || txt.indexOf("/") != -1 || txt.indexOf("$") != -1) {
			show(this, "含有非法字符");
		} else {
			showOk(this);
		}
	}
	var txtPhoneNumber = document.getElementById("phoneNumber"); //手机号		
	txtPhoneNumber.onblur = function() {
		if(!(/^1[34578]\d{9}$/.test(this.value))) {
			show(this, "手机号输入有误");
		} else {
			showOk(this);
		}
	}
	var txtYzm = document.getElementById("yzm"); //验证码
	txtYzm.onblur = function() {
		if(this.value != yzmspan.innerHTML) {
			show(this, "验证码错误");
		} else {
			showOk(this);
		}
	}
	var txtPwd1 = document.getElementById("pwd1"); //设置密码
	var txtPwd2 = document.getElementById("pwd2"); //确认密码
	txtPwd2.onblur = function() {
		if(txtPwd1.value != this.value) {
			show(this, "密码设置有误");
		} else {
			showOk(this);
		}
	}

	function show(ele, txt) {
		next(ele).style.display = "block";
		next(next(ele)).style.display = "none";
		next(ele).innerHTML = txt;
	}

	function showOk(ele) {
		next(next(ele)).style.display = "block";
		next(ele).style.display = "none";
	}
	//检查用户是否存在
	/*function ckusname() {
		var flag = true;
		$.ajax({
			method: "get",
			url: "php/regist.php?type=ckname&username=" + txtName.value,
			callback: function(res) {
				if(JSON.parse(res)[0] > 0) {
					flag = true;
				} else {
					flag = false;
				}
			}
		});
		return flag;
	}*/
	var btn = document.getElementById("btn"); //注册按钮
	btn.onclick = function() {
		$.ajax({
			type: "get",
			url: "php/regist.php?type=add&username=" + txtName.value + "&pwd=" + txtPwd2.value + "&phone=" + txtPhoneNumber.value + "&&yzm=" + txtYzm.value,
			callback: function(res) {
				if(res == "1") {
					window.location.href = "login.html";
				}
			}

		});
	}