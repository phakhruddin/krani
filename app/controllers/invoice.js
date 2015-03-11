exports.openMainWindow = function(_tab) {
  _tab.open($.invoice_window);
  Ti.API.info("This is child widow invoice.js" +JSON.stringify(_tab));
  	//$.invoice_table.search = $.search_history;
	//Alloy.Collections.invoice.fetch();	

};

$.invoicelist_row.addEventListener("click", function(e){
		Alloy.Globals.openDetail(e);
		var title = e.row.title;
		var clientController = Alloy.createController('invoicelistlist');
		clientController.openMainWindow($.tab_invoice);
});

$.invoiceenter_row.addEventListener("click", function(e){
		Alloy.Globals.openDetail(e);
		var title = e.row.title;
		var clientController = Alloy.createController('enterinvoice');
		clientController.openMainWindow($.tab_invoice);
});

$.invoicesend_row.addEventListener("click", function(e){
		Alloy.Globals.openDetail(e);
		var title = e.row.title;
		var clientController = Alloy.createController('invoicesend');
		clientController.openMainWindow($.tab_invoice);
});

/*
function transformFunction(model) {
	var transform = model.toJSON();
	console.log("transform is ::" +JSON.stringify(transform));
	transform.title = transform.col1+":"+transform.col2+":"+transform.col3+":"+transform.col4+":"+transform.col5+":"+transform.col6+":"+transform.col7+":"+transform.col8+":"+transform.col9+":"+transform.col10+":"+transform.col11+":"+transform.col12+":"+transform.col13+":"+transform.col14+":"+transform.col15+":"+transform.col16;
	transform.custom = "Invoice#: "+transform.col1+" - "+transform.col2;
	return transform;
}*/
