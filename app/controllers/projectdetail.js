var args = arguments[0] || {};
exports.openMainWindow = function(_tab) {
  _tab.open($.projectdetail_window);
  Ti.API.info("This is child widow checking _tab on : " +JSON.stringify(_tab));
  Ti.API.info(" input details : "+JSON.stringify(args));
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
	Titanium.App.Properties.setString('filename',filename);
	console.log("need to check if parent/filename exist: "+parentid+'/'+filename);
	fileExist(filename,parentid);
	var item = "joblog";
	//var sid = Titanium.App.Properties.getString(item,"none");
	// Get joblog specific to project - END
	var sid = Titanium.App.Properties.getString('sid');
	Alloy.Globals.getPrivateData(sid,item);
	var tabViewOneController = Alloy.createController("enterjobdetail",{
			title: args
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
			var filename = Titanium.App.Properties.getString('filename');
			filelist = [];
			if (jsonlist.items.length == "0" ){
				console.log("File DOES NOT EXIST");
				var fileexist = "false";
				createSpreadsheet(filename,parentid);  // create file when does not exists
			} else {
				var fileexist = "true";
				var sid = jsonlist.items[0].id;
				console.log("File exist. sid is: "+jsonlist.items[0].id+" Skipped.");
				Titanium.App.Properties.setString('sid',sid);
				populateSpreadsheetHeader();
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

function getSSCell(sid,pos) {
	var sid = '1gecYbrWtzS3Zr5d6kpzmYBAxe4UXncKylKfSMREiDtM';
	var pos = "R3C1";
	console.log("get SS Cell on :  https://spreadsheets.google.com/feeds/cells/"+sid+"/od6/private/full/"+pos);
	var xhr = Ti.Network.createHTTPClient({
	    onload: function(e) {
	    try {
	    		var xml = Titanium.XML.parseString(this.responseText);
	    		Ti.API.info("getSSCell:: response is: "+this.responseText);
	    		Ti.API.info("getSSCell:: xml response is: "+xml);
	    		var entry = xml.documentElement.getElementsByTagName("entry");
	    		var link = xml.documentElement.getElementsByTagName("link");
	    		//var link = entry.item(0).getElementsByTagName("link").text;
	    		//console.log(" URL to edit the cell is: " +link);
	    		console.log(" entry to edit the cell is: " +entry+ " length: "+entry.length);
	    		console.log(" entry to edit the cell is: " +link+ " length: "+link.length);
	    		//console.log(" entry to edit the cell is: " +href+ " length: "+href.length);
	    		for (i=0;i<link.length;i++){			
	    			//console.log("link is :"+Titanium.XML.toString(link));
	    			var listitem = link.item(i);
	    			Ti.API.info("link inside is :"+listitem);	    			
	    		}
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
	    		Titanium.App.Properties.setString('sid',sid);
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

function populateSpreadsheetHeader(){ 
		var sid = Titanium.App.Properties.getString('sid'); //sid need to correct//sid need to correct
		var xmldatastring = ['<entry xmlns=\'http://www.w3.org/2005/Atom\' '
 		+' xmlns:gs=\'http://schemas.google.com/spreadsheets/2006\'>'
 		+'<id>https://spreadsheets.google.com/feeds/cells/1gecYbrWtzS3Zr5d6kpzmYBAxe4UXncKylKfSMREiDtM/od6/private/full/R3C1</id>'
 		+'<link rel=\'edit\' type=\'application/atom+xml\''
 		+' href=\'https://spreadsheets.google.com/feeds/cells/1gecYbrWtzS3Zr5d6kpzmYBAxe4UXncKylKfSMREiDtM/od6/private/full/R3C1/2t69\'/>'
 		+'<gs:cell row=\'3\' col=\'1\' inputValue=\'11\'>'
 		+'</gs:cell>'
 		+'</entry>'].join('');
        /*var xmldatastring = ['<entry xmlns=\'http://www.w3.org/2005/Atom\' xmlns:gsx=\'http://schemas.google.com/spreadsheets/2006/extended\'>'
        +'<gsx:col1>'+thedate+'</gsx:col1><gsx:col2>'+notesbody+'</gsx:col2><gsx:col3>'
        +imageurl+'</gsx:col3><gsx:col4>'+thenone+'</gsx:col4><gsx:col5>'
        +thenone+'</gsx:col5><gsx:col6>'+thenone+'</gsx:col6><gsx:col7>'+thenone+'</gsx:col7><gsx:col8>'+thenone+'</gsx:col8><gsx:col9>'+thenone
        +'</gsx:col9><gsx:col10>'+thenone+'</gsx:col10><gsx:col11>'+thenone+'</gsx:col11><gsx:col12>NA</gsx:col12><gsx:col13>NA</gsx:col13><gsx:col14>NA</gsx:col14><gsx:col15>NA</gsx:col15><gsx:col16>NA</gsx:col16></entry>'].join('');*/
 		/*var xmldatastring = '<entry xmlns=\'http://www.w3.org/2005/Atom\' xmlns:gsx=\'http://schemas.google.com/spreadsheets/2006/extended\'>'
 		+'<gsx:datacol1>1</gsx:datacol1>'
 		+'<gsx:datacol2>2</gsx:datacol2>'
 		+'<gsx:datacol3>3</gsx:datacol3>'
 		+'<gsx:datacol4>4</gsx:datacol4>'
 		+'<gsx:datacol5>5</gsx:datacol5></entry>';*/
 		/*var xmldatastring = '<feed xmlns="http://www.w3.org/2005/Atom" xmlns:batch="http://schemas.google.com/gdata/batch" xmlns:gs="http://schemas.google.com/spreadsheets/2006">'
 		+'<id>https://spreadsheets.google.com/feeds/cells/key/'+sid+'/private/full</id>'
 		+'<entry>'
 		+'<batch:id>b1</batch:id>'
 		+'<batch:operation type="insert"/>'
 		+'<id>https://spreadsheets.google.com/feeds/cells/key/'+sid+'/private/full/R1C1</id>'
 		+'<link rel="edit" type="application/atom+xml"'
 		+' href="https://spreadsheets.google.com/feeds/cells/key/'+sid+'/private/full/R1C1"/>'
 		+'<gs:cell row="1" col="1" inputValue="A1"/>'
 		+'</entry>'
 		+'</feed>';*/
 		/*var xmldatastring = ['<entry xmlns=\'http://www.w3.org/2005/Atom\' '
 		+' xmlns:gs=\'http://schemas.google.com/spreadsheets/2006\'>'
 		+'<id>https://spreadsheets.google.com/feeds/cells/1gecYbrWtzS3Zr5d6kpzmYBAxe4UXncKylKfSMREiDtM/od6/private/full/R3C1</id>'
 		+'<link rel=\'edit\' type=\'application/atom+xml\''
 		+' href=\'https://spreadsheets.google.com/feeds/cells/1gecYbrWtzS3Zr5d6kpzmYBAxe4UXncKylKfSMREiDtM/od6/private/full/R3C1/2t69\'/>'
 		+'<gs:cell row=\'3\' col=\'1\' inputValue=\'11\'>'
 		+'</gs:cell>'
 		+'</entry>'].join('');*/
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
        //var sid = Titanium.App.Properties.getString('joblog'); 
        
        //xhr.open("POST", 'https://spreadsheets.google.com/feeds/list/'+sid+'/od6/private/full');
        //xhr.open("POST", 'https://spreadsheets.google.com/feeds/cells/key/'+sid+'/private/full/batch');
         xhr.open("PUT", 'https://spreadsheets.google.com/feeds/cells/1gecYbrWtzS3Zr5d6kpzmYBAxe4UXncKylKfSMREiDtM/od6/private/full/R3C1/2t69');
        xhr.setRequestHeader("Content-type", "application/atom+xml");
        xhr.setRequestHeader("Authorization", 'Bearer '+ googleAuthSheet.getAccessToken());
        xhr.send(xmldatastring);
        Ti.API.info('done POSTed');
}

