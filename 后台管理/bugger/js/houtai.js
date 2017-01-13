var asideList = document.getElementsByClassName("borders");
var headnav = document.getElementsByClassName("headnav")[0];
var buglist = document.getElementsByClassName("buglist")[0];
var limit = "";//根据用户名查找数据库中权限

var updatebtn= document.getElementById("updatebtn");
var buginfo = document.getElementById("buginfo");
var id = document.getElementById("id")
var descp = document.getElementById("desc");
var createTime= document.getElementById("createTime");
var creater= document.getElementById("creater");
var testState= document.getElementById("testState");
var changeState= document.getElementById("changeState");
var update = document.getElementById("update");


(function(){//将cookie登陆账号名显示在左上角，考虑到安全性，权限需实时在数据库中查找该账号，根据该账号权限移除部分点击事件
    var zhanghu = document.getElementsByClassName("zhanghu");
    var str = document.cookie;
    zhanghu[0].innerHTML = str.split("=")[1];zhanghu[1].innerHTML = str.split("=")[1];
    $.ajax({
        "type": "get",
        "url": "../js/loginsql.php",
        callback: function (result) {
            var json = JSON.parse(result);
            limit = getLimit(zhanghu[0].innerHTML,json);//将权限保存到全局变量中
            asideList[1].addEventListener("click", function(){//用户管理
                buglist.innerHTML = "";
                update.style.display = "none";
                if(limit!="admin")
                {
                    alert("需admin权限");
                }
                else
                {
                    headnav.innerHTML = this.innerHTML;
                    createUserstable();createBug(json,judgeStata1,1);
                }
            })
            asideList[5].addEventListener("click", function(){//提交bug
                buglist.innerHTML = "";
                if(limit!="tester")
                {
                    alert("需tester权限");
                }
                else
                {
                    headnav.innerHTML = this.innerHTML;
                    update.style.display = "block";
                }
            })
        }
    });
})();
asideList[0].onclick = function() //登陆用户，功能保留
{
   alert("功能保留");
}

//以下可改for循环
asideList[2].addEventListener("click", function () { //bug列表  
    headnav.innerHTML = this.innerHTML;
    update.style.display = "none";
    buglist.innerHTML = " ";//清空内容区
    getBugsql(createTable,createBug,1)
});
asideList[3].addEventListener("click", function () { //待解决bug 
    headnav.innerHTML = this.innerHTML;
    buglist.innerHTML = " ";
    update.style.display = "none";
    getBugsql(createTable,createBug,2)
});
asideList[4].addEventListener("click", function () { //已解决bug
    headnav.innerHTML = this.innerHTML;
    buglist.innerHTML = " ";
    update.style.display = "none";
    getBugsql(createTable,createBug,3)
});

asideList[6].addEventListener("click", function (){ //其他，功能保留
    headnav.innerHTML = this.innerHTML;
    buglist.innerHTML = "";
    update.style.display = "none";
    var img = headnav.getElementsByTagName("img")[0];//调整。。。图片的显示
    img.style.width = 30+"px";
    img.style.height = 10+"px";
    alert("功能保留");
});

function getBugsql(fn1,fn2,n)//获取bugs数据库表
{
    $.ajax({
        "type": "get",
        "url": "../js/bugs.php",
        callback: function (result) {
             var json = JSON.parse(result);
             fn1(json);
             if(n==1)
             {
                fn2(json,judgeStata1);
             }
             else if(n==2)
             {
                fn2(json,judgeStata2);
             }
             else if(n==3)
             {
                fn2(json,judgeStata3);
             }
            
         }
    });
}

