var args = arguments[0] || {};
Titanium.App.Properties.setString('selectclient',"false");
exports.openMainWindow = function(_tab) {
  _tab.open($.enterproject_window);
  Ti.API.info("This is child widow schedule.js" +JSON.stringify(_tab));
    Alloy.Globals.checkNetworkAndGoogleAuthorized('1gnkP116nsTVxtrw6d_mXVdOiesQEPH7LVUIyHUfx9EE');
	googleAuth.authorize();
	
};

function addRows(){
 console.log("JSON stringify e : " +JSON.stringify(e));
// Defining new row
var newRow = Ti.UI.createTableViewRow({
title : 'Row ' + ($.enterproject_table.data[0].rowCount + 1)
});
 
// Adding row to the table view
$.enterproject_table.appendRow(newRow);
}


var count = 3; //row where line item is entered
Titanium.App.Properties.setInt('count',count);

function addItem(e,itemTextField){
	var count = Titanium.App.Properties.getInt('count',3);
    console.log("count :" +count);
	//log
	console.log("JSON stringify e : " +JSON.stringify(e));
	Ti.API.info("data length " +$.enterproject_table.data.length);		
	Ti.API.info("table data 0 "+$.enterproject_table.data[0]);
	Ti.API.info("table row count : "+$.enterproject_table.data[0].rowCount);
	console.log("JSON stringify table data 0 : " +JSON.stringify($.enterproject_table.data[0]));
	
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
	$.enterproject_table.insertRowAfter(count,newRow);
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

$.lineitem_tf.addEventListener('blur', function(_e) {
    var clientproject = $.lineitem_tf.value;
    Ti.API.info("clientproject entered is: "+clientproject);
    Titanium.App.Properties.setString('clientproject',clientproject);
    Ti.API.info("clientproject obtained is: "+Titanium.App.Properties.getString('clientproject',"none"));
    console.log("e JSON of textfield: "+JSON.stringify(_e));
 });
 
 var itemvalue =[];

 function saveHandler(){
 	var isSelectClientTrue = Titanium.App.Properties.getString('selectclient');
 	console.log("saving all data ");
 	console.log("isSelectClientTrue is:"+isSelectClientTrue);
 	var tabledata = [];	
 	var getvalue = ["clientfirstname","clientlastname","clientphone","clientemail","clientstreetaddress","clientcity","clientstate","clientcompany"];
 	for (i=0;i<$.enterproject_table.data[0].rowCount;i++) {		
 		console.log("children count : "	+$.enterproject_table.data[0].rows[i].children.length);
 		for (j=0;j<+$.enterproject_table.data[0].rows[i].children.length;j++) { 			
			console.log("JSON stringify table 0 row "+i+' : ' +JSON.stringify($.enterproject_table.data[0].rows[i]));
			console.log("JSON stringify table 0 row "+i+'w/children '+j+' : ' +JSON.stringify($.enterproject_table.data[0].rows[i].children[j]));
			tabledata.push({data1:$.enterproject_table.data[0].rows[i].children[j].id || "none",data2:$.enterproject_table.data[0].rows[i].children[j].value || "none"});
			for (z=0;z<getvalue.length;z++){
				var subject = getvalue[z];
				if ( $.enterproject_table.data[0].rows[i].children[j].id == subject+"_tf") {					
					 	eval("var "+subject+" = $.enterproject_table.data[0].rows[i].children[j].value || $.enterproject_table.data[0].rows[i].children[j].text;");		 
				};
			}		
		};
	};
	console.log("tabledata are: "+JSON.stringify(tabledata));
	console.log("enterproject.js::saveHandler:: detect array dyn variable: "+clientfirstname+","+clientlastname+","+clientphone+","+clientemail+","+clientstreetaddress
	+","+clientcity+","+clientstate+","+clientcompany);
	//once tabledata is populated, find submission value
	var projectname = [];
	var projectdescr = [];
	var lineitem = [];
	var lineitemqty = [];
	var lineitemprice = [];
	for (i=0;i<tabledata.length;i++){
		if (tabledata[i].data1 == "projectname_tf") {  projectname.push({ name:tabledata[i].data2 }); };
		if (tabledata[i].data1 == "projectdescr_tf") {  projectdescr.push({ descr:tabledata[i].data2 }); };
		if (tabledata[i].data1 == "lineitem_tf") {  lineitem.push({ item:tabledata[i].data2}); };
		if (tabledata[i].data1 == "lineitemqty_tf") {  lineitemqty.push({ itemqty:tabledata[i].data2 }); };
		if (tabledata[i].data1 == "lineitemprice_tf") {  lineitemprice.push({ itemprice:tabledata[i].data2 }); };
	}
	console.log("lineitem: "+JSON.stringify(lineitem));
	console.log("lineitemqty: "+JSON.stringify(lineitemqty));
	console.log("lineitemprice: "+JSON.stringify(lineitemprice));
	var item = [];
	item.push({'descr':projectdescr[0].descr});
	for (i=0;i<lineitem.length;i++){
		item.push({
			'lineitem':lineitem[i].item,
			'qty':lineitemqty[i].itemqty,
			'price':lineitemprice[i].itemprice
		});
	}
	console.log("enterproject::saveHandler:JSON.stringify(item): "+JSON.stringify(item));
	var projectnumber = "10";
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
	var clientproject = projectname[0].name;
	var notes = JSON.stringify(item).toString().replace(/:/g,'cOlOn');
	console.log("enterproject.js::saveHandler::clientproject: "+clientproject+" clientfirstname: "+clientfirstname+" clientlastname "+clientlastname);	
	submit(clientproject,clientfirstname,clientlastname,clientcompany,clientphone,clientemail,clientstreetaddress,clientcity,clientstate,country,"pending",notes,"0","6/1/2015","7/1/2015");
	///console.log('submit('+projectnumber+','+name+','+customerno+','+total+','+bal+','+paid+','+lastpaiddate+','+followupdate+','+clientphone+','+clientemail+','+duedate+','
	///+currency+','+status+')');
 }; 
 
 function submit(clientproject,clientfirstname,clientlastname,clientcompany,clientphone,clientemail,clientstreetaddress,clientcity,clientstate,country,status,notes,percentcompletion,nextappt,datedue) {	
 	var now = Date.now();
	var xmldatastring = '<entry xmlns=\'http://www.w3.org/2005/Atom\' xmlns:gsx=\'http://schemas.google.com/spreadsheets/2006/extended\'>'
	+'<gsx:col1>'+clientproject+'</gsx:col1><gsx:col2>'+clientfirstname+'</gsx:col2><gsx:col3>'
	+clientlastname+'</gsx:col3><gsx:col4>'+clientcompany+'</gsx:col4><gsx:col5>'
	+clientphone+'</gsx:col5><gsx:col6>'+clientemail+'</gsx:col6><gsx:col7>'+clientstreetaddress+'</gsx:col7><gsx:col8>'+clientcity+'</gsx:col8><gsx:col9>'+clientstate
	+'</gsx:col9><gsx:col10>'+country+'</gsx:col10><gsx:col11>'+status+'</gsx:col11><gsx:col12>'+notes+'</gsx:col12><gsx:col13>'+percentcompletion+'</gsx:col13><gsx:col14>'+nextappt+'</gsx:col14><gsx:col15>'+datedue
	+'</gsx:col15><gsx:col16>'+now+'</gsx:col16></entry>';
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
    		Ti.API.info("enterproject.js::submit: self href is : "+selfhref+" edit href is: "+edithref);
    		Ti.API.info("enterproject.js::submit: idtag is : "+idtag);
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
    var spreadsheet_id = Titanium.App.Properties.getString('project');
	xhr.open("POST", 'https://spreadsheets.google.com/feeds/list/'+spreadsheet_id+'/od6/private/full');
	xhr.setRequestHeader("Content-type", "application/atom+xml");
	xhr.setRequestHeader("Authorization", 'Bearer '+ googleAuth.getAccessToken());
	xhr.send(xmldatastring);
	Ti.API.info('done POSTed');

 }
 
 $.enterproject_window.addEventListener('click',function(e){
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
 var selectclientrow = [ $.existing, $.clientselect_row, $.itemline_row, $.itemdetail_row, $.addrow_row, $.itemlineend_row,$.totalrow ];

if (args.title) {
	selectClient(args);
	$.enterproject_table.setData(selectclientrow)	;
} else {
	$.enterproject_table.setData(addnewclientrow)	;
	Titanium.App.Properties.setString('selectclient',"false");
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

$.check_client.addEventListener('click', function(e){
	var clientController = Alloy.createController('client',{
			sourcecall: 'enterproject'
		});
	clientController.openMainWindow($.enterproject_tab);
	
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



$.enterproject_table.addEventListener('click', function(e){
	console.log("JSON stringify after table row is clicked : " +JSON.stringify(e));
		 	$.lineitem_tf.blur();
	 	$.lineitemqty_tf.blur();
	 	$.lineitemprice_tf.blur();
});
 



 