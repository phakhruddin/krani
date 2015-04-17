var args = arguments[0] || {};
exports.openMainWindow = function(_tab) {
  _tab.open($.projectdetail_window);
  Ti.API.info("This is child widow checking _tab on : " +JSON.stringify(_tab));
  Ti.API.info(" input details : "+JSON.stringify(args));
  Alloy.Globals.checkFileExistThenUpdateSID(filename);
  //Titanium.App.Properties.setString('sid',"none"); // reset the job log sid.
};

var someDummy = Alloy.Models.dummy;
console.log("stringify dummy :"+JSON.stringify(someDummy));
someDummy.set('id', '1234');
someDummy.fetch();

var data = args.title.split(':');
var projectname = data[0];
var firstname = data[1];
var lastname = data[2];
var fullname = firstname+" "+lastname;
var company = data[3];
var phone = data[4];console.log("phone: "+phone);
var email = data[5];console.log("email: "+email);
var address = data[6];
var city = data[7];
var state = data[8];
var country = data[9];
var status = data[10];
var notes = data[11];
var percentcomplete = data[12];
var nextappt = data[13];
var datedue = data[14];
var projectid = data[15];
var filename = 'project_'+projectid+'_'+firstname+'_'+lastname;
console.log("projectdetail:: filename : "+filename);

someDummy.set('projectname', projectname);
someDummy.set('fullname', fullname);
someDummy.set('company', company);
someDummy.set('phone', phone);
someDummy.set('email', email);
someDummy.set('address', address);
someDummy.set('citystate', city+' , '+state);
someDummy.set('fulladdress',+address+' , '+city+' , '+state);
someDummy.set('country', country);
someDummy.set('firstname', firstname);
someDummy.set('lastname', lastname);
someDummy.set('notes', notes);
someDummy.set('percentcomplete', percentcomplete);
someDummy.set('nextappt', nextappt);
someDummy.set('datedue', datedue);

function nameAction(e) {
	console.log("JSON stringify e: "+JSON.stringify(e));
};

function phoneAction(e) {
	console.log("JSON stringify e: "+JSON.stringify(e));
};

function emailAction(e) {
	console.log("JSON stringify e: "+JSON.stringify(e));
};

function addressAction(e) {
	console.log("JSON stringify e: "+JSON.stringify(e));
};

function JobDetail(e){
	console.log("JSON stringify e: "+JSON.stringify(e));
	var tabViewOneController = Alloy.createController("jobdetail");
	tabViewOneController.openMainWindow($.tab_projectdetail);	
}

$.addbutton.setTitleid(args);

$.addbutton.addEventListener("click", function(e){
	console.log("JSON stringify e on addHandler: "+JSON.stringify(e));
	console.log("JSON stringify e on addHandler args: "+JSON.stringify(args));
	var item = "joblog";
    	//Get joblog specific to project - START
	var projectid = args.title.split(':')[15];
	var firstname = args.title.split(':')[1];
	var lastname = args.title.split(':')[2];
	var filename = 'project_'+projectid+'_'+firstname+'_'+lastname;
	var parentid = Titanium.App.Properties.getString('parentid');
	console.log("need to check if parent/filename exist: "+parentid+'/'+filename);
	fileExist(filename,parentid);
	var item = "joblog";
	//var sid = Titanium.App.Properties.getString(item,"none");
	// Get joblog specific to project - END
	var sid = Titanium.App.Properties.getString('sid');
	Alloy.Globals.getPrivateData(sid,item);
	var tabViewOneController = Alloy.createController("enterjobdetail",{
			title: args,
			sid: sid
		});
	tabViewOneController.openMainWindow($.tab_projectdetail);	
});

function addHandler(e,args){
	console.log("JSON stringify e on addHandler: "+JSON.stringify(e));
	console.log("JSON stringify e on addHandler args: "+JSON.stringify(args));
	Alloy.Globals.getPrivateData(sid,item);
	var tabViewOneController = Alloy.createController("enterjobdetail",{
			title: args
		});
	tabViewOneController.openMainWindow($.tab_projectdetail);	
}

