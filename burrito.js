var burritoOrder;
var Burrito = function() {
	this.burritoType = "";
	this.riceType = "";
	this.beanType = "";
	this.salsaType = [];
	this.guac = false;
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

	var whiteRice = document.getElementById("whiteRice");
	var brownRice = document.getElementById("brownRice");
	var pintoBean = document.getElementById("pintoBean");
	var blackBean = document.getElementById("blackBean");
	var guacamole = document.getElementById("guac");
	
	burrito.burritoType = document.getElementById("burritoType").value;
	
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
	}
	return burrito;
}

function updateReceipt() {

}