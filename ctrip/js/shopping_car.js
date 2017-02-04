$(function(){
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

//////////////////////////////////////////////////

	sc_msg();
	sc_car();
	meney();

none();


});
//当购物车位空时
function none()
{
	if($(".car_lis").children().length==0)
	{
		$(".car_lis").html('<li style="display:block;"><img class="car_pic" src="img/shoping_car.jpg" /><p class="pic_conter">none~~</p><div class="meney">none~~</div></li>');
	}
}

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
				//alert(sc_str);
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