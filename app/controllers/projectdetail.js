var args = arguments[0] || {};
exports.openMainWindow = function(_tab) {
  _tab.open($.projectdetail_window);
  Ti.API.info("This is child widow checking _tab on : " +JSON.stringify(_tab));
  Ti.API.info(" input details : "+JSON.stringify(args));
  Alloy.Globals.checkFileExistThenUpdateSID(filename);
  console.log("projectdetail.js::JSON.stringify(Alloy.Globals.Status) :"+JSON.stringify(Alloy.Globals.Status)+" Titanium.App.Properties.getString(\"status\"): " +Titanium.App.Properties.getString("status"));
  Alloy.Collections.joblog.fetch();
  //Titanium.App.Properties.setString('sid',"none"); // reset the job log sid.
  prefetchJoblog();
};

callbackFunction = args.callbackFunction;

console.log("projectdetail.js::JSON.stringify(args) :"+JSON.stringify(args));

var someDummy = Alloy.Models.dummy;
console.log("projectdetail.js::stringify dummy :"+JSON.stringify(someDummy));
someDummy.set('id', '1234');
someDummy.fetch();

var data = args.title.split(':');
var projectname = data[0];
var firstname = data[1];
var lastname = data[2];
var fullname = firstname+" "+lastname;
var company = data[3];
var phone = data[4];console.log("projectdetail.js::phone: "+phone);
var email = data[5];console.log("projectdetail.js::email: "+email);
var address = data[6];
var city = data[7];
var state = data[8];
var country = data[9];
var fulladdress = ( address && city && state ) && address+' , '+city+' , '+state || "Please enter address";
var fulladdress = ( address == "none" || city == "none" || state == "none" ) && "Please enter address"  || address+' , '+city+' , '+state ;
//var percentcomplete = data[10];
var status = data[10];
var customerid = data[12];
var notesraw = data[11];
var dates = data[14];console.log("projectdetail.js::dates: "+dates);
var datesdata = dates.replace(/cOlOn/g,":");console.log("projectdetail.js::datesdata: "+datesdata);
var datedue = JSON.parse(datesdata)[0].duedate;
var nextapptdate = JSON.parse(datesdata)[0].nextapptdate;
var lastpaiddate = JSON.parse(datesdata)[0].lastpaiddate;
var idtag = data[13].replace(/xCoLoNx/g,',').split(',')[0].replace('yCoLoNy',':');
var selfhref = data[13].replace(/xCoLoNx/g,',').split(',')[1].replace('yCoLoNy',':');
var edithref = data[13].replace(/xCoLoNx/g,',').split(',')[2].replace('yCoLoNy',':');
//var datedue = 0;
console.log("projectdetail.js::projectdetail:: dates" +dates+" datesdata :" +datesdata+" datedue : "+datedue);
var projectid = data[15];
var filename = 'project_'+projectid+'_'+firstname+'_'+lastname;
console.log("projectdetail.js::projectdetail:: filename : "+filename);

someDummy.set('projectname', projectname);
someDummy.set('fullname', fullname);
someDummy.set('company', company);
someDummy.set('phone', phone);
someDummy.set('email', email);
someDummy.set('address', address);
someDummy.set('citystate', city+' , '+state);
someDummy.set('fulladdress',+fulladdress);
someDummy.set('country', country);
someDummy.set('firstname', firstname);
someDummy.set('lastname', lastname);
someDummy.set('status', status);
someDummy.set('nextapptdate', nextapptdate);
someDummy.set('datedue', datedue);
someDummy.set('projectid', projectid);

$.datedue_label.text = datedue;
$.nextapptdate_label.text = nextapptdate;
        
///$.nextapptdetail_row.add(dateduelabel);
//$.nextapptdetail_row.add(nextapptlabel);


function nameAction(e) {
	console.log("projectdetail.js::JSON stringify e: "+JSON.stringify(e));
};

function phoneAction(e) {
	console.log("projectdetail.js::JSON stringify e: "+JSON.stringify(e));
};

function emailAction(e) {
	console.log("projectdetail.js::JSON stringify e: "+JSON.stringify(e));
};

function addressAction(e) {
	console.log("projectdetail.js::JSON stringify e: "+JSON.stringify(e));
};

function JobDetail(e){
	console.log("projectdetail.js::JobDetail: JSON stringify e: "+JSON.stringify(e));
	var tabViewOneController = Alloy.createController("jobdetail",{
		functionfromSource:genJoblog
	});
	tabViewOneController.openMainWindow($.tab_projectdetail);	
                                                                                                       }

