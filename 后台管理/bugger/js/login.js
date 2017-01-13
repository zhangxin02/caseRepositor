var user = document.getElementById("user");
var pwd = document.getElementById("pwd");
var btn = document.getElementById("btn");

btn.onclick = function(){
      $.ajax({
        "type": "get",
        "url": "js/loginsql.php",
        callback: function (result) {
            var json = JSON.parse(result);
            if(testUser(user.value,json))
            {
                if(testPwd(pwd.value,json))
                {
                    alert("success login");
                    setCookie("username",user.value,7)
                    location.href="html/houtai.html";
                }
                else
                {
                    alert("wrong password");
                }
            }
            else
            {
                alert("wrong user");
            }
        }
    });
}

function testUser(username,arr)
{
    for(var i=0 ; i<arr.length ; i++)
    {
        var userid = arr[i][0];
        if(userid == username)
        {
            return 1;
        }
    }
    return 0;
}
function testPwd(password,arr)
{
    for(var i=0 ; i<arr.length ; i++)
    {
        var pwd = arr[i][1];
        if(pwd == password)
        {
            return 1;
        }
    }
    return 0;
}
function setCookie(key,value,days,isGlobal)
{
    var date = new Date();
    date.setDate(date.getDate()+days);
    if (isGlobal)
    {
        document.cookie =key+"="+value+";expires="+date+";path=/";
    }
    else
    {
         document.cookie =key+"="+value+";expires="+date;
    }

}
