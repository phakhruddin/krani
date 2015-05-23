exports.openMainWindow = function(_tab) {
  _tab.open($.settings_window);
  Ti.API.info("This is child widow schedule.js" +JSON.stringify(_tab));
};

var maxdebug = Titanium.App.Properties.getInt('maxdebug'); (maxdebug==1)?$.switch_maxdebug.value=true:$.switch_maxdebug.value=false;
var mindebug = Titanium.App.Properties.getInt('mindebug'); (mindebug==1)?$.switch_mindebug.value=true:$.switch_mindebug.value=false;

$.switch_mindebug.addEventListener("change", function(e){
	var switchMDValue = $.switch_mindebug.value;
	Ti.API.info("switch value :" +switchMDValue);
	if ( switchMDValue == true ) {
		Titanium.App.Properties.setInt('mindebug',1);
		var mindebugstatus = "ON";
		alert("Minimum Debug is "+mindebugstatus);
	} else {
		Titanium.App.Properties.setInt('mindebug',0);
		var mindebugstatus = "OFF";
		alert("Minimum Debug is "+mindebugstatus);
	};
});

$.switch_maxdebug.addEventListener("change", function(e){
	var switchMDValue = $.switch_maxdebug.value;
	Ti.API.info("switch value :" +switchMDValue);
	if ( switchMDValue == true ) {
		Titanium.App.Properties.setInt('maxdebug',1);
		var maxdebugstatus = "ON";
		alert("Maximum Debug is "+maxdebugstatus);
	} else {
		Titanium.App.Properties.setInt('maxdebug',0);
		var maxdebugstatus = "ON";
		alert("Maximum Debug is "+maxdebugstatus);
	};
});