function prefetchJoblog(){
	var item = "joblog";
	var projectid = args.title.split(':')[15];
	var firstname = args.title.split(':')[1];
	var lastname = args.title.split(':')[2];
	var filename = 'project_'+projectid+'_'+firstname+'_'+lastname;
	//var parentid = Titanium.App.Properties.getString('parentid');
	var kraniemailid=Titanium.App.Properties.getString('kraniemailid');
	var name = kraniemailid.split('@')[0].trim();
	var projectparentid = Titanium.App.Properties.getString(name+"_project");
	console.log("projectdetail.js::prefetchJoblog:: Titanium.App.Properties.getString("+name+"_project); " +projectparentid);
	console.log("projectdetail.js::prefetchJoblog::need to check if parent/filename exist: "+projectparentid+'/'+filename);
	fileExist(filename,projectparentid);
	var item = "joblog";
	var sidmatch = matchjoblogsidfromDB(filename);
	var sid = sidmatch;
	console.log("projectdetail.js::prefetchJoblog::sidmatch: sid "+sidmatch+' : '+sid);
	if(sid){Alloy.Globals.getPrivateData(sid,item);} else {
		console.log("projectdetail.js::prefetchJoblog: creating sid. very first new project");
	};  // a very first new project would not have sid. suppress error.
	console.log("projectdetail.js::prefetchJoblog:: Alloy.Collections.joblog.fetch()");
	//Alloy.Collections.joblog.fetch();	
	var joblog  = Alloy.Collections.instance('joblog');
        joblog.fetch();
        console.log("projectdetail.js::JSON stringify joblog data on prefetch: "+JSON.stringify(joblog));
}
/*
$.addbutton.setTitleid(args);

$.addbutton.addEventListener("click", function(e){
	console.log("projectdetail.js::JSON stringify e on addHandler: "+JSON.stringify(e));
	console.log("projectdetail.js::JSON stringify e on addHandler args: "+JSON.stringify(args));
	var sid = matchjoblogsidfromDB(filename);
	var tabViewOneController = Alloy.createController("enterjobdetail",{
			title: args,
			sid: sid
		});
	tabViewOneController.openMainWindow($.tab_projectdetail);	
});*/

$.joblog_button.addEventListener("click", function(e){
	console.log("projectdetail.js::JSON stringify e on jobLog: "+JSON.stringify(e));
	console.log("projectdetail.js::JSON stringify e on jobLog args: "+JSON.stringify(args));
	var sid = matchjoblogsidfromDB(filename);
	var parentid = Titanium.App.Properties.getString('parentid');
	console.log("projectdetail.js::matched sid is: "+sid);
	var tabViewOneController = Alloy.createController("enterjobdetail",{
			title: args,
			sid: sid,
			parentid: parentid,
	});
	tabViewOneController.openMainWindow($.tab_projectdetail);		
});

function addHandler(e,args){
	console.log("projectdetail.js::JSON stringify e on addHandler: "+JSON.stringify(e));
	console.log("projectdetail.js::JSON stringify e on addHandler args: "+JSON.stringify(args));
	Alloy.Globals.getPrivateData(sid,item);
	var tabViewOneController = Alloy.createController("enterjobdetail",{
			title: args
		});
	tabViewOneController.openMainWindow($.tab_projectdetail);
}

