exports.openMainWindow = function(_tab) {
  _tab.open($.invoicelist_window);
  Ti.API.info("This is child widow invoice.js" +JSON.stringify(_tab));
  //	$.invoicelist_table.search = $.search_history;
	Alloy.Collections.invoice.fetch();	

};
$.ptr.refresh();


function transformFunction(model) {
	var transform = model.toJSON();
	///Alloy.Globals.Log("transform is ::" +JSON.stringify(transform));
	transform.title = transform.col1+":"+transform.col2+":"+transform.col3+":"+transform.col4+":"+transform.col5+":"+transform.col6+":"+transform.col7+":"+transform.col8+":"+transform.col9+":"
		+transform.col10+":"+transform.col11+":"+transform.col12+":"+transform.col13+":"+transform.col14+":"+transform.col15+":"+transform.col16;
	transform.custom = transform.col2+" "+transform.col3;
	transform.invoicenumber = "Invoice#: "+transform.col1;
	transform.total ='TOTAL: '+transform.col4;
	transform.bal ='BALANCE: '+transform.col5;
	transform.paid ='PAID: '+transform.col6;
	transform.status ='Status: '+transform.col13;
	transform.lastpaiddate = 'Last Paid on: '+transform.col11;
	if (transform.col13 == "paid"){
		transform.img ="paid.gif";
	} else {
		transform.img ="owedoverduewhite.gif";
	}
	return transform;
}

function doClick(e) {
	Alloy.Globals.Log("JSON.stringify e : " +JSON.stringify(e));	
	//Alloy.Globals.openDetail(e);
		var title = e.source.input;
		Alloy.Globals.Log("title is: "+title);
		var clientController = Alloy.createController('invoicedetail',{
			title: title
		});
		clientController.openMainWindow($.tab_invoicelist);
	//alert("click this");
};

function buttonAction(e){
	Alloy.Globals.Log("JSON stringify e : " +JSON.stringify(e));
	Alloy.Globals.Log("JSON stringify e.source : " +JSON.stringify(e.source));
	var thesort = e.source.title;
	
	if (thesort == "All") { 
		Alloy.Collections.invoice.fetch();
		};
	if (thesort == "Paid") { 
		var sql = "SELECT * FROM " + Alloy.Collections.invoice.config.adapter.collection_name +" WHERE col13=\"paid\";";
        Alloy.Globals.Log("sql string:" +sql);
	    Alloy.Collections.invoice.fetch({query:sql});
		};
	if (thesort == "Owed") { 
		var sql = "SELECT * FROM " + Alloy.Collections.invoice.config.adapter.collection_name +" WHERE col13=\"owed\";";
        Alloy.Globals.Log("sql string:" +sql);
	    Alloy.Collections.invoice.fetch({query:sql});
		};
	if (thesort == "None") { var sorttype = "\*"; };
}

function addHandler(e){
	Alloy.Globals.Log("addHandler e "+JSON.stringify(e));
	    //reset the item counter
	    Titanium.App.Properties.setInt('count',0);
		var clientController = Alloy.createController('enterinvoice');
		clientController.openMainWindow($.tab_invoicelist);
}

function searchHandler(e){
	Alloy.Globals.Log("searchHandler e "+JSON.stringify(e));
}

function mailAction(e) {
	Alloy.Globals.Log("JSON stringify e : " +JSON.stringify(e));
			var clientController = Alloy.createController('invoicesend');
		clientController.openMainWindow($.tab_invoicelist);
}

function selectItem(e) {
	Alloy.Globals.Log("invoicelistlist.js::info after select item : "+JSON.stringify(e));
}

function myRefresher(e) {
	Alloy.Globals.Log("refreshing after pull : " +JSON.stringify(e));
    Alloy.Collections.invoice.fetch({
        success: e.hide,
        error: e.hide
    });
}
   