//MAIN if spreadsheet exist ignore, NOT create the spreadsheet
function fileExist(filename,parentid){
		var jsonlist = " ";
		var xhr = Ti.Network.createHTTPClient({
	    onload: function(e) {
	    try {
	    		var jsonlist = JSON.parse(this.responseText);
	    		Ti.API.info("response of jsonlist is: "+JSON.stringify(jsonlist));
	    	} catch(e){
				Ti.API.info("cathing e: "+JSON.stringify(e));
			}
			console.log("jsonlist.items.length: "+jsonlist.items.length);
			filelist = [];
			if (jsonlist.items.length == "0" ){
				console.log("File DOES NOT EXIST");
				var fileexist = "false";
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
		alert("Unable to connect to the cloud.");
	};
	var rawquerystring = '?q=title+%3D+\''+filename+'\'+and+mimeType+%3D+\'application%2Fvnd.google-apps.spreadsheet\'+and+trashed+%3D+false&fields=items(id%2CmimeType%2Clabels%2Ctitle)';
	xhr.open("GET", 'https://www.googleapis.com/drive/v2/files'+rawquerystring);
	xhr.setRequestHeader("Content-type", "application/json");
    xhr.setRequestHeader("Authorization", 'Bearer '+ googleAuthSheet.getAccessToken());
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
	    		console.log("args inside getParentFolder: "+JSON.stringify(args));
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

function getSSKey() {
	var xhr = Ti.Network.createHTTPClient({
	    onload: function(e) {
	    try {
	    		var xml = Titanium.XML.parseString(this.responseText);
	    		Ti.API.info("getSSKey:: response is: "+this.responseText);
	    		Ti.API.info("getSSKey:: xml response is: "+xml);
	    	} catch(e){
				Ti.API.info("cathing e: "+JSON.stringify(e));
			}
		}
		});
	xhr.onerror = function(e){
		alert("Unable to connect to the cloud.");
	};
	xhr.open("GET", 'https://spreadsheets.google.com/feeds/spreadsheets/private/full');
	xhr.setRequestHeader("Content-type", "application/atom+xml");
    xhr.setRequestHeader("Authorization", 'Bearer '+ googleAuthSheet.getAccessToken());
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
	console.log("get SS Cell on :  https://spreadsheets.google.com/feeds/cells/"+sid+"/od6/private/full/"+pos);
	var xhr = Ti.Network.createHTTPClient({
	    onload: function(e) {
	    try {
	    		var xml = Titanium.XML.parseString(this.responseText);
	    		Ti.API.info("getSSCell:: response is: "+this.responseText);
	    		Ti.API.info("getSSCell:: xml response is: "+xml);
	    		var entry = xml.documentElement.getElementsByTagName("entry");
	    		var link = xml.documentElement.getElementsByTagName("link");
	    		console.log(" number of link found: " +link+ " length: "+link.length);
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

$.GetSSCell.addEventListener("click", function(e){
	var sid = Titanium.App.Properties.getString('sid');
	//var sid = '1gecYbrWtzS3Zr5d6kpzmYBAxe4UXncKylKfSMREiDtM';
	for (i=1;i<17;i++){
		var value = "col"+i;
		getSSCell(sid,1,i,value);
	}
	getSSCell(sid,2,1,"Date");
	getSSCell(sid,2,2,"Notes");
	var date = new Date();
	getSSCell(sid,3,1,date);
	getSSCell(sid,3,2,"Please enter work logs.");
	//getSSCell(sid,1,1,'col1');
});

getParentFolder();

function createSpreadsheet(filename,parentid) {
	console.log("create ss with filename: "+filename+" and parentid: "+parentid);
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
					};
					
	    		console.log("sid : "+sid);
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
    console.log("json post: "+jsonpost);
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
 		console.log("xmldatastring: "+xmldatastring);
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


function checkjoblogsidfromDB(){
	thejoblogsidarray = [];
	var thejoblogsid = Alloy.Collections.instance('joblogsid');
	thejoblogsid.fetch();
	Ti.API.info(" thejoblogsid : "+JSON.stringify(thejoblogsid));
	if (thejoblogsid.length > 0) {
		var joblogsidjson = thejoblogsid.toJSON();
		console.log("JSON.stringify(joblogsidjson): " +JSON.stringify(joblogsidjson));
		for( var i=0; i < joblogsidjson.length; i++){
			var projectid  = joblogsidjson[i].col1;
			var projectname = joblogsidjson[i].col2;
			var sid = joblogsidjson[i].col3.trim();
			thejoblogsidarray.push({projectname:projectname,sid: sid});
			var content = filename+','+sid;
			Alloy.Globals.appendFile(content,"joblogsid.txt");
		}
		
		console.log("thejoblogsidarray.length : "+thejoblogsidarray.length);
		if ( thejoblogsidarray.length > 0 ){
			console.log("thejoblogsidarray : "+JSON.stringify(thejoblogsidarray));
		}
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
    		var filename = joblogsidjson[i].col1.trim();
    		var sid = joblogsidjson[i].col2.trim();
    		if ( thefilename == filename ){
    			console.log("projectdetail.js::getjoblogSID::needupdate: "+filename+" match "+thefilename+" with sid: "+sid);
    			return sid;
    		} 
    	}
    }   
}	

