var burritoOrder;

var Burrito = function() {
	this.burritoType = "";
	this.riceType = "";
	this.beanType = "";
	this.salsaType = [];
	this.guacamole = false;
	this.price = 0;
	
	this.toString = function() {
		var burritoString = "";
		
		burritoString += this.burritoType + ", ";
		burritoString += this.riceType + ", ";
		burritoString += this.beanType + ", ";
		for (var i = 0; i < this.salsaType.length; i++) {
			burritoString += this.salsaType[i] + ", ";
		}
		if (this.guacamole) {
			burritoString += this.guacamole;
		}
		return burritoString;
	}
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
	var guacamole = document.getElementById("guacamole");
	
	
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
		burrito.guacamole = guacamole.value;
		var guacPrice = guacamole.getAttribute("price");		
		burrito.price += parseFloat(guacPrice);
	}
	
	return burrito;
}

function updateReceipt() {
	var table = generateTable();	
	displayTable(table);
}

function generateTable() {
	var table = document.createElement("table");
	table.id = "receipt";
	for (var i = 0; i < burritoOrder.length; i++) {
		var row = generateRow(i);
		table.appendChild(row);
	}
	var orderTotal = generateTotalRow();
	table.appendChild(orderTotal);
	return table;
}
	
function generateRow(burritoIndex) {	
	var burrito = burritoOrder[burritoIndex];	
	var row = document.createElement("tr");	
	
	var tableDataBurritoDescription = generateDescriptionCell(burrito);
	var tableDataBurritoPrice = generatePriceCell(burrito.price);
	var tableDataRemoveButton = generateRemoveButtonCell(burritoIndex);	
	
	row.appendChild(tableDataBurritoDescription);
	row.appendChild(tableDataBurritoPrice);	
	row.appendChild(tableDataRemoveButton);	
	
	return row;
}

function generateDescriptionCell(burrito) {
	var tableData = document.createElement("td");
	var burritoText = document.createTextNode(burrito.toString());
	tableData.appendChild(burritoText);
	
	return tableData;
}

function generatePriceCell(price) {
	var tableDataBurritoPrice = document.createElement("td");
	var burritoPriceText = document.createTextNode(price.toFixed(2));
	tableDataBurritoPrice.appendChild(burritoPriceText);
	
	return tableDataBurritoPrice;
}
	
function generateRemoveButtonCell(burritoIndex) {
	var tableDataRemoveButton = document.createElement("td");
	var removeButtonText = document.createTextNode("Remove");
	var removeButton = document.createElement("button");
	
	removeButton.setAttribute("burritoIndex", burritoIndex);
	removeButton.onclick = removeBurrito;
		
	removeButton.appendChild(removeButtonText);
	tableDataRemoveButton.appendChild(removeButton);
		
	return tableDataRemoveButton;
}


function displayTable(table) {
	var oldReceipt = document.getElementById("receipt");
	
	if (oldReceipt) {
		oldReceipt.parentElement.removeChild(oldReceipt);
	}
	
	document.body.appendChild(table);
}

function generateTotalRow() {
	var total = 0;
	
	for (var i = 0; i < burritoOrder.length; i++) {
		total += burritoOrder[i].price;
	}
	
	var row = document.createElement("tr");
	var tableData = document.createElement("td");
	var tableDataLabel = document.createElement("td");
	var totalText = document.createTextNode(total.toFixed(2));
	var totalLabelText = document.createTextNode("Total:");
	
	tableData.appendChild(totalText);
	tableDataLabel.appendChild(totalLabelText);
	row.appendChild(tableDataLabel);
	row.appendChild(tableData);	
		
	return row;
}

function removeBurrito() {
	var burritoIndex = parseInt(this.getAttribute("burritoIndex"));
	
	burritoOrder.splice(burritoIndex, 1);
	updateReceipt();	
}