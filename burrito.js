var burritoOrder;
var Burrito = function() {
	this.burritoType = "";
	this.riceType = "";
	this.beanType = "";
	this.salsaType = [];
	this.guac = false;
	this.price = 0;
}

function init(){	
	burritoOrder = [];
	document.getElementById("addBurrito").onclick = addBurrito;
}

function addBurrito() {
	var burrito = buildBurrito();
	burritoOrder.push(burrito);
	updateReceipt();
}
	
function buildBurrito() {
	var burrito = new Burrito();	
	var burritoSelect = document.getElementById("burritoType");
	var whiteRice = document.getElementById("whiteRice");
	var brownRice = document.getElementById("brownRice");
	var pintoBean = document.getElementById("pintoBean");
	var blackBean = document.getElementById("blackBean");
	var guacamole = document.getElementById("guac");
	
	
	burrito.burritoType = burritoSelect.value;
	
	var burritoOptions = burritoSelect.childNodes;
	
	for (var i = 0; i < burritoOptions.length; i++) {
		var currentBurritoOption = burritoOptions[i];
		
		if (currentBurritoOption.value == burritoSelect.value) {
			burrito.price = currentBurritoOption.getAttribute("price");
			burrito.price = parseFloat(burrito.price);
		}
	}
	
	if (whiteRice.checked) {
		burrito.riceType = whiteRice.value;	
	} else if (brownRice.checked) {
		burrito.riceType = brownRice.value;
	}
	
	if (pintoBean.checked) {
		burrito.beanType = pintoBean.value;	
	} else if (blackBean.checked) {
		burrito.beanType = blackBean.value;
	}
	
	for (var i = 1; i < 5; i++) {
		var salsa = document.getElementById("salsa" + i);
		if (salsa.checked) {
			burrito.salsaType.push(salsa.value);		
		}
	}
	
	if (guacamole.checked) {
		burrito.guac = guacamole.value;
		var guacPrice = guacamole.getAttribute("price");		
		burrito.price += parseFloat(guacPrice);
	}
	
	return burrito;
}

function updateReceipt() {
	var table = generateTable();	
	//displayTable(table);	
	
}

function generateTable() {
	
	var table = document.createElement("table");
	
	for (var i = 0; i < burritoOrder.length; i++) {
		var row = generateRow(burritoOrder[i]);
		table.appendChild(row);
	}
	//var orderTotal = generateTotalRow();
	//table.appendChild(orderTotal);
	return table;
}
	
function generateRow(burrito) {
	
	var row = document.createElement("tr");
	var tableData = document.createElement("td");
	var burrito = document.createTextNode("Burrito stub");
	tableData.appendChild(test);
	row.appendChild(tableData);
	return row;
}
	document.getElementById("deleteBurrito").onclick = deleteBurrito;
