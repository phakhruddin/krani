var args = arguments[0] || {};
Titanium.App.Properties.setString('selectclient',"false");
exports.openMainWindow = function(_tab) {
  _tab.open($.enterinvoice_window);
  Ti.API.info("This is child widow enterinvoice.js" +JSON.stringify(_tab));
    Alloy.Globals.checkNetworkAndGoogleAuthorized('1gnkP116nsTVxtrw6d_mXVdOiesQEPH7LVUIyHUfx9EE');
	//Alloy.Globals.checkGoogleisAuthorized();
	googleAuth.authorize();

};

console.log("enterinvoice.js::JSON.stringify(args) : "+JSON.stringify(args));


if(args.title){
	var data = args.title.split(':');
	var name = data[0];
	var firstname = data[1];
	var lastname = data[2];
	var name = firstname+" "+lastname;
	var company = data[3];
	var phone = data[4];
	var email = data[5];
	var address = data[6];
	var city = data[7];
	var state = data[8];
	var country = data[9];
	var customerid = data[15];
	(firstname)?$.invoiceclientfirstname_tf.value=firstname:$.invoiceclientfirstname_tf.value=" ";
	(lastname)?$.invoiceclientlastname_tf.value=lastname:$.invoiceclientlastname_tf.value=" ";
	(company)?$.invoiceclientcompany_tf.value=company:$.invoiceclientcompany_tf.value=" ";
	(phone)?$.invoiceclientphone_tf.value=phone:$.invoiceclientphone_tf.value=" ";
	(email)?$.invoiceclientemail_tf.value=email:$.invoiceclientemail_tf.value=" ";
	(address)?$.invoiceclientstreetaddress_tf.value=address:$.invoiceclientstreetaddress_tf.value=" ";
	(city)?$.invoiceclientcity_tf.value=city:$.invoiceclientcity_tf.value=" ";
	(state)?$.invoiceclientstate_tf.value=state:$.invoiceclientstate_tf.value=" ";
	(firstname)?$.savebutton.input = firstname+":"+lastname:"";
}


function addRows(){
 console.log("JSON stringify e : " +JSON.stringify(e));
// Defining new row
var newRow = Ti.UI.createTableViewRow({
title : 'Row ' + ($.enterinvoice_table.data[0].rowCount + 1)
});
 
// Adding row to the table view
$.enterinvoice_table.appendRow(newRow);
}


var count = 3; //row where line item is entered
Titanium.App.Properties.setInt('count',count);

