// The contents of this file will be executed before any of
// your view controllers are ever executed, including the index.
// You have access to all functionality on the `Alloy` namespace.
//
// This is a great place to do any initialization for your app
// or create any global variables/functions that you'd like to
// make available throughout your app. You can easily make things
// accessible globally by attaching them to the `Alloy.Globals`
// object. For example:
//
// Alloy.Globals.someGlobalFunction = function(){};

//default var
//Initialization.
//Get Licensed
var projectsid = '1FMGrlYtWL6SUQuD-RynfEU_1kf5Yf6__ysrWsY2aAJI'; Titanium.App.Properties.setString('project',projectsid);
var clientsid = '1ECkNoyzgeSu8WkVs3kBnlY8MjJRIAc787nVs6IJsA9w'; Titanium.App.Properties.setString('client',clientsid);
var invoicesid = '1-Wz7Apn4AvVpfqcNyMgfqyKA8OAoLNy5Bl0d_jQ9IZk'; Titanium.App.Properties.setString('invoice',invoicesid);
var inventorysid = '1zq6rj-qHxYUkHY1jK2k_25I8_xWYrVOowbsp6VblixA'; Titanium.App.Properties.setString('inventory',inventorysid);
var proposalsid = '1H95ytL9cA1f3YU1Hag4GAtMUV98NyBcYqzyP04BDSwk'; Titanium.App.Properties.setString('proposal',proposalsid);
var mastersid = '1WUtkBcD1q3ezozI98w0sq42rl1TwIOTMq25Yayj-sEk'; Titanium.App.Properties.setString('master',mastersid);
var schedulesid = '1c5Nj6XOMIEtlqmHLDoyGocdNu5MRG-WQhckIseVlU2I'; Titanium.App.Properties.setString('schedule',schedulesid);
var laborsid = '1-YaHKOuTqpRG1X83_1tZ6zHWrO1krEmV99HS7S130Hc'; Titanium.App.Properties.setString('labor',laborsid);



			
Alloy.Globals.writeFile = function (content, filename){
			var file = Ti.Filesystem.getFile(
				Ti.Filesystem.tempDirectory, filename
			);
			file.write(content+"\n");
};			

Alloy.Globals.appendFile = function (content, filename){
			var file = Ti.Filesystem.getFile(
				Ti.Filesystem.tempDirectory, filename
			);
			file.append(content+"\n");
};

Alloy.Globals.GoogleAuth_module = require('googleAuth');

Alloy.Globals.googleAuth = new Alloy.Globals.GoogleAuth_module({
	//clientId : '219575370718-u3vb42f04899h02es4mj4uh34otgr5pe.apps.googleusercontent.com',
	clientId : '693726333078-uncq4tte4lo9vfbhl6569d3uduvnn8fd.apps.googleusercontent.com',
	clientSecret : 'CrWBzHVXAWykCWJwDT1EY-1I',
	propertyName : 'googleToken',
	quiet: false,
	scope : [ 'https://www.googleapis.com/auth/tasks', 'https://www.googleapis.com/auth/tasks.readonly' ]
});

