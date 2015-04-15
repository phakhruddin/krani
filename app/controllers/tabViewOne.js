
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
	checkNetworkAndGoogleAuthorized('1gnkP116nsTVxtrw6d_mXVdOiesQEPH7LVUIyHUfx9EE');
			var needAuth = Titanium.App.Properties.getString('needAuth');
				console.log("needAuth is :  " +needAuth);
	if (needAuth == "true") {googleAuth.authorize();};
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


$.google.addEventListener ("click", function(e){
	Alloy.Globals.openDetail(e);
	var tabViewOneController = Alloy.createController("google");
	tabViewOneController.openMainWindow($.tab_one);	
});

$.bootstrap.addEventListener ("click", function(e){
	Alloy.Globals.openDetail(e);
	var tabViewOneController = Alloy.createController("bootstrap");
	tabViewOneController.openMainWindow($.tab_one);	
});


var scope = ['https://spreadsheets.google.com/feeds', 'https://docs.google.com/feeds','https://www.googleapis.com/auth/calendar','https://www.googleapis.com/auth/calendar.readonly','https://www.googleapis.com/auth/drive'];
scope.push ("https://www.googleapis.com/auth/drive.appdata");
scope.push ("https://www.googleapis.com/auth/drive.apps.readonly");
scope.push ("https://www.googleapis.com/auth/drive.file");
var GoogleAuth = require('googleAuth');
var googleAuth = new GoogleAuth({
	clientId : '306793301753-8ej6duert04ksb3abjutpie916l8hcc7.apps.googleusercontent.com',
	clientSecret : 'fjrsVudiK3ClrOKWxO5QvXYL',
	propertyName : 'googleToken',
	scope : scope,
	quiet: false
});

checkNetworkAndGoogleAuthorized = function(sid){
	var url = "https://spreadsheets.google.com/feeds/list/"+sid+"/od6/public/basic?hl=en_US&alt=json";
	var xhr = Ti.Network.createHTTPClient({
	    onload: function(e) {
	    try {
	    		Ti.API.info("network is good. Replies are: "+this.responseText);
	    		console.log("googleAuth.isAuthorized:  " +googleAuth.isAuthorized);
	    		Titanium.App.Properties.setString('needAuth',"false");
	    		googleAuth.isAuthorized(function() {
						console.log('Access Token: ' + googleAuth.getAccessToken());
					}, function() {
						console.log('TV1 Authorized first, see next window: '+(new  Date()));
						Titanium.App.Properties.setString('needAuth',"true");
					});
			
	    		
	    	} catch(e){
				Ti.API.info("cathing e: "+JSON.stringify(e));
			}
		}
	});
	xhr.onerror = function(e){
		alert("No network connection. Information update will NOT be immediately synchronized to central location. Please take note.");
	};
	xhr.open("GET", url);
	xhr.send();
};