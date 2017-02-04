$(function(){
	//input框得到焦点和失去焦点的效果
	$(".same").focus(function(){
		$(this).css({"border":"1px solid rgb(3,182,221)","background-color":"rgb(239,251,250)"});
	})
	$(".same").blur(function(){
		$(this).css({"border":"1px solid #dcdada","border-top-color":"#a1a0a0","border-left-color":"#a1a0a0",
		"background-color":"#fff"});
	})
	
	//checked的未选中
	$("#checked").click(function(){
		checked();
	});
	
	//手机注册的验证
	$("#user_phone").blur(function(){
		if($("#user_phone").val()!="")
		{
			if(user_phone()==false)
			{
				$("#hint0").show(100);
				$(".p_html0").html("手机号码输入错误");
			}else if(user_phone()==true)
			{
				$("#hint0").hide(100);
			}
		}
	});
	
	//Emai验证
	$("#user_email").blur(function(){
		if($("#user_email").val()!="")
		{
			if(user_email()==false)
			{
				$("#hint1").show(100);
				$(".p_html1").html("邮箱格式错误");
			}else if(user_email()==true)
			{
				$("#hint1").hide(100);
			}
		}
	});
	
	//密码验证
	$("#user_pass").blur(function(){
		if($("#user_pass").val()!="")
		{
			if(login_pass()==false)
			{
				$("#hint2").show(100);
				$(".p_html2").html("密码格式不对");
			}else if(login_pass()==true)
			{
				$("#hint2").hide(100);
			}
		}
		
	});
	
	//输入密码时的密码强度的改变
	$("#user_pass").focus(function(){
	window.onkeydown=function(){
		if(login_pass())
		{
			$(".pass_vigor0").css("background","#FF8400");
			//console.log(11);
			//console.log($("#user_pass").val().length);
			if($("#user_pass").val().length>=10)
			{
				$(".pass_vigor1").css("background","#FF8400");
			}else
			{
				$(".pass_vigor1").css("background","#facba6");
			}
			if(pass_vigor3())
			{
				$(".pass_vigor2").css("background","#FF8400");
			}else
			{
				$(".pass_vigor2").css("background","#facba6");
			}
		}else
		{
			$(".pass_vigor0").css("background","#facba6");
		}
		
	}
	});
	
	//再次输入密码验证
	$("#affirm_pass").blur(function()
	{
		if($("#affirm_pass").val()==$("#user_pass").val())
		{
			$("#hint3").hide(100);
		}else
		{
			$("#hint3").show(100);
			$(".p_html3").html("两次密码输入不正确");
		}
	});
	
	
		
});
//window.loaction.reload(true);


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

//邮箱验证
function user_email()
	{
		if($("#user_email").val()!="")
		{
			var useremail=$("#user_email").val();
			var partern3=/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/ ;
			if(partern3.test(useremail))
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
	
	
	//密码等级很高时
	function pass_vigor3()
	{
		var partern=/[0-9]+[A-z]+/;
		var userpass=$("#user_pass").val();
		if(partern.test(userpass)&&(userpass.length>=10))
			{
				return true;
			}
			return false;
		
	}


var booleans=true;
//checked未选中的效果
function checked()
{	//console.log($("#checked").attr("checked"));
	
	if(booleans)
	{	
		$("#checked").attr("checked","");
		$("#sub").css({"background":"#999","border-color":"#999"});
		booleans=false;
	}else
	{	
		booleans=true;
		$("#checked").attr("checked","checked");
		$("#sub").css({"background":"#f8bd0b","border-color":"#f39800"});
		$("#sub").click().href("index.html");
	}
	
}
