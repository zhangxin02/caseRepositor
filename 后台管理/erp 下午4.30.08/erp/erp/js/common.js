var $={
			ajax:function(json){
				var req=new XMLHttpRequest();
				req.open(json.type,json.url,true);
				req.send();
				req.onreadystatechange=function(){
					if(req.readyState==4&&req.status==200){
						var result=req.responseText;
						json.callback(result);
					}
				}
			}
		}