Alloy.Globals.UpdateMap = function(latitude,longitude,title) {
	
	var latitude = latitude;
	var longitude = longitude;
	var subtitle = "None";
	console.log("map obtained with latitude: "+latitude+" longitude: "+longitude);
	
  if(Ti.Platform.osname == 'android'){
  		var Map = Titanium.Map;
  		
  		var name = Map.createAnnotation({
	    latitude:latitude,
	    longitude:longitude,
	    title:title,
	    pincolor:Map.ANNOTATION_RED,
	    myid:1 // Custom property to uniquely identify this annotation.
		});

  		var mapview = Map.createView({
	    mapType: Titanium.Map.STANDARD_TYPE,
	    region: {latitude:latitude, longitude:longitude,
	            latitudeDelta:0.1, longitudeDelta:0.1},
	    animate:true,
	    regionFit:false,
	    userLocation:true,
	    annotations:[name]
	});
  	} else {
		var Map = require('ti.map');
		
		var tollPlaza0 = Map.createAnnotation({
	    latitude:latitude,
	    longitude:longitude,
	    title:title,
	    pincolor:Map.ANNOTATION_RED,
	    myid:1 // Custom property to uniquely identify this annotation.
		});
		
		var addr = [];
		if (latitude === "all" || longitude === "all" || title === "all") {
			var addrdata = [];
			// fetch the labor database
			var thelabor = Alloy.Collections.instance('labor');
  			(thelabor) && thelabor.fetch();
  			var laborjson = thelabor.toJSON();
  			for( var i=0; i < laborjson.length; i++){
  				var title = laborjson[i].col2+' '+laborjson[i].col3;
  				var latitude = laborjson[i].col8.trim();
  				var longitude = laborjson[i].col9.trim();
  				addrdata.push({latitude: latitude,longitude:  longitude,title: title});
  			}
  			console.log("addrdata after push: "+JSON.stringify(addrdata));
		} else {
			var addrdata = [ {latitude: latitude,longitude:  longitude,title: title} ];
		}
				
		for (i=0;i<addrdata.length;i++){
			addr.push({
				latitude: addrdata[i].latitude,
				longitude: addrdata[i].longitude,
				title: addrdata[i].title,
				pincolor: Map.ANNOTATION_RED,
				myid:i,
				animate: 'true' 
			});
		};
		
		console.log("addrdata are: "+JSON.stringify(addrdata));
	    
	    var addrAnnotations = [];
		_.each(addr, function (addr) {
		  addrAnnotations.push(Map.createAnnotation({
		    title: addr.title,
		    pincolor: addr.pincolor,
		    latitude: addr.latitude,
		    longitude: addr.longitude,
		    myid: addr.myid
		  }));  
		});
		
			console.log("addrAnnotations are: "+JSON.stringify(addrAnnotations));

		var mapview = Map.createView({
	    mapType: Map.NORMAL_TYPE,
	    region: {latitude:latitude, longitude:longitude,
	            latitudeDelta:0.8, longitudeDelta:0.8},
	    animate:true,
	    userLocation:true,
	    regionFit:false,
	    annotations:addrAnnotations
	});
	
	}
	var win = Titanium.UI.createWindow({
		fullscreen: true,
		tabBarHidden : true,
		navBarHidden: false
	});	
//	Ti.API.info("mapview:" + JSON.stringify(mapview));
	
    if(Ti.Platform.osname == 'android'){
		alert("do nothing this is android");
   	} else {
	   	var btnBack = Ti.UI.createButton({ 
			title: '< Back', 
			top: 5,
			left: 10
		});
	   	var win1 = Titanium.UI.iOS.createNavigationWindow({
			Title: "MAP",
			backgroundColor: "transparent",
	   	  	window: win
	    });
	    win1.add(btnBack);
	    btnBack.addEventListener("click", function(_tab) { 
			console.debug("closing map" +_tab);
	//		Ti.API.info("tab:" + JSON.stringify(_tab));
			win1.close();
	});
   }; 
	// Handle click events on any annotations on this map.
	listener = function(evt){Ti.API.info("Annotation " + evt.title + " clicked, id: " + evt.annotation.myid +"  lat/lon: "+evt.annotation.latitude+"/"+evt.annotation.longitude);};
	mapview.addEventListener('click', listener);
	win.add(mapview);
	//win.open();
	if(Ti.Platform.osname == 'android'){
		win.open();
	} else {
		win1.open();
	};

};

