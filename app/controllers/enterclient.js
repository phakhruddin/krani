var args = arguments[0] || {};
exports.openMainWindow = function(_tab) {
  _tab.open($.enterclient_window);
  Ti.API.info("This is child widow schedule.js" +JSON.stringify(_tab));
    Alloy.Globals.checkNetworkAndGoogleAuthorized('1gnkP116nsTVxtrw6d_mXVdOiesQEPH7LVUIyHUfx9EE');
    Ti.App.Properties.removeProperty('edithref'); //clear ref to previous spreadsheet
    Ti.App.Properties.removeProperty('idtag'); //clear ref to previous spreadsheet
    Ti.App.Properties.removeProperty('selfhref'); //clear ref to previous spreadsheet
	googleAuth.authorize();
	
};

function addRows(){
 console.log("JSON stringify e : " +JSON.stringify(e));
// Defining new row
var newRow = Ti.UI.createTableViewRow({
title : 'Row ' + ($.enterclient_table.data[0].rowCount + 1)
});
 
// Adding row to the table view
$.enterclient_table.appendRow(newRow);
}

$.notes_tf.addEventListener("blur",function(e){
        console.log("enterclient.js::JSON.stringify(e)  :" +JSON.stringify(e));
		var notes = e.value;
});


var count = 3; //row where line item is entered
Titanium.App.Properties.setInt('count',count);
 
 var itemvalue =[];

 function saveHandler(){
 	console.log("saving all data ");
 	var tabledata = [];	
 	var noentry = "none";
 	var getvalue = ["clientfirstname","clientlastname","clientphone","clientemail","clientstreetaddress","clientcity","clientstate","clientcompany","notes"];
 	for (i=0;i<$.enterclient_table.data[0].rowCount;i++) {		
 		console.log("children count : "	+$.enterclient_table.data[0].rows[i].children.length);
 		for (j=0;j<+$.enterclient_table.data[0].rows[i].children.length;j++) { 			
			console.log("JSON stringify table 0 row "+i+' : ' +JSON.stringify($.enterclient_table.data[0].rows[i]));
			console.log("JSON stringify table 0 row "+i+'w/children '+j+' : ' +JSON.stringify($.enterclient_table.data[0].rows[i].children[j]));
			tabledata.push({data1:$.enterclient_table.data[0].rows[i].children[j].id || "none",data2:$.enterclient_table.data[0].rows[i].children[j].value || "none"});
			for (z=0;z<getvalue.length;z++){
				var subject = getvalue[z];
				if ( $.enterclient_table.data[0].rows[i].children[j].id == subject+"_tf") {					
					 	eval("var "+subject+" = $.enterclient_table.data[0].rows[i].children[j].value || $.enterclient_table.data[0].rows[i].children[j].text || noentry;");		 
				};
			}		
		};
	};
	console.log("tabledata are: "+JSON.stringify(tabledata));
	console.log("enterclient.js::saveHandler:: detect array dyn variable: "+clientfirstname+","+clientlastname+","+clientphone+","+clientemail+","+clientstreetaddress
	+","+clientcity+","+clientstate+","+clientcompany);
	//once tabledata is populated, find submission value
	var name = clientfirstname+' '+clientlastname;
	console.log("enterclient.js::saveHandler::clientfirstname: "+clientfirstname+" clientlastname "+clientlastname);	
	submit(clientfirstname,clientlastname,clientcompany,clientphone,clientemail,clientstreetaddress,clientcity,clientstate,"USA","pending",notes,"0","6/1/2015","7/1/2015");
	///console.log('submit('+clientnumber+','+name+','+customerno+','+total+','+bal+','+paid+','+lastpaiddate+','+followupdate+','+clientphone+','+clientemail+','+duedate+','
	///+currency+','+status+')');
 }; 
 
 function submit(clientfirstname,clientlastname,clientcompany,clientphone,clientemail,clientstreetaddress,clientcity,clientstate,country,status,notes,percentcompletion,nextappt,datedue) {	
 	var now = Date.now();
 	var captimestamp = now;
	var xmldatastring = '<entry xmlns=\'http://www.w3.org/2005/Atom\' xmlns:gsx=\'http://schemas.google.com/spreadsheets/2006/extended\'>'
	+'<gsx:col1>'+now+'</gsx:col1><gsx:col2>'+clientfirstname+'</gsx:col2><gsx:col3>'
	+clientlastname+'</gsx:col3><gsx:col4>'+clientcompany+'</gsx:col4><gsx:col5>'
	+clientphone+'</gsx:col5><gsx:col6>'+clientemail+'</gsx:col6><gsx:col7>'+clientstreetaddress+'</gsx:col7><gsx:col8>'+clientcity+'</gsx:col8>'
	+'<gsx:col9>'+clientstate+'</gsx:col9><gsx:col10>'+country+'</gsx:col10><gsx:col11>NA</gsx:col11><gsx:col12>NA</gsx:col12><gsx:col13>NA</gsx:col13><gsx:col14>'+now+'</gsx:col14>'
	+'<gsx:col15>'+notes+'</gsx:col15><gsx:col16>'+now+'</gsx:col16></entry>';
	Ti.API.info('xmldatastring to POST: '+xmldatastring);
	var xhr =  Titanium.Network.createHTTPClient({
    onload: function() {
    	try {
    		Ti.API.info(this.responseText);
    		var xml = Titanium.XML.parseString(this.responseText);
    		var entry = xml.documentElement.getElementsByTagName("entry");
    		var link = xml.documentElement.getElementsByTagName("link");
    		var idtag = xml.documentElement.getElementsByTagName("id").item(0).text;
    		console.log("enterclient.js::submit: number of link found: " +link+ " length: "+link.length);
    		for (i=0;i<link.length;i++){			
    			var listitem = link.item(i);
    			if (listitem.getAttribute("rel") == "edit"){ var edithref = listitem.getAttribute("href");}
    			if (listitem.getAttribute("rel") == "self"){ var selfhref = listitem.getAttribute("href");}
    		}
    		Titanium.App.Properties.setString('edithref',edithref);
    		Titanium.App.Properties.setString('idtag',idtag);
    		Titanium.App.Properties.setString('selfhref',selfhref);
    		Ti.API.info("enterclient.js::submit: self href is : "+selfhref+" edit href is: "+edithref);
    		Ti.API.info("enterclient.js::submit: idtag is : "+idtag);
    	} catch(e){
    		Ti.API.info("cathing e: "+JSON.stringify(e));
    	}     
    },
    onerror: function(e) {
    	Ti.API.info("error e: "+JSON.stringify(e));
        alert("Unable to communicate to the cloud. Please try again."); 
    }
});
    //var spreadsheet_id = '1-Wz7Apn4AvVpfqcNyMgfqyKA8OAoLNy5Bl0d_jQ9IZk';
    var spreadsheet_id = Titanium.App.Properties.getString('client');
    var existingedithref = Titanium.App.Properties.getString('edithref');
    var idtag = Titanium.App.Properties.getString('idtag');
    var edithref = existingedithref;
    var selfhref = Titanium.App.Properties.getString('selfhref');
    console.log("enterclient.js::submit::existing edit href is: "+existingedithref);
	if (existingedithref) {
			console.log("enterclient.js::submit::POST on existing edit href is: "+existingedithref);
			xhr.open("PUT", existingedithref);
			var xmldatastring = '<entry xmlns=\'http://www.w3.org/2005/Atom\' xmlns:gsx=\'http://schemas.google.com/spreadsheets/2006/extended\'>'
				+'<id>'+idtag+'</id>'
				+'<updated>2015-05-16T08:01:19.680Z</updated>'
				+'<category scheme=\'http://schemas.google.com/spreadsheets/2006\' term=\'http://schemas.google.com/spreadsheets/2006#list\'/>'
				+'<title type=\'text\'>'+captimestamp+'</title>'
				+'<content type=\'text\'>col2: '+clientfirstname+', col3: '+clientlastname+', col4: '+clientcompany+', col5: '+clientphone+', col6: '+clientemail+', col7: '+clientstreetaddress
				+', col8: '+clientcity+', col9: '+clientstate+', col10: '+country+', col11: NA, col12: NA, col13: NA, col14: '+captimestamp+', col15: none, col16: '+now+'</content>'
				+'<link rel=\'self\' type=\'application/atom+xml\' href=\''+selfhref+'\'/>'
				+'<link rel=\'edit\' type=\'application/atom+xml\' href=\''+edithref+'\'/>'
				+'<gsx:col1>'+now+'</gsx:col1><gsx:col2>'+clientfirstname+'</gsx:col2><gsx:col3>'
				+clientlastname+'</gsx:col3><gsx:col4>'+clientcompany+'</gsx:col4><gsx:col5>'
				+clientphone+'</gsx:col5><gsx:col6>'+clientemail+'</gsx:col6><gsx:col7>'+clientstreetaddress+'</gsx:col7><gsx:col8>'+clientcity+'</gsx:col8>'
				+'<gsx:col9>'+clientstate+'</gsx:col9><gsx:col10>'+country+'</gsx:col10><gsx:col11>NA</gsx:col11><gsx:col12>NA</gsx:col12><gsx:col13>NA</gsx:col13><gsx:col14>'+now+'</gsx:col14>'
				+'<gsx:col15>'+notes+'</gsx:col15><gsx:col16>'+now+'</gsx:col16></entry>';
			Ti.API.info('xmldatastring existing to PUT: '+xmldatastring);
		} else {
			xhr.open("POST", 'https://spreadsheets.google.com/feeds/list/'+spreadsheet_id+'/od6/private/full');
		} 
	xhr.setRequestHeader("Content-type", "application/atom+xml");
	xhr.setRequestHeader("Authorization", 'Bearer '+ googleAuth.getAccessToken());
	xhr.send(xmldatastring);
	Ti.API.info('done POSTed');

 }
 
 
var addnewclientrow = [ $.existing, $.clientdetail_row, $.itemline_row, $.itemdetail_row, $.addrow_row, $.itemlineend_row ];

$.enterclient_table.setData(addnewclientrow)	;

$.check_client.addEventListener('click', function(e){
	var clientController = Alloy.createController('client',{
			sourcecall: 'enterclient'
		});
	clientController.openMainWindow($.enterclient_tab);
	
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
	//scope : ['https://spreadsheets.google.com/feeds', 'https://docs.google.com/feeds'],
});



$.enterclient_table.addEventListener('click', function(e){
	console.log("JSON stringify after table row is clicked : " +JSON.stringify(e));
	$.notes_tf.blur();
});
 



 