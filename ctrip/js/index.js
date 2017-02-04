 $(function(){
	
	//鼠标划在country上的效果
	$(".country").mouseenter(function(){
		$(this).css({"border-color":"#CDDCEB","border-bottom-color":"#fff"});
		$(".countrys").css("display","block");
		$(".arrow").css("background-position","8px -260px");
	});
	
	$(".countrys").mouseenter(function(){
		$(".country").css({"border-color":"#CDDCEB","border-bottom-color":"#fff"});
		$(this).css("display","block");
		$(".arrow").css("background-position","8px -260px");
	});
	
	$(".country").mouseleave(function(){
		$(this).css({"border-color":"#fff","border-bottom-color":"#fff"});
		$(".countrys").css("display","none");
		$(".arrow").css("background-position","-55px -260px");
	});
	
	$(".countrys").mouseleave(function(){
		$(this).css("display","none");
		$(".country").css({"border-color":"#fff","border-bottom-color":"#fff"});
		$(".arrow").css("background-position","-55px -260px");
	});
	
	//鼠标划在number的效果
	$(".number").mouseenter(function(){
		$(this).css({"border-color":"#CDDCEB","border-bottom-color":"#fff"});
		$(".numbers").css("display","block");
		$(".arrow_blue").css("background-position","-17px -259px");
	});
	
	$(".numbers").mouseenter(function(){
		$(".number").css({"border-color":"#CDDCEB","border-bottom-color":"#fff"});
		$(this).css("display","block");
		$(".arrow_blue").css("background-position","-17px -259px");
	});
	
	$(".number").mouseleave(function(){
		$(this).css({"border-color":"#fff","border-bottom-color":"#fff"});
		$(".numbers").css("display","none");
		$(".arrow_blue").css("background-position","-17px -264px");
	});
	
	$(".numbers").mouseleave(function(){
		$(this).css("display","none");
		$(".number").css({"border-color":"#fff","border-bottom-color":"#fff"});
		$(".arrow_blue").css("background-position","-17px -264px");
	});
	
	//鼠标划在phone上的效果
	$(".phone").mouseenter(function()
	{
		$(".phones").show();
		$(this).find("a").css("background-position","0 -78px");
	});
	$(".phones").mouseenter(function()
	{
		$(".phones").show();
		$(".phone").find("a").css("background-position","0 -78px");
	});
	
	$(".phone").mouseleave(function()
	{
		$(".phones").hide();
		$(".phone").find("a").css("background-position","0 -56px");
	});
	$(".phones").mouseleave(function()
	{
		$(".phones").hide();
		$(".phone").find("a").css("background-position","0 -56px");
	});
	
	//鼠标移到微信
	$(".wechat").mouseenter(function()
	{
		$(".weixing").show();
		$(this).find("a").css("background-position","-20px -77px");
	});
	$(".weixing").mouseenter(function()
	{
		$(".weixing").show();
		$(".wechat").find("a").css("background-position","-20px -77px");
	});
	
	$(".wechat").mouseleave(function()
	{
		$(".weixing").hide();
		$(this).find("a").css("background-position","-20px -55px");
	});
	$(".weixing").mouseleave(function()
	{
		$(".weixing").hide();
		$(".wechat").find("a").css("background-position","-20px -55px");
	});
	
	//鼠标移动到搜索框上
	$("#top_text").focus(function()
	{
		$(".top_seek").css("border-color","#2b82f4");
		$("#top_btn").css("background","#2b82f4 url(img/un_header_footer.png) no-repeat -52px -628px");
	});
	$("#top_text").blur(function()
	{
		$(".top_seek").css("border-color","#8ebefc");
		$("#top_btn").css("background","#a4cbff url(img/un_header_footer.png) no-repeat -52px -603px");
	});
	
	$("#top_btn").mouseover(function(){
		$(this).css("background","#299cff url(img/un_header_footer.png) no-repeat -52px -653px");
	});
	$("#top_btn").mouseout(function(){
		$(this).css("background","#a4cbff url(img/un_header_footer.png) no-repeat -52px -603px");
	});
	//鼠标滑到nav上时的效果
	var nav=document.getElementById("nav");
	nav.onmouseover=function(){
		nav_tab();
	};
	//鼠标划在登陆位置时的效果
	$(".nav_login").mouseenter(function(){
		$(".login_show").show();
		$(".login_change").css("background-position","-40px -260px")
		$(".login_show").mouseenter(function(){
			$(this).show();
			$(".login_change").css("background-position","-40px -260px")
		});
		$(".login_show").mouseleave(function(){
			$(this).hide();
			$(".login_change").css("background-position","-40px -264px")
		});
	});
	$(".nav_login").mouseleave(function(){
		$(".login_show").hide();
		$(".login_change").css("background-position","-40px -264px")
		
	});
	
	$.get("json/index.json",function(data,status){
		//console.log(data.banner.length);
		//自动生成banner图
		var lis="";
		var ols="";
		for(var i=0;i<data.banner.length;i++)
		{
			lis+="<li><a href='#'><img src='"+data.banner[i]+"'/></a></li>"
			ols+="<li></li>"
		}
		lis+="<li><a href='#'><img src='"+data.banner[0]+"'/></a></li>"
		$(".Shuffling_figure").append(lis);
		$(".banner_bottom").append(ols);
		$(".banner_bottom").children().eq(0).css("background-color","#fff");
		//调用banner
		settimer();
		//生成tour

		for(var i in data.tour[0].Sale_remit)
		{	
			$(".tour_img").eq(i).attr("src",data.tour[0].Sale_remit[i].src);
			$(".tour_table dt p").eq(i).html(data.tour[0].Sale_remit[i].alt);
			$(".tour_table dd p").eq(i).html(data.tour[0].Sale_remit[i].tit);
			$(".num").eq(i).html(data.tour[0].Sale_remit[i].num);
		}
		$(".ad").css("background-image",data.tour[0].Sale_remit[8].ad);
		$(".ad p").html(data.tour[0].Sale_remit[8].p);
		//生成grogshop
		for(var i in data.grogshop)
		{
			$(".grogshop_img").eq(i).attr("src",data.grogshop[i].src);
			$(".city_weight").eq(i).html(data.grogshop[i].city);
			$(".grogshop_num").eq(i).html(data.grogshop[i].grogshop);
			$(".money").eq(i).html(data.grogshop[i].num);
		}
		$(".tds1").css("background",data.grogshop[6].tds1);
		$(".tds1 p").html(data.grogshop[6].p);
		//生成strategy
		for(var i in data.strategy)
		{
			$(".strategy_img").eq(i).attr("src",data.strategy[i].src);
			$(".strategy_picture p").eq(i).html(data.strategy[i].p);
		}
		//生成wineshop_left
		$(".wineshop_json").html(data.tour[0].Sale_remit[9].advertisement);
		//生成json_gain
		for(var i in data.strategy[4].json_gain)
		{
			$(".json_gain").eq(i).html(data.strategy[4].json_gain[i]);
		}
		//生成ploy
		for(var i in data.ploy)
		{	
			$(".ploy_counity").eq(i).attr("src",data.ploy[i].src);
			$(".tit").eq(i).html(data.ploy[i].tit);
			$(".ploy_picture span").eq(i).html(data.ploy[i].city);
			$(".ploy_picture .num").eq(i).html(data.ploy[i].num);
		}
		for(var i in data.ploy[4])
		{
			$(".json_city").eq(i).html(data.ploy[4][i]);
		}
		
		//footer广告图
		$(".advert").css("background",data.footer[0].src);
		
		//获得ctripguanggao
		$(".tongyong").css("background",data.ctrip_ad[1].src);
		$(".ctrip_ad_left").css("background",data.ctrip_ad[0].src);
	});
	
	//租房时间与退房时间
	var myDate=new Date();
	var year=myDate.getFullYear();
	var month=myDate.getMonth();
	var day=myDate.getDate()
	$(".check_in").val(year+"-"+(month+1)+"-"+day).css("font-size","14px");
	$(".check_out").val(year+"-"+(month+1)+"-"+(day+1)).css("font-size","14px");
	//选项卡的效果
	$(".tab_left li").click(
	function()
	{
		$(this).addClass("tab_white").siblings().removeClass("tab_white");
		   $(".tab_right"+$(this).index()).show().siblings().hide();
	});
	//tour划过的效果
	$(".tour_img").hover(function(){
		$(this).stop().animate({
			height: "130px", width: "260px",left: "-20px", top: "-10px"
		},300);
	},function(){
		$(this).stop().animate({
			height: "110px", width: "220px",left: "0px", top: "0px"
		},300);
	});
	
	//tour选项卡效果
	$(".tour_top li").click(function(){
		var id=this.id;
		var index=$(this).index();
		//console.log(index);
		//console.log(id);
		$(this).addClass("tour_top_blue").siblings().removeClass("tour_top_blue");
		$.ajax({
			url:"json/index.json",
			type:"GET",
			success:function(data)
			{	//console.log(id);
				//console.log(data.tour[0][id][0].src);
				for(var i in data.tour[0][id])
				{	
					$(".tour_img").eq(i).attr("src",data.tour[0][id][i].src);
					$(".tour_table dt p").eq(i).html(data.tour[0][id][i].alt);
					$(".tour_table dd p").eq(i).html(data.tour[0][id][i].tit);
					$(".num").eq(i).html(data.tour[0][id][i].num);
				}
			}
			
		});
		
		
		
		
	});
	
	//grpgshop划过的效果
	$(".grogshop_hover").hover(function(){
		$(this).find(".grogshop_img").stop().animate({
			height:"176px",width:"240px",left:"-10px",top:"-5px"
		},300);
		$(this).find(".city_name").stop().animate({opacity:"0.2"});
	},function(){
		$(this).find(".grogshop_img").stop().animate({
			height:"166px",width:"220px",left:"0px",top:"px"
		},300);
		$(this).find(".city_name").stop().animate({opacity:"1"});
	});
	//strategy划过的效果
	$(".strategy_picture li").hover(function(){
		$(this).find(".strategy_img").stop().animate({
			height:"165px",width:"240px",left:"-10px",top:"-5px"
		},300);
		$(this).find("p").stop().animate({
			height:"50px"
		},300);
	},function(){
		$(this).find(".strategy_img").stop().animate({
			height:"155px",width:"220px",left:"0px",top:"0px"
		},300);
		$(this).find("p").stop().animate({
			height:"30px"
		},300);
	});
	//ploy划过的效果
	$(".ploy_picture li").hover(function(){
		$(this).find(".ploy_counity").stop().animate({
			height: "120px", width: "240px",left: "-10px", top: "-5px"
		},300);
		$(this).css("box-shadow","2px 2px 2px #999");
	},function(){
		$(this).find(".ploy_counity").stop().animate({
			height: "110px", width: "220px",left: 0, top: 0
		},300);
		$(this).css("box-shadow","none");
	});
	
	//ctrip_ad点击效果
	$(".ctrip_ad_left").click(function(){
		$(this).animate({
			left:"-127px"
		},300);
		setTimeout(function(){
			$("#ctrip_ad").show().animate({
			left:'0px'
			},600);
		},400);
	});
	$(".x").click(function(){
		$("#ctrip_ad").animate({
			left:"-1180px"
		},600);
		setTimeout(function(){
			$("#ctrip_ad").hide();
			$(".ctrip_ad_left").animate({
				left:0
			},300);
		},600);
		
	});

});