Alloy.Globals.CheckLoc = function(){
	if (Ti.Geolocation.locationServicesEnabled) {
	Titanium.Geolocation.purpose = 'Get Current Location';
	Titanium.Geolocation.getCurrentPosition(function(e) {
	    if (e.error) {
	        Ti.API.error('Error: ' + e.error);
	    } else {
	        Ti.API.info(e.coords);
	        var coordslat =  e.coords.latitude;
	        alert("Thanks for updating your location. loc details: latitude :"+e.coords.latitude+" longitude : "+e.coords.longitude);
	        }
	    });
	} else {
	    alert('Please enable location services');
	}
};

Alloy.Globals.openDetail = function(e){
	Ti.API.info('all info = ' + JSON.stringify(e));
	Ti.API.info('index = ' + JSON.stringify(e.index));
	Ti.API.info("in open_button click event title :"+e.row.title);
};

Alloy.Globals.getData = function(sid,type) {	
	var url = "https://spreadsheets.google.com/feeds/list/"+sid+"/od6/public/basic?hl=en_US&alt=json";
	var thefile = "gss"+sid+".txt";
	var xhr = Ti.Network.createHTTPClient({
	    onload: function(e) {
	    try {
			// parse the retrieved data, turning it into a JavaScript object
	    	json = JSON.parse(this.responseText);
	    	//Ti.Api.Info("json data after download : " +json);
	    	var file = Ti.Filesystem.getFile(
				Ti.Filesystem.tempDirectory, thefile
			);
			if(file.exists() && file.writeable) {
			    var success = file.deleteFile();
			    Ti.API.info((success==true) ? 'success' : 'fail'); // outputs 'success'
			}
			file.write(this.responseText);
			(type == 'client') && Alloy.Collections.client.deleteAll();
			(type == 'project') && Alloy.Collections.project.deleteAll();
			(type == 'inventory') && Alloy.Collections.inventory.deleteAll();
			(type == 'invoice') && Alloy.Collections.invoice.deleteAll();
			(type == 'supplier') && Alloy.Collections.supplier.deleteAll();
			(type == 'proposal') && Alloy.Collections.proposal.deleteAll();
			(type == 'labor') && Alloy.Collections.labor.deleteAll();
			for (var i=1; i < +json.feed.entry.length; i++) {
				var dataModel = Alloy.createModel(type,{
					col1 :  json.feed.entry[i].title.$t || "none",
					col2 : json.feed.entry[i].content.$t.split(',')[0] && json.feed.entry[i].content.$t.split(',')[0].split(':')[1] || "none",
					col3 : json.feed.entry[i].content.$t.split(',')[1] && json.feed.entry[i].content.$t.split(',')[1].split(':')[1] || "none",
					col4 : json.feed.entry[i].content.$t.split(',')[2] && json.feed.entry[i].content.$t.split(',')[2].split(':')[1] || "none",
					col5 : json.feed.entry[i].content.$t.split(',')[3] && json.feed.entry[i].content.$t.split(',')[3].split(':')[1] || "none",
					col6 : json.feed.entry[i].content.$t.split(',')[4] && json.feed.entry[i].content.$t.split(',')[4].split(':')[1] || "none",
					col7 : json.feed.entry[i].content.$t.split(',')[5] && json.feed.entry[i].content.$t.split(',')[5].split(':')[1] || "none",
					col8 : json.feed.entry[i].content.$t.split(',')[6] && json.feed.entry[i].content.$t.split(',')[6].split(':')[1] || "none",
					col9 : json.feed.entry[i].content.$t.split(',')[7] && json.feed.entry[i].content.$t.split(',')[7].split(':')[1] || "none",
					col10 :  json.feed.entry[i].content.$t.split(',')[8] && json.feed.entry[i].content.$t.split(',')[8].split(':')[1] || "none",
					col11 : json.feed.entry[i].content.$t.split(',')[9] && json.feed.entry[i].content.$t.split(',')[9].split(':')[1] || "none",
					col12 :  json.feed.entry[i].content.$t.split(',')[10] && json.feed.entry[i].content.$t.split(',')[10].split(':')[1] || "none",
					col13 :  json.feed.entry[i].content.$t.split(',')[11] && json.feed.entry[i].content.$t.split(',')[11].split(':')[1] || "none",
					col14 :  json.feed.entry[i].content.$t.split(',')[12] && json.feed.entry[i].content.$t.split(',')[12].split(':')[1] || "none",
					col15 :  json.feed.entry[i].content.$t.split(',')[13] && json.feed.entry[i].content.$t.split(',')[13].split(':')[1] || "none",
					col16 :  json.feed.entry[i].content.$t.split(',')[13] && json.feed.entry[i].content.$t.split(',')[13].split(':')[1] || "none",		
				});			
				dataModel.save();
			}
			//
			} catch(e){
				Ti.API.info("cathing e: "+JSON.stringify(e));
			}
		}
	});
	xhr.onerror = function(e){
		alert(e);
	};
	xhr.open("GET", url);
	xhr.send();
	Ti.API.info(" Data were successfuly downloaded from "+url+". Please proceed.");
};

