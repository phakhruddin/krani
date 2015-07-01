var args = arguments[0] || {};
exports.openMainWindow = function(_tab) {
  _tab.open($.invoicedetail_window);
  Ti.API.info("This is child widow checking _tab on : " +JSON.stringify(_tab));
  Ti.API.info(" input details : "+JSON.stringify(args));
  prefetchPayment(); //prefetch payment to get existing sid or to create new
  $.totalbalance_row.addEventListener("click", function(e){
  	    var firstname = e.row.firstname;
  	    var lastname = e.row.lastname;
  	    var invoicenumber = e.row.invoicenumber;
	  	var sid = e.row.sid;
	  	console.log("invoicedetail.js::detailAction:: JSON.stringify(e) "+JSON.stringify(e)+" with : "+firstname+" "+lastname+" : "+invoicenumber+" : "+sid);
		if (sid){	
			var tabViewOneController = Alloy.createController("enterpayment",{
				title: args,
				firstname : firstname,
				lastname : lastname,
				invoicenumber : invoicenumber,
				sid : sid
			});
			tabViewOneController.openMainWindow($.tab_invoicedetail);
		} else {
			alert("Loading data from the cloud. Please click OK and try again.");
		}
  });
};
Alloy.Collections.adhoc.deleteAll(); //reset adhoc tables.
var someDummy = Alloy.Models.dummy;
console.log("stringify dummy :"+JSON.stringify(someDummy));
someDummy.set('id', '1234');
someDummy.fetch();

console.log("invoicedetail.js::checking JSON.stringify(args) prior to eval : " +JSON.stringify(args));
var data = args.title.split(':');
var invoicenumber = data[0]; $.totalbalance_row.invoicenumber = invoicenumber;
var firstname = data[1]; $.totalbalance_row.firstname = firstname;
var lastname = data[2]; $.totalbalance_row.lastname = lastname;
var total = data[3];
var balance = data[4];
var paid = data[5];
var lastpaiddate = data[6];
var followupdate = data[7];
var phone = data[8];
var email = data[9];
var duedate = data[10];
var notes = data[11];
var status = data[12];
var currency = data[14];
var filename = 'payment_'+invoicenumber+'_'+firstname+'_'+lastname; $.totalbalance_row.filename = filename;
var idtag = data[13].replace(/xCoLoNx/g,',').split(',')[0].replace('yCoLoNy',':');
var selfhref = data[13].replace(/xCoLoNx/g,',').split(',')[1].replace('yCoLoNy',':');
var edithref = data[13].replace(/xCoLoNx/g,',').split(',')[2].replace('yCoLoNy',':');

if (balance == 0){
	$.phone_button.hide();
	$.email_button.hide();
	$.noaction_button.show();
	$.followupdate.hide();
	$.duedate.hide();
	$.balance1.hide();
	$.balance2.show();
} else {
	$.phone_button.show();
	$.email_button.show();
	$.noaction_button.hide();
	$.followupdate.show();
	$.duedate.show();
	$.balance1.show();
	$.balance2.hide();
}

someDummy.set('invoicenumber', 'Invoice#: '+invoicenumber);
someDummy.set('firstname', firstname);
someDummy.set('lastname', lastname);
someDummy.set('phone', '    phone: '+phone);
someDummy.set('email', '    email: '+email);
someDummy.set('total', 'Total: '+total);
someDummy.set('balance', balance);
someDummy.set('paid', 'Paid: '+paid);
someDummy.set('lastpaiddate', 'Last paid date: ' +lastpaiddate);
someDummy.set('followupdate', 'Follow-up date: '+followupdate);
someDummy.set('duedate','Due date: ' +duedate);
someDummy.set('notes', 'Notes: '+notes);
someDummy.set('status', 'Status: '+status);
someDummy.set('currency', currency);

console.log("invocedetail.js:: firstname and lastname is: "+firstname+" "+lastname);

//Locate customer id.
	var clients = Alloy.Collections.instance('client');
	clients.fetch();		
	var theclient = clients.where({
		col2:firstname,
		col3:lastname
		}); //FILTER
	if(theclient.length > 0){
		console.log("invocedetail.js:: JSON.stringify(theclient): "+JSON.stringify(theclient));
		var uniqueid = theclient[0].toJSON().col1;
		var company = theclient[0].toJSON().col4;
		var phone = theclient[0].toJSON().col5;
		var email = theclient[0].toJSON().col6;		
		var address = theclient[0].toJSON().col7;
		var city = theclient[0].toJSON().col8;
		var state = theclient[0].toJSON().col9;	
		console.log("invocedetail.js:: uniqueid: "+uniqueid);
	} else {
		alert("could not locate "+firstname+" "+lastname+" . Please try again.");
	}
	someDummy.set('customernumber', 'Customer#: '+(uniqueid)?uniqueid:"0000000000000");
	
//Locate jobs.
if (uniqueid && uniqueid.match(/[0-9]/g)){
	projectitemsarray = [];
	projectnamesarray = [];
	var projects = Alloy.Collections.instance('project');
	projects.fetch();
	var theproject = projects.where({
		col13:uniqueid
		}); //FILTER
	if(theproject.length > 0){
		console.log("invocedetail.js:: JSON.stringify(theproject): "+JSON.stringify(theproject));
		for (i=0;i<theproject.length;i++){
			var projectnames = theproject[i].toJSON().col1;
			var projectitems = theproject[i].toJSON().col12;
			projectitemsarray.push(projectitems);
			projectnamesarray.push(projectnames);
		}
		console.log("invocedetail.js:: JSON.stringify(projectitemsarray): "+JSON.stringify(projectitemsarray));
	}
}

if(projectitemsarray.length>0){
	
for (i=0;i<projectitemsarray.length;i++) {
	console.log("invocedetail.js:: JSON.stringify(projectnamesarray): "+JSON.stringify(projectnamesarray));	
	var projectitems = JSON.parse(projectitemsarray[i].replace(/cOlOn/g,":").toString());
	console.log("invocedetail.js:: JSON.stringify(projectitems): "+JSON.stringify(projectitems));
	for (j=0;j<projectitems.length;j++){
		if (j==0){console.log("invocedetail.js:: projectitems[0].descr: "+projectitems[j].descr);};	
		if (j>0){console.log("invocedetail.js:: projectitems["+j+"].lineitem: "+projectitems[j].lineitem);};			
		}	
	}	
}