//MAIN if spreadsheet exist ignore, NOT create the spreadsheet
function fileExist(filename,parentid){
		console.log("projectdetail.js::executing fileExist("+filename+","+parentid+") ");
		var jsonlist = " ";
		var xhr = Ti.Network.createHTTPClient({
	    onload: function(e) {
	    try {
	    		var jsonlist = JSON.parse(this.responseText);
	    		Ti.API.info("response of jsonlist is: "+JSON.stringify(jsonlist));
	    	} catch(e){
				Ti.API.info("cathing e: "+JSON.stringify(e));
			}
			console.log("projectdetail.js::jsonlist.items.length: "+jsonlist.items.length);
			filelist = [];
			if (jsonlist.items.length == "0" ){
				console.log("projectdetail.js::File DOES NOT EXIST");
				var fileexist = "false";
				console.log("projectdetail.js::fileExist: createSpreadsheet("+filename+","+parentid+")");
				createSpreadsheet(filename,parentid);  // create file when does not exists
				//PopulateHeader
			} else {
				var fileexist = "true";
				var sid = jsonlist.items[0].id;
				console.log("projectdetail.js::fileExist:: File exist. sid is: "+jsonlist.items[0].id+" Skipped.");
				Titanium.App.Properties.setString('sid',sid);
				populatejoblogSIDtoDB(filename,sid);
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
    xhr.setRequestHeader("Authorization", 'Bearer '+Alloy.Globals.googleAuthSheet.getAccessToken());
	xhr.send();
}

function getParentFolder(args) {
	var sid = Titanium.App.Properties.getString('joblog');
	var xhr = Ti.Network.createHTTPClient({
	    onload: function(e) {
	    try {
	    		var json = JSON.parse(this.responseText);
	    		Ti.API.info("response is: "+JSON.stringify(json));
	    		var parentid = json.items[0].id;
	    		Titanium.App.Properties.setString('parentid',parentid);
	    		console.log("projectdetail.js::args inside getParentFolder: "+JSON.stringify(args));
	    	} catch(e){
				Ti.API.info("cathing e: "+JSON.stringify(e));
			}
			return parentid;
			Titanium.App.Properties.setString('parentid',parentid);
		}
		});
	xhr.onerror = function(e){
		alert("projectdetail::getParentFolder::Unable to get info.");
		console.log('projectdetail::getParentFolder:: unable to get parents for '+sid);
	};
	console.log('projectdetail::getParentFolder:: URL:: https://www.googleapis.com/drive/v2/files/'+sid+'/parents');
	xhr.open("GET", 'https://www.googleapis.com/drive/v2/files/'+sid+'/parents');
	xhr.setRequestHeader("Content-type", "application/json");
    xhr.setRequestHeader("Authorization", 'Bearer '+Alloy.Globals.googleAuthSheet.getAccessToken());
	xhr.send();
};

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
	console.log("projectdetail.js::get SS Cell on :  https://spreadsheets.google.com/feeds/cells/"+sid+"/od6/private/full/"+pos);
	var xhr = Ti.Network.createHTTPClient({
	    onload: function(e) {
	    try {
	    		var xml = Titanium.XML.parseString(this.responseText);
	    		Ti.API.info("getSSCell:: response is: "+this.responseText);
	    		Ti.API.info("getSSCell:: xml response is: "+xml);
	    		var entry = xml.documentElement.getElementsByTagName("entry");
	    		var link = xml.documentElement.getElementsByTagName("link");
	    		console.log("projectdetail.js:: number of link found: " +link+ " length: "+link.length);
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
		alert("projectdetail::getSSCell::Unable to connect to the cloud. "+e);
	};
	xhr.open("GET", 'https://spreadsheets.google.com/feeds/cells/'+sid+'/od6/private/full/'+pos);
	xhr.setRequestHeader("Content-type", "application/atom+xml");
    xhr.setRequestHeader("Authorization", 'Bearer '+Alloy.Globals.googleAuthSheet.getAccessToken());
	xhr.send();
};

(Alloy.Globals.googleAuthSheet.getAccessToken()) && function() {var parentid=getParentFolder();} || function(){
	console.log(new Date()+"::projectdetail.js:: token expired: reAuthorize");
	Alloy.Globals.googleAuthSheet.authorize();
};

function createSpreadsheet(filename,parentid) {
	console.log("projectdetail.js::create ss with filename: "+filename+" and parentid: "+parentid);
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
	    		populatejoblogSIDtoDB(filename,sid);
	    		Titanium.App.Properties.setString('sid',sid); // 1st sid created.
	    		for (i=1;i<17;i++){
						var value = "col"+i;
						getSSCell(sid,1,i,value);
					}
					getSSCell(sid,2,1,"Date");
					getSSCell(sid,2,2,"Notes");
					var date = new Date();
					for (r=3;r<6;r++) {
						getSSCell(sid,r,1,date);
						getSSCell(sid,r,2,"Please enter work logs.");
						getSSCell(sid,r,16,Date.now()); //jobitemid
					};
					
	    		console.log("projectdetail.js::sid : "+sid);
	    	} catch(e){
				Ti.API.info("cathing e: "+JSON.stringify(e));
			}
		}
		});
	xhr.onerror = function(e){
		alert("projectdetail::createSpreadsheet::Unable to create spreadsheet.");
		console.log("projectdetail::createSpreadsheet::Unable to createSpreadsheet with "+filename+".");
	};
	xhr.open("POST", 'https://www.googleapis.com/drive/v2/files');	
	xhr.setRequestHeader("Content-type", "application/json");
    xhr.setRequestHeader("Authorization", 'Bearer '+Alloy.Globals.googleAuthSheet.getAccessToken());
    console.log("projectdetail.js::json post: "+jsonpost);
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
 		console.log("projectdetail.js::xmldatastring: "+xmldatastring);
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
        alert("projectdetail::populateSpreadsheetHeader::Unable to communicate to the cloud. Please try again"); 
    }
});
        xhr.open("PUT", ''+edithref+'');
        xhr.setRequestHeader("Content-type", "application/atom+xml");
        xhr.setRequestHeader("Authorization", 'Bearer '+Alloy.Globals.googleAuthSheet.getAccessToken());
        xhr.send(xmldatastring);
        Ti.API.info('done POSTed');
}


function checkjoblogsidfromDB(){
	thejoblogsidarray = [];
	var thejoblogsid = Alloy.Collections.instance('joblogsid');
	thejoblogsid.fetch();
	Ti.API.info(" thejoblogsid : "+JSON.stringify(thejoblogsid));
	if (thejoblogsid.length > 0) {
		var joblogsidjson = thejoblogsid.toJSON();
		console.log("projectdetail.js::JSON.stringify(joblogsidjson): " +JSON.stringify(joblogsidjson));
		for( var i=0; i < joblogsidjson.length; i++){
			var projectid  = joblogsidjson[i].col1;
			var projectname = joblogsidjson[i].col2;
			var sid = joblogsidjson[i].col3.trim();
			thejoblogsidarray.push({projectname:projectname,sid: sid});
			var content = filename+','+sid;
			Alloy.Globals.appendFile(content,"joblogsid.txt");
		}
		
		console.log("projectdetail.js::thejoblogsidarray.length : "+thejoblogsidarray.length);
		if ( thejoblogsidarray.length > 0 ){
			console.log("projectdetail.js::thejoblogsidarray : "+JSON.stringify(thejoblogsidarray));
		}
	} 

}