Alloy.Globals.createController = function(controller,sourcetab){
		var newController = Alloy.createController(controller);
		newController.openMainWindow(sourcetab);
};

Alloy.Globals.getPrivateData = function(sid,type) {	
	var data = [];
	//Alloy.Globals.checkGoogleisAuthorized();
	Alloy.Globals.checkNetworkAndGoogleAuthorized('1gnkP116nsTVxtrw6d_mXVdOiesQEPH7LVUIyHUfx9EE');
	var url = "https://spreadsheets.google.com/feeds/list/"+sid+"/od6/private/full";
	var thefile = "gss"+sid+".xml";
	var xhr = Ti.Network.createHTTPClient({
	    onload: function(e) {
	    try {
			var xml = Titanium.XML.parseString(this.responseText);
			console.log("response txt is: "+this.responseText);
			console.log("this xml is: " +xml);	   
			var feed = xml.documentElement.getElementsByTagName("feed");
			var entry = xml.documentElement.getElementsByTagName("entry"); 
			console.log("this entry length is: " +entry.length);
			// deleting existing entry in database start
			(type == 'client') && Alloy.Collections.client.deleteAll();
			(type == 'project') && Alloy.Collections.project.deleteAll();
			(type == 'inventory') && Alloy.Collections.inventory.deleteAll();
			(type == 'invoice') && Alloy.Collections.invoice.deleteAll();
			(type == 'supplier') && Alloy.Collections.supplier.deleteAll();
			(type == 'proposal') && Alloy.Collections.proposal.deleteAll();
			(type == 'labor') && Alloy.Collections.labor.deleteAll();
			(type == 'master') && Alloy.Collections.master.deleteAll();
			// deleting existing entry done
			for (i=1;i<entry.length;i++){
				var col1 = entry.item(i).getElementsByTagName("gsx:col1").item(0).text;
				var col2 = entry.item(i).getElementsByTagName("gsx:col2").item(0).text;
				var col4 = entry.item(i).getElementsByTagName("gsx:col4").item(0).text;
				data.push({"identification":col1,"next column":col2,"col4":col4});
				console.log("updating database with data :"+JSON.stringify(data));
				var dataModel = Alloy.createModel(type,{
					col1 :  entry.item(i).getElementsByTagName("gsx:col1").item(0).text || "none",
					col2 : entry.item(i).getElementsByTagName("gsx:col2").item(0).text || "none",
					col3 :  entry.item(i).getElementsByTagName("gsx:col3").item(0).text || "none",
					col4 :  entry.item(i).getElementsByTagName("gsx:col4").item(0).text || "none",
					col5 :  entry.item(i).getElementsByTagName("gsx:col5").item(0).text || "none",
					col6 :  entry.item(i).getElementsByTagName("gsx:col6").item(0).text || "none",
					col7 :  entry.item(i).getElementsByTagName("gsx:col7").item(0).text || "none",
					col8 :  entry.item(i).getElementsByTagName("gsx:col8").item(0).text || "none",
					col9 :  entry.item(i).getElementsByTagName("gsx:col9").item(0).text || "none",
					col10 :  entry.item(i).getElementsByTagName("gsx:col10").item(0).text || "none",
					col11 :  entry.item(i).getElementsByTagName("gsx:col11").item(0).text || "none",
					col12 :  entry.item(i).getElementsByTagName("gsx:col12").item(0).text || "none",
					col13 :  entry.item(i).getElementsByTagName("gsx:col13").item(0).text || "none",
					col14 :  entry.item(i).getElementsByTagName("gsx:col14").item(0).text || "none",
					col15 :  entry.item(i).getElementsByTagName("gsx:col15").item(0).text || "none",
					col16 :  entry.item(i).getElementsByTagName("gsx:col16").item(0).text || "none",		
				});	
				dataModel.save();
			}
			var file = Ti.Filesystem.getFile(
				Ti.Filesystem.tempDirectory, thefile
			);
			if(file.exists() && file.writeable) {
			    var success = file.deleteFile();
			    Ti.API.info((success==true) ? 'success' : 'fail'); // outputs 'success'
			}
			file.write(this.responseText);
			console.log("checking data " +JSON.stringify(data));
			//
			} catch(e){
				Ti.API.info("cathing e: "+JSON.stringify(e));
			}
		}
	});
	xhr.onerror = function(e){
		//alert(e);
		alert("Unable to connect to the network. The "+type+" info displayed here is NOT the latest.");
	};
	xhr.open("GET", url);
	xhr.send();
	Ti.API.info(" Data were successfuly downloaded from "+url+". Please proceed.");
};

