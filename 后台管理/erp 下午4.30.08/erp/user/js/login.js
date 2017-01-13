$(function(){
	
	$('#switch_qlogin').click(function(){
		$('#switch_login').removeClass("switch_btn_focus").addClass('switch_btn');
		$('#switch_qlogin').removeClass("switch_btn").addClass('switch_btn_focus');
		$('#switch_bottom').animate({left:'0px',width:'70px'});
		$('#qlogin').css('display','none');
		$('#web_qr_login').css('display','block');
		
		});
	$('#switch_login').click(function(){
		
		$('#switch_login').removeClass("switch_btn").addClass('switch_btn_focus');
		$('#switch_qlogin').removeClass("switch_btn_focus").addClass('switch_btn');
		$('#switch_bottom').animate({left:'154px',width:'70px'});
		
		$('#qlogin').css('display','block');
		$('#web_qr_login').css('display','none');
		});
if(getParam("a")=='0')
{
	$('#switch_login').trigger('click');
}

	});
	
function logintab(){
	scrollTo(0);
	$('#switch_qlogin').removeClass("switch_btn_focus").addClass('switch_btn');
	$('#switch_login').removeClass("switch_btn").addClass('switch_btn_focus');
	$('#switch_bottom').animate({left:'154px',width:'96px'});
	$('#qlogin').css('display','none');
	$('#web_qr_login').css('display','block');
	
}


//根据参数名获得该参数 pname等于想要的参数名 
function getParam(pname) { 
    var params = location.search.substr(1); // 获取参数 平且去掉？ 
    var ArrParam = params.split('&'); 
    if (ArrParam.length == 1) { 
        //只有一个参数的情况 
        return params.split('=')[1]; 
    } 
    else { 
         //多个参数参数的情况 
        for (var i = 0; i < ArrParam.length; i++) { 
            if (ArrParam[i].split('=')[0] == pname) { 
                return ArrParam[i].split('=')[1]; 
            } 
        } 
    } 
}  


var reMethod = "GET",
	pwdmin = 6;

$(document).ready(function() {

	$('#loginBtn').click(function(){
		if($('#u').val()==""){
			$('#u').focus().css({
				border: "1px solid red",
				boxShadow: "0 0 2px red"
			});
			return false;
		}else{
			$('#u').css({
				border: "",
				boxShadow: ""
			});
		}
		if($('#p').val()==""){
			$('#p').focus().css({
				border: "1px solid red",
				boxShadow: "0 0 2px red"
			});
			return false;
		}else{
			$('#p').css({
				border: "",
				boxShadow: ""
			});
		}


		$.ajax({
			url:'http://www.av8djs.xyz/php/users/login.php',
			type:reMethod,
			data:"uname="+$('#u').val()+"&pwd="+$('#p').val(),
			beforeSend:function(){
				$('#showMsg').html("正在登录中...");
				$('#wrap').show();
			},
			success:function(result){
				$('#wrap').hide();
				if(result==0){
					alert("用户名错误");
				}else if(result==1){
					alert("用户名和密码不匹配");
				}else{
					window.location.href = "erp/index.html";
				}
			}
		});

	});


	$('#reg').click(function() {

		if ($('#user').val() == "") {
			$('#user').focus().css({
				border: "1px solid red",
				boxShadow: "0 0 2px red"
			});
			$('#userCue').html("<font color='red'><b>×用户名不能为空</b></font>");
			return false;
		}else if ($('#user').val().length < 4 || $('#user').val().length > 16) {

			$('#user').focus().css({
				border: "1px solid red",
				boxShadow: "0 0 2px red"
			});
			$('#userCue').html("<font color='red'><b>×用户名位4-16字符</b></font>");
			return false;

		}else{
			$('#user').css({
				border: "",
				boxShadow: ""
			});
			$('#userCue').html("快速注册请注意格式");
		}
		
		if ($('#passwd').val().length < pwdmin) {
			$('#passwd').focus().css({
				border: "1px solid red",
				boxShadow: "0 0 2px red"
			});
			$('#userCue').html("<font color='red'><b>×密码不能小于" + pwdmin + "位</b></font>");
			return false;
		}else{
			$('#passwd').css({
				border: "",
				boxShadow: ""
			});
			$('#userCue').html("快速注册请注意格式");
		}

		if ($('#passwd2').val() != $('#passwd').val()) {
			$('#passwd2').focus().css({
				border: "1px solid red",
				boxShadow: "0 0 2px red"
			});
			$('#userCue').html("<font color='red'><b>×两次密码不一致！</b></font>");
			return false;
		}else{
			$('#passwd2').css({
				border: "",
				boxShadow: ""
			});
			$('#userCue').html("快速注册请注意格式");
		}

		if ($('#qq').val() == "") {
			$('#qq').focus().css({
				border: "1px solid red",
				boxShadow: "0 0 2px red"
			});
			$('#userCue').html("<font color='red'><b>×昵称不能为空</b></font>");
			return false;
		}else{
			$('#passwd2').css({
				border: "",
				boxShadow: ""
			});
			$('#userCue').html("快速注册请注意格式");
		}

		var sqq = /^1[3578]{1}\d{9}$/;
		if (!sqq.test($('#phone').val())) {
			$('#phone').focus().css({
				border: "1px solid red",
				boxShadow: "0 0 2px red"
			});
			$('#userCue').html("<font color='red'><b>×手机号码格式不正确</b></font>");return false;
		} else {
			$('#phone').css({
				border: "",
				boxShadow: ""
			});
			$('#userCue').html("快速注册请注意格式");
		}

		$.ajax({
			type: reMethod,
			url: "http://www.av8djs.xyz/php/users/register.php",
			data: "uname=" + $("#user").val() + '&pwd=' + $('#passwd').val()+"&kname="+$('#qq').val()+"&phone="+$('#phone').val(),
			beforeSend:function(){
				$('#showMsg').html("正在注册中...");
				$('#wrap').show();
			},
			success: function(result) {
				$('#wrap').hide();
				if(result==0){
					alert("账号已存在");
				}else if(result==1){
					alert("注册成功");
					window.location.href = "erp/index.html";
				}else{
					alert(result);
				}

			}
		});


	});
	

});