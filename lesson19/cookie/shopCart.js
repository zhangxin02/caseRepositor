//新增商品
//"a001_goodsId=a001; a001_goodsName=1; a001_goodsPic=1; a001_goodsNum=32; a001_goodsPrice=1"
function createDom(parent, value) {
	var tr = document.createElement("tr");
	tr.setAttribute("data-id", value); //给每一个span一个记录商品ID的自定义属性
	parent.appendChild(tr);
	var td1 = document.createElement("td");
	td1.className = "checkbox";
	tr.appendChild(td1);
	var ipt = document.createElement("input");
	ipt.className = "check-one check";
	ipt.type = "checkbox";
	td1.appendChild(ipt);
	//<td class="goods"><img src="images/1.jpg" alt="" /><span>Casio/卡西欧 EX-TR350</span></td>
	var td2 = document.createElement("td");
	td2.className = "goods";
	tr.appendChild(td2);
	var img = new Image();
	img.src = "images/" + getCookie(value + "_goodsPic");
	img.alt = "";
	td2.appendChild(img);
	var span = document.createElement("span");
	span.innerHTML = getCookie(value + "_goodsName");
	td2.appendChild(span);
	//<td class="price">5999.88</td>
	var td3 = document.createElement("td");
	td3.className = "price";
	td3.innerHTML = getCookie(value + "_goodsPrice");
	tr.appendChild(td3);
	//<td class="count"><span class="reduce"></span>
	//				<input class="count-input" type="text" value="1" />
	//							<span class="add">+</span></td>
	var td = document.createElement("td");
	td.className = "count";
	var span = document.createElement("span");
	span.className = "reduce"
	span.innerHTML = "-";
	span.setAttribute("data-id", value); //给每一个span一个记录商品ID的自定义属性
	td.appendChild(span);
	var ipt = document.createElement("input");
	ipt.className = "count-input";
	ipt.type = "text";
	ipt.value = getCookie(value + "_goodsNum");
	td.appendChild(ipt);
	var span = document.createElement("span");
	span.className = "add";
	span.innerHTML = "+";
	span.setAttribute("data-id", value);; //给每一个span一个记录商品ID的自定义属性
	td.appendChild(span);
	tr.appendChild(td);
	//<td class="subtotal">5999.88</td>
	var td = document.createElement("td");
	td.className = "subtotal";
	td.innerHTML = ((getCookie(value + "_goodsPrice") * 1) * (getCookie(value + "_goodsNum") * 1)).toFixed(2);
	tr.appendChild(td);
	//<td class="operation"><span class="delete">删除</span></td>
	var td = document.createElement("td");
	td.className = "operation";
	tr.appendChild(td);
	var span = document.createElement("span");
	span.className = "delete";
	span.innerHTML = "删除";
	span.setAttribute("data-id", value); //给每一个span一个记录商品ID的自定义属性
	td.appendChild(span);
}