Alloy.Globals.xmlToJson = function(xml) {	
	// Create the return object
	var obj = {};

	if (xml.nodeType == 1) { // element
		// do attributes
		if (xml.attributes.length > 0) {
		obj["@attributes"] = {};
			for (var j = 0; j < xml.attributes.length; j++) {
				var attribute = xml.attributes.item(j);
				obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
			}
		}
	} else if (xml.nodeType == 3) { // text
		obj = xml.nodeValue;
	}

	// do children
	if (xml.hasChildNodes()) {
		for(var i = 0; i < xml.childNodes.length; i++) {
			var item = xml.childNodes.item(i);
			var nodeName = item.nodeName;
			if (typeof(obj[nodeName]) == "undefined") {
				obj[nodeName] = xmlToJson(item);
			} else {
				if (typeof(obj[nodeName].push) == "undefined") {
					var old = obj[nodeName];
					obj[nodeName] = [];
					obj[nodeName].push(old);
				}
				obj[nodeName].push(xmlToJson(item));
			}
		}
	}
	return obj;
};


var scope = ['https://spreadsheets.google.com/feeds', 'https://docs.google.com/feeds','https://www.googleapis.com/auth/calendar','https://www.googleapis.com/auth/calendar.readonly','https://www.googleapis.com/auth/drive'];
scope.push ("https://www.googleapis.com/auth/drive.appdata");
scope.push ("https://www.googleapis.com/auth/drive.apps.readonly");
scope.push ("https://www.googleapis.com/auth/drive.file");

var GoogleAuth = require('googleAuth');
var googleAuthSheet = new GoogleAuth({
	clientId : '306793301753-8ej6duert04ksb3abjutpie916l8hcc7.apps.googleusercontent.com',
	clientSecret : 'fjrsVudiK3ClrOKWxO5QvXYL',
	propertyName : 'googleToken',
	//scope : ['https://spreadsheets.google.com/feeds', 'https://docs.google.com/feeds','https://www.googleapis.com/auth/calendar','https://www.googleapis.com/auth/calendar.readonly','https://www.googleapis.com/auth/drive'],
	scope : scope,
	quiet: false
});

