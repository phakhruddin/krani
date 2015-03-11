exports.openMainWindow = function(_tab) {
  _tab.open($.invoicelist_window);
  Ti.API.info("This is child widow invoice.js" +JSON.stringify(_tab));
  //	$.invoicelist_table.search = $.search_history;
	Alloy.Collections.invoice.fetch();	

};
/*
$.invoicelist_window.addEventListener("click", function(e){
		//Alloy.Globals.openDetail(e);
		console.log("JSON stringify(e)  : " +JSON.stringify(e));
});*/

/*$.invoicelist_list.addEventListener("click", function(e){
		//Alloy.Globals.openDetail(e);
		console.log("JSON stringify(e)  : " +JSON.stringify(e));
});
*/
function transformFunction(model) {
	var transform = model.toJSON();
	console.log("transform is ::" +JSON.stringify(transform));
	transform.title = transform.col1+":"+transform.col2+":"+transform.col3+":"+transform.col4+":"+transform.col5+":"+transform.col6+":"+transform.col7+":"+transform.col8+":"+transform.col9+":"
		+transform.col10+":"+transform.col11+":"+transform.col12+":"+transform.col13+":"+transform.col14+":"+transform.col15+":"+transform.col16;
	transform.custom = "Invoice#: "+transform.col1+" - "+transform.col2;
	transform.total ='TOTAL: '+transform.col4;
	transform.bal ='BALANCE: '+transform.col5;
	transform.paid ='PAID: '+transform.col6;
	transform.status ='Status: '+transform.col13;
	transform.lastpaiddate = 'Last Paid on: '+transform.col11;
	if (transform.col13 == "paid"){
		transform.img ="paid.gif";
	} else {
		transform.img ="owedoverduewhite.gif";
	}
	return transform;
}

function filterFunction(collection) { 
		var sorttype = Titanium.App.Properties.getString('sorttype'); 
	    console.log("sorttype in filter : "+sorttype); 
	    //console.log("JSON stringify collection: " +JSON.stringify(collection));
	    if (sorttype == "All")  {
	    	return collection.where({col16:"none"});
	    } else {
	    	return collection.where({col13: sorttype });
	    }	
}


function doClick(e) {
	console.log("JSON.stringify e : " +JSON.stringify(e));	
	//Alloy.Globals.openDetail(e);
		var title = e.source.text;
		console.log("title is: "+title);
		var clientController = Alloy.createController('invoicedetail',{
			title: title
		});
		clientController.openMainWindow($.tab_invoicelist);
	//alert("click this");
};
/*
$.sortview.addEventListener("click", function(e){
	console.log("JSON stringify e : " +JSON.stringify(e));
	console.log("JSON stringify e.source : " +JSON.stringify(e.source));
	var thesort = e.source.text;
	if (thesort == "All") { var sorttype = "All"; };
	if (thesort == "Paid") { var sorttype = "paid"; };
	if (thesort == "Owed") { var sorttype = "owed"; };
	if (thesort == "None") { var sorttype = "\*"; };
	Ti.App.Properties.setString("sorttype",sorttype);
	Alloy.Collections.invoice.fetch();
});
*/

function buttonAction(e){
	console.log("JSON stringify e : " +JSON.stringify(e));
	console.log("JSON stringify e.source : " +JSON.stringify(e.source));
	var thesort = e.source.title;
	if (thesort == "All") { var sorttype = "All"; };
	if (thesort == "Paid") { var sorttype = "paid"; };
	if (thesort == "Owed") { var sorttype = "owed"; };
	if (thesort == "None") { var sorttype = "\*"; };
	Ti.App.Properties.setString("sorttype",sorttype);
	Alloy.Collections.invoice.fetch();
}

function addHandler(e){
	console.log("addHandler e "+JSON.stringify(e));
	    //reset the item counter
	    Titanium.App.Properties.setInt('count',0);
		var clientController = Alloy.createController('enterinvoice');
		clientController.openMainWindow($.tab_invoicelist);
}

function searchHandler(e){
	console.log("searchHandler e "+JSON.stringify(e));
}

function mailAction(e) {
	console.log("JSON stringify e : " +JSON.stringify(e));
			var clientController = Alloy.createController('invoicesend');
		clientController.openMainWindow($.tab_invoicelist);
}

function selectItem(e) {
	console.log("info after select item : "+JSON.stringify(e));
}

function uploadFile(){
 		var inputfile = '../Documents/Expose.pdf';
 		var file = Ti.Filesystem.getFile(inputfile);
 		console.log("filename: "+file.getName.toString() +" , "+file.getParent+" , "+file.getNativePath);
 		console.log("file size is "+JSON.stringify(file.getSize));
 		var fileread = file.read();
 		var base64Data = Ti.Utils.base64encode(fileread);
	 		var filename = "invoicelist12345.pdf";
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
	        parts.push(base64Data);
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
   
