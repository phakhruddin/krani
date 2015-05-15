var args = arguments[0] || {};
exports.openMainWindow = function(_tab) {
  _tab.open($.enterclient_window);
  Ti.API.info("This is child widow schedule.js" +JSON.stringify(_tab));
    Alloy.Globals.checkNetworkAndGoogleAuthorized('1gnkP116nsTVxtrw6d_mXVdOiesQEPH7LVUIyHUfx9EE');
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
					 	eval("var "+subject+" = $.enterclient_table.data[0].rows[i].children[j].value || $.enterclient_table.data[0].rows[i].children[j].text;");		 
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
	xhr.open("POST", 'https://spreadsheets.google.com/feeds/list/'+spreadsheet_id+'/od6/private/full');
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
 



 