/// processing array in notes
if (projectitemsarray.length>0) {
	var topvalue = 10;
	for (x=0;x<projectitemsarray.length;x++) {
		var projectitems = JSON.parse(projectitemsarray[x].replace(/cOlOn/g,":").toString());   // replacing all cOlOn to ':'
		var projectname = projectnamesarray[x];
		console.log("invocedetail.js:: createRow: projectnamesarray["+x+"]: "+projectnamesarray[x]);
		console.log("invocedetail.js:: createRow: JSON.stringify(projectitems): "+JSON.stringify(projectitems));
		console.log("invoicedetail.js::topvalue at START : "+topvalue);
		topvalue = topvalue + 8;
		var projectidentification=projectnamesarray[x].trim().replace(/\s/g,'_'); //
		var projectinfoarray=[];
		var unchecked = Ti.UI.createButton({
			id: projectidentification,
			top: topvalue,
			left: "85%",
			height : 30,
			width : 30,
			image : "square82.png"
		});
		var checked = Ti.UI.createButton({
			top: topvalue,
			left: "85%",
			height : 30,
			width : 30,
			image : "check70.png"
		});
		var projectnamelabel = Ti.UI.createLabel ({
			color : "#333",
			textAlign : "Ti.UI.TEXT_ALIGNMENT_LEFT",
			left : "20",
			top : topvalue,
			font:{
				fontSize:16,
				fontWeight: "bold"
			},
			text : projectnamesarray[x].trim()
		});
		var descr = projectitems[0].descr;
		topvalue = topvalue + 25;
		var descrtitlelabel = Ti.UI.createLabel ({
			left  : "20",
			textAlign : "Ti.UI.TEXT_ALIGNMENT_LEFT",
			top : topvalue,
			font:{
				fontSize:14
			},
			text : 'Description: '
		});
		var descrbodylabel = Ti.UI.createLabel ({
			color : "#333",
			left  : "120",
			textAlign : "Ti.UI.TEXT_ALIGNMENT_LEFT",
			top : topvalue,
			font:{
				fontSize:12
			},
			text : descr
		});
		var innerview = Ti.UI.createView({
	        width:"90%",
	        height:"85%",
	        backgroundColor:"white",
	        borderRadius:"10",
	        borderWidth:"0.1",
	        borderColor:"white"
		});	
		$.jobitem_row.add(projectnamelabel);
		$.jobitem_row.add(unchecked);
		$.jobitem_row.add(descrtitlelabel);
		$.jobitem_row.add(descrbodylabel);
		topvalue=topvalue+20;
		var itemtitlelabel = Ti.UI.createLabel ({
			left  : "20",
			textAlign : "Ti.UI.TEXT_ALIGNMENT_LEFT",
			top : topvalue,
			font:{
				fontSize:14
			},
			text : 'List Item :'
		});
		if ( projectitems.length > 1) {$.jobitem_row.add(itemtitlelabel); }
		for (i=1;i<projectitems.length;i++){
			topvalue=topvalue+14;
			var itembodylabel = Ti.UI.createLabel ({
				color : "#333",
				left  : "20",
				textAlign : "Ti.UI.TEXT_ALIGNMENT_LEFT",
				top : topvalue,
				font:{
					fontSize:12
				},
				text : i+' :    '+projectitems[i].lineitem
			});	
			topvalue=topvalue+14;
			var itemqtylabel = Ti.UI.createLabel ({
				color : "#333",
				left  : "50%",
				textAlign : "Ti.UI.TEXT_ALIGNMENT_LEFT",
				top : topvalue,
				font:{
					fontSize:10
				},
				text : 'Qty :'+projectitems[i].qty
			});
			var itempricelabel = Ti.UI.createLabel ({
				color : "#333",
				left  : "75%",
				textAlign : "Ti.UI.TEXT_ALIGNMENT_LEFT",
				top : topvalue,
				font:{
					fontSize:10
				},
				text : 'Price : '+projectitems[i].price
			});	

			$.jobitem_row.add(itembodylabel);
			$.jobitem_row.add(itemqtylabel);
			$.jobitem_row.add(itempricelabel);
			$.jobitem_row.iteminfo=[projectitems[i].lineitem,projectitems[i].qty,projectitems[i].price];
			var info={"names":projectnamesarray[x].trim(),"descr":projectitems[0].descr,"lineitem":projectitems[i].lineitem,"qty":projectitems[i].qty,"price":projectitems[i].price};
			projectinfoarray.push(info);
			unchecked.titleid=projectinfoarray;
			checked.titleid=projectinfoarray;
			console.log("invoicedetail.js::topvalue at Sub END : "+topvalue);
		}
		topvalue=topvalue+20;
		var grayline = Ti.UI.createImageView({
			image: "grayline.png",
			height: "2",
			width: "90%",
			left: "20",
			top: topvalue
		});	
		$.jobitem_row.add(grayline);
		projectinfoarray=[];
		topvalue = topvalue + 4;
		console.log("invoicedetail.js::topvalue at END : "+topvalue);	
	}
};

//prep adhoc tables.
var adhocs = Alloy.Collections.instance('adhoc');

//selection on invoce.
$.jobitem_row.addEventListener("click",function(e){
	console.log("invoicedetail.js::jobitem_row event listener: JSON.stringify(e): "+JSON.stringify(e));
	if (e.source.image=="square82.png"){
		console.log("invoicedetail.js::after "+e.source.image+" clicked: JSON.stringify(e): "+JSON.stringify(e));
		console.log("invoicedetail.js::after "+e.source.image+" clicked: retrieved JSON.stringify(e.source.titleid): "+JSON.stringify(e.source.titleid));
		var info=e.source.titleid;
		var infostring = JSON.stringify(e.source.titleid);
		var infostringmod = infostring.replace(/\[/g,"xSqBracketOpen").replace(/\]/g,"xSqBracketClose");
		console.log("invoicedetail.js::after "+e.source.image+" clicked: retrieved project name at Pos 0 again: "+info[0].names);
		e.source.image="check70.png";
		var itemid = Date.now().toString();
		//update adhoc table.
		var dataModel = Alloy.createModel("adhoc",{
                                        col1 :  itemid,
                                        col2 : info[0].names,
                                        col3 : infostringmod, 
                                        //col4:	projectitems[i].price
                                });     
        dataModel.save();
		adhocs.fetch();
		console.log("invoicedetail.js:: aftere adhocs add & fetch: "+JSON.stringify(adhocs));
		// tag source with itemid
		e.source.itemid=itemid;
		console.log("invoicedetail.js::itemid, "+itemid+", stamp to "+e.source.image+" clicked: JSON.stringify(e): "+JSON.stringify(e));
	} else {
		console.log("invoicedetail.js::after "+e.source.image+" clicked: JSON.stringify(e): "+JSON.stringify(e));
		e.source.image="square82.png";
		var itemid=e.source.itemid;
		adhocs.fetch();
		var theadhoc = adhocs.where({
			col1:itemid
			}); 
		console.log("invoicedetail.js::to uncheck: theadhoc is: "+JSON.stringify(theadhoc));
		console.log("invoicedetail.js::to uncheck: adhocs is: "+JSON.stringify(adhocs));
		Alloy.Collections.adhoc.deleteCol1(itemid);
		adhocs.fetch();
		console.log("invoicedetail.js::to uncheck: adhocs after delete : "+JSON.stringify(adhocs));
	}
});