function matchjoblogsidfromDB(filename){
	thejoblogsidarray = [];
	var thejoblogsid = Alloy.Collections.instance('joblogsid');
	thejoblogsid.fetch();
	Ti.API.info(" matchjoblogsidfromDB::thejoblogsid : "+JSON.stringify(thejoblogsid));
	if (thejoblogsid.length > 0) {
		var joblogsidjson = thejoblogsid.toJSON();
		console.log("projectdetail.js::matchjoblogsidfromDB::JSON.stringify(joblogsidjson): " +JSON.stringify(joblogsidjson));
		for( var i=0; i < joblogsidjson.length; i++){
			var projectname = joblogsidjson[i].col1;
			var sid = joblogsidjson[i].col2.trim();
			if (filename == projectname){
				return sid;
			}
		}
		/*	
		console.log("projectdetail.js::matchjoblogsidfromDB::thejoblogsidarray.length : "+thejoblogsidarray.length);
		if ( thejoblogsidarray.length > 0 ){
			console.log("projectdetail.js::matchjoblogsidfromDB::thejoblogsidarray : "+JSON.stringify(thejoblogsidarray));
		}*/
	} 

}


function populatejoblogSIDtoDB(filename,sid) {
	var needupdate = "yes";
	var thejoblogsid = Alloy.Collections.instance('joblogsid');
	thejoblogsid.fetch();
    if (thejoblogsid.length > 0) {
    	var joblogsidjson = thejoblogsid.toJSON();
    	for( var i=0; i < joblogsidjson.length; i++ ){
    		var oldsid = joblogsidjson[i].col2.trim();
    		console.log("projectdetail.js::populatejoblogSIDtoDB::compare sid : "+oldsid+" vs. "+sid);
    		if ( sid == oldsid ){
    			var needupdate = "no";
    			console.log("projectdetail.js::populatejoblogSIDtoDB::needupdate: "+needupdate+" , abort!");
    			return;
    		} 
    	}
    }   
       	if (needupdate == "yes"){
		    var dataModel = Alloy.createModel("joblogsid",{
	            col1 :  filename || "none",
	            col2 : sid || "none",
	            col3 : "none",col4:"none", col5:"none",	col6:"none", col7:"none", col8:"none", col9:"none", 
	            col10:"none", col11:"none",	col12:"none", col13:"none",	col14:"none", col15:"none",	col16:"none"
	    	});
    		dataModel.save();
    	}; 	
	thejoblogsid.fetch();
	Ti.API.info(" projectdetail.js::populatejoblogSIDtoDB::needupdate "+needupdate+" with thejoblogsid: "+thejoblogsid.length+" : "+JSON.stringify(thejoblogsid));
	}

function getjoblogSID(thefilename){
	var thejoblogsid = Alloy.Collections.instance('joblogsid');
	thejoblogsid.fetch();
    if (thejoblogsid.length > 0) {
    	var joblogsidjson = thejoblogsid.toJSON();
    	for( var i=0; i < joblogsidjson.length; i++ ){
    		var filename = joblogsidjson[i].col1.trim().replace(/\s+/g, '');;
    		var sid = joblogsidjson[i].col2.trim();
    		if ( thefilename == filename ){
    			console.log("projectdetail.js::getjoblogSID::needupdate: "+filename+" match "+thefilename+" with sid: "+sid);
    			return sid;
    		} 
    	}
    }   
}	

/// processing array in notes
if (notesraw != "none") {
	var notesstring = notesraw.replace(/cOlOn/g,':');   // replacing all cOlOn to ':'
	console.log("projectdetail.js::notesstring: "+notesstring);
	var notes = JSON.parse(notesstring);
	var descr = notes[0].descr;
	var descrtitlelabel = Ti.UI.createLabel ({
		left  : "20",
		textAlign : "Ti.UI.TEXT_ALIGNMENT_LEFT",
		top : "10",
		font:{
			fontSize:14
		},
		text : 'Description: '
	});
	var descrbodylabel = Ti.UI.createLabel ({
		color : "#333",
		left  : "120",
		textAlign : "Ti.UI.TEXT_ALIGNMENT_LEFT",
		top : "10",
		font:{
			fontSize:12
		},
		text : descr
	});
	$.jobdescr_row.add(descrtitlelabel);
	$.jobdescr_row.add(descrbodylabel);
	var itemtitlelabel = Ti.UI.createLabel ({
		left  : "20",
		textAlign : "Ti.UI.TEXT_ALIGNMENT_LEFT",
		top : "4",
		font:{
			fontSize:14
		},
		text : 'List Item :'
	});
	if ( notes.length > 1) {$.jobitem_row.add(itemtitlelabel); }
	var topvalue = 24;
	for (i=1;i<notes.length;i++){
		var itembodylabel = Ti.UI.createLabel ({
			color : "#333",
			left  : "20",
			textAlign : "Ti.UI.TEXT_ALIGNMENT_LEFT",
			top : topvalue,
			font:{
				fontSize:12
			},
			text : i+' :    '+notes[i].lineitem
		});		
		var itemqtylabel = Ti.UI.createLabel ({
			color : "#333",
			left  : "200",
			textAlign : "Ti.UI.TEXT_ALIGNMENT_LEFT",
			top : topvalue+12+4,
			font:{
				fontSize:10
			},
			text : 'Qty :'+notes[i].qty
		});
		var itempricelabel = Ti.UI.createLabel ({
			color : "#333",
			left  : "320",
			textAlign : "Ti.UI.TEXT_ALIGNMENT_LEFT",
			top : topvalue+12+4,
			font:{
				fontSize:10
			},
			text : 'Price : '+notes[i].price
		});
		var blanklabel = Ti.UI.createLabel ({
			top : topvalue+12+4+6,
			text : ''
		});
		
		$.jobitem_row.add(itembodylabel);
		$.jobitem_row.add(itemqtylabel);
		$.jobitem_row.add(itempricelabel);
		$.jobitem_row.add(itempricelabel);
		$.jobitem_row.add(blanklabel);
		var topvalue = topvalue + 40;
	}
}