Alloy.Globals.googleAuthSheet = new GoogleAuth({
	clientId : '306793301753-8ej6duert04ksb3abjutpie916l8hcc7.apps.googleusercontent.com',
	clientSecret : 'fjrsVudiK3ClrOKWxO5QvXYL',
	propertyName : 'googleToken',
	//scope : ['https://spreadsheets.google.com/feeds', 'https://docs.google.com/feeds','https://www.googleapis.com/auth/calendar','https://www.googleapis.com/auth/calendar.readonly'],
	scope : scope,
	quiet: false
});

Alloy.Globals.googleAuthCalendar = new GoogleAuth({
	clientId : '306793301753-8ej6duert04ksb3abjutpie916l8hcc7.apps.googleusercontent.com',
	clientSecret : 'fjrsVudiK3ClrOKWxO5QvXYL',
	propertyName : 'googleToken',
	//scope : ['https://spreadsheets.google.com/feeds', 'https://docs.google.com/feeds','https://www.googleapis.com/auth/calendar','https://www.googleapis.com/auth/calendar.readonly'],
	scope : scope,
	quiet: false
});

Alloy.Globals.LaunchWindowGoogleAuth = function() {
	//authorize first
	//googleAuthSheet.authorize();	
			var win = Titanium.UI.createWindow({
				fullscreen: false,
				tabBarHidden : false,
				navBarHidden: false,
				height: "85%",
				modal: true
			});	
			var btnBack = Ti.UI.createButton({ 
				title: '< Back', 
				top: 5,
				left: 10
			});
	   		var win1 = Titanium.UI.iOS.createNavigationWindow({
				Title: "Authentication",
				backgroundColor: "transparent",
		   	  	window: win,
		   	  	height: "85%"
	    	});
	    	var view = Titanium.UI.createView({
				   borderRadius:10
			});	    	
	    	btnBack.addEventListener("click", function(_tab) { 
				console.debug("closing window" +_tab);
		//		Ti.API.info("tab:" + JSON.stringify(_tab));
				win1.close();
			});
			Ti.API.info('Authorized first: ');
			//view.add(googleAuthSheet.authorize());							
			view.add(googleAuthSheet.authorize());
			win1.add(btnBack);	
			//window.add(view);
			win1.open({modal:true});		

};
	
Alloy.Globals.checkGoogleisAuthorized = function () {
	googleAuthSheet.isAuthorized(function() {
		console.log('Access Token: ' + googleAuthSheet.getAccessToken());
	}, function() {
		console.log('Authorized first, see next window: ');
		Alloy.Globals.LaunchWindowGoogleAuth();
	});
};	
	
