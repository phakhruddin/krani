exports.openMainWindow = function(_tab) {
  _tab.open($.invoicesent_window);
  Ti.API.info("This is child widow invoicesent.js" +JSON.stringify(_tab));
  $.invoicesent_table.search = $.search_history;
  Alloy.Collections.invoicesent.fetch();
};

function addHandler(e) {
	console.log("JSON stringify addHandler(e): "+JSON.stringify(e));
}

 function myRefresher(e) {
	console.log("refreshing after pull : " +JSON.stringify(e));
    Alloy.Collections.invoicesent.fetch({
        success: e.hide,
        error: e.hide
    });
}

function transformFunction(model) {
	var transform = model.toJSON();
	Alloy.Globals.Log("transform is ::" +JSON.stringify(transform));
	var utcdate = JSON.stringify(transform.col1);
	var date = (transform.col1)?new Date(parseInt(transform.col1)):"";
	transform.custom = (date.toString().substring(0,16));
	transform.title = transform.col1+":"+transform.custom+":"+transform.col16;
	Alloy.Globals.Log("utcdate is ::" +utcdate+" transform.col1: " +transform.col1+ " date is: "+date);
	return transform;
}
