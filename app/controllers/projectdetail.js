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
var nextappt = data[13];
var dates = data[14];console.log("projectdetail.js::dates: "+dates);
var datesdata = dates.replace(/cOlOn/g,":");console.log("projectdetail.js::datesdata: "+datesdata);
var datedue = JSON.parse(datesdata)[0].duedate;
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
someDummy.set('nextappt', nextappt);
someDummy.set('datedue', datedue);
someDummy.set('projectid', projectid);

var nextapptlabel = Ti.UI.createLabel ({
		color : "green",
		left  : "200",
		textAlign : "Ti.UI.TEXT_ALIGNMENT_LEFT",
		top : "10",
		font:{
			fontSize:12
		},
		text : nextappt
});
        
var dateduelabel = Ti.UI.createLabel ({
        color : "green",
        left  : "200",
        textAlign : "Ti.UI.TEXT_ALIGNMENT_LEFT",
        top : "30",
        font:{
        	fontSize:12
        },
        text : datedue
});
        
$.nextapptdetail_row.add(dateduelabel);
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
	console.log("projectdetail.js::JSON stringify e: "+JSON.stringify(e));
	var tabViewOneController = Alloy.createController("jobdetail");
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
		$.jobitem_row.add(itembodylabel);
		$.jobitem_row.add(itemqtylabel);
		$.jobitem_row.add(itempricelabel);
		var topvalue = topvalue + 34;
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
			nextappt : nextappt,
			dates : dates,
			datesdata : datesdata,
			datedue : datedue
		});
		projectController.openMainWindow($.tab_projectdetail);	
}

//STATUS CHANGE OPTION

var tr = Titanium.UI.create2DMatrix();
tr = tr.rotate(90);
 
var drop_button =  Titanium.UI.createButton({
		style:Titanium.UI.iPhone.SystemButton.DISCLOSURE,
		transform:tr
});

