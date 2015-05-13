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


var count = 3; //row where line item is entered
Titanium.App.Properties.setInt('count',count);

function addItem(e,itemTextField){
	var count = Titanium.App.Properties.getInt('count',3);
    console.log("count :" +count);
	//log
	console.log("JSON stringify e : " +JSON.stringify(e));
	Ti.API.info("data length " +$.enterclient_table.data.length);		
	Ti.API.info("table data 0 "+$.enterclient_table.data[0]);
	Ti.API.info("table row count : "+$.enterclient_table.data[0].rowCount);
	console.log("JSON stringify table data 0 : " +JSON.stringify($.enterclient_table.data[0]));
	
	var itemval = count - 1;
	// Defining new test field
	var itemLabellist = Ti.UI.createLabel({
		id:"tflabellist" , 
		text:'Line item ' + itemval+' : ',
		font : {
			fontSize: '14',
			fontweight : 'normal'
		},
		left: '20',
		top: '10',
		color: "#3B708A"
		});
	var itemTextField = Titanium.UI.createTextField({
		id:"lineitem_tf",
		borderColor : 'white', // border color
    	width: Ti.UI.FILL,
    	left:'120',
    	top: '12',
    	font: {fontSize: '14'}
		});
	var itemLabelqty = Ti.UI.createLabel({
		id:"linetflabelqty" , 
		text:'qty(opt) : ',
		font : {
			fontSize: '14',
			fontweight : 'normal'
		},
		top: '30',
		left: '20',
		color: "#3B708A"
		});
	var itemTextFieldqty = Titanium.UI.createTextField({
		id:"lineitemqty_tf",
		borderColor : 'white', // border color
    	top: '32',
    	left: '90',
    	width: '40',
    	hintText: '1',
    	width: '60',
    	keyboardType: Ti.UI.KEYBOARD_NUMBER_PAD,
    	returnKeyType : Ti.UI.RETURNKEY_DONE,
    	font: {fontSize: '14'}
		});
	var itemLabelprice = Ti.UI.createLabel({
		id:"linetflabelqty" , 
		text:'price(opt) : ',
		font : {
			fontSize: '14',
			fontweight : 'normal'
		},
		top: '30',
		left: '180',
		color: "#3B708A"
		});
	var itemTextFieldprice = Titanium.UI.createTextField({
		id:"lineitemprice_tf",
		borderColor : 'white', // border color
       	top: '32',
		left: '260',
		hintText: '160',
		width: '80',
		keyboardType: Ti.UI.KEYBOARD_DECIMAL_PAD,
		returnKeyType: Ti.UI.RETURNKEY_DONE, 
		border: 1, 
		width: 100,
    	font: {fontSize: '14'}
		});
	var toolbarDone = Ti.UI.createButton({systemButton: Titanium.UI.iPhone.SystemButton.DONE});
	var flexSpace = Titanium.UI.createButton({systemButton : Titanium.UI.iPhone.SystemButton.FLEXIBLE_SPACE});
	toolbarDone.addEventListener('click', function(){
		itemTextFieldprice.blur();
	});
	itemTextFieldprice.keyboardToolbarColor = '#80c342';
	itemTextFieldprice.keyboardToolbar = [flexSpace, toolbarDone];
	// Defining new row
	var newRow = Ti.UI.createTableViewRow({
		height: '50',
		borderColor : 'white',
		backgroundColor : "white"
	});
	newRow.add(itemLabellist);
	newRow.add(itemTextField);
	newRow.add(itemLabelqty);
	newRow.add(itemTextFieldqty);
	newRow.add(itemLabelprice);
	newRow.add(itemTextFieldprice);
    
	// Adding row to the table view
	$.enterclient_table.insertRowAfter(count,newRow);
	var count = count+1;
	console.log("new count :" +count);
	Titanium.App.Properties.setInt('count',count);
	
	itemTextField.addEventListener('blur', function(_e) {
 	var clientclient = itemTextField.value;
 	Ti.API.info("clientclient entered in dyn field is: "+clientclient);
 	console.log("e JSON of textfield: "+JSON.stringify(_e));
 });
 
	//var textfield = Ti.UI.createTextField({keyboardType: Ti.UI.KEYBOARD_NUMBER_PAD, returnKeyType: Ti.UI.RETURNKEY_DONE, backgroundColor: '#262626', border: 1, width: 100});

}