function addItem(e,itemTextField){
	var count = Titanium.App.Properties.getInt('count',3);
    console.log("count :" +count);
	//log
	console.log("JSON stringify e : " +JSON.stringify(e));
	Ti.API.info("data length " +$.enterinvoice_table.data.length);		
	Ti.API.info("table data 0 "+$.enterinvoice_table.data[0]);
	Ti.API.info("table row count : "+$.enterinvoice_table.data[0].rowCount);
	console.log("JSON stringify table data 0 : " +JSON.stringify($.enterinvoice_table.data[0]));
	/*
	for (i=0;i<$.enterinvoice_table.data[0].rowCount;i++) {			
		Ti.API.info($.enterinvoice_table.data[0].rows[i]);		
		console.log("JSON stringify table 0 row "+i+' : ' +JSON.stringify($.enterinvoice_table.data[0].rows[i]));
	}*/
	var itemval = count - 1;
	// Defining new test field
	var itemLabellist = Ti.UI.createLabel({
		id:"tflabellist" , 
		text:'item ' + itemval+' : ',
		font : {
			fontSize: '14',
			fontweight : 'normal'
		},
		left: '20',
		top: '10',
		color: "#3B708A"
		});
	var itemTextField = Titanium.UI.createTextField({
		id:"itemlist_tf",
		borderColor : 'white', // border color
    	width: Ti.UI.FILL,
    	left:'80',
    	top: '12',
    	font: {fontSize: '14'}
		});
	var itemLabelqty = Ti.UI.createLabel({
		id:"tflabelqty" , 
		text:'qty : ',
		font : {
			fontSize: '14',
			fontweight : 'normal'
		},
		top: '30',
		left: '20',
		color: "#3B708A"
		});
	var itemTextFieldqty = Titanium.UI.createTextField({
		id:"itemqty_tf",
		borderColor : 'white', // border color
    	top: '32',
    	left: '60',
    	width: '40',
    	hintText: '1',
    	width: '60',
    	keyboardType: Ti.UI.KEYBOARD_NUMBER_PAD,
    	returnKeyType : Ti.UI.RETURNKEY_DONE,
    	font: {fontSize: '14'}
		});
	var itemLabelprice = Ti.UI.createLabel({
		id:"tflabelqty" , 
		text:'price : ',
		font : {
			fontSize: '14',
			fontweight : 'normal'
		},
		top: '30',
		left: '150',
		color: "#3B708A"
		});
	var itemTextFieldprice = Titanium.UI.createTextField({
		id:"itemprice_tf",
		borderColor : 'white', // border color
       	top: '32',
		left: '200',
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
	$.enterinvoice_table.insertRowAfter(count,newRow);
	var count = count+1;
	console.log("new count :" +count);
	Titanium.App.Properties.setInt('count',count);
	
	itemTextField.addEventListener('blur', function(_e) {
 	var clientproject = itemTextField.value;
 	Ti.API.info("clientproject entered in dyn field is: "+clientproject);
 	console.log("e JSON of textfield: "+JSON.stringify(_e));
 });
 
	//var textfield = Ti.UI.createTextField({keyboardType: Ti.UI.KEYBOARD_NUMBER_PAD, returnKeyType: Ti.UI.RETURNKEY_DONE, backgroundColor: '#262626', border: 1, width: 100});

}

$.itemlist_tf.addEventListener('blur', function(_e) {
    var clientproject = $.itemlist_tf.value;
    Ti.API.info("clientproject entered is: "+clientproject);
    Titanium.App.Properties.setString('clientproject',clientproject);
    Ti.API.info("clientproject obtained is: "+Titanium.App.Properties.getString('clientproject',"none"));
    console.log("e JSON of textfield: "+JSON.stringify(_e));
 });
 
 var itemvalue =[];

 function saveHandler(e,args){
 	console.log("enterinvoice.js::saveHandler::JSON.stringify(e): "+JSON.stringify(e));
 	console.log("enterinvoice.js::saveHandler::JSON.stringify(args): "+JSON.stringify(args));
 	var clientfirstname = e.source.input.split(':')[0];
 	var clientlastname = e.source.input.split(':')[1];
 	console.log("enterinvoice.js::saveHandler::clientfirstname: clientlastname "+clientfirstname+" : "+clientlastname);
 	var isSelectClientTrue = Titanium.App.Properties.getString('selectclient');
 	console.log("saving all data ");
 	console.log("isSelectClientTrue is:"+isSelectClientTrue);
 	var tabledata = [];	
 	if (isSelectClientTrue == false) {
 		var getvalue = ["clientfirstname","clientlastname","clientphone","clientemail","clientstreetaddress","clientcity","clientstate","clientcompany"];
 	for (i=0;i<$.enterinvoice_table.data[0].rowCount;i++) {		
 		console.log("children count : "	+$.enterinvoice_table.data[0].rows[i].children.length);
 		for (j=0;j<+$.enterinvoice_table.data[0].rows[i].children.length;j++) { 			
			console.log("JSON stringify table 0 row "+i+' : ' +JSON.stringify($.enterinvoice_table.data[0].rows[i]));
			console.log("JSON stringify table 0 row "+i+'w/children '+j+' : ' +JSON.stringify($.enterinvoice_table.data[0].rows[i].children[j]));
			tabledata.push({data1:$.enterinvoice_table.data[0].rows[i].children[j].id || "none",data2:$.enterinvoice_table.data[0].rows[i].children[j].value || "none"});
			for (z=0;z<getvalue.length;z++){
				var subject = getvalue[z];
				if ( $.enterinvoice_table.data[0].rows[i].children[j].id == "invoice"+subject+"_tf") {					
					 	eval("var "+subject+" = $.enterinvoice_table.data[0].rows[i].children[j].value || $.enterinvoice_table.data[0].rows[i].children[j].text;");		 
				};
			}		
		};
	};
	console.log("tabledata are: "+JSON.stringify(tabledata));
	console.log("enterinvoice.js::saveHandler:: detect array dyn variable: "+clientfirstname+","+clientlastname+","+clientphone+","+clientemail+","+clientstreetaddress
	+","+clientcity+","+clientstate+","+clientcompany);
	//once tabledata is populated, find submission value
 	}
 	
	var projectname = [];
	var projectdescr = [];
	var item = [];
	var itemqty = [];
	var itemprice = [];
	for (i=0;i<tabledata.length;i++){
		if (tabledata[i].data1 == "projectname_tf") {  projectname.push({ name:tabledata[i].data2 }); };
		if (tabledata[i].data1 == "projectdescr_tf") {  projectdescr.push({ descr:tabledata[i].data2 }); };
		if (tabledata[i].data1 == "item_tf") {  item.push({ item:tabledata[i].data2}); };
		if (tabledata[i].data1 == "itemqty_tf") {  itemqty.push({ itemqty:tabledata[i].data2 }); };
		if (tabledata[i].data1 == "itemprice_tf") {  itemprice.push({ itemprice:tabledata[i].data2 }); };
	}
	console.log("item: "+JSON.stringify(item));
	console.log("itemqty: "+JSON.stringify(itemqty));
	console.log("itemprice: "+JSON.stringify(itemprice));
 	
	console.log("item: "+JSON.stringify(item));
	console.log("itemqty: "+JSON.stringify(itemqty));
	console.log("itemprice: "+JSON.stringify(itemprice));
	var invoicenumber = Date.now();
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
	console.log("clientfirstname: "+clientfirstname+" clientlastname "+clientlastname);	
	(name.match(/[A-Za-z].+/)) && submit(invoicenumber,name,customerno,total,bal,paid,lastpaiddate,followupdate,clientphone,clientemail,duedate,currency,status);
	console.log('submit('+invoicenumber+','+name+','+customerno+','+total+','+bal+','+paid+','+lastpaiddate+','+followupdate+','+clientphone+','+clientemail+','+duedate+','
	+currency+','+status+')');
 }; 
 
 function submit(invoicenumber,name,customerno,total,bal,paid,lastpaiddate,followupdate,clientphone,clientemail,duedate,currency,status) {	
 	var now = new Date();
 	var clientphone = Titanium.App.Properties.getString('clientphone',"none");
 	var clientemail = Titanium.App.Properties.getString('clientemail',"none");
 	var clientstreetaddress = Titanium.App.Properties.getString('clientstreetaddress',"none");
 	var clientcity = Titanium.App.Properties.getString('clientcity',"none");
 	var clientstate = Titanium.App.Properties.getString('clientstate',"none");
 	var clientproject = Titanium.App.Properties.getString('clientproject',"none");
 	var clientcompany = Titanium.App.Properties.getString('clientcompany',"none");
 	//alert("On "+now+" : Info on: "+clientfirstname+" "+clientlastname+" with "+clientphone+" and email "+clientemail+" at "+clientstreetaddress+", "+clientcity+", "+clientstate+". submitted");
 	/*var fcsv = Ti.Filesystem.getFile(Ti.Filesystem.tempDirectory,'enterclient.csv');
 	var ftxt = Ti.Filesystem.getFile(Ti.Filesystem.tempDirectory,'enterclient.txt');
	fcsv.write(now+", "+clientfirstname+", "+clientlastname+", "+clientphone+", "+clientemail+", "+clientstreetaddress+", "+clientcity+", "+clientstate+'\n', true); // write to the file
	ftxt.write(now+", "+clientfirstname+", "+clientlastname+", "+clientphone+", "+clientemail+", "+clientstreetaddress+", "+clientcity+", "+clientstate+'\n', true); // write to the file*/
	var xmldatastring = '<entry xmlns=\'http://www.w3.org/2005/Atom\' xmlns:gsx=\'http://schemas.google.com/spreadsheets/2006/extended\'>'
	+'<gsx:col1>'+invoicenumber+'</gsx:col1><gsx:col2>'+name+'</gsx:col2><gsx:col3>'
	+customerno+'</gsx:col3><gsx:col4>'+total+'</gsx:col4><gsx:col5>'
	+bal+'</gsx:col5><gsx:col6>'+paid+'</gsx:col6><gsx:col7>'+lastpaiddate+'</gsx:col7><gsx:col8>'+followupdate+'</gsx:col8><gsx:col9>'+clientphone
	+'</gsx:col9><gsx:col10>'+clientemail+'</gsx:col10><gsx:col11>'+duedate+'</gsx:col11><gsx:col12>'+currency+'</gsx:col12><gsx:col13>'+status+'</gsx:col13><gsx:col14>NA</gsx:col14><gsx:col15>NA</gsx:col15><gsx:col16>NA</gsx:col16></entry>';
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
    var spreadsheet_id = Titanium.App.Properties.getString('invoice');
	xhr.open("POST", 'https://spreadsheets.google.com/feeds/list/'+spreadsheet_id+'/od6/private/full');
	xhr.setRequestHeader("Content-type", "application/atom+xml");
	xhr.setRequestHeader("Authorization", 'Bearer '+ googleAuth.getAccessToken());
	xhr.send(xmldatastring);
	Ti.API.info('done POSTed');

 }
 
 $.enterinvoice_window.addEventListener('click',function(e){
	 	$.itemlist_tf.blur();
	 	$.itemqty_tf.blur();
	 	$.itemprice_tf.blur();
	 });
	 
 $.clientdetail_row.addEventListener('click',function(e){
	 	allTFBlur();
	 });
 
  function allTFBlur(){
 		$.itemlist_tf.blur();
	 	$.itemqty_tf.blur();
	 	$.itemprice_tf.blur();
 };
 
 var addnewclientrow = [ $.existing, $.clientdetail_row, $.itemline_row, $.itemdetail_row, $.addrow_row, $.itemlineend_row,$.totalrow ];
 var selectclientrow = [ $.existing, $.clientselect_row, $.itemline_row, $.itemdetail_row, $.addrow_row, $.itemlineend_row,$.totalrow ];

if (args.title) {
	selectClient(args);
	$.enterinvoice_table.setData(selectclientrow)	;
	$.coverview.hide();
	$.selectclient_button.hide();
} else {
	$.enterinvoice_table.setData(addnewclientrow)	;
	Titanium.App.Properties.setString('selectclient',"false");
	// required entry
}

function setClientExisting(args) {

}

function selectClient(args) {
	Titanium.App.Properties.setString('selectclient',"true");
	var someDummy = Alloy.Models.dummy;
	console.log("stringify dummy after selectClient :"+JSON.stringify(someDummy));
	someDummy.set('id', '1234');
	someDummy.fetch();
	
			var data = args.title.split(':');
	var name = data[0];
	var firstname = data[1];
	var lastname = data[2];
	var fullname = firstname+" "+lastname;
	var company = data[3];
	var phone = data[4];
	var email = data[5];
	var address = data[6];
	var city = data[7];
	var state = data[8];
	var country = data[9];
	var fulladdress = address+", "+city+". "+state+", "+country;
	var invoice = data[10];
	var project = data[11];
	var proposal = data[12];
	
	console.log("dummy output is: "+fullname);
	
	someDummy.set('fullname', fullname);
	someDummy.set('firstname', firstname);
	someDummy.set('lastname', lastname);
	someDummy.set('company', company);
	someDummy.set('phone', phone);
	someDummy.set('email', email);
	someDummy.set('address', address);
	someDummy.set('fulladdress', fulladdress);
	someDummy.set('city', city);
	someDummy.set('state', state);
	someDummy.set('country', country);
	someDummy.set('firstname', firstname);
	someDummy.set('lastname', lastname);
	someDummy.set('name', name);
	someDummy.set('invoice', invoice);
	someDummy.set('project', project);
	someDummy.set('proposal', proposal);
}

function matchClient() {
	var clientController = Alloy.createController('client',{
			sourcecall: 'enterinvoice'
		});
	console.log("enterinvoice.js:: examine clientController: "+JSON.stringify(clientController));
	clientController.openMainWindow($.enterinvoice_tab);
	$.selectclient_button.hide();
	$.coverview.hide();
	var someDummy = Alloy.Models.dummy;
	console.log("stringify dummy after selectClient :"+JSON.stringify(someDummy));
	someDummy.set('id', '1234');
	someDummy.fetch();
	someDummy.set('searchagain', 'Click here to search again.');
}

$.invoiceclientfirstname_tf.addEventListener("focus",function(e){
	e.source.borderColor = "red";
	$.itemlist_tf.borderColor = "red";
	$.enterinvoice_window.setRightNavButton($.savebutton);
});

$.itemlist_tf.addEventListener("focus",function(e){
	e.source.borderColor = "red";
	$.invoiceclientfirstname_tf.borderColor = "red";
	$.enterinvoice_window.setRightNavButton($.savebutton);
});

$.enterinvoice_window.setRightNavButton();

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



$.enterinvoice_table.addEventListener('click', function(e){
	console.log("JSON stringify after table row is clicked : " +JSON.stringify(e));
		 	$.itemlist_tf.blur();
	 	$.itemqty_tf.blur();
	 	$.itemprice_tf.blur();
});
 



 