function editAction(e){
		function alertExecute() {alert("Execute return");};
		console.log("projectdetail.js:: editAction e : "+JSON.stringify(e));
		var projectController = Alloy.createController('enterproject',{
			projectname : projectname,
			projectid : projectid,
			customerid : customerid,
			firstname : firstname,
			lastname : lastname,
			fullname : fullname,
			company : company,
			phone : phone,
			email : email,
			address : address,
			city : city,
			state : state,
			country : country,
			idtag : idtag,
			edithref : edithref,
			selfhref : selfhref,
			status : status,
			notesraw : notesraw,
			status : status,
			nextapptdate : nextapptdate,
			dates : dates,
			datesdata : datesdata,
			datedue : datedue
		});
		projectController.openMainWindow($.tab_projectdetail);	
}

//STATUS CHANGE OPTION

var tr = Titanium.UI.create2DMatrix();
tr = tr.rotate(90);
/* 
var drop_button =  Titanium.UI.createButton({
		style:Titanium.UI.iPhone.SystemButton.DISCLOSURE,
		transform:tr
});*/

var drop_button = Titanium.UI.createButton({
	image : "downbutton.png",
	height : "40",
	width : "15",
	transform:tr
});

//TODO: Use TableviewRow label instead of text field.
var my_combo = Titanium.UI.createTextField({
	//hintText:"In Progress",
	left: "100",
	value:status,
	height:Ti.UI.SIZE,
	width:"300",
	borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
	leftButton:drop_button,
	leftButtonMode:Titanium.UI.INPUT_BUTTONMODE_ALWAYS,
	font:{fontSize:24,textAlign:Ti.UI.TEXT_ALIGNMENT_CENTER}
});

var picker_view = Titanium.UI.createView({
	height:251,
	bottom:0
});
 
var cancel =  Titanium.UI.createButton({
	title:'Cancel',
	style:Titanium.UI.iPhone.SystemButtonStyle.BORDERED
});
 
var done =  Titanium.UI.createButton({
	title:'Done',
	style:Titanium.UI.iPhone.SystemButtonStyle.DONE
});
 
var spacer =  Titanium.UI.createButton({
	systemButton:Titanium.UI.iPhone.SystemButton.FLEXIBLE_SPACE
});
 
var toolbar =  Titanium.UI.createToolbar({
	top:0,
	items:[cancel,spacer,done]
});

var statusarray = [ {'text':'Completed','color':'green'}, {'text':'In Progress','color':'orange'}, {'text':'Awaiting Customer','color':'yellow'}, {'text':'Not Started','color':'red'}, {'text':'Invoiced','color':"black"} ];

var pickerColumn = Ti.UI.createPickerColumn();
for (i=0;i<statusarray.length;i++){
	if(my_combo.value == statusarray[i].text){my_combo.color=statusarray[i].color;};//process the color on initial view
	var pickerRow = Titanium.UI.createPickerRow();
	var pickerLabel = Titanium.UI.createLabel({text:statusarray[i].text,color:statusarray[i].color,font:{fontSize:14}});	
	pickerRow.add(pickerLabel);
	pickerRow.id=statusarray[i].text;
	pickerRow.colorid=statusarray[i].color;
	pickerColumn.addRow(pickerRow);
}

var picker = Ti.UI.createPicker({
  top:43,
  columns: [pickerColumn],
  selectionIndicator: true
});
 
picker_view.add(toolbar);
picker_view.add(picker);

var slide_in =  Titanium.UI.createAnimation({bottom:0});
var slide_out =  Titanium.UI.createAnimation({bottom:-551});
//var slide_out =  Titanium.UI.createAnimation({bottom:-251});
my_combo.addEventListener('focus', function() {
	picker_view.animate(slide_out);
});
 
drop_button.addEventListener('click',function(e) {
	console.log("projectdetail.js::drop_button:: JSON.stringify(e): "+JSON.stringify(e));
	$.status_row.height=Ti.UI.Size;
	$.status_row.add(picker_view);
	my_combo.blur();
	picker_view.show();
	picker_view.animate(slide_in);		
});
 
cancel.addEventListener('click',function() {
	//picker_view.animate(slide_out);
	picker_view.hide();
});

