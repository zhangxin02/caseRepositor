//保存修改删除cookie
//删除时将expires 设置为负数
function setCookie(key, value, expires) {
	var ddate = new Date();
	ddate.setDate(ddate.getDate() + expires);
	document.cookie = key + '=' + encodeURI(value) + ';expires=' + ddate;
}

//读取cookie
function getCookie(name) {
	var arrstr = document.cookie.split(';');
	for(var i = 0; i < arrstr.length; i++) {
		var arr = arrstr[i].split('=');
		if(arr[0].trim() == name) {
			return decodeURI(arr[1]);
		}
	}
	return "";
}