Alloy.Globals.updateSpreadsheet = function (sid){
	 	var now = new Date();
 	var clientlastname = Titanium.App.Properties.getString('clientlastname',"none");
 	var clientfirstname = Titanium.App.Properties.getString('clientfirstname',"none");
 	var clientphone = Titanium.App.Properties.getString('clientphone',"none");
 	var clientemail = Titanium.App.Properties.getString('clientemail',"none");
 	var clientstreetaddress = Titanium.App.Properties.getString('clientstreetaddress',"none");
 	var clientcity = Titanium.App.Properties.getString('clientcity',"none");
 	var clientstate = Titanium.App.Properties.getString('clientstate',"none");
 	var clientproject = Titanium.App.Properties.getString('clientproject',"none");
 	var clientcompany = Titanium.App.Properties.getString('clientcompany',"none");
 	alert("On "+now+" : Info on: "+clientfirstname+" "+clientlastname+" with "+clientphone+" and email "+clientemail+" at "+clientstreetaddress+", "+clientcity+", "+clientstate+". submitted");
 	var fcsv = Ti.Filesystem.getFile(Ti.Filesystem.tempDirectory,'enterclient.csv');
 	var ftxt = Ti.Filesystem.getFile(Ti.Filesystem.tempDirectory,'enterclient.txt');
	fcsv.write(now+", "+clientfirstname+", "+clientlastname+", "+clientphone+", "+clientemail+", "+clientstreetaddress+", "+clientcity+", "+clientstate+'\n', true); // write to the file
	ftxt.write(now+", "+clientfirstname+", "+clientlastname+", "+clientphone+", "+clientemail+", "+clientstreetaddress+", "+clientcity+", "+clientstate+'\n', true); // write to the file
	var xmldatastring = '<entry xmlns=\'http://www.w3.org/2005/Atom\' xmlns:gsx=\'http://schemas.google.com/spreadsheets/2006/extended\'>'
	+'<gsx:col1>'+clientfirstname+'</gsx:col1><gsx:col2>'+clientfirstname+'</gsx:col2><gsx:col3>'
	+clientlastname+'</gsx:col3><gsx:col4>'+clientcompany+'</gsx:col4><gsx:col5>'
	+clientphone+'</gsx:col5><gsx:col6>'+clientemail+'</gsx:col6><gsx:col7>'+clientstreetaddress+'</gsx:col7><gsx:col8>'+clientcity+'</gsx:col8><gsx:col9>'+clientstate
	+'</gsx:col9><gsx:col10>'+'USA'+'</gsx:col10><gsx:col11>'+'NA'+'</gsx:col11><gsx:col12>NA</gsx:col12><gsx:col13>NA</gsx:col13><gsx:col14>NA</gsx:col14><gsx:col15>NA</gsx:col15><gsx:col16>NA</gsx:col16></entry>';
	Ti.API.info('xmldatastring to POST: '+xmldatastring);
	var xhr =  Titanium.Network.createHTTPClient({
    onload: function() {
    	try {
    		Ti.API.info(this.responseText); 
    	} catch(e){
    		Ti.API.info("cathing e: "+JSON.stringify(e));
    	}     
    },
    onerror: function(e) {
    	Ti.API.info("error e: "+JSON.stringify(e));
    }
});
	xhr.open("POST", 'https://spreadsheets.google.com/feeds/list/'+sid+'/od6/private/full');
	xhr.setRequestHeader("Content-type", "application/atom+xml");
	xhr.setRequestHeader("Authorization", 'Bearer '+ googleAuth.getAccessToken());
	xhr.send(xmldatastring);
	Ti.API.info('done POSTed');


};