// PDF GENERATOR
var price = 100;
var qty = 10;
var subtotal = 1000;
var logourl = "https://docs.google.com/drawings/d/1Z3O9n2O1rS5CBQuMJwiRSouJRaRRZFVS8-N5zEocN8c/pub?w=144&h=144";
function emailpdf(firstname,lastname,address,city,state,phone,email,invoicenumber,company,total,balance,paid,lastpaiddate,duedate,price){
	
	console.log("invoicedetail.js::emailpdf::  firstname " + firstname 	+" lastname " + lastname 	+" address " + address 	+" city " + city 	
	+" state " + state 	+" phone " + phone 	+" email " + email 	+" invoicenumber " + invoicenumber 	+" company " + company 	+" total " + total 	
	+" balance " + balance 	+" paid " + paid 	+" lastpaiddate " + lastpaiddate 	+" duedate " + duedate 	+" price " + price);
	
	var html2pdf = require('com.factisresearch.html2pdf');  
 	Ti.API.info("module is => " + html2pdf);
 	
 	var oldfile = Ti.Filesystem.getFile('invoice.pdf'); if (oldfile.exists()) { oldfile.deleteFile(); } // cleanup old file
   
 	html2pdf.addEventListener('pdfready', function(e) {  
	     var file = Ti.Filesystem.getFile(e.pdf);   
	    console.log("invoicedetail.js::html2pdf.addEventListener:: Ti.Filesystem.applicationDataDirectory "+Ti.Filesystem.applicationDataDirectory);
		var oldfile = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory,'invoice.pdf');
		if (oldfile.exists()) { oldfile.deleteFile(); }
		var orgfile =  Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory,'Expose.pdf');
        var renamesuccess = orgfile.rename('invoice.pdf');
        console.log("invoicedetail.js::html2pdf.addEventListener:: renamesuccess "+renamesuccess);
	     ///var emailDialog = Ti.UI.createEmailDialog();  
	     ///var newfile = file.rename('invoice.pdf');
	     //emailDialog.addAttachment(Ti.Filesystem.getFile(e.pdf));
	     //emailDialog.open();  
	     ///file.rename('invoice.pdf');
	     var url = '../Documents/invoice.pdf';
	     //var url = '../Documents/Expose.pdf';
	     var newurl = Ti.Filesystem.getFile(url);
	     var file = 'invoice.pdf';
	     console.log("opening viewpdf(url) on "+file);
     	 viewpdf(file);
     	 Alloy.Globals.checkGoogleisAuthorized();
     	 Alloy.Globals.uploadFile(file,"invdeen1.pdf") ;
 	});  
 	
 	//var html = '<html><body><p>dBayCo Inc. limited </p></body></html>'; 
 	
 	//var html="";
	//html += "<html><body><div id=\"top-bar\"><div id=\"doc-title\"><span class=\"name\">sample invoice : Sheet1<\/span><\/div><\/div><div id=\"sheets-viewport\"><div id=\"0\" style=\"display:none;position:relative;\" dir=\"ltr\"><div class=\"ritz grid-container\" dir=\"ltr\"><table class=\"waffle\" cellspacing=\"0\" cellpadding=\"0\"><thead><tr><th class=\"row-header freezebar-origin-ltr header-shim row-header-shim\"><\/th><th id=\"0C0\" style=\"width:195px\" class=\"header-shim\"><\/th><th id=\"0C1\" style=\"width:286px\" class=\"header-shim\"><\/th><th id=\"0C2\" style=\"width:100px\" class=\"header-shim\"><\/th><th id=\"0C3\" style=\"width:100px\" class=\"header-shim\"><\/th><th id=\"0C4\" style=\"width:100px\" class=\"header-shim\"><\/th><\/tr><\/thead><tbody><tr style='height:20px;'><th id=\"0R0\" style=\"height: 20px;\" class=\"row-headers-background row-header-shim\"><div class=\"row-header-wrapper\" style=\"line-height: 20px;\">1<\/div><\/th><td><\/td><td><\/td><td><\/td><td><\/td><td><\/td><\/tr><tr style='height:20px;'><th id=\"0R1\" style=\"height: 20px;\" class=\"row-headers-background row-header-shim\"><div class=\"row-header-wrapper\" style=\"line-height: 20px;\">2<\/div><\/th><td class=\"s0\" dir=\"ltr\" colspan=\"5\">DbayCo Inc. 130 Moreland Rd., Brookfield, WI 53222<\/td><\/tr><tr style='height:20px;'><th id=\"0R2\" style=\"height: 20px;\" class=\"row-headers-background row-header-shim\"><div class=\"row-header-wrapper\" style=\"line-height: 20px;\">3<\/div><\/th><td class=\"s1\" dir=\"ltr\" colspan=\"5\">Phone: 262-501-2948, Fax: 262-290-3141. Email: deen@idevice.net<\/td><\/tr><tr style='height:20px;'><th id=\"0R3\" style=\"height: 20px;\" class=\"row-headers-background row-header-shim\"><div class=\"row-header-wrapper\" style=\"line-height: 20px;\">4<\/div><\/th><td class=\"s2\" colspan=\"5\"><\/td><\/tr><tr style='height:20px;'><th id=\"0R4\" style=\"height: 20px;\" class=\"row-headers-background row-header-shim\"><div class=\"row-header-wrapper\" style=\"line-height: 20px;\">5<\/div><\/th><td class=\"s3\" dir=\"ltr\" colspan=\"3\">INVOICE<\/td><td class=\"s0\" dir=\"ltr\" colspan=\"2\">WAN-20150225-1<\/td><\/tr><tr style='height:20px;'><th id=\"0R5\" style=\"height: 20px;\" class=\"row-headers-background row-header-shim\"><div class=\"row-header-wrapper\" style=\"line-height: 20px;\">6<\/div><\/th><td class=\"s2\" colspan=\"2\" rowspan=\"2\"><\/td><td class=\"s2\" colspan=\"3\"><\/td><\/tr><tr style='height:20px;'><th id=\"0R6\" style=\"height: 20px;\" class=\"row-headers-background row-header-shim\"><div class=\"row-header-wrapper\" style=\"line-height: 20px;\">7<\/div><\/th><td class=\"s4\"><\/td><td class=\"s5\" dir=\"ltr\"><\/td><td class=\"s5\" dir=\"ltr\"><\/td><\/tr><tr style='height:20px;'><th id=\"0R7\" style=\"height: 20px;\" class=\"row-headers-background row-header-shim\"><div class=\"row-header-wrapper\" style=\"line-height: 20px;\">8<\/div><\/th><td class=\"s2\" dir=\"ltr\">Wannoorbaya WChik<\/td><td class=\"s2\" rowspan=\"4\"><\/td><td class=\"s5\" dir=\"ltr\"><\/td><td class=\"s5\" dir=\"ltr\">230<\/td><td class=\"s5\" dir=\"ltr\"><\/td><\/tr><tr style='height:20px;'><th id=\"0R8\" style=\"height: 20px;\" class=\"row-headers-background row-header-shim\"><div class=\"row-header-wrapper\" style=\"line-height: 20px;\">9<\/div><\/th><td class=\"s2\" dir=\"ltr\">2258 S Sanctuary Dr<\/td><td class=\"s5\" dir=\"ltr\"><\/td><td class=\"s5\" dir=\"ltr\"><\/td><td class=\"s6\" dir=\"ltr\">due 4\/1\/2015<\/td><\/tr><tr style='height:20px;'><th id=\"0R9\" style=\"height: 20px;\" class=\"row-headers-background row-header-shim\"><div class=\"row-header-wrapper\" style=\"line-height: 20px;\">10<\/div><\/th><td class=\"s2\" dir=\"ltr\">New Berlin, WI 53151<\/td><td class=\"s2\" colspan=\"3\" rowspan=\"2\"><\/td><\/tr><tr style='height:20px;'><th id=\"0R10\" style=\"height: 20px;\" class=\"row-headers-background row-header-shim\"><div class=\"row-header-wrapper\" style=\"line-height: 20px;\">11<\/div><\/th><td class=\"s2\" dir=\"ltr\">Date: 2\/28\/2014<\/td><\/tr><tr style='height:20px;'><th id=\"0R11\" style=\"height: 20px;\" class=\"row-headers-background row-header-shim\"><div class=\"row-header-wrapper\" style=\"line-height: 20px;\">12<\/div><\/th><td class=\"s2\" colspan=\"5\" rowspan=\"2\"><\/td><\/tr><tr style='height:20px;'><th id=\"0R12\" style=\"height: 20px;\" class=\"row-headers-background row-header-shim\"><div class=\"row-header-wrapper\" style=\"line-height: 20px;\">13<\/div><\/th><\/tr><tr style='height:20px;'><th id=\"0R13\" style=\"height: 20px;\" class=\"row-headers-background row-header-shim\"><div class=\"row-header-wrapper\" style=\"line-height: 20px;\">14<\/div><\/th><td class=\"s7\" dir=\"ltr\">Item no.<\/td><td class=\"s7\" dir=\"ltr\">Description<\/td><td class=\"s7\" dir=\"ltr\">Qty<\/td><td class=\"s7\" dir=\"ltr\">Unit\/Price<\/td><td class=\"s8\" dir=\"ltr\">Price<\/td><\/tr><tr style='height:20px;'><th id=\"0R14\" style=\"height: 20px;\" class=\"row-headers-background row-header-shim\"><div class=\"row-header-wrapper\" style=\"line-height: 20px;\">15<\/div><\/th><td class=\"s2\" dir=\"ltr\"><\/td><td class=\"s2\" dir=\"ltr\"><\/td><td class=\"s2\" dir=\"ltr\"><\/td><td class=\"s2\" dir=\"ltr\"><\/td><td class=\"s2\" dir=\"ltr\"><\/td><\/tr><tr style='height:20px;'><th id=\"0R15\" style=\"height: 20px;\" class=\"row-headers-background row-header-shim\"><div class=\"row-header-wrapper\" style=\"line-height: 20px;\">16<\/div><\/th><td class=\"s9\" dir=\"ltr\">1<\/td><td class=\"s2\" dir=\"ltr\">Mow Lawn<\/td><td class=\"s9\" dir=\"ltr\">1<\/td><td class=\"s9\" dir=\"ltr\">100<\/td><td class=\"s10\" dir=\"ltr\">100<\/td><\/tr><tr style='height:20px;'><th id=\"0R16\" style=\"height: 20px;\" class=\"row-headers-background row-header-shim\"><div class=\"row-header-wrapper\" style=\"line-height: 20px;\">17<\/div><\/th><td class=\"s9\" dir=\"ltr\">2<\/td><td class=\"s2\" dir=\"ltr\">Cut Trees<\/td><td class=\"s9\" dir=\"ltr\">1<\/td><td class=\"s9\" dir=\"ltr\">120<\/td><td class=\"s10\" dir=\"ltr\">120<\/td><\/tr><tr style='height:20px;'><th id=\"0R17\" style=\"height: 20px;\" class=\"row-headers-background row-header-shim\"><div class=\"row-header-wrapper\" style=\"line-height: 20px;\">18<\/div><\/th><td class=\"s11\"><\/td><td class=\"s11\"><\/td><td class=\"s11\"><\/td><td class=\"s11\" dir=\"ltr\"><\/td><td class=\"s12\" dir=\"ltr\"><\/td><\/tr><tr style='height:20px;'><th id=\"0R18\" style=\"height: 20px;\" class=\"row-headers-background row-header-shim\"><div class=\"row-header-wrapper\" style=\"line-height: 20px;\">19<\/div><\/th><td><\/td><td><\/td><td class=\"s13\"><\/td><td class=\"s13\" dir=\"ltr\">SubTotal<\/td><td class=\"s10\" dir=\"ltr\">220<\/td><\/tr><tr style='height:20px;'><th id=\"0R19\" style=\"height: 20px;\" class=\"row-headers-background row-header-shim\"><div class=\"row-header-wrapper\" style=\"line-height: 20px;\">20<\/div><\/th><td><\/td><td><\/td><td class=\"s13\"><\/td><td class=\"s13\" dir=\"ltr\">Tax<\/td><td class=\"s10\" dir=\"ltr\">10<\/td><\/tr><tr style='height:20px;'><th id=\"0R20\" style=\"height: 20px;\" class=\"row-headers-background row-header-shim\"><div class=\"row-header-wrapper\" style=\"line-height: 20px;\">21<\/div><\/th><td><\/td><td><\/td><td class=\"s13\"><\/td><td class=\"s13\" dir=\"ltr\">Other<\/td><td class=\"s10\" dir=\"ltr\">0<\/td><\/tr><tr style='height:20px;'><th id=\"0R21\" style=\"height: 20px;\" class=\"row-headers-background row-header-shim\"><div class=\"row-header-wrapper\" style=\"line-height: 20px;\">22<\/div><\/th><td><\/td><td><\/td><td class=\"s13\"><\/td><td class=\"s13\" dir=\"ltr\">Discount<\/td><td class=\"s10\" dir=\"ltr\">0<\/td><\/tr><tr style='height:20px;'><th id=\"0R22\" style=\"height: 20px;\" class=\"row-headers-background row-header-shim\"><div class=\"row-header-wrapper\" style=\"line-height: 20px;\">23<\/div><\/th><td><\/td><td><\/td><td class=\"s13\" dir=\"ltr\"><\/td><td class=\"s13\" dir=\"ltr\">Paid<\/td><td class=\"s10\" dir=\"ltr\">0<\/td><\/tr><tr style='height:20px;'><th id=\"0R23\" style=\"height: 20px;\" class=\"row-headers-background row-header-shim\"><div class=\"row-header-wrapper\" style=\"line-height: 20px;\">24<\/div><\/th><td><\/td><td><\/td><td class=\"s14\" dir=\"ltr\">Total due by<\/td><td class=\"s15\" dir=\"ltr\">4\/1\/2015<\/td><td class=\"s15\" dir=\"ltr\">230<\/td><\/tr><\/tbody><\/table><\/div><\/div><\/div><\/body><\/html>";
	var coName = 'Jack Mow Inc.';
	var coAddress = "1125 Bluemound Rd., Brookfield, WI 53222";
	var coPhone = "262-290-3141";
	var coFax = "262-290-3142";
	var coEmail = "sales@jackmowinc.com";
	
	var invoiceno = "002345";
	
	adhocs.fetch();
	console.log("invoicedetail.js::emailpdf:: adhocs contents "+JSON.stringify(adhocs)); 
	console.log("invoicedetail.js::emailpdf:: adhocs.length: "+adhocs.length); 
	var strVarItems="";
	for (i=0;i<adhocs.length;i++){
		console.log("invoicedetail.js::emailpdf:: adhocs.models["+i+"].toJSON().col3: "+adhocs.models[i].toJSON().col3);
		var jobitemstring=adhocs.models[i].toJSON().col3.replace(/xSqBracketOpen/,'[').replace(/xSqBracketClose/,']');
		console.log("invoicedetail.js::emailpdf:: adhocs extraction: jobitemstring.length "+jobitemstring.length+ "jobitemstring : "+jobitemstring);
		var jobitemjson = JSON.parse(jobitemstring);
		for (j=0;j<jobitemjson.length;j++){
			var names=jobitemjson[0].names;
			console.log("invoicedetail.js::emailpdf:: adhocs extraction:  names : "+jobitemjson[j].names+" : "+jobitemjson[j].descr+" : "+jobitemjson[j].lineitem+" : "+jobitemjson[j].price+" : "+jobitemjson[j].qty);
			strVarItems += "				<tbody>";
			strVarItems += "					<tr>";
			if(j>0){
				console.log("invoicedetail.js::emailpdf:: names comparison:  "+jobitemjson[j].names+" vs. "+jobitemjson[j-1].names);
				if(jobitemjson[j].names==jobitemjson[j-1].names){
					strVarItems += "						<td><a class=\"cut\">-<\/a><span contenteditable> <\/span><\/td>";
				} else {
					strVarItems += "						<td><a class=\"cut\">-<\/a><span contenteditable>"+jobitemjson[j].names+"<\/span><\/td>";
				}
				if(jobitemjson[j].descr==jobitemjson[j-1].descr){
					strVarItems += "						<td><span contenteditable> <\/span><\/td>";
				} else {
					strVarItems += "						<td><span contenteditable>"+jobitemjson[j].descr+"<\/span><\/td>";
				}
			} else {
				strVarItems += "						<td><a class=\"cut\">-<\/a><span contenteditable>"+jobitemjson[j].names+"<\/span><\/td>";
				strVarItems += "						<td><span contenteditable>"+jobitemjson[j].descr+"<\/span><\/td>";
			}
			strVarItems += "						<td><span contenteditable>"+jobitemjson[j].lineitem+"<\/span><\/td>";
			strVarItems += "						<td><span contenteditable>"+jobitemjson[j].qty+"<\/span><\/td>";
			(isNaN(jobitemjson[j].price))?strVarItems += "						<td><span>"+jobitemjson[j].price+"<\/span><\/td>":strVarItems += "						<td><span data-prefix>$<\/span><span>"+jobitemjson[j].price+"<\/span><\/td>";
			strVarItems += "					<\/tr>";
			strVarItems += "				<\/tbody>";
		}
	}
  
	var strVar="";
	strVar += "<html>";
	strVar += "	<head>";
	strVar += "		<meta charset=\"utf-8\">";
	strVar += "		<title>Invoice<\/title>";
	strVar += "<style>";
	strVar += "    \/* reset *\/";
	strVar += "";
	strVar += "*";
	strVar += "{";
	strVar += "	border: 0;";
	strVar += "	box-sizing: content-box;";
	strVar += "	color: inherit;";
	strVar += "	font-family: inherit;";
	strVar += "	font-size: inherit;";
	strVar += "	font-style: inherit;";
	strVar += "	font-weight: inherit;";
	strVar += "	line-height: inherit;";
	strVar += "	list-style: none;";
	strVar += "	margin: 0;";
	strVar += "	padding: 0;";
	strVar += "	text-decoration: none;";
	strVar += "	vertical-align: top;";
	strVar += "}";
	strVar += "";
	strVar += "\/* content editable *\/";
	strVar += "";
	strVar += "*[contenteditable] { border-radius: 0.25em; min-width: 1em; outline: 0; }";
	strVar += "";
	strVar += "*[contenteditable] { cursor: pointer; }";
	strVar += "";
	strVar += "*[contenteditable]:hover, *[contenteditable]:focus, td:hover *[contenteditable], td:focus *[contenteditable], img.hover { background: #DEF; box-shadow: 0 0 1em 0.5em #DEF; }";
	strVar += "";
	strVar += "span[contenteditable] { display: inline-block; }";
	strVar += "";
	strVar += "\/* heading *\/";
	strVar += "";
	strVar += "h1 { font: bold 100% sans-serif; letter-spacing: 0.5em; text-align: center; text-transform: uppercase; }";
	strVar += "";
	strVar += "\/* table *\/";
	strVar += "";
	strVar += "table { font-size: 75%; table-layout: fixed; width: 100%; }";
	strVar += "table { border-collapse: separate; border-spacing: 2px; }";
	strVar += "th, td { border-width: 1px; padding: 0.5em; position: relative; text-align: left; }";
	strVar += "th, td { border-radius: 0.25em; border-style: solid; }";
	strVar += "th { background: #EEE; border-color: #BBB; }";
	strVar += "td { border-color: #DDD; }";
	strVar += "";
	strVar += "\/* page *\/";
	strVar += "";
	strVar += "html { font: 16px\/1 'Open Sans', sans-serif; overflow: auto; padding: 0.5in; }";
	strVar += "html { background: #999; cursor: default; }";
	strVar += "";
	strVar += "body { box-sizing: border-box; height: 11in; margin: 0 auto; overflow: hidden; padding: 0.5in; width: 8.5in; }";
	strVar += "body { background: #FFF; border-radius: 1px; box-shadow: 0 0 1in -0.25in rgba(0, 0, 0, 0.5); }";
	strVar += "";
	strVar += "\/* header *\/";
	strVar += "";
	strVar += "header { margin: 0 0 3em; }";
	strVar += "header:after { clear: both; content: \"\"; display: table; }";
	strVar += "";
	strVar += "header h1 { background: #000; border-radius: 0.25em; color: #FFF; margin: 0 0 1em; padding: 0.5em 0; }";
	strVar += "header address { float: left; font-size: 75%; font-style: normal; line-height: 1.25; margin: 0 1em 1em 0; }";
	strVar += "header address p { margin: 0 0 0.25em; }";
	strVar += "header span, header img { display: block; float: right; }";
	strVar += "header span { margin: 0 0 1em 1em; max-height: 25%; max-width: 60%; position: relative; }";
	strVar += "header img { max-height: 100%; max-width: 100%; }";
	strVar += "header input { cursor: pointer; -ms-filter:\"progid:DXImageTransform.Microsoft.Alpha(Opacity=0)\"; height: 100%; left: 0; opacity: 0; position: absolute; top: 0; width: 100%; }";
	strVar += "";
	strVar += "\/* article *\/";
	strVar += "";
	strVar += "article, article address, table.meta, table.inventory { margin: 0 0 3em; }";
	strVar += "article:after { clear: both; content: \"\"; display: table; }";
	strVar += "article h1 { clip: rect(0 0 0 0); position: absolute; }";
	strVar += "";
	strVar += "article address { float: left; font-size: 125%; font-weight: bold; }";
	strVar += "";
	strVar += "\/* table meta & balance *\/";
	strVar += "";
	strVar += "table.meta, table.balance { float: right; width: 36%; }";
	strVar += "table.meta:after, table.balance:after { clear: both; content: \"\"; display: table; }";
	strVar += "";
	strVar += "\/* table meta *\/";
	strVar += "";
	strVar += "table.meta th { width: 40%; }";
	strVar += "table.meta td { width: 60%; }";
	strVar += "";
	strVar += "\/* table items *\/";
	strVar += "";
	strVar += "table.inventory { clear: both; width: 100%; }";
	strVar += "table.inventory th { font-weight: bold; text-align: center; }";
	strVar += "";
	strVar += "table.inventory td:nth-child(1) { width: 26%; }";
	strVar += "table.inventory td:nth-child(2) { width: 38%; }";
	strVar += "table.inventory td:nth-child(3) { text-align: right; width: 12%; }";
	strVar += "table.inventory td:nth-child(4) { text-align: right; width: 12%; }";
	strVar += "table.inventory td:nth-child(5) { text-align: right; width: 12%; }";
	strVar += "";
	strVar += "\/* table balance *\/";
	strVar += "";
	strVar += "table.balance th, table.balance td { width: 50%; }";
	strVar += "table.balance td { text-align: right; }";
	strVar += "";
	strVar += "\/* aside *\/";
	strVar += "";
	strVar += "aside h1 { border: none; border-width: 0 0 1px; margin: 0 0 1em; }";
	strVar += "aside h1 { border-color: #999; border-bottom-style: solid; }";
	strVar += "";
	strVar += "";
	strVar += "@media print {";
	strVar += "	* { -webkit-print-color-adjust: exact; }";
	strVar += "	html { background: none; padding: 0; }";
	strVar += "	body { box-shadow: none; margin: 0; }";
	strVar += "	span:empty { display: none; }";
	strVar += "	.add, .cut { display: none; }";
	strVar += "}";
	strVar += "";
	strVar += "@page { margin: 0; }";
	strVar += "            <\/style>";
	strVar += "	<\/head>";
	strVar += "	<body>";
	strVar += "		<header>";
	strVar += "			<h1>Invoice<\/h1>";
	strVar += "			<address contenteditable>";
	strVar += "				<p>"+coName+"<\/p>";
	strVar += "				<p>"+coAddress+"<\/p>";
	strVar += "				<p>"+coPhone+"<\/p>";
	strVar += "				<p>"+coFax+"<\/p>";
	strVar += "				<p>"+coEmail+"<\/p>";
	strVar += "			<\/address>";
	strVar += "			<span><img alt=\"\" src=\""+logourl+"\"><input type=\"file\" accept=\"image\/*\"><\/span>";
	strVar += "		<\/header>";
	strVar += "		<article>";
	strVar += "			<h1>Recipient<\/h1>";
	strVar += "			<address contenteditable>";
	strVar += "				<p>"+firstname+" "+lastname+"<br>"+address+"<br>"+city+", "+state+"<br> phone:  "+phone+"<br> email: "+email+"<\/p>";
	strVar += "			<\/address>";
	strVar += "			<table class=\"meta\">";
	strVar += "				<tr>";
	strVar += "					<th><span contenteditable>Invoice #<\/span><\/th>";
	strVar += "					<td><span contenteditable>"+invoicenumber+"<\/span><\/td>";
	strVar += "				<\/tr>";
	strVar += "				<tr>";
	strVar += "					<th><span contenteditable>Date<\/span><\/th>";
	strVar += "					<td><span contenteditable>"+(new Date()).toString().slice(4,16)+"<\/span><\/td>";
	strVar += "				<\/tr>";
	strVar += "				<tr>";
	strVar += "					<th><span contenteditable>Amount Due<\/span><\/th>";
	strVar += "					<td><span id=\"prefix\" contenteditable>$<\/span><span>600.00<\/span><\/td>";
	strVar += "				<\/tr>";
	strVar += "			<\/table>";
	strVar += "			<table class=\"inventory\">";
	strVar += "				<thead>";
	strVar += "					<tr>";
	strVar += "						<th><span contenteditable>Project<\/span><\/th>";
	strVar += "						<th><span contenteditable>Description<\/span><\/th>";
	strVar += "						<th><span contenteditable>Item<\/span><\/th>";
	strVar += "						<th><span contenteditable>Quantity<\/span><\/th>";
	strVar += "						<th><span contenteditable>Price<\/span><\/th>";
	strVar += "					<\/tr>";
	strVar += "				<\/thead>";
	strVar += strVarItems;
	strVar += "			<\/table>";
	strVar += "			<table class=\"balance\">";
	strVar += "				<tr>";
	strVar += "					<th><span contenteditable>Total<\/span><\/th>";
	strVar += "					<td><span data-prefix>$<\/span><span>"+subtotal+"<\/span><\/td>";
	strVar += "				<\/tr>";
	strVar += "				<tr>";
	strVar += "					<th><span contenteditable>Amount Paid<\/span><\/th>";
	strVar += "					<td><span data-prefix>$<\/span><span contenteditable>"+paid+"<\/span><\/td>";
	strVar += "				<\/tr>";
	strVar += "				<tr>";
	strVar += "					<th><span contenteditable>Balance Due<\/span><\/th>";
	strVar += "					<td><span data-prefix>$<\/span><span>"+balance+"<\/span><\/td>";
	strVar += "				<\/tr>";
	strVar += "			<\/table>";
	strVar += "		<\/article>";
	strVar += "		<aside>";
	strVar += "			<h1><span contenteditable>Additional Notes<\/span><\/h1>";
	strVar += "			<div contenteditable>";
	strVar += "				<p>A finance charge of 1.5% will be made on unpaid balances after 30 days.<\/p>";
	strVar += "			<\/div>";
	strVar += "		<\/aside>";
	strVar += "	<\/body>";
	strVar += "<\/html>";
   
 	html2pdf.setHtmlString(strVar); 
 
}