picker.addEventListener('change',function(e) {
    Ti.API.info("You selected row: "+e.row.title+", column: "+JSON.stringify(e.column));
    Ti.API.info("row index: "+e.rowIndex+", column index: "+e.columnIndex);
});

done.addEventListener('click',function(e) {
	console.log("projectdetail.js::done:picker: JSON.stringify(e)" + JSON.stringify(e)+ " JSON.stringify() " +JSON.stringify(picker.getSelectedRow(0)));
	my_combo.value =  picker.getSelectedRow(0).id;
	my_combo.color = picker.getSelectedRow(0).colorid;
	//picker_view.animate(slide_out);
	picker_view.hide();
	$.status_row.add(my_combo);
	$.status_row.height="30";
	var status = my_combo.value;
	Alloy.Globals.updateExistingSpreadsheetAndDB("project",projectname,firstname,lastname,company,phone,email,address,city,state,country,status,notesraw,customerid,"none",dates,projectid,edithref,selfhref,idtag);
	var projectsid = Titanium.App.Properties.getString('project');
	Alloy.Globals.getPrivateData(projectsid,"project");
	callbackFunction();
});

$.status_row.add(my_combo);

$.projectdetail_window.addEventListener("close",function(){
	
});

//JOB REPORT EMAIL PDF START

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
	url.rename('projectreport.pdf');
	var docViewer = Ti.UI.iOS.createDocumentViewer({url:url.nativePath});
	navButton.addEventListener('click', function(){
	    //docViewer.show({view:navButton, animated: true});
	    navWin.close();
	});
	// The document viewer immediately launches without an animation
	winButton.addEventListener('click', function(){
		docViewer.show();
		var theimage = docViewer.toImage;
		console.log("invoicedetail.js::viewpdf: JSON.stringify(docViewer) + JSON.stringify(theimage) : "+JSON.stringify(docViewer) +" : theimage: "+ JSON.stringify(theimage));
    	 var kraniemailid = Titanium.App.Properties.getString('kraniemailid');
		 var name = kraniemailid.split('@')[0].trim();
     	 var parentid = Titanium.App.Properties.getString(name+"_invoice");
		//Alloy.Globals.uploadPictoGoogle(theimage,'pdftoimage1.jpg',parentid) ;
		});
	
	navWin.open();

}
 