Alloy.Globals.checkNetworkAndGoogleAuthorized = function(sid){
	var url = "https://spreadsheets.google.com/feeds/list/"+sid+"/od6/public/basic?hl=en_US&alt=json";
	var xhr = Ti.Network.createHTTPClient({
	    onload: function(e) {
	    try {
	    		Ti.API.info("network is good. Replies are: "+this.responseText);
	    		Alloy.Globals.checkGoogleisAuthorized();
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

Alloy.Globals.postCreateEvent = function(startdateTime,enddateTime,location,summary,description,organizerdisplayName,organizeremail,colorid,attendeeslist) {
	var startdateTime = startdateTime || "2015-03-05T15:30:00-06:00";
	var enddateTime = enddateTime || "2015-03-05T15:40:00-06:00";
	var location = location || "2258 S Sanctuary Dr., New Berlin, WI 53151";
	var summary = summary || "Dave Danish LawnMowing";
	var description = description || "client: Deb Smith house";
	var organizerdisplayName = organizerdisplayName|| "Eric Cole";
	var organizeremail = organizeremail || "phakhruddin1@gmail.com";
	var colorid = colorid || "3";
	var organizerself ="true";
	//var url = 'https://www.googleapis.com/calendar/v3/calendars/idevice.net%40gmail.com/events?access_token='+googleAuthCalendar.getAccessToken();
	var url = 'https://www.googleapis.com/calendar/v3/calendars/idevice.net@gmail.com/events';
	var recurrences ="";
	var attendeesstrbody = [];
	var attendeesstrstart = '\"attendees\": \[';
	var attendeesstrend = "\],";
	//var attendeeslist = "";
	var attendeeslist = ["phakhruddin1@gmail.com","deen@idevice.net"];
	if (attendeeslist.length>0){
		for (i=0;i<attendeeslist.length;i++) {	
			var attendeesstr = '\{ \"email\": \"'+attendeeslist[i]
			+'\", \"responseStatus\" : \"needsAction\"\}';	
			attendeesstrbody.push(attendeesstr);
		}
		var eventattendees = attendeesstrstart+""+attendeesstrbody+""+attendeesstrend;
	} else {
		var eventattendees = "";
	}
	var event = '\{'
	+'\"start\": \{ \"dateTime\": \"'+startdateTime+'\"\},'
	+'\"location\": \"'+location+'\",'
	+'\"end\": \{\"dateTime\": \"'+enddateTime+'\"\},'
	+'\"summary\": \"'+summary+'\",'
	+'\"description\": \"'+description+'\",'
	+'\"colorid\": \"'+colorid+'\",'
	+eventattendees
	+'\"organizer\": \{'
	+	'\"email\": \"'+organizeremail+'\",'
	+	'\"displayName\": \"'+organizerdisplayName+'\",'
	+	'\"self\": \"'+organizerself+'\"'
	+	'\}'	
	+recurrences
	+'\}';
	console.log("event strings are: "+event);
	var xhr =  Titanium.Network.createHTTPClient({
    onload: function() {
    	try {
    		Ti.API.info(this.responseText); 
    	} catch(e){
    		Ti.API.info("cathing e: "+JSON.stringify(e));
    	}     
    },
    onerror: function(e) {
    	Ti.API.info("error e: "+JSON.stringify(e));
        alert("Danger, Will Robinson!"); 
    }
});
	xhr.open("POST", url);
	xhr.setRequestHeader("Content-type", "application/json");
	xhr.setRequestHeader("Authorization", 'Bearer '+Alloy.Globals.googleAuthSheet.getAccessToken());
	xhr.send(event);
	Ti.API.info('done POSTed');
};

Alloy.Globals.uploadFile = function(file,filename) {
		var fileget = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory,file);
    	//var fileget = Ti.Filesystem.getFile(file);
		var fileread = fileget.read();
		var filebase64 = Ti.Utils.base64encode(fileread);
 		console.log('Access Token for File upload is: ' + googleAuthSheet.getAccessToken());
 		var parts = [];
 		var bound = 287032396531387;
 		var meta = '\{'
 		+	'\"title\": \"'+filename+'\"'
		+	'\}';
		var parts = [];
        parts.push('--' + bound);
        parts.push('Content-Type: application/json');
        parts.push('');
        parts.push(meta);
        parts.push('--' + bound);
		parts.push('Content-Type: application/pdf');
        parts.push('Content-Transfer-Encoding: base64');
        parts.push('');
        parts.push(filebase64);
        parts.push('--' + bound + '--');
 		var url = "https://www.googleapis.com/upload/drive/v2/files?uploadType=multipart";
 		var xhr =  Titanium.Network.createHTTPClient({
		    onload: function() {
		    	try {
		    		Ti.API.info(this.responseText); 
		    	} catch(e){
		    		Ti.API.info("cathing e: "+JSON.stringify(e));
		    	}     
		    },
		    onerror: function(e) {
		    	Ti.API.info("error e: "+JSON.stringify(e));
		        alert("unable to talk to the cloud, will try later"); 
		    }
		});
		xhr.open("POST", url);
		xhr.setRequestHeader("Content-type", "multipart/mixed; boundary=" + bound);
		xhr.setRequestHeader("Authorization", 'Bearer '+googleAuthSheet.getAccessToken());
		xhr.setRequestHeader("Content-Length", "2000000");
		xhr.send(parts.join("\r\n"));
		Ti.API.info('done POSTed');
};