function viewpdf(url){
	var win = Ti.UI.createWindow();
	// Use a NavigationWindow to create a navigation bar for the window
	var navWin = Ti.UI.iOS.createNavigationWindow({
		backgroundColor: "gray",
		window: win
		});
	
	var navButton = Titanium.UI.createButton({title:'Back'});
	win.RightNavButton = navButton;
	//var leftNavButton = Titanium.UI.createButton({title:'Back'});
	//win.LeftNavButton = leftNavButton;
	
	var winButton = Titanium.UI.createButton({
	    title:'View PDF',
	    height:40,
	    width:200,
	    top:270
	});
	
	win.add(winButton);
	
	// Create a document viewer to preview a PDF file
	var url = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory,url);
	url.rename('invoice.pdf');
	docViewer = Ti.UI.iOS.createDocumentViewer({url:url.nativePath});
	navButton.addEventListener('click', function(){
	    //docViewer.show({view:navButton, animated: true});
	    navWin.close();
	});
	// The document viewer immediately launches without an animation
	winButton.addEventListener('click', function(){docViewer.show();});
	
	navWin.open();
}
 
function uploadFile(file,filename){
 		var fileget = Ti.Filesystem.getFile(file);
		var fileread = fileget.read();
		var filebase64 = Ti.Utils.base64encode(fileread);
	 		console.log('Access Token for File upload is: ' + Alloy.Globals.googleAuthSheet.getAccessToken());
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
			xhr.setRequestHeader("Authorization", 'Bearer '+Alloy.Globals.googleAuthSheet.getAccessToken());
			xhr.setRequestHeader("Content-Length", "2000000");
			xhr.send(parts.join("\r\n"));
			Ti.API.info('done POSTed');
 	}
   