function getLimit(userid,arr)//获取用户权限
{
    for(var i=0 ; i<arr.length ; i++)
    {
        if(userid == arr[i][0])
        {
            return arr[i][2];
        }
    }
}
function createUserstable()//用户管理的table
{
    var buglist = document.getElementsByClassName("buglist")[0];
    var table = document.createElement("table");
    buglist.appendChild(table);
    var th = document.createElement("thead");
    table.appendChild(th);
    var tr1 = document.createElement("td");
    tr1.innerHTML = "username";
    var tr2 = document.createElement("td");
    tr2.innerHTML = "password";
    var tr3 = document.createElement("td");
    tr3.innerHTML = "limit";
    th.appendChild(tr1);
    th.appendChild(tr2);
    th.appendChild(tr3);
}
function createBug(json,fn,judgebtn)//将全部bug或user列表创建出来
{
    var table = document.getElementsByTagName("table")[0];        
            for(var i=0;i<json.length;i++) 
            {
                var tr=document.createElement("tr");
                var arr=json[i];
                 for(var j=0;j<arr.length;j++)
                 {
                    var lilist=document.createElement("td") 
                    tr.appendChild(lilist);
                    lilist.innerHTML=arr[j];     
                }  
                if(limit == "admin"&&judgebtn!=1)
                {
                    var caozuo = document.createElement("td");
                    caozuo.innerHTML = "<span class='del'>删除</span>";
                    tr.appendChild(caozuo);
                }              
                fn(arr,tr);                          
            }
            if(limit == "admin")
            {
                var del = document.getElementsByClassName("del");
                for(var i in del)
                {
                    del[i].onclick = function()
                    {
                        var table = document.getElementsByTagName("table")[0];
                        var thistr = this.parentNode.parentNode;
                        delBug(thistr.childNodes[1]);
                        table.removeChild(thistr);
                    }
                }
            }           
}
function judgeStata3(arr,tr)//显示已解决
{
    var table = document.getElementsByTagName("table")[0]; 
    if(arr[6]=="1"&&arr[5]=="1")
    {
        table.appendChild(tr);
    }
}
function judgeStata2(arr,tr)//显示待解决bug
{
    var table = document.getElementsByTagName("table")[0]; 
    if(arr[6]=="0"||arr[5]=="0")
    {
        table.appendChild(tr);
    }
    if(arr[6]=="0"&&arr[5]=="0")
    {
        tr.style.backgroundColor = "#f43e3e";
    }
    else if(arr[6]=="1"&&arr[5]=="0")
    {
        tr.style.backgroundColor = "#81c93c";
    }
}
function judgeStata1(arr,tr)//显示全部bug，根据状态改变显示颜色
{
    var table = document.getElementsByTagName("table")[0]; 
    table.appendChild(tr);
    if(arr[6]=="0"&&arr[5]=="0")
    {
        tr.style.backgroundColor = "#f43e3e";
    }
    else if(arr[6]=="1"&&arr[5]=="0")
    {
        tr.style.backgroundColor = "#81c93c";
    }
        else
    {
        tr.style.backgroundColor = "#fff";
    }
}
function createTable()//创建table，并生成thead内容
{
    var buglist = document.getElementsByClassName("buglist")[0];
    var table = document.createElement("table");
    buglist.appendChild(table);
    var th = document.createElement("thead");
    table.appendChild(th);
    var tr1 = document.createElement("td");
    tr1.innerHTML = "buginfo";
    var tr2 = document.createElement("td");
    tr2.innerHTML = "id";
    var tr3 = document.createElement("td");
    tr3.innerHTML = "desc";
    var tr4 = document.createElement("td");
    tr4.innerHTML = "updateTime";
    var tr5 = document.createElement("td");
    tr5.innerHTML = "creater";
    var tr6 = document.createElement("td");
    tr6.innerHTML = "testState";
    var tr7 = document.createElement("td");
    tr7.innerHTML = "changeState";
    th.appendChild(tr1);
    th.appendChild(tr2);
    th.appendChild(tr3);
    th.appendChild(tr4);
    th.appendChild(tr5);
    th.appendChild(tr6);
    th.appendChild(tr7);
    if(limit == "admin")
    {
        var tr8 = document.createElement("td");
        tr8.innerHTML = "caozuo";
        th.appendChild(tr8);
    }                       
}


//提交bug 
    var $ = {
        ajax: function (json) {
            var req = new XMLHttpRequest();
            req.open(json.type, json.url, true);
            req.send();
            req.onreadystatechange = function () {
                if (req.readyState == 4 && req.status == 200) {
                    var text = req.responseText;
                    json.callback(text);
                }
            }

        }
    }

    updatebtn.onclick = function(){ 
      $.ajax({
        type:"get",
        url:"../js/bugsAdd.php?buginfo="+buginfo.value+"&id="+id.value+"&descp="+descp.value+"&createTime="+createTime.value+"&creater="+creater.value+"&testState="+testState.value+"&changeState="+changeState.value,
        callback: function (result) {
            var json = JSON.parse(result);
            if(json ==1)
            {
                alert("success");
                var inputlist = document.getElementsByTagName("input");
                for(var i in inputlist)
                {
                    inputlist[i].value = "";
                }
            }
            else
            {
                alert("上传有误");
            }
        }
    });
  }

//删除bug
function delBug(bugid)
{
    $.ajax({
        type:"get",
        url:"../js/bugsDel.php?&id="+ bugid.innerHTML,
        callback: function (result) {
            var json = JSON.parse(result);
            if(json ==1)
            {
                alert("删除成功");
            }
            else
            {
                alert("删除失败");
            }
        }
    });
}























