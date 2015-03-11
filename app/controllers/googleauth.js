exports.openMainWindow = function(_tab) {
  _tab.open($.googleauth_window);
  Ti.API.info("This is child widow of : " +JSON.stringify(_tab));
  Ti.API.info("executing google authentication : ");
  //Alloy.Globals.googleAuth.authorize();
  googleAuthSheet.authorize();
};

var GoogleAuth = require('googleAuth');
var googleAuthSheet = new GoogleAuth({
	clientId : '306793301753-8ej6duert04ksb3abjutpie916l8hcc7.apps.googleusercontent.com',
	clientSecret : 'fjrsVudiK3ClrOKWxO5QvXYL',
	propertyName : 'googleToken',
	scope : ['https://spreadsheets.google.com/feeds', 'https://docs.google.com/feeds','https://www.googleapis.com/auth/calendar','https://www.googleapis.com/auth/calendar.readonly'],
	quiet: false
});