window.onload = function() {
	var checklist = document.getElementsByClassName("check-one"); //获取所有checkbox
	var checkAll = document.getElementsByClassName("check-all")[0]; //获取全选框
	var selectedTotal = document.getElementById("selectedTotal"); //获取已选商品个数
	var priceTotal = document.getElementById("priceTotal"); //获取总金额
	var tbody = document.getElementById("cartTable").children[1]; //得到tbody
	var tr = tbody.getElementsByTagName("tr");
	var deleteAll = document.getElementById("deleteAll"); //全部删除

	var btnDelete = document.getElementsByClassName("delete"); //删除
	var btnAdd = document.getElementsByClassName("add"); //+
	var btnReduce = document.getElementsByClassName("reduce"); //-
	var selected = document.getElementById('selected'); //已选商品
	var foot = document.getElementById('foot');
	var selectedViewList = document.getElementById("selectedViewList"); //得到最下边的图片展示
	ckOne();

	//全选
	checkAll.onclick = function() {
			for(var i = 0; i < checklist.length; i++) {
				checklist[i].checked = this.checked;
			}
			getMoney();
		}
		//为每一个单选按按钮绑定一个事件
	function ckOne() {
		for(var i = 0; i < checklist.length; i++) {
			checklist[i].onclick = function() {
				isCkAll();
				getMoney();
			}
		}
	}
	//判断所有的check是否被选中,全部选中则变全选框状态
	function isCkAll() {
		var ckcount = 0;
		for(var i = 0; i < checklist.length; i++) {
			if(checklist[i].checked) {
				ckcount++;
			}
		}
		if(ckcount == checklist.length) {
			checkAll.checked = true;
		} else {
			checkAll.checked = false;
		}
	}
	add();
	reduce();
	del();

	function add() {
		for(var i = 0; i < btnAdd.length; i++) {
			btnAdd[i].onclick = function() {
				var countInput = previous(this); //找到记录数量的input
				countInput.value = countInput.value * 1 + 1; //累加数量
				var reduce = previous(countInput); //找到减号
				reduce.innerHTML = "-";
				var currentParent = this.parentNode; //找到父节点
				var tdPrice = previous(currentParent).innerHTML * 1; //找到单价
				var tdSubtotal = next(currentParent); //找到小计
				tdSubtotal.innerHTML = (tdPrice * countInput.value).toFixed(2); //总计

				var cookId = this.getAttribute("data-id"); //得到保存的cookid中的商品ID
				//保存的时候只存入了a001(a001_goodsNum),因此需要将后缀给加上
				setCookie(cookId + "_goodsNum", countInput.value, 3);
				getMoney();
			}
		}
	}

	function reduce() {
		for(var i = 0; i < btnReduce.length; i++) {
			btnReduce[i].onclick = function() {
				var countInput = next(this); //找到记录数量的input				
				if(countInput.value <= 1) {
					this.innerHTML = "";
				} else {
					countInput.value = countInput.value * 1 - 1;
					var currentParent = this.parentNode; //找到父节点
					var tdPrice = previous(currentParent).innerHTML * 1; //找到单价
					var tdSubtotal = next(currentParent); //找到小计
					tdSubtotal.innerHTML = (tdPrice * countInput.value).toFixed(2); //总计
					var cookId = this.getAttribute("data-id");
					setCookie(cookId + "_goodsNum", countInput.value, 3);
				}
				getMoney();
			}
		}
	}

	function del() {
		for(var i = 0; i < btnDelete.length; i++) {
			btnDelete[i].onclick = function() {
				if(confirm('确定删除此商品吗？')) {
					var tr = this.parentNode.parentNode;
					tbody.removeChild(tr);
					var cookId = this.getAttribute("data-id"); //得到保存的cookid中的商品ID
					setCookie(cookId + "_goodsId", '', -1);
					setCookie(cookId + "_goodsName", '', -1);
					setCookie(cookId + "_goodsPic", '', -1);
					setCookie(cookId + "_goodsNum", '', -1);
					setCookie(cookId + "_goodsPrice", '', -1);
					getMoney();
				}
			}
		}
	}
	//清空
	deleteAll.onclick = function() {
		if(confirm('确定清空列表吗？')) {
			delAll();
		}
	}

	function delAll() {
		for(var i = 0; i < tr.length; i++) {
			var cookId = tr[i].getAttribute("data-id"); //得到保存的cookid中的商品ID
			setCookie(cookId + "_goodsId", '', -1);
			setCookie(cookId + "_goodsName", '', -1);
			setCookie(cookId + "_goodsPic", '', -1);
			setCookie(cookId + "_goodsNum", '', -1);
			setCookie(cookId + "_goodsPrice", '', -1);
			tbody.removeChild(tr[i]); //清空所有行
			i--;
		}
		priceTotal.innerHTML = "0.00";
		selectedTotal.innerHTML = "0";
	}

	//根据状态来显示总金额	
	function getMoney() {
		var price = 0;
		var count = 0;
		for(var i = 0; i < tr.length; i++) {
			var ck = tr[i].getElementsByTagName("input")[0]; //找到每一行的checkbox
			var subtotal = tr[i].getElementsByClassName("subtotal")[0].innerHTML * 1; //得到每一行的总计
			var countInput = tr[i].getElementsByTagName("input")[1].value * 1; //得到数量			
			if(ck.checked) {
				price += subtotal;
				count += countInput;
			}
		}
		selectedTotal.innerHTML = count;
		priceTotal.innerHTML = price.toFixed(2);
	}

	// 显示已选商品弹层
	selected.onclick = function() {
		selectedViewList.innerHTML = "";
		if(selectedTotal.innerHTML != 0) {
			foot.className = (foot.className == 'foot' ? 'foot show' : 'foot');
		}
		//将图片加入最底部的div作图片列表显示
		for(var i = 0; i < tr.length; i++) {
			var ck = tr[i].getElementsByTagName("input")[0]; //找到每一行的checkbox
			if(ck.checked) {
				var imgSrc = tr[i].getElementsByTagName("img")[0].src; //得到图片路径
				selectedViewList.innerHTML += "<div><img src='" + imgSrc + "'><span>取消选择</span></div>";
			}

		}
	}

	//查找指定元素的上一个兄弟节点
	function previous(ele) {
		if(ele.previousElementSibling) {
			return ele.previousElementSibling;
		} else {
			return ele.previousSibling;
		}
	}
	//查找指定元素的下一个兄弟节点
	function next(ele) {
		if(ele.nextElementSibling) {
			return ele.nextElementSibling;
		} else {
			return ele.nextSibling;
		}
	}
}