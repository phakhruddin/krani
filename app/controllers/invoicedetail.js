var args = arguments[0] || {};
exports.openMainWindow = function(_tab) {
  _tab.open($.invoicedetail_window);
  Ti.API.info("This is child widow checking _tab on : " +JSON.stringify(_tab));
  Ti.API.info(" input details : "+JSON.stringify(args));
};

var someDummy = Alloy.Models.dummy;
console.log("stringify dummy :"+JSON.stringify(someDummy));
someDummy.set('id', '1234');
someDummy.fetch();

var data = args.title.split(':');
var invoicenumber = data[0];
var fullname = data[1];
var customernumber = data[2];
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
someDummy.set('fullname', fullname);
someDummy.set('customernumber', 'Customer#: '+customernumber);
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