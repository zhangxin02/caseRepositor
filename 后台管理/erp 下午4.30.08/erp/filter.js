
$.ajax({
	url:"http://www.av8djs.xyz/php/getSession.php",
	type:"get",
	async:false,
	success:function(data){
		if(!data){
			location.href="http://www.av8djs.xyz/index.html";
		}
	}
});


function logout(){
	$.ajax({
		url:"http://www.av8djs.xyz/php/delSession.php",
		type:"get",
		async:false,
		success:function(){
			location.href = "http://www.av8djs.xyz/index.html";
		}
	});
}