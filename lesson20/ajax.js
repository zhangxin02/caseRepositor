var $  = {
    ajax:function(json){
        var req = new XMLHttpRequest();
        req.open(json.type, json.url, true);
        req.send();
        req.onreadystatechange = function () {  //监听状态的改变
            if (req.readyState == 4 && req.status == 200) {
                result =req.responseText;
                json.showData(result);
            }
        }
    }
}
