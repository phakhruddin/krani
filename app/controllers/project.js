exports.openMainWindow = function(_tab) {
  _tab.open($.projectlist_window);
  Ti.API.info("This is child widow projectlist.js" +JSON.stringify(_tab));
  	$.projectlist_table.search = $.search_history;
	Alloy.Collections.project.fetch();	

};

$.ptr.refresh();

$.projectlist_window.addEventListener("click", function(e){
		Alloy.Globals.openDetail(e);
		var title = e.row.title;
		var clientController = Alloy.createController('projectdetail',{
			title: title
		});
		clientController.openMainWindow($.tab_projectlist);
});


function transformFunction(model) {
	var transform = model.toJSON();
	console.log("transform is ::" +JSON.stringify(transform));
	transform.title = transform.col1+":"+transform.col2+":"+transform.col3+":"+transform.col4+":"+transform.col5+":"+transform.col6+":"+transform.col7+":"+transform.col8+":"+transform.col9+":"+transform.col10+":"+transform.col11+":"+transform.col12+":"+transform.col13+":"+transform.col14+":"+transform.col15+":"+transform.col16;
	transform.custom = transform.col1;
	transform.name = "customer: "+transform.col2+" "+transform.col3;
	transform.phone = "phone: "+transform.col5;
	transform.email = "email: "+transform.col6;
	transform.address = "address: "+transform.col7+","+transform.col8+","+transform.col9;
	transform.datedue = "due date: "+transform.col15;
	return transform;
}

function addHandler(e) {
	console.log("addHandler e : "+JSON.stringify(e));
			var clientController = Alloy.createController('enterproject');
		clientController.openMainWindow($.tab_projectlist);
}

function myRefresher(e) {
	console.log("refreshing after pull : " +JSON.stringify(e));
    Alloy.Collections.client.fetch({
        success: e.hide,
        error: e.hide
    });
}
	
