exports.openMainWindow = function(_tab) {
  _tab.open($.sharedcalendar_window);
  Ti.API.info("This is child widow: " +JSON.stringify(_tab));
  Alloy.Globals.getPrivateData('1WUtkBcD1q3ezozI98w0sq42rl1TwIOTMq25Yayj-sEk','master');
  var url = "https://www.google.com/calendar/feeds/idevice.net%40gmail.com/private-bda51ec0064db35a76e6bd97730497e8/basic";
  getSharedCalendarData(url);
  
  	$.save_url_button.addEventListener('click', function(_e) {
	    $.url_tf.blur();
	    var url = $.url_tf.value;
	    var name = "test1";
	    Ti.API.info("url entered is: "+url);
	    Titanium.App.Properties.setString('url',url);
	    Ti.API.info("url obtained is: "+Titanium.App.Properties.getString('url',"none"));
	    $.save_url_button.hide();
    });

	$.url_tf.addEventListener("focus", function(){
 		$.save_url_button.show();
    });
    
    $.getdatainput.addEventListener('click', function() {
    	var url = Titanium.App.Properties.getString('url',"none");
		getSharedCalendarData(url);
 	});
 	
 	$.url1.addEventListener('click', function() {
    	getUrlMaster();
		//getSharedCalendarData(url);
 	});
 	
 	$.createevent.addEventListener('click', function() {
 		googleAuthCalendar.isAuthorized(function() {
			console.log('Access Token on event creation: ' + googleAuthCalendar.getAccessToken());
			Alloy.Globals.postCreateEvent("2015-03-05T16:15:00-06:00","2015-03-05T16:20:00-06:00");
			//postCreateEvent("2015-02-13T16:10:00-06:00","2015-02-13T16:15:00-06:00");
		}, function() {
			console.log('Authorized first before event creation, see next window: ');
		});
    	
 	});
		 	
};

var GoogleAuth = require('googleAuth');
var googleAuthCalendar = new GoogleAuth({
	clientId : '306793301753-8ej6duert04ksb3abjutpie916l8hcc7.apps.googleusercontent.com',
	clientSecret : 'fjrsVudiK3ClrOKWxO5QvXYL',
	propertyName : 'googleToken',
	scope : ['https://spreadsheets.google.com/feeds', 'https://docs.google.com/feeds','https://www.googleapis.com/auth/calendar','https://www.googleapis.com/auth/calendar.readonly'],
	quiet: false
});


var url = "https://www.google.com/calendar/feeds/idevice.net%40gmail.com/private-bda51ec0064db35a76e6bd97730497e8/basic";

var getSharedCalendarData = function(url) {	
	Ti.API.info("URL is: "+url);
	var thefile = "calendar.txt";
	var data = [];
	//Alloy.Globals.checkGoogleisAuthorized();
	//Alloy.Globals.checkNetworkAndGoogleAuthorized('1gnkP116nsTVxtrw6d_mXVdOiesQEPH7LVUIyHUfx9EE');
	googleAuthCalendar;
	console.log('Access Token for Calendar is: ' + googleAuthCalendar.getAccessToken());
	googleAuthCalendar.isAuthorized(function() {
		console.log('Access Token: ' + googleAuthCalendar.getAccessToken());
		
		var xhr = Ti.Network.createHTTPClient({
		    onload: function(e) {
		    try {
				console.log("response txt is: "+this.responseText);
				var file = Ti.Filesystem.getFile(
					Ti.Filesystem.tempDirectory, thefile
				);
				if(file.exists() && file.writeable) {
				    var success = file.deleteFile();
				    Ti.API.info((success==true) ? 'success' : 'fail'); // outputs 'success'
				}
				file.write(this.responseText);
				} catch(e){
					Ti.API.info("cathing e: "+JSON.stringify(e));
				}
			}
		});
		xhr.onerror = function(e){
			//alert(e);
			alert("Unable to connect to the network. The info displayed here is NOT the latest.");
			console.log("response txt after failure is: "+this.responseText);
		};
		xhr.open("GET", url);
		xhr.send();
		Ti.API.info(" Data were successfuly downloaded from "+url+". Please proceed.");
		
	}, function() {
		console.log('Sh cal Authorized first, see next window: ');
	});
	var url = " ";
};

function getUrlMaster(){
  var master = Alloy.Collections.instance('master');
  master.fetch();
  var masterjson = master.toJSON();
  console.log("masterjson.length "+masterjson.length);
  console.log("masterjson "+masterjson);
  console.log("masterjson[0].col2 "+masterjson[0].col2);
  for( var i=0; i < masterjson.length; i++){
    console.log("url"+i+" is : "+masterjson[i].col2);
    var url = masterjson[i].col2+"?access_token="+googleAuthCalendar.getAccessToken();
    getSharedCalendarData(url);
  }
}

var sample = {
 "start": {
  "dateTime": "2015-02-13T07:40:00-06:00"
 },
 "location": "New Berlin",
 "end": {
  "dateTime": "2015-02-13T07:45:00-06:00"
 }
};

function postCreateEvent(startdateTime,enddateTime,location,summary,description,organizerdisplayName,organizeremail,colorid,attendeeslist) {
	var startdateTime = startdateTime || "2015-02-14T15:30:00-06:00";
	var enddateTime = enddateTime || "2015-02-14T15:40:00-06:00";
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
	xhr.setRequestHeader("Authorization", 'Bearer '+googleAuthCalendar.getAccessToken());
	xhr.send(event);
	Ti.API.info('done POSTed');
}
