var args = arguments[0] || {};
exports.openMainWindow = function(_tab) {
  _tab.open($.employee_window);
  Ti.API.info("This is child widow checking _tab : " +JSON.stringify(_tab));
   	$.employee_table.search = $.search_history;
	Alloy.Collections.labor.fetch();	
	indexselect = null;
	
		$.employee_window.addEventListener("click", function(e){
			console.log("location.js: indexselect : "+indexselect);
			Alloy.Globals.openDetail(e);
			e.row.titleid = "rowidimage";
			console.log("location.js: source is : "+args.source);
			console.log("location.js: JSON.stringify(e) : "+ JSON.stringify(e));
			if (indexselect || indexselect == "0"){
				if (indexselect == e.index){
					console.log("location.js: previous e.source.image : "+ e.source.image+" indexselect : "+indexselect);
					e.source.image = "square82.png";
					e.row.backgroundColor = "transparent";
					indexselect = null; //reset indexselect		
					console.log("location.js: e.source.image : "+ e.source.image);		
				}			
			} else {
				if (e.source.image == "square82.png") {
					e.source.image = "check70.png";
					e.row.backgroundColor = "#87CEFA";
					indexselect = e.index;
					e.row.id = "selected";
					$.toggle_button.titleid = e;
					console.log("location.js: e.source.image : "+ e.source.image+" indexselect : "+indexselect);
					var employee = e.row.title.split(':')[1]+" "+e.row.title.split(':')[2];
					Titanium.App.Properties.setString('employee',employee);
					console.log("location.js: employee: "+ Titanium.App.Properties.getString('employee'));
				} else {
					e.source.image = "square82.png";
					e.row.backgroundColor = "transparent";
					console.log("location.js: e.source.image : "+ e.source.image);
					indexselect = null;
				}
			}
			console.log("location.js: JSON.stringify(e) : "+ JSON.stringify(e));
		});	
		
};

function transformFunction(model) {
	var currentaddr;
	var transform = model.toJSON();
	///console.log("transform is ::" +JSON.stringify(transform));
	transform.title = transform.col1+":"+transform.col2+":"+transform.col3+":"+transform.col4+":"+transform.col5+":"+transform.col6+":"+transform.col7+":"+transform.col8+":"+transform.col9+":"+transform.col10+":"+transform.col11+":"+transform.col12+":"+transform.col13+":"+transform.col14+":"+transform.col15+":"+transform.col16;
	transform.custom = transform.col2+"  "+transform.col3;
	transform.phone = "Phone: "+transform.col5;
	transform.email = "Email: "+transform.col6;
	transform.img ="square82.png";
	return transform;
}

function toggle(e) {
	console.log("location.js:: toggle:: JSON.stringify(e) : "+ JSON.stringify(e));
	var therow = e.source.titleid;
	console.log("location.js:: toggle:: therow : "+therow);
	therow.row.backgroundColor="red";
}