function genInvoice(e){
	console.log("invoicedetail.js::genInvoice:: JSON.stringify(e) "+JSON.stringify(e)+" with : "+firstname+" "+lastname+" : "+invoicenumber);
		emailpdf(firstname,lastname,address,city,state,phone,email,invoicenumber,company,total,balance,paid,lastpaiddate,duedate,price);
		//var url = '../Documents/invoice.pdf';
		//var file = '../Documents/Expose.pdf';

		//var file = 'Expose.pdf';
		//var orgfile = 'Expose.pdf';
		//var file = orgfile.rename('invoice.pdf');
		
 
};

function detailAction(e){
	var sid = e.source.sid;
	if (sid){
		console.log("invoicedetail.js::detailAction:: JSON.stringify(e) "+JSON.stringify(e)+" with : "+firstname+" "+lastname+" : "+invoicenumber);
		var tabViewOneController = Alloy.createController("enterpayment",{
			title: args,
			firstname : firstname,
			lastname : lastname,
			invoicenumber : invoicenumber,
			sid : sid
		});
		tabViewOneController.openMainWindow($.tab_invoicedetail);
	} else {
		alert("Loading data from the cloud. Please click OK and try again.");
	}

}

// Section where payment is tracked.

function populatepaymentSIDtoDB(filename,sid) {
	var needupdate = "yes";
	var thepaymentsid = Alloy.Collections.instance('paymentsid');
	thepaymentsid.fetch();
    if (thepaymentsid.length > 0) {
    	var paymentsidjson = thepaymentsid.toJSON();
    	for( var i=0; i < paymentsidjson.length; i++ ){
    		var oldsid = paymentsidjson[i].col2.trim();
    		console.log("invoicedetail.js::populatepaymentSIDtoDB::compare sid : "+oldsid+" vs. "+sid);
    		if ( sid == oldsid ){
    			var needupdate = "no";
    			console.log("invoicedetail.js::populatepaymentSIDtoDB::needupdate: "+needupdate+" , abort!");
    			return;
    		} 
    	}
    }   
       	if (needupdate == "yes"){
		    var dataModel = Alloy.createModel("paymentsid",{
	            col1 :  filename || "none",
	            col2 : sid || "none",
	            col3 : "none",col4:"none", col5:"none",	col6:"none", col7:"none", col8:"none", col9:"none", 
	            col10:"none", col11:"none",	col12:"none", col13:"none",	col14:"none", col15:"none",	col16:"none"
	    	});
    		dataModel.save();
    	}; 	
	thepaymentsid.fetch();
	Ti.API.info(" invoicedetail.js::populatepaymentSIDtoDB::needupdate "+needupdate+" with thepaymentsid: "+thepaymentsid.length+" : "+JSON.stringify(thepaymentsid));
	}

