
$.location.addEventListener ("click", function(e){
	Alloy.Globals.openDetail(e);
	var item = "labor";
	var sid = Titanium.App.Properties.getString(item,"none");
	Alloy.Globals.getPrivateData(sid,item);
  	var tabViewOneChildController = Alloy.createController("location");
  	tabViewOneChildController.openMainWindow($.tab_one);	
});

function openNextTab(item){
	var sid = Titanium.App.Properties.getString(item,"none");
	Ti.API.info("sid for "+ item +" : "+sid);
	Alloy.Globals.getPrivateData(sid,item);
	var scheduleController = Alloy.createController(item);
	scheduleController.openMainWindow($.tab_one);	
}

$.project.addEventListener ("click", function(e){
	Alloy.Globals.openDetail(e);
	var item = e.row.id;
	openNextTab(item);
});

$.schedule.addEventListener ("click", function(e){
	Alloy.Globals.openDetail(e);
	var scheduleController = Alloy.createController("schedule");
 	scheduleController.openMainWindow($.tab_one);
});
 	
$.client.addEventListener ("click", function(e){
	Alloy.Globals.openDetail(e);
	Ti.API.info("e info : "+JSON.stringify(e));
	var item = e.row.id;
	openNextTab(item);
});

$.invoicelistlist.addEventListener ("click", function(e){
	Alloy.Globals.openDetail(e);

 		var item = 'invoice';
 			var sid = Titanium.App.Properties.getString(item,"none");
	Ti.API.info("sid for "+ item +" : "+sid);
	Alloy.Globals.getPrivateData(sid,item);
		var scheduleController = Alloy.createController("invoicelistlist");
 	scheduleController.openMainWindow($.tab_one);
	//openNextTab(item);
});

$.supplier.addEventListener ("click", function(e){
	Alloy.Globals.openDetail(e);
	var scheduleController = Alloy.createController("supplier");
	scheduleController.openMainWindow($.tab_one);	
});

$.inventory.addEventListener ("click", function(e){
	Alloy.Globals.openDetail(e);
	var item = e.row.id;
	openNextTab(item);
});

$.proposal.addEventListener ("click", function(e){
	Alloy.Globals.openDetail(e);
	var item = e.row.id;
	openNextTab(item);
});
/*
$.enterdata.addEventListener ("click", function(e){
	Alloy.Globals.openDetail(e);
	var tabViewOneController = Alloy.createController("enterdata");
	tabViewOneController.openMainWindow($.tab_one);	
});*/

$.google.addEventListener ("click", function(e){
	Alloy.Globals.openDetail(e);
	var tabViewOneController = Alloy.createController("google");
	tabViewOneController.openMainWindow($.tab_one);	
});