function emailpdf(firstname,lastname,address,city,state,phone,email,projectid,company,projectname){
	
	console.log("projectdetail.js::emailpdf::  firstname " + firstname 	+" lastname " + lastname 	+" address " + address 	+" city " + city 	
	+" state " + state 	+" phone " + phone 	+" email " + email 	+" projectid " + projectid 	+" company " + company);
	
	var html2pdf = require('com.factisresearch.html2pdf');  
 	Ti.API.info("module is => " + html2pdf);
 	
 	var oldfile = Ti.Filesystem.getFile('projectreport.pdf'); if (oldfile.exists()) { oldfile.deleteFile(); } // cleanup old file
   
 	html2pdf.addEventListener('pdfready', function(e) {  
	     var file = Ti.Filesystem.getFile(e.pdf);   
	    console.log("projectdetail.js::html2pdf.addEventListener:: Ti.Filesystem.applicationDataDirectory "+Ti.Filesystem.applicationDataDirectory);
		var oldfile = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory,'projectreport.pdf');
		if (oldfile.exists()) { oldfile.deleteFile(); }
		var orgfile =  Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory,'Expose.pdf');
        var renamesuccess = orgfile.rename('projectreport.pdf');
        console.log("projectdetail.js::html2pdf.addEventListener:: renamesuccess "+renamesuccess);
	     var url = '../Documents/projectreport.pdf';
	     var newurl = Ti.Filesystem.getFile(url);
	     var file = 'projectreport.pdf';
	     console.log("opening viewpdf(url) on "+file);
     	 viewpdf(file);
     	 (Alloy.Globals.googleAuthSheet.getAccessToken()) || Alloy.Globals.googleAuthSheet.Authorized();
     	 //Set filename for uploaded file
     	 var date = new Date();
     	 var dateinsert = date.getFullYear()+""+(date.getMonth()+1)+""+date.getDate()+""+date.getHours();
     	 var pdffilename = projectid+"_"+firstname+"_"+lastname+"_"+dateinsert;
     	 var predocViewer = Ti.UI.iOS.createDocumentViewer({url:'projectreport.pdf'});
     	 var jpgfilename = "jpg_"+projectid+"_"+firstname+"_"+lastname+"_"+dateinsert;
     	 var kraniemailid = Titanium.App.Properties.getString('kraniemailid');
		 var name = kraniemailid.split('@')[0].trim();
     	 var parentid = Titanium.App.Properties.getString(name+"_project");
     	 console.log(new Date()+"::projectdetail.js::html2pdf::Alloy.Globals.uploadFile("+file+","+pdffilename+","+parentid+")");
     	 Alloy.Globals.uploadFile(file,pdffilename,parentid) ;
 	});  
	
	var coName = Titanium.App.Properties.getString("coName");
	var coAddress = Titanium.App.Properties.getString("coStreetAddress")+", \n"+Titanium.App.Properties.getString("coCity")
					+", "+Titanium.App.Properties.getString("coState")+" "+Titanium.App.Properties.getString("coZip");
	var tmpphone = Titanium.App.Properties.getString("coPhone");
	if(tmpphone) {var coPhone = "("+tmpphone.substr(0,3)+")"+tmpphone.substr(3,3)+"-"+tmpphone.substr(6,4);} else var tmpphone="";
	var coFax = coPhone;
	var coEmail = Titanium.App.Properties.getString("coEmail");
	var invoiceno = projectid;
	var logourl = Titanium.App.Properties.getString('logourl');
	
	if (phone) { var custphone = "("+phone.substr(0,3)+")"+phone.substr(3,3)+"-"+phone.substr(6,4);} else var custphone = "";
	
	var strVarItems="";
	
	var joblog  = Alloy.Collections.instance('joblog');
    joblog.fetch();
    console.log("projectdetail.js::JSON stringify joblog data on emailpdf: "+JSON.stringify(joblog));
    var jobitemjson = joblog.toJSON();
    console.log("projectdetail.js::jobitemjson.length: "+jobitemjson.length);
    for (j=0;j<jobitemjson.length;j++){
    	if (jobitemjson[j].col6 == "report"){
			console.log("projectdetail.js::emailpdf:: adhocs jobitemjson:  col1 : "+jobitemjson[j].col1+" : "+jobitemjson[j].col2+" : "+jobitemjson[j].col5);
			var picurl = jobitemjson[j].col4;
			if (jobitemjson[j].col2 != "none"){strVarItems += "						<td><span contenteditable>"+jobitemjson[j].col1+"<\/span><\/td>";};
			if (picurl != "none"){
				strVarItems += "			<table class=\"inventory\">";
				strVarItems += "				<tbody>";
				strVarItems += "					<tr>";
				strVarItems += "						<td><a class=\"cut\">-<\/a><span contenteditable>"+jobitemjson[j].col1+"<\/span><\/td>";
				strVarItems += "						<td><span><img alt=\"\" src=\""+jobitemjson[j].col4+"\"><input type=\"file\" title=\"image\" accept=\"image\/*\"><\/span><\/td>";
				strVarItems += "					<\/tr>";
			} else {
				strVarItems += "						<td><a class=\"cut\">-<\/a><span contenteditable>"+jobitemjson[j].col2+"<\/span><\/td>";
				strVarItems += "					<\/tr>";
			}
			strVarItems += "				<\/tbody>";
			strVar += "			<\/table>";
    	}
    }

	var strVar="";
	strVar += "<html>";
	strVar += "	<head>";
	strVar += "		<meta charset=\"utf-8\">";
	strVar += "		<title>Project Report<\/title>";
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
	strVar += "table input { cursor: pointer; -ms-filter:\"progid:DXImageTransform.Microsoft.Alpha(Opacity=0)\"; height: 100%; left: 0; opacity: 0; position: absolute; top: 0; width: 100%; }";
	strVar += "table img { max-height: 100%; max-width: 150%; }";
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
	//strVar += "body { box-sizing: border-box; height: 11in; margin: 0 auto; overflow: hidden; padding: 0.5in; width: 8.5in; }";
	strVar += "body { box-sizing: border-box; height: auto; margin: 0 auto; overflow: hidden; padding: 0.5in; width: 8.5in; }";
	strVar += "body { background: #FFF; border-radius: 1px; box-shadow: 0 0 1in -0.25in rgba(0, 0, 0, 0.5); }";
	strVar += "div   { page-break-inside:avoid; }";
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
	strVar += "table.inventory { page-break-inside:never; }";
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
	strVar += "			<h1>Project Report<\/h1>";
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
	strVar += "				<p>"+((firstname == "none")?"":firstname)+" "+((lastname == "none")?"":lastname)+"<br>"+((address == "none")?"":address)+"<br>"+((city == "none")?"":city)+", "+((state == "none")?"":state)
	+"<br> phone:  "+((custphone == "none")?"":custphone)+"<br> email: "+((email == "none")?"":email)+"<\/p>";
	strVar += "			<\/address>";
	strVar += "			<table class=\"meta\">";
	strVar += "				<tr>";
	strVar += "					<th><span contenteditable>Project Name<\/span><\/th>";
	strVar += "					<td><span contenteditable>"+projectname+"<\/span><\/td>";
	strVar += "				<\/tr>";
	strVar += "				<tr>";
	strVar += "					<th><span contenteditable>Date<\/span><\/th>";
	strVar += "					<td><span contenteditable>"+(new Date()).toString().slice(4,16)+"<\/span><\/td>";
	strVar += "				<\/tr>";
	strVar += "				<tr>";
	strVar += "					<th><span contenteditable>Project #<\/span><\/th>";
	strVar += "					<td><span id=\"prefix\" contenteditable><\/span><span>"+projectid+"<\/span><\/td>";
	strVar += "				<\/tr>";
	strVar += "			<\/table>";
	strVar += "			<table class=\"inventory\">";
	strVar += "				<thead>";
	strVar += "					<tr>";
	strVar += "						<th><span contenteditable>Date<\/span><\/th>";
	strVar += "						<th><span contenteditable>Description<\/span><\/th>";
	strVar += "					<\/tr>";
	strVar += "				<\/thead>";
	strVar += strVarItems;
	//strVar += "			<\/table>";
	strVar += "		<\/article>";
	strVar += "	<\/body>";
	strVar += "<\/html>";
   
 	html2pdf.setHtmlString(strVar); 
 
}