//TODO: Use TableviewRow label instead of text field.
var my_combo = Titanium.UI.createTextField({
	//hintText:"In Progress",
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

var status = [ {'text':'Completed','color':'green'}, {'text':'In Progress','color':'orange'}, {'text':'Awaiting Customer','color':'yellow'}, {'text':'Not Started','color':'red'}, {'text':'Invoiced','color':"black"} ];

var pickerColumn = Ti.UI.createPickerColumn();
for (i=0;i<status.length;i++){
	if(my_combo.value == status[i].text){my_combo.color=status[i].color;};//process the color on initial view
	var pickerRow = Titanium.UI.createPickerRow();
	var pickerLabel = Titanium.UI.createLabel({text:status[i].text,color:status[i].color,font:{fontSize:14}});	
	pickerRow.add(pickerLabel);
	pickerRow.id=status[i].text;
	pickerRow.colorid=status[i].color;
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

function emailpdf(firstname,lastname,address,city,state,phone,email,projectid,company,total,balance,paid,lastpaiddate,duedate,price){
	
	console.log("projectdetail.js::emailpdf::  firstname " + firstname 	+" lastname " + lastname 	+" address " + address 	+" city " + city 	
	+" state " + state 	+" phone " + phone 	+" email " + email 	+" projectid " + projectid 	+" company " + company 	+" total " + total 	
	+" balance " + balance 	+" paid " + paid 	+" lastpaiddate " + lastpaiddate 	+" duedate " + duedate 	+" price " + price);
	
	var html2pdf = require('com.factisresearch.html2pdf');  
 	Ti.API.info("module is => " + html2pdf);
 	
 	var oldfile = Ti.Filesystem.getFile('invoice.pdf'); if (oldfile.exists()) { oldfile.deleteFile(); } // cleanup old file
   
 	html2pdf.addEventListener('pdfready', function(e) {  
	     var file = Ti.Filesystem.getFile(e.pdf);   
	    console.log("projectdetail.js::html2pdf.addEventListener:: Ti.Filesystem.applicationDataDirectory "+Ti.Filesystem.applicationDataDirectory);
		var oldfile = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory,'invoice.pdf');
		if (oldfile.exists()) { oldfile.deleteFile(); }
		var orgfile =  Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory,'Expose.pdf');
        var renamesuccess = orgfile.rename('invoice.pdf');
        console.log("projectdetail.js::html2pdf.addEventListener:: renamesuccess "+renamesuccess);
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
     	 (Alloy.Globals.googleAuthSheet.getAccessToken()) || Alloy.Globals.googleAuthSheet.Authorized();
     	 //Set filename for uploaded file
     	 var date = new Date();
     	 var dateinsert = date.getFullYear()+""+(date.getMonth()+1)+""+date.getDate()+""+date.getHours();
     	 var pdffilename = projectid+"_"+firstname+"_"+lastname+"_"+dateinsert;
     	 var predocViewer = Ti.UI.iOS.createDocumentViewer({url:'invoice.pdf'});
     	 //var imagefile = predocViewer.toImage();
     	 var jpgfilename = "jpg_"+projectid+"_"+firstname+"_"+lastname+"_"+dateinsert;
     	 var kraniemailid = Titanium.App.Properties.getString('kraniemailid');
		 var name = kraniemailid.split('@')[0].trim();
     	 var parentid = Titanium.App.Properties.getString(name+"_invoice");
     	 console.log(new Date()+"::projectdetail.js::html2pdf::Alloy.Globals.uploadFile("+file+","+pdffilename+","+parentid+")");
     	 Alloy.Globals.uploadFile(file,pdffilename,parentid) ;
     	 //Alloy.Globals.uploadFile(imagefile,jpgfilename) ;
 	});  
 	
 	//var html = '<html><body><p>dBayCo Inc. limited </p></body></html>'; 
 	
 	//var html="";
	//html += "<html><body><div id=\"top-bar\"><div id=\"doc-title\"><span class=\"name\">sample invoice : Sheet1<\/span><\/div><\/div><div id=\"sheets-viewport\"><div id=\"0\" style=\"display:none;position:relative;\" dir=\"ltr\"><div class=\"ritz grid-container\" dir=\"ltr\"><table class=\"waffle\" cellspacing=\"0\" cellpadding=\"0\"><thead><tr><th class=\"row-header freezebar-origin-ltr header-shim row-header-shim\"><\/th><th id=\"0C0\" style=\"width:195px\" class=\"header-shim\"><\/th><th id=\"0C1\" style=\"width:286px\" class=\"header-shim\"><\/th><th id=\"0C2\" style=\"width:100px\" class=\"header-shim\"><\/th><th id=\"0C3\" style=\"width:100px\" class=\"header-shim\"><\/th><th id=\"0C4\" style=\"width:100px\" class=\"header-shim\"><\/th><\/tr><\/thead><tbody><tr style='height:20px;'><th id=\"0R0\" style=\"height: 20px;\" class=\"row-headers-background row-header-shim\"><div class=\"row-header-wrapper\" style=\"line-height: 20px;\">1<\/div><\/th><td><\/td><td><\/td><td><\/td><td><\/td><td><\/td><\/tr><tr style='height:20px;'><th id=\"0R1\" style=\"height: 20px;\" class=\"row-headers-background row-header-shim\"><div class=\"row-header-wrapper\" style=\"line-height: 20px;\">2<\/div><\/th><td class=\"s0\" dir=\"ltr\" colspan=\"5\">DbayCo Inc. 130 Moreland Rd., Brookfield, WI 53222<\/td><\/tr><tr style='height:20px;'><th id=\"0R2\" style=\"height: 20px;\" class=\"row-headers-background row-header-shim\"><div class=\"row-header-wrapper\" style=\"line-height: 20px;\">3<\/div><\/th><td class=\"s1\" dir=\"ltr\" colspan=\"5\">Phone: 262-501-2948, Fax: 262-290-3141. Email: deen@idevice.net<\/td><\/tr><tr style='height:20px;'><th id=\"0R3\" style=\"height: 20px;\" class=\"row-headers-background row-header-shim\"><div class=\"row-header-wrapper\" style=\"line-height: 20px;\">4<\/div><\/th><td class=\"s2\" colspan=\"5\"><\/td><\/tr><tr style='height:20px;'><th id=\"0R4\" style=\"height: 20px;\" class=\"row-headers-background row-header-shim\"><div class=\"row-header-wrapper\" style=\"line-height: 20px;\">5<\/div><\/th><td class=\"s3\" dir=\"ltr\" colspan=\"3\">INVOICE<\/td><td class=\"s0\" dir=\"ltr\" colspan=\"2\">WAN-20150225-1<\/td><\/tr><tr style='height:20px;'><th id=\"0R5\" style=\"height: 20px;\" class=\"row-headers-background row-header-shim\"><div class=\"row-header-wrapper\" style=\"line-height: 20px;\">6<\/div><\/th><td class=\"s2\" colspan=\"2\" rowspan=\"2\"><\/td><td class=\"s2\" colspan=\"3\"><\/td><\/tr><tr style='height:20px;'><th id=\"0R6\" style=\"height: 20px;\" class=\"row-headers-background row-header-shim\"><div class=\"row-header-wrapper\" style=\"line-height: 20px;\">7<\/div><\/th><td class=\"s4\"><\/td><td class=\"s5\" dir=\"ltr\"><\/td><td class=\"s5\" dir=\"ltr\"><\/td><\/tr><tr style='height:20px;'><th id=\"0R7\" style=\"height: 20px;\" class=\"row-headers-background row-header-shim\"><div class=\"row-header-wrapper\" style=\"line-height: 20px;\">8<\/div><\/th><td class=\"s2\" dir=\"ltr\">Wannoorbaya WChik<\/td><td class=\"s2\" rowspan=\"4\"><\/td><td class=\"s5\" dir=\"ltr\"><\/td><td class=\"s5\" dir=\"ltr\">230<\/td><td class=\"s5\" dir=\"ltr\"><\/td><\/tr><tr style='height:20px;'><th id=\"0R8\" style=\"height: 20px;\" class=\"row-headers-background row-header-shim\"><div class=\"row-header-wrapper\" style=\"line-height: 20px;\">9<\/div><\/th><td class=\"s2\" dir=\"ltr\">2258 S Sanctuary Dr<\/td><td class=\"s5\" dir=\"ltr\"><\/td><td class=\"s5\" dir=\"ltr\"><\/td><td class=\"s6\" dir=\"ltr\">due 4\/1\/2015<\/td><\/tr><tr style='height:20px;'><th id=\"0R9\" style=\"height: 20px;\" class=\"row-headers-background row-header-shim\"><div class=\"row-header-wrapper\" style=\"line-height: 20px;\">10<\/div><\/th><td class=\"s2\" dir=\"ltr\">New Berlin, WI 53151<\/td><td class=\"s2\" colspan=\"3\" rowspan=\"2\"><\/td><\/tr><tr style='height:20px;'><th id=\"0R10\" style=\"height: 20px;\" class=\"row-headers-background row-header-shim\"><div class=\"row-header-wrapper\" style=\"line-height: 20px;\">11<\/div><\/th><td class=\"s2\" dir=\"ltr\">Date: 2\/28\/2014<\/td><\/tr><tr style='height:20px;'><th id=\"0R11\" style=\"height: 20px;\" class=\"row-headers-background row-header-shim\"><div class=\"row-header-wrapper\" style=\"line-height: 20px;\">12<\/div><\/th><td class=\"s2\" colspan=\"5\" rowspan=\"2\"><\/td><\/tr><tr style='height:20px;'><th id=\"0R12\" style=\"height: 20px;\" class=\"row-headers-background row-header-shim\"><div class=\"row-header-wrapper\" style=\"line-height: 20px;\">13<\/div><\/th><\/tr><tr style='height:20px;'><th id=\"0R13\" style=\"height: 20px;\" class=\"row-headers-background row-header-shim\"><div class=\"row-header-wrapper\" style=\"line-height: 20px;\">14<\/div><\/th><td class=\"s7\" dir=\"ltr\">Item no.<\/td><td class=\"s7\" dir=\"ltr\">Description<\/td><td class=\"s7\" dir=\"ltr\">Qty<\/td><td class=\"s7\" dir=\"ltr\">Unit\/Price<\/td><td class=\"s8\" dir=\"ltr\">Price<\/td><\/tr><tr style='height:20px;'><th id=\"0R14\" style=\"height: 20px;\" class=\"row-headers-background row-header-shim\"><div class=\"row-header-wrapper\" style=\"line-height: 20px;\">15<\/div><\/th><td class=\"s2\" dir=\"ltr\"><\/td><td class=\"s2\" dir=\"ltr\"><\/td><td class=\"s2\" dir=\"ltr\"><\/td><td class=\"s2\" dir=\"ltr\"><\/td><td class=\"s2\" dir=\"ltr\"><\/td><\/tr><tr style='height:20px;'><th id=\"0R15\" style=\"height: 20px;\" class=\"row-headers-background row-header-shim\"><div class=\"row-header-wrapper\" style=\"line-height: 20px;\">16<\/div><\/th><td class=\"s9\" dir=\"ltr\">1<\/td><td class=\"s2\" dir=\"ltr\">Mow Lawn<\/td><td class=\"s9\" dir=\"ltr\">1<\/td><td class=\"s9\" dir=\"ltr\">100<\/td><td class=\"s10\" dir=\"ltr\">100<\/td><\/tr><tr style='height:20px;'><th id=\"0R16\" style=\"height: 20px;\" class=\"row-headers-background row-header-shim\"><div class=\"row-header-wrapper\" style=\"line-height: 20px;\">17<\/div><\/th><td class=\"s9\" dir=\"ltr\">2<\/td><td class=\"s2\" dir=\"ltr\">Cut Trees<\/td><td class=\"s9\" dir=\"ltr\">1<\/td><td class=\"s9\" dir=\"ltr\">120<\/td><td class=\"s10\" dir=\"ltr\">120<\/td><\/tr><tr style='height:20px;'><th id=\"0R17\" style=\"height: 20px;\" class=\"row-headers-background row-header-shim\"><div class=\"row-header-wrapper\" style=\"line-height: 20px;\">18<\/div><\/th><td class=\"s11\"><\/td><td class=\"s11\"><\/td><td class=\"s11\"><\/td><td class=\"s11\" dir=\"ltr\"><\/td><td class=\"s12\" dir=\"ltr\"><\/td><\/tr><tr style='height:20px;'><th id=\"0R18\" style=\"height: 20px;\" class=\"row-headers-background row-header-shim\"><div class=\"row-header-wrapper\" style=\"line-height: 20px;\">19<\/div><\/th><td><\/td><td><\/td><td class=\"s13\"><\/td><td class=\"s13\" dir=\"ltr\">SubTotal<\/td><td class=\"s10\" dir=\"ltr\">220<\/td><\/tr><tr style='height:20px;'><th id=\"0R19\" style=\"height: 20px;\" class=\"row-headers-background row-header-shim\"><div class=\"row-header-wrapper\" style=\"line-height: 20px;\">20<\/div><\/th><td><\/td><td><\/td><td class=\"s13\"><\/td><td class=\"s13\" dir=\"ltr\">Tax<\/td><td class=\"s10\" dir=\"ltr\">10<\/td><\/tr><tr style='height:20px;'><th id=\"0R20\" style=\"height: 20px;\" class=\"row-headers-background row-header-shim\"><div class=\"row-header-wrapper\" style=\"line-height: 20px;\">21<\/div><\/th><td><\/td><td><\/td><td class=\"s13\"><\/td><td class=\"s13\" dir=\"ltr\">Other<\/td><td class=\"s10\" dir=\"ltr\">0<\/td><\/tr><tr style='height:20px;'><th id=\"0R21\" style=\"height: 20px;\" class=\"row-headers-background row-header-shim\"><div class=\"row-header-wrapper\" style=\"line-height: 20px;\">22<\/div><\/th><td><\/td><td><\/td><td class=\"s13\"><\/td><td class=\"s13\" dir=\"ltr\">Discount<\/td><td class=\"s10\" dir=\"ltr\">0<\/td><\/tr><tr style='height:20px;'><th id=\"0R22\" style=\"height: 20px;\" class=\"row-headers-background row-header-shim\"><div class=\"row-header-wrapper\" style=\"line-height: 20px;\">23<\/div><\/th><td><\/td><td><\/td><td class=\"s13\" dir=\"ltr\"><\/td><td class=\"s13\" dir=\"ltr\">Paid<\/td><td class=\"s10\" dir=\"ltr\">0<\/td><\/tr><tr style='height:20px;'><th id=\"0R23\" style=\"height: 20px;\" class=\"row-headers-background row-header-shim\"><div class=\"row-header-wrapper\" style=\"line-height: 20px;\">24<\/div><\/th><td><\/td><td><\/td><td class=\"s14\" dir=\"ltr\">Total due by<\/td><td class=\"s15\" dir=\"ltr\">4\/1\/2015<\/td><td class=\"s15\" dir=\"ltr\">230<\/td><\/tr><\/tbody><\/table><\/div><\/div><\/div><\/body><\/html>";
	/*var coName = 'Jack Mow Inc.';
	var coAddress = "1125 Bluemound Rd., Brookfield, WI 53222";
	var coPhone = "262-290-3141";
	var coFax = "262-290-3142";
	var coEmail = "sales@jackmowinc.com";*/
	
	var coName = Titanium.App.Properties.getString("coName");
	var coAddress = Titanium.App.Properties.getString("coStreetAddress")+", \n"+Titanium.App.Properties.getString("coCity")
					+", "+Titanium.App.Properties.getString("coState")+" "+Titanium.App.Properties.getString("coZip");
	var tmpphone = Titanium.App.Properties.getString("coPhone");
	if(tmpphone) {var coPhone = "("+tmpphone.substr(0,3)+")"+tmpphone.substr(3,3)+"-"+tmpphone.substr(6,4);} else var tmpphone="";
	var coFax = coPhone;
	var coEmail = Titanium.App.Properties.getString("coEmail");
	var invoiceno = projectid;
	
	if (phone) { var custphone = "("+phone.substr(0,3)+")"+phone.substr(3,3)+"-"+phone.substr(6,4);} else var custphone = "";
	
	adhocs.fetch();
	console.log("projectdetail.js::emailpdf:: adhocs contents "+JSON.stringify(adhocs)); 
	console.log("projectdetail.js::emailpdf:: adhocs.length: "+adhocs.length); 
	var strVarItems="";
	for (i=0;i<adhocs.length;i++){
		console.log("projectdetail.js::emailpdf:: adhocs.models["+i+"].toJSON().col3: "+adhocs.models[i].toJSON().col3);
		var jobitemstring=adhocs.models[i].toJSON().col3.replace(/xSqBracketOpen/,'[').replace(/xSqBracketClose/,']');
		console.log("projectdetail.js::emailpdf:: adhocs extraction: jobitemstring.length "+jobitemstring.length+ "jobitemstring : "+jobitemstring);
		var jobitemjson = JSON.parse(jobitemstring);
		for (j=0;j<jobitemjson.length;j++){
			var names=jobitemjson[0].names;
			console.log("projectdetail.js::emailpdf:: adhocs extraction:  names : "+jobitemjson[j].names+" : "+jobitemjson[j].descr+" : "+jobitemjson[j].lineitem+" : "+jobitemjson[j].price+" : "+jobitemjson[j].qty);
			strVarItems += "				<tbody>";
			strVarItems += "					<tr>";
			if(j>0){
				console.log("projectdetail.js::emailpdf:: names comparison:  "+jobitemjson[j].names+" vs. "+jobitemjson[j-1].names);
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
	strVar += "				<p>"+((firstname == "none")?"":firstname)+" "+((lastname == "none")?"":lastname)+"<br>"+((address == "none")?"":address)+"<br>"+((city == "none")?"":city)+", "+((state == "none")?"":state)
	+"<br> phone:  "+((custphone == "none")?"":custphone)+"<br> email: "+((email == "none")?"":email)+"<\/p>";
	strVar += "			<\/address>";
	strVar += "			<table class=\"meta\">";
	strVar += "				<tr>";
	strVar += "					<th><span contenteditable>Invoice #<\/span><\/th>";
	strVar += "					<td><span contenteditable>"+projectid+"<\/span><\/td>";
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



$.jobreport_button.addEventListener("click",function(e){
	console.log("projectdetail.js::jobreport_button:JSON.stringify(e)" + JSON.stringify(e));
});
