var args = arguments[0] || {};
exports.openMainWindow = function(_tab) {
  _tab.open($.projectlist_window);
  Ti.API.info("This is child widow projectlist.js" +JSON.stringify(_tab));
  	$.projectlist_table.search = $.search_history;
	Alloy.Collections.project.fetch();	

};

$.ptr.refresh();

function transformFunction(model) {
	var transform = model.toJSON();
	console.log("project.js::transform col1 data:: "+JSON.stringify(transform.col1)+" col16:"+JSON.stringify(transform.col16));
	transform.title = transform.col1.trim()+":"+transform.col2.trim()+":"+transform.col3.trim()+":"+transform.col4.trim()+":"+transform.col5.trim()+":"+transform.col6+":"+transform.col7+":"
	+transform.col8+":"+transform.col9+":"+transform.col10+":"+transform.col11+":"+transform.col12+":"+transform.col13+":"+transform.col14+":"
	+transform.col15+":"+transform.col16;
	transform.custom = transform.col1;
	transform.name = transform.col2+" "+transform.col3;
	transform.phone = "phone: "+transform.col5;
	transform.email = "email: "+transform.col6;
	transform.addresscolor = "orange";
	var address = transform.col7.trim();
	var city = transform.col8.trim();
	var state = transform.col9.trim();
	if ( address && city && state && address != "undefined" && address != "none") {
		transform.fulladdress = address+' , '+city+' , '+state;
	} else {
		transform.fulladdress = "Please enter address";
		transform.addresscolor = "red";
	}
	datesraw = transform.col15;
	datesdata = datesraw.replace(/cOlOn/g,":");
	if(transform.datedue != "none" || transform.datedue != "NA" ){transform.datedue = "due date: "+JSON.parse(datesdata)[0].duedate; } else { transform.datedue = "due date: ";} ;
	return transform;
}

function addHandler(e) {
	console.log("addHandler e : "+JSON.stringify(e));
			var clientController = Alloy.createController('enterproject');
		clientController.openMainWindow($.tab_projectlist);
}

function myRefresher(e) {
	console.log("refreshing after pull : " +JSON.stringify(e));
    Alloy.Collections.project.fetch({
        success: e.hide,
        error: e.hide
    });
}

console.log("args sourcecall detected is: " +args.sourcecall);
if (args.sourcecall) {
	$.projectlist_window.addEventListener("click", function(e){
		Alloy.Globals.openDetail(e);
		var title = e.row.title;
		var enterinvoiceController = Alloy.createController(args.sourcecall,{
			title: title
		});
		enterinvoiceController.openMainWindow($.tab_enterinvoicelist);
});
} else {
	$.projectlist_window.addEventListener("click", function(e){
		Alloy.Globals.openDetail(e);
		var title = e.row.title;
		var clientController = Alloy.createController('projectdetail',{
			title: title,
			callbackFunction : pulledEvent
		});
		clientController.openMainWindow($.tab_projectlist);
	});
}

function pulledEvent(e){
	console.log("project.js:pulledEvent:: Alloy.Collections.project.fetch()");
	Alloy.Collections.project.fetch();
}