function genJoblog(e){
	console.log("invoicedetail.js::genInvoice:: JSON.stringify(e) "+JSON.stringify(e)+" with : "+firstname+" "+lastname+" : "+projectid+" projectname: "+projectname);
		var logourl = Titanium.App.Properties.getString('logourl');
		console.log("invoicedetail.js::genInvoice:: logourl is: "+logourl);

		emailpdf(firstname,lastname,address,city,state,phone,email,projectid,company,projectname);
};


$.jobreport_button.addEventListener("click",function(e){
	console.log("projectdetail.js::jobreport_button:JSON.stringify(e)" + JSON.stringify(e));
});

//Date action
var dateduePicker = Titanium.UI.createPicker({top:0, type:Titanium.UI.PICKER_TYPE_DATE});
dateduePicker.selectionIndicator=true;
dateduePicker.addEventListener("change",function(e) {
	console.log("projectdetail.js::dateduepicker on change: "+JSON.stringify(e));
	var dates = [];
	//$.datedue_label.text = e.value.toString().split('T')[0].replace(/(\d+)-(\d+)-(\d+)/,'$3/$2/$2');
	var utcdate = Date.parse(e.value.toString());
	var regdate = new Date(utcdate);
	datedue = ( (new Date(utcdate)).getMonth() + 1 )+"/"+(new Date(utcdate)).getDate()+"/"+(new Date(utcdate)).getFullYear();
	$.datedue_label.text = datedue;
	//update ss
	dates.push({"nextapptdate":nextapptdate,"duedate":datedue,"lastpaiddate":lastpaiddate});
	var dates = JSON.stringify(dates).replace(/:/g,"cOlOn");
	console.log("projectdetail.js::nextapptdatepicker before SS update: "+dates);
	Alloy.Globals.updateExistingSpreadsheetAndDB("project",projectname,firstname,lastname,company,phone,email,address,city,state,country,status,notesraw,customerid,"none",dates,projectid,edithref,selfhref,idtag);
	var projectsid = Titanium.App.Properties.getString('project');
	Alloy.Globals.getPrivateData(projectsid,"project");
	callbackFunction();
});

function duedateAction(e){
	console.log("projectdetail.js::duedate:: JSON.stringify(e): "+JSON.stringify(e));
	if (e.source.textid=="pickershow") {
		dateduePicker.hide(); $.duedate_button.textid="pickerhide";
		$.datepicker_row.height="1";
		$.datepicker_row.remove(dateduePicker);
		$.datepicker_row.remove(nextapptdatePicker);
	} else {
		$.datepicker_row.height="170";
		$.datepicker_row.add(dateduePicker);
		dateduePicker.show(); $.duedate_button.textid="pickershow";

	}	
}
//dateduePicker.hide();

var nextapptdatePicker = Titanium.UI.createPicker({top:0, type:Titanium.UI.PICKER_TYPE_DATE});
nextapptdatePicker.selectionIndicator=true;
nextapptdatePicker.addEventListener("change",function(e) {
	var dates = [];
	console.log("projectdetail.js::nextapptdatepicker on change: "+JSON.stringify(e));
	var utcdate = Date.parse(e.value.toString());
	var regdate = new Date(utcdate);
	nextapptdate = ( (new Date(utcdate)).getMonth() + 1 )+"/"+(new Date(utcdate)).getDate()+"/"+(new Date(utcdate)).getFullYear();
	$.nextapptdate_label.text = nextapptdate;
	//update ss
	dates.push({"nextapptdate":nextapptdate,"duedate":datedue,"lastpaiddate":lastpaiddate});
	var dates = JSON.stringify(dates).replace(/:/g,"cOlOn");
	console.log("projectdetail.js::nextapptdatepicker before SS update: "+dates);
	Alloy.Globals.updateExistingSpreadsheetAndDB("project",projectname,firstname,lastname,company,phone,email,address,city,state,country,status,notesraw,customerid,"none",dates,projectid,edithref,selfhref,idtag);
	var projectsid = Titanium.App.Properties.getString('project');
	Alloy.Globals.getPrivateData(projectsid,"project");
	callbackFunction();
});

function nextapptdateAction(e){
	console.log("projectdetail.js::nextapptdate:: JSON.stringify(e): "+JSON.stringify(e));
	nextapptdatePicker.show();
	if (e.source.textid=="pickershow") {
		dateduePicker.hide(); $.nextapptdate_button.textid="pickerhide";
		$.datepicker_row.height="1";
		$.datepicker_row.remove(nextapptdatePicker);
		$.datepicker_row.remove(dateduePicker);
	} else {
		$.datepicker_row.height="170";
		$.datepicker_row.add(nextapptdatePicker);
		nextapptdatePicker.show(); $.nextapptdate_button.textid="pickershow";
	}
}
//nextapptdatePicker.hide();