function getParentFolder(args) {
	var sid = Titanium.App.Properties.getString('invoice');
	var xhr = Ti.Network.createHTTPClient({
	    onload: function(e) {
	    try {
	    		var json = JSON.parse(this.responseText);
	    		Ti.API.info("response is: "+JSON.stringify(json));
	    		var parentid = json.items[0].id;
	    		Titanium.App.Properties.setString('parentid',parentid);
	    		console.log("enterjobdetail.js::args inside getParentFolder: "+JSON.stringify(args));
	    		//var filename = 'test03';
	    		//createSpreadsheet(filename,parentid);    		
	    	} catch(e){
				Ti.API.info("cathing e: "+JSON.stringify(e));
			}
			return parentid;
		}
		});
	xhr.onerror = function(e){
		alert("Unable to connect to the cloud.");
	};
	xhr.open("GET", 'https://www.googleapis.com/drive/v2/files/'+sid+'/parents');
	xhr.setRequestHeader("Content-type", "application/json");
    xhr.setRequestHeader("Authorization", 'Bearer '+ googleAuthSheet.getAccessToken());
	xhr.send();
};

function fileExist(filename,parentid){
		console.log("executing fileExist("+filename+","+parentid+") ");
		var jsonlist = " ";
		var xhr = Ti.Network.createHTTPClient({
	    onload: function(e) {
	    try {
	    		var jsonlist = JSON.parse(this.responseText);
	    		Ti.API.info("response of jsonlist is: "+JSON.stringify(jsonlist));
	    	} catch(e){
				Ti.API.info("cathing e: "+JSON.stringify(e));
			}
			console.log("invoicedetail.js::jsonlist.items.length: "+jsonlist.items.length);
			filelist = [];
			if (jsonlist.items.length == "0" ){
				console.log("invoicedetail.js::File DOES NOT EXIST");
				var fileexist = "false";
				createSpreadsheet(filename,parentid);  // create file when does not exists
				//PopulateHeader
			} else {
				var fileexist = "true";
				var sid = jsonlist.items[0].id;
				$.totalbalance_row.sid = sid;
				console.log("invoicedetail.js::fileExist:: File exist. sid is: "+jsonlist.items[0].id+" Skipped.");
				Titanium.App.Properties.setString('sid',sid);
				populatepaymentSIDtoDB(filename,sid);
				//populateSpreadsheetHeader();
			};
		}
		});
	xhr.onerror = function(e){
		alert("Creating new document in the cloud");
	};
	var rawquerystring = '?q=title+%3D+\''+filename+'\'+and+mimeType+%3D+\'application%2Fvnd.google-apps.spreadsheet\'+and+trashed+%3D+false&fields=items(id%2CmimeType%2Clabels%2Ctitle)';
	xhr.open("GET", 'https://www.googleapis.com/drive/v2/files'+rawquerystring);
	xhr.setRequestHeader("Content-type", "application/json");
    xhr.setRequestHeader("Authorization", 'Bearer '+ googleAuthSheet.getAccessToken());
	xhr.send();
}