//banner运动
function settimer()
{
	var index=0;
	var timer=null;
	autoplay();
	$(".banner_bottom li").hover(function(){
		clearInterval(timer);
		index=$(this).index();
		$(this).css("background-color","#fff").siblings().css("background-color","#a8a8a8");
		$(".Shuffling_figure").stop().animate({left:-(index*1920)},400);
	},function(){autoplay()});
	
	$(".Shuffling_figure").hover(function(){
		clearInterval(timer);
	},function(){autoplay()});
	
	function autoplay()
	{
		timer=setInterval(function(){
			index++;
			if(index>5)
			{	
				setTimeout(function(){
					$(".Shuffling_figure").stop().css("left","0px");
					index=0;
					$(".banner_bottom").children().eq(0).css("background-color","#fff").siblings().css("background-color","#a8a8a8");
				},400);
			}
			$(".banner_bottom").children().eq(index).css("background-color","#fff").siblings().css("background-color","#a8a8a8");
			$(".Shuffling_figure").stop().animate({left:-(index*1920)},400);
		},3500)
	}
	
}
	
	

//鼠标移动到nav上纯js
function nav_tab()
{	var arr_nav=[];
	for(var i=1;i<16;i++)
	{	
		arr_nav[i]=document.getElementById("td"+i);
		arr_nav[i].index=i;
		arr_nav[i].onmouseover=function()
		{	
			var this_nav=document.getElementsByClassName("nav"+this.index)[0];
			var this_b=this.getElementsByTagName("b")[0];
			
			this.style.backgroundColor="#0a56bb";
			if(this_b)
			{
				this_b.style.backgroundPosition = "-40px -260px";
			}
			this_nav.style.display="block";
			this_nav.onmouseover=function()
			{
				this.style.display="block";
				this_b.style.backgroundPosition = "-40px -260px";
			}
			this_nav.onmouseout=function()
			{
				this.style.display="none";
				this_b.style.backgroundPosition = "-40px -264px";
			}
		}
		arr_nav[i].onmouseout=function()
		{	
			var this_b=this.getElementsByTagName("b")[0];
			this.style.backgroundColor="#2577e3";
			document.getElementsByClassName("nav"+this.index)[0].style.display="none";
			if(this_b)
			{
				this_b.style.backgroundPosition = "-40px -264px";
			}
		}
	}
}

