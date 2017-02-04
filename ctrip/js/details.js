$(function(){
	
	
	//ajax获取数据
	$.ajax({
		url:"json/goods.json",
		type:"GET",
		success:function(res){
			for(var i in res.goods_lis)
			{
				$(".min img").eq(i).attr({"src":res.goods_lis[i].src});
				$(".middle").attr({"src":res.goods_lis[0].src});
				$(".pic_dd").html(res.goods_lis[0].tit);
				$(".det_p").html(res.goods_lis[0].tit);
				$(".mass_td0 font").html(res.goods_lis[0].num);
				$(".mass_td3 span").html(res.goods_lis[0].discount);
				$(".mass_td3 font").html(res.goods_lis[0].del);
				$(".mass_td5 font").html(res.goods_lis[0].grade);
				$(".mass_td6 font").html(res.goods_lis[0].remark);
				$(".mass_td7 font").html(res.goods_lis[0].prople);
			}
			//切换要被放大的图片
			$(".min li").click(function(){
				//console.log($(this).index());
				$(".min li").eq($(this).index()).css("border","1px solid red").siblings().css("border","1px solid #fff");
				$(".middle").attr({"src":res.goods_lis[$(this).index()].src});
				$(".big_bg").attr({"src":res.goods_lis[$(this).index()].src});
				$(".pic_dd").html(res.goods_lis[$(this).index()].tit);
				$(".det_p").html(res.goods_lis[$(this).index()].tit);
				$(".mass_td0 font").html(res.goods_lis[$(this).index()].num);
				$(".mass_td3 span").html(res.goods_lis[$(this).index()].discount);
				$(".mass_td3 font").html(res.goods_lis[$(this).index()].del);
				$(".mass_td5 font").html(res.goods_lis[$(this).index()].grade);
				$(".mass_td6 font").html(res.goods_lis[$(this).index()].remark);
				$(".mass_td7 font").html(res.goods_lis[$(this).index()].prople);
				//动态更换id名
				$(".click_right").attr({"id":$(this).index()});
				
			});
			
		}
	});
	
	
	//商品详情放大镜
	//显示和隐藏右边放大图
	
	
	$(".pic_img").hover(function(){
		$(".big_pic").show();
		$(".small").show();
	},function(){
		$(".big_pic").hide();
		$(".small").hide();
	});
	//开始移动
	$(".pic_img").mousemove(function(e){
		var scale=400/280;
		var top=e.pageY-$(".pic_img").offset().top-$(".small").height()/2;
		var left=e.pageX-$(".pic_img").offset().left-$(".small").width()/2;
		
		if(left<0)
		{
			left=0;
		}
		if(top<0)
		{
			top=0;
		}
		if((left+$(".small").width())>=$(".pic_img").width())
		{
			left=$(".pic_img").width()-$(".small").width();
		}
		if((top+$(".small").height())>=$(".pic_img").height())
		{
			top=$(".pic_img").height()-$(".small").height();
		}
		
		$(".small").css({"top":top+"px","left":left+"px"});
		//$(".small").css("left",left+"px");
		$(".big_bg").css({"left":-left*scale+"px","top":-top*scale+"px"});
		
	});


/*********购物车**********/
	//点击加入购物车
	//事件监听的效果，托管作用，在ajax没执行完的时候执行函数，就会捕捉不到，ajax什么时候执行完呢，不知道
	//所以要么就在ajax中执行函数，要么就用事件监听，托管给他的父级运行
	$(".click_right").click(function(){
		//购物车数量增加；
		var id=this.id;
		var first=$.cookie("goods")==null?true:false;//判断是否有cookie进行添加
		var same=false;   //赋值判断
		//是否是第一次
		if(first)
		{
			//如果是第一次添加就建立json结构
			$.cookie("goods","[{id:"+id+",num:1}]");
			$.cookie("first","false");
		}else
		{
			var str=$.cookie("goods");
			var arr=eval(str);
			//遍历所有对象。如果id相同，那就让该对象的num递增
			for(var i in arr)
			{
				if(arr[i].id==id)
				{	
					if(Number(arr[i].num)<=4)
					{
						var nums=Number(arr[i].num);
						nums+=1;//让json中的num自增
						arr[i].num=nums;
						var cookieStr=JSON.stringify(arr);//将json对象转换为json字符串
						$.cookie("goods",cookieStr);//保存到cookie
						same=true;
					}
					else
					{
						arr[i].num=5;
						var cookieStr=JSON.stringify(arr);//将json对象转换为json字符串
						$.cookie("goods",cookieStr);//保存到cookie
						same=true;
					}
				}
			}
			//如果id值不相等，则要重新创建商品对象；
			if(!same)
			{
				var obj={id:id,num:1};
				arr.push(obj);
				var cookieStr=JSON.stringify(arr);
				$.cookie("goods",cookieStr);
			}
		}
		//然后刷新已加入到购物车的数量
		sc_car();
		//还有增加购物车里的数量
		sc_msg();
		//总钱数
		meney();
	});
	
	
	
	
});

	

	
	
