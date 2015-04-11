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
	var sid = Titanium.App.Properties.getString(item,"none");
	Alloy.Globals.getPrivateData(sid,item);
	var tabViewOneController = Alloy.createController("enterjobdetail",{
			title: args
		});
	tabViewOneController.openMainWindow($.tab_projectdetail);	
});

function addHandler(e,args){
	console.log("JSON stringify e on addHandler: "+JSON.stringify(e));
	console.log("JSON stringify e on addHandler args: "+JSON.stringify(args));
		var item = "joblog";
	var sid = Titanium.App.Properties.getString(item,"none");
	Alloy.Globals.getPrivateData(sid,item);
	var tabViewOneController = Alloy.createController("enterjobdetail",{
			title: args
		});
	tabViewOneController.openMainWindow($.tab_projectdetail);	
}
