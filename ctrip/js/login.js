$(function(){
	
	//获得图片
	
	$.get("json/login.json",function(data,status)
	{
		$("#main-left-picture").attr("src",data.login_picture);
	});
	
	//普通登录与手机登录切换
	$("#rad0").attr("checked","checked");
	//$("#rad1").attr("checked","");
	$("#rad0").click(function(){
		$("#dynamic").hide(100);
		$("#login_pass").show(100);
		$(".login_phone").hide(100);
		$(".login_name").show(100);
		$("#hint").hide(100);
	});
	
	$("#rad1").click(function(){
		$("#dynamic").show(100);
		$("#login_pass").hide(100);
		$(".login_phone").show(100);
		$(".login_name").hide(100);
		$("#hint").hide(100);
	});
	//input背景与边框
	$(".focus_back").focus(function(){
		$(this).css({"border":"1px solid rgb(3,182,221)","background-color":"rgb(239,251,250)"});
	});
	$(".focus_back").blur(function(){
		$(this).css({"border":"1px solid #dcdada","border-top-color":"#a1a0a0","border-left-color":"#a1a0a0",
		"background-color":"#fff"});
	});
	
	
	//显示验证码
	checkcode();
	//点击获取验证码
	$("#code_pass").click(function()
	{
		checkcode();
	});

	//cookie
	//页面刷新获得cookie
	var name=$.cookie('name');
	var pass=$.cookie('pass');
	$("#user_name").val(name);
	$("#user_pass").val(pass);
	
	//数据格式验证
	//登录名验证；
	$("#user_name").blur(function(){
		if($("#user_name").val()!="")
		{
			if(login_name()==false)
			{
				$("#hint").show(100);
				$(".p_html").html("登录名格式不对");
			}else if(login_name()==true&&login_pass()==true)
			{
				$("#hint").hide(100);
			}
		}
	});
	
	//手机登录的验证
	$("#user_phone").blur(function(){
		if($("#user_phone").val()!="")
		{
			if(user_phone()==false)
			{
				$("#hint").show(100);
				$(".p_html").html("手机号码输入错误");
			}else if(user_phone()==true&&code_text()==true)
			{
				$("#hint").hide(100);
			}
		}
	});
	
	
	//密码验证
	$("#user_pass").blur(function(){
		if($("#user_pass").val()!="")
		{
			if(login_pass()==false)
			{
				$("#hint").show(100);
				$(".p_html").html("密码格式不对");
			}else if(login_name()==true&&login_pass()==true)
			{
				$("#hint").hide(100);
			}
		}
		
	});
	
	
	//建立cookie
$("#sub").mousedown(function()
	{	//alert(111);
		if($("#changeCheck").attr("checked")=="checked")
		{	//alert(111);
			$.cookie('name',$("#user_name").val(),{expires:7});
			$.cookie('pass',$("#user_pass").val(),{expires:7});
		}else if($("#changeCheck").attr("checked")=="")
		{
			$.cookie('name',null);
			$.cookie('pass',null);
		}
	});



	//验证码的验证
	$("#code_text").blur(function(){
		if($("#code_text").val()!="")
		{
			if(code_text()==false)
			{
				$("#hint").show(100);
				$(".p_html").html("验证码不对");
			}else if(login_name()==true&&login_pass()==true&&code_text()==true)
			{
				$("#hint").hide(100);
			}
		}
		
	});
	
	

});

//显示验证码
function checkcode()
	{
		var arr=[];
		for(var i=0; arr.length<4; i++)
		{
			var n=getRandom(48,122);
			if((n>48&&n<57)||(n>=65&&n<90)||(n>=97&&n<=122))
			{
				arr.push(String.fromCharCode(n));
			}
		}
		$("#code_pass").html(arr.join("")).css("font-size","30px");
	}
	function getRandom(start,end)
	{
		var d = end + 1 - start;
		return Math.floor(Math.random()*d+start);
	}


//数据格式验证
//登录名验证；
	function login_name()
	{
		if($("#user_name").val()!="")
		{
			var username=$("#user_name").val();
			var partern0=/^[a-zA-Z_]\w{5,19}$/;
			var partern1=/^\d{19}$/;
			var partern2=/^1(3|5|7|8)\d{9}$/;
			var partern3=/^[A-Za-zd]+([-_.][A-Za-zd]+)*@([A-Za-zd]+[-.])+[A-Za-zd]{2,5}$/;
			if(partern0.test(username)||partern1.test(username)||partern2.test(username)||partern3.test(username))
			{
				return true;
			}
			return false;
		}
		return false;
	}

//手机号码验证
function user_phone()
{
	if($("#user_phone").val()!="")
	{	
		var userphone=$("#user_phone").val();
		var partern2=/^1(3|5|7|8)\d{9}$/;
		if(partern2.test(userphone))
		{
			return true;
		}
		return false;
	}
	return false;
}
	

//密码验证
	function login_pass()
	{
		if($("#user_pass").val()!="")
		{
			var userpass=$("#user_pass").val();
			var partern=/\w{1}\w{5,19}/;
			if(partern.test(userpass))
			{
				return true;
			}
			return false;
		}
		return false;
	}


		//验证码的验证
	function code_text()
	{
		if($("#code_text").val()!="")
		{
			var codepass = ($("#code_pass").html()).toLowerCase();
			var codetext = ($("#code_text").val()).toLowerCase();
			if(codepass==codetext)
			{
				return true;
			}
			return false;
		}
		return false;
	}



	//获取json文件进行匹配验证
function login1()
{	
	$.get("json/login.json",function(data,status)
	{
		for(var p in data.user)
		{	
			if($("#user_name").val()==data.user[p].name&&$("#user_pass").val()==data.user[p].pass)
			{	
				if(code_text())
				{	//alert(111);
					window.open("index.html");
				}
				return true;
			}
		}
		alert("登录失败");
		return false;
	});
		
}