function xmlToJson(xml) {
	
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


function getSSCell(sid,rowno,colno,value) {
	var pos = "R"+rowno+"C"+colno;
	console.log("invoicedetail.js::get SS Cell on :  https://spreadsheets.google.com/feeds/cells/"+sid+"/od6/private/full/"+pos);
	var xhr = Ti.Network.createHTTPClient({
	    onload: function(e) {
	    try {
	    		var xml = Titanium.XML.parseString(this.responseText);
	    		Ti.API.info("getSSCell:: response is: "+this.responseText);
	    		Ti.API.info("getSSCell:: xml response is: "+xml);
	    		var entry = xml.documentElement.getElementsByTagName("entry");
	    		var link = xml.documentElement.getElementsByTagName("link");
	    		console.log("invoicedetail.js:: number of link found: " +link+ " length: "+link.length);
	    		for (i=0;i<link.length;i++){			
	    			var listitem = link.item(i);
	    			if (listitem.getAttribute("rel") == "edit"){ var edithref = listitem.getAttribute("href");}
	    			if (listitem.getAttribute("rel") == "self"){ var selfhref = listitem.getAttribute("href");}
	    		}
	    		Ti.API.info("self href is : "+selfhref);
				Ti.API.info("edit href is : "+edithref);
	    		populateSpreadsheetHeader(sid,rowno,colno,edithref,selfhref,value);	    				    			
	    	} catch(e){
				Ti.API.info("cathing e: "+JSON.stringify(e));
			}
		}
		});
	xhr.onerror = function(e){
		alert("Unable to connect to the cloud. "+e);
	};
	xhr.open("GET", 'https://spreadsheets.google.com/feeds/cells/'+sid+'/od6/private/full/'+pos);
	xhr.setRequestHeader("Content-type", "application/atom+xml");
    xhr.setRequestHeader("Authorization", 'Bearer '+ googleAuthSheet.getAccessToken());
	xhr.send();
};

function createSpreadsheet(filename,parentid) {
	console.log("invoicedetail.js::create ss with filename: "+filename+" and parentid: "+parentid);
	var jsonpost = '{'
		 +'\"title\": \"'+filename+'\",'
		 +'\"parents\": ['
		  +'{'
		   +'\"id\": \"'+parentid+'\"'
		 +' }'
		 +'],'
		 +'\"mimeType\": \"application/vnd.google-apps.spreadsheet\"'
		+'}';
		var xhr = Ti.Network.createHTTPClient({
	    onload: function(e) {
	    try {
	    		Ti.API.info("response is: "+this.responseText);
	    		var json = JSON.parse(this.responseText);
	    		var sid = json.id;
	    		$.totalbalance_row.sid = sid; // inject sid to tableviewrow
	    		populatepaymentSIDtoDB(filename,sid);
	    		Titanium.App.Properties.setString('sid',sid); // 1st sid created.
	    		for (i=1;i<17;i++){
						var value = "col"+i;
						getSSCell(sid,1,i,value);
					}
					getSSCell(sid,2,1,"Date");
					getSSCell(sid,2,2,"Notes");
					var date = new Date();				
					getSSCell(sid,3,1,date);
					getSSCell(sid,3,2,"0.00");
					getSSCell(sid,3,16,Date.now()); //jobitemid							
	    		console.log("invoicedetail.js::sid : "+sid);
	    	} catch(e){
				Ti.API.info("cathing e: "+JSON.stringify(e));
			}
		}
		});
	xhr.onerror = function(e){
		alert("Unable to connect to the cloud.");
	};
	xhr.open("POST", 'https://www.googleapis.com/drive/v2/files');	
	xhr.setRequestHeader("Content-type", "application/json");
    xhr.setRequestHeader("Authorization", 'Bearer '+ googleAuthSheet.getAccessToken());
    console.log("invoicedetail.js::json post: "+jsonpost);
	xhr.send(jsonpost);
}

function populateSpreadsheetHeader(sid,rowno,colno,edithref,selfhref,value){ 
		var xmldatastring = ['<entry xmlns=\'http://www.w3.org/2005/Atom\' '
 		+' xmlns:gs=\'http://schemas.google.com/spreadsheets/2006\'>'
 		+'<id>'+selfhref+'</id>'
 		+'<link rel=\'edit\' type=\'application/atom+xml\''
 		+' href=\''+edithref+'\'/>'
 		+'<gs:cell row=\''+rowno+'\' col=\''+colno+'\' inputValue=\''+value+'\'>'
 		+'</gs:cell>'
 		+'</entry>'].join('');
 		console.log("invoicedetail.js::xmldatastring: "+xmldatastring);
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
        alert("Unable to communicate to the cloud. Please try again"); 
    }
});
        xhr.open("PUT", ''+edithref+'');
        xhr.setRequestHeader("Content-type", "application/atom+xml");
        xhr.setRequestHeader("Authorization", 'Bearer '+ googleAuthSheet.getAccessToken());
        xhr.send(xmldatastring);
        Ti.API.info('done POSTed');
}

