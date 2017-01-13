
$.ajax({
	url:"http://www.av8djs.xyz/php/getSession.php",
	type:"get",
	async:false,
	success:function(data){
		if(data!=""){
			location.href="erp/index.html";
		}
	}
});