$.lineitem_tf.addEventListener('blur', function(_e) {
    var clientclient = $.lineitem_tf.value;
    Ti.API.info("clientclient entered is: "+clientclient);
    Titanium.App.Properties.setString('clientclient',clientclient);
    Ti.API.info("clientclient obtained is: "+Titanium.App.Properties.getString('clientclient',"none"));
    console.log("e JSON of textfield: "+JSON.stringify(_e));
 });
 
 var itemvalue =[];

 function saveHandler(){
 	console.log("saving all data ");
 	var tabledata = [];	
 	var getvalue = ["clientfirstname","clientlastname","clientphone","clientemail","clientstreetaddress","clientcity","clientstate","clientcompany"];
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
	var clientname = [];
	var clientdescr = [];
	var lineitem = [];
	var lineitemqty = [];
	var lineitemprice = [];
	for (i=0;i<tabledata.length;i++){
		if (tabledata[i].data1 == "clientname_tf") {  clientname.push({ name:tabledata[i].data2 }); };
		if (tabledata[i].data1 == "clientdescr_tf") {  clientdescr.push({ descr:tabledata[i].data2 }); };
		if (tabledata[i].data1 == "lineitem_tf") {  lineitem.push({ item:tabledata[i].data2}); };
		if (tabledata[i].data1 == "lineitemqty_tf") {  lineitemqty.push({ itemqty:tabledata[i].data2 }); };
		if (tabledata[i].data1 == "lineitemprice_tf") {  lineitemprice.push({ itemprice:tabledata[i].data2 }); };
	}
	console.log("lineitem: "+JSON.stringify(lineitem));
	console.log("lineitemqty: "+JSON.stringify(lineitemqty));
	console.log("lineitemprice: "+JSON.stringify(lineitemprice));
	var item = [];
	item.push({'descr':clientdescr[0].descr});
	for (i=0;i<lineitem.length;i++){
		item.push({
			'lineitem':lineitem[i].item,
			'qty':lineitemqty[i].itemqty,
			'price':lineitemprice[i].itemprice
		});
	}
	console.log("enterclient::saveHandler:JSON.stringify(item): "+JSON.stringify(item));
	var clientnumber = "10";
	var name = clientfirstname+' '+clientlastname;
	var customerno = "2";
	var total = "200";
	var bal = "200";
	var paid = "50%";
	var lastpaiddate = "4/1/2015";
	var followupdate = "5/1/2015";
	var duedate = "6/1/2015";
	var currency = "USD";
	var status = "owed";
	var country = "USA";
	var clientclient = clientname[0].name;
	var notes = JSON.stringify(item).toString().replace(/:/g,'cOlOn');
	console.log("enterclient.js::saveHandler::clientclient: "+clientclient+" clientfirstname: "+clientfirstname+" clientlastname "+clientlastname);	
	submit(clientclient,clientfirstname,clientlastname,clientcompany,clientphone,clientemail,clientstreetaddress,clientcity,clientstate,country,"pending",notes,"0","6/1/2015","7/1/2015");
	///console.log('submit('+clientnumber+','+name+','+customerno+','+total+','+bal+','+paid+','+lastpaiddate+','+followupdate+','+clientphone+','+clientemail+','+duedate+','
	///+currency+','+status+')');
 }; 
 
 function submit(clientclient,clientfirstname,clientlastname,clientcompany,clientphone,clientemail,clientstreetaddress,clientcity,clientstate,country,status,notes,percentcompletion,nextappt,datedue) {	
 	var now = Date.now();
	var xmldatastring = '<entry xmlns=\'http://www.w3.org/2005/Atom\' xmlns:gsx=\'http://schemas.google.com/spreadsheets/2006/extended\'>'
	+'<gsx:col1>'+now+'</gsx:col1><gsx:col2>'+clientfirstname+'</gsx:col2><gsx:col3>'
	+clientlastname+'</gsx:col3><gsx:col4>'+clientcompany+'</gsx:col4><gsx:col5>'
	+clientphone+'</gsx:col5><gsx:col6>'+clientemail+'</gsx:col6><gsx:col7>'+clientstreetaddress+'</gsx:col7><gsx:col8>'+clientcity+'</gsx:col8><gsx:col9>'+clientstate
	+'</gsx:col9><gsx:col10>'+country+'</gsx:col10><gsx:col11>NA</gsx:col11><gsx:col12>NA</gsx:col12><gsx:col13>NA</gsx:col13><gsx:col14>'+now+'</gsx:col14><gsx:col15>NA'
	+'</gsx:col15><gsx:col16>'+now+'</gsx:col16></entry>';
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
 
 $.enterclient_window.addEventListener('click',function(e){
	 	$.lineitem_tf.blur();
	 	$.lineitemqty_tf.blur();
	 	$.lineitemprice_tf.blur();
	 });
	 
 $.clientdetail_row.addEventListener('click',function(e){
	 	allTFBlur();
	 });
 
  function allTFBlur(){
 		$.lineitem_tf.blur();
	 	$.lineitemqty_tf.blur();
	 	$.lineitemprice_tf.blur();
 };
 
var addnewclientrow = [ $.existing, $.clientdetail_row, $.itemline_row, $.itemdetail_row, $.addrow_row, $.itemlineend_row,$.totalrow ];

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
		 	$.lineitem_tf.blur();
	 	$.lineitemqty_tf.blur();
	 	$.lineitemprice_tf.blur();
});
 



 