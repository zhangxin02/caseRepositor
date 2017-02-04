$(function(){
	//goods_lis获取数据
	$.get("json/goods.json",function(data,status){
		for(var i in data.goods_lis)
		{
			$(".pic1 img").eq(i).attr("src",data.goods_lis[i].src);
			$(".pic_title").eq(i).html(data.goods_lis[i].tit);
			$(".goods_price b").eq(i).html(data.goods_lis[i].num);
			$(".discount").eq(i).html(data.goods_lis[i].discount);
			$(".shade_top").eq(i).html(data.goods_lis[i].shade_top);
			$(".shade_moild").eq(i).html(data.goods_lis[i].shade_moild);
			$(".go_time").eq(i).html(data.goods_lis[i].go_time);
			$(".cost del font").eq(i).html(data.goods_lis[i].del);
			$(".goods_prices b").eq(i).html(data.goods_lis[i].num);
		}
	});
	
	//goods_lis划过事件
	$("#goods_lis li").hover(function(){
		$(this).find(".shade").css("display","block");
		//console.log($(this).find(".shade"));
	},function(){
		$(this).find(".shade").css("display","none");
	});
	
	//购物车
	
////////////////////////////////////////////////////////////	
	//购物车的出现与隐藏
	$(".car_button").click(function(){
		$(this).stop().animate({
			opacity:0,height:"300px",width:"300px",bottom:"25px",right:"75px"
		},400);
		
		$(this).find("img").stop().animate({
			height:"300px",width:"300px"
		},400);
		$(".car_num").hide(400);
		
		setTimeout(function(){
			$("#shopping_car").stop().animate({
			right:0
			},300);
		},350);
	});
	$(".shanchu").click(function(){
		$("#shopping_car").stop().animate({
			right:"-327px"
		},300);
		
		setTimeout(function(){
			$(".car_button").stop().animate({
				opacity:1,height:"100px",width:"100px",bottom:"100px",right:"200px"
			},400);
			
			$(".car_button").find("img").stop().animate({
				height:"100px",width:"100px"
			},400);
			$(".car_num").show(400);
		},250);
	});
	
	//页面刷新时获取购物车内容和数量
	sc_msg();
	sc_car();
	meney();
	//点击加入购物车
	//事件监听的效果，托管作用，在ajax没执行完的时候执行函数，就会捕捉不到，ajax什么时候执行完呢，不知道
	//所以要么就在ajax中执行函数，要么就用事件监听，托管给他的父级运行
	$("#goods_lis li").on("click",".shop_car",function(){
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
	//购物车里的数目
	function sc_car()
	{
		var sc_str=$.cookie("goods");
		if(sc_str)//如果不为空执行函数
		{
			var sc_obj=eval(sc_str);
			var sc_num=0;
			for(var i in sc_obj)
			{
				sc_num+=Number(sc_obj[i].num);
			}
			$(".car_num").html(sc_num);
		}
		
	}
	//创建你接点
	function sc_msg()
	{
		$.ajax({
			url:"json/goods.json",
			type:"GET",
			success:function(res)
			{
				var sc_str=$.cookie("goods");
				var sc_obj=eval(sc_str);
				//alert(sc_obj);
				if(sc_str)
				{
					if(sc_obj[0])
					{
						var sc_num=0;
						var html="";
						for(var i in sc_obj)
						{	//sc_obj[i].id
							//res.goods_lis[sc_obj[i].id].src
							html+="<li><img class='car_pic' src="+res.goods_lis[sc_obj[i].id].src+" /><p class='pic_conter'>"+res.goods_lis[sc_obj[i].id].tit+"</p><div class='meney'>￥"+res.goods_lis[sc_obj[i].id].num+"<span class='delete'>删除商品</span><font><input type='number' min='1' max='5' value='"+sc_obj[i].num+"' class='nums'></font></div></li>";
						}
						$(".car_lis").html(html);
					}else
					{
						none();
					}
				}else
				{
					none();
				}
				
				
				
				//删除购物车
				$(".delete").click(function(){
					var eq=$(this).parents("li").index();
					$(".car_lis li").eq(eq).hide(200);
					setTimeout(function(){
						$(".car_lis li").eq(eq).remove();	
					},200);
					
					//console.log()
					//删除被删除购物车的cookie
					var deletecookie = eval($.cookie("goods"));
					deletecookie.splice(eq,1);
					$.cookie("goods",JSON.stringify(deletecookie));
					sc_car();
					meney();
					setTimeout(function(){
						none();	
					},200);
					
				});
				
				//增加减少商品数量
				$(".nums").click(function(){
					console.log($(this).parents("li").index());
					var deletecookie=eval($.cookie("goods"));
					var nums=$(this).val();
					deletecookie[$(this).parents("li").index()].num=nums;
					$.cookie("goods",JSON.stringify(deletecookie));
					meney();
					sc_car();
				});
					
				
			}
			
		});
	}
	
	//合计多少元
	function meney()
	{
		var meney=eval($.cookie("goods"));
		var sums=0;
		$.ajax({
			url:"json/goods.json",
			type:"GET",
			success:function(res)
			{
				for(var i in meney)
				{
					var numbers =Number(meney[i].num);
					var price =Number(res.goods_lis[meney[i].id].num);
					sums+=numbers*price;
				}
				$(".add_num").html(sums);
			}
			
		});
	}
	
	
	//console.log($(".car_lis").children());
//////////////////////////////////////////////////
none();
function none()
{
	if($(".car_lis").children().length==0)
	{
		$(".car_lis").html('<li style="display:block;"><img class="car_pic" src="img/shoping_car.jpg" /><p class="pic_conter">none~~</p><div class="meney">none~~</div></li>');
	}
}
	
	
});

