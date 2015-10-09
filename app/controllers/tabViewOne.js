
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
	Alloy.Globals.checkFileExistThenCreateSS("joblogssid");
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
	$.activityIndicator.show();
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

$.settings.addEventListener ("click", function(e){
	Alloy.Globals.openDetail(e);
	var tabViewOneController = Alloy.createController("settings");
	tabViewOneController.openMainWindow($.tab_one);	
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

function prefetchJoblogSID(){
	var sid = Titanium.App.Properties.getString('joblogssid',"none");
	console.log("prefetchJoblogSID:: checking sid :" +sid);
	if ( sid != "none"){
		console.log('prefetchJoblogSID:: populate Alloy.Globals.getPrivateData('+sid+','+joblogsid+'); ');
		Alloy.Globals.getPrivateData(sid,"joblogsid");
	} else {
		console.log("prefetchJoblogSID:: joblogsid sid does not exists !");
	}
	
}

prefetchJoblogSID();

function initialLoad(){
	checkNetworkAndGoogleAuthorized('1gnkP116nsTVxtrw6d_mXVdOiesQEPH7LVUIyHUfx9EE');
	var item = 'invoice';
 	var sid = Titanium.App.Properties.getString(item,"none");
 	Ti.API.info("index.js::sid for "+ item +" : "+sid);
	Alloy.Globals.getPrivateData(sid,item);
	Alloy.Collections.instance(item).fetch();
}

//initialLoad();

function getParentFolder(args) {
	var sid = Titanium.App.Properties.getString('joblog');
	var xhr = Ti.Network.createHTTPClient({
	    onload: function(e) {
	    try {
	    		var json = JSON.parse(this.responseText);
	    		Ti.API.info("response is: "+JSON.stringify(json));
	    		var parentid = json.items[0].id;
	    		Titanium.App.Properties.setString('parentid',parentid);
	    		console.log("tabViewOne.js::args inside getParentFolder: "+JSON.stringify(args));
	    	} catch(e){
				Ti.API.info("cathing e: "+JSON.stringify(e));
			}
			return parentid;
			Titanium.App.Properties.setString('parentid',parentid);
		}
		});
	xhr.onerror = function(e){
		//alert("tabViewOne::getParentFolder::Unable to get info.");
		console.log('tabViewOne::getParentFolder:: unable to get parents for '+sid);
	};
	console.log('tabViewOne::getParentFolder:: URL:: https://www.googleapis.com/drive/v2/files/'+sid+'/parents');
	xhr.open("GET", 'https://www.googleapis.com/drive/v2/files/'+sid+'/parents');
	xhr.setRequestHeader("Content-type", "application/json");
    xhr.setRequestHeader("Authorization", 'Bearer '+ googleAuthSheet.getAccessToken());
	xhr.send();
};

getParentFolder();

function login(e) {
	console.log("tabViewOne.js::login(e): " +JSON.stringify(e));
	var themastersid=[];
	
	var GoogleAuth = require('googleAuth');
	var googleAuthSheet = new GoogleAuth({
		clientId : +Titanium.App.Properties.getString('authclientid'),
		clientSecret : +Titanium.App.Properties.getString('authclientsecret'),
		propertyName : 'googleToken',
		scope : Alloy.Globals.scope,
		quiet: false
	});
	
	googleAuth.isAuthorized(function() {
		Ti.API.info('Access Token: ' + googleAuthSheet.getAccessToken());
		Titanium.App.Properties.setString('needAuth',"false");
	}, function() {
		Ti.API.info('Authorized first, see next window: ');
		Titanium.App.Properties.setString('needAuth',"true");
		Alloy.Globals.LaunchWindowGoogleAuth();
	});
	
	function getEmail(e){
			var xhr = Ti.Network.createHTTPClient({
		    onload: function(e) {
		    try {
		    		var json = JSON.parse(this.responseText);
		    		Ti.API.info("response is: "+JSON.stringify(json));
		    		var emailid = json.email;
		    		Titanium.App.Properties.setString('emailid',emailid);
		    		console.log("tabViewOne.js::args inside getEmail: emailid "+emailid+" :: "+JSON.stringify(e));
		    	} catch(e){
					Ti.API.info("cathing e: "+JSON.stringify(e));
				}
				return emailid;
				Titanium.App.Properties.setString('emailid',emailid);
			}
			});
		xhr.onerror = function(e){
			//alert("tabViewOne::getEmail::Unable to get info.");
			console.log('tabViewOne::getEmail:: unable to get info for '+e);
		};
		console.log('tabViewOne::getEmail:: URL:: https://www.googleapis.com/oauth2/v1/userinfo?alt=json');
		xhr.open("GET", 'https://www.googleapis.com/oauth2/v1/userinfo?alt=json');
		xhr.setRequestHeader("Content-type", "application/json");
	    xhr.setRequestHeader("Authorization", 'Bearer '+ googleAuthSheet.getAccessToken());
		xhr.send();
	}
	
	function getParentID(email){
		console.log("tabViewOne.js::getParentID: with email: " +email);
		var themastersid = Alloy.Collections.instance('master');
		themastersid.fetch();
		Ti.API.info(" themastersid : "+JSON.stringify(themastersid));
		if (themastersid.length > 0) {
			var mastersidjson = themastersid.toJSON();
			console.log("tabViewOne.js::JSON.stringify(mastersidjson): " +JSON.stringify(mastersidjson));
			for( var i=0; i < mastersidjson.length; i++){
				var mastercol1 = mastersidjson[i].col1.trim();
				if ( mastercol1 == email.trim()) { 
					Ti.API.info(" tabViewOne::getParentID: found mastercol1: "+mastercol1+" vs. "+email.trim());
					var parentid = mastersidjson[i].col2.trim(); 
					Titanium.App.Properties.setString('parentid',parentid);
				};
			}	
			if (parentid) {
				console.log("tabViewOne.js::getParentID: parentid is: "+parentid);
				//$.email_label.text=email;
				//$.email_label.font={fontSize:"5dp"};
				$.status_view.backgroundColor="green";
				$.status_view.height="1%";
				$.status_label.text="";
				$.login_button.title="REFRESH";
				//alert(email+" is registered user. Please proceed. Thanks");
			} else {
				alert(email+" is NOT registered user. Using demo access. Please proceed. Thanks");
			}	
		} 
	}
	
	getEmail();
	var email= Titanium.App.Properties.getString('emailid');
	if (email) {
		var mastersid = Titanium.App.Properties.getString('master');
		Alloy.Globals.getPrivateData(mastersid,"master");
		getParentID(email);
	} else getEmail();

	
}