function matchpaymentsidfromDB(filename){
	thepaymentsidarray = [];
	var thepaymentsid = Alloy.Collections.instance('paymentsid');
	thepaymentsid.fetch();
	Ti.API.info(" matchpaymentsidfromDB::thepaymentsid : "+JSON.stringify(thepaymentsid));
	if (thepaymentsid.length > 0) {
		var paymentsidjson = thepaymentsid.toJSON();
		console.log("projectdetail.js::matchpaymentsidfromDB::JSON.stringify(paymentsidjson): " +JSON.stringify(paymentsidjson));
		for( var i=0; i < paymentsidjson.length; i++){
			var projectname = paymentsidjson[i].col1;
			var sid = paymentsidjson[i].col2.trim();
			if (filename == projectname){
				console.log("projectdetail.js::matchpaymentsidfromDB::sid: " +sid);
				$.totalbalance_row.sid = sid;
				return sid;			
			}
		}
	} 

}


function prefetchPayment(e){
	var parentid = Titanium.App.Properties.getString('parentid');
	console.log("invoicedetail.js::prefetchpayment::need to check if parent/filename exist: "+parentid+'/'+filename);
	fileExist(filename,parentid);
	var item = "payment";
	var sidmatch = matchpaymentsidfromDB(filename);
	var sid = sidmatch;
	console.log("invoicedetail.js::prefetchpayment::sidmatch: sid "+sidmatch+' : '+sid);
	if(sid){
		console.log("invoicedetail.js::prefetchpayment: updating DB with: item : sid : "+item+" : "+sid);
		Alloy.Globals.getPrivateData(sid,item);
	} else {
		console.log("invoicedetail.js::prefetchpayment: creating sid. very first new project");
	};  // a very first new project would not have sid. suppress error.
	console.log("invoicedetail.js::prefetchpayment:: Alloy.Collections.payment.fetch()");
	//Alloy.Collections.payment.fetch();	
	var payment  = Alloy.Collections.instance('payment');
        payment.fetch();
        console.log("invoicedetail.js::JSON stringify payment data on prefetch: "+JSON.stringify(payment));
}	
