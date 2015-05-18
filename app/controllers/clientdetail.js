var args = arguments[0] || {};
exports.openMainWindow = function(_tab) {
  _tab.open($.clientdetail_window);
  Ti.API.info("This is child widow checking _tab on clientdetail : " +JSON.stringify(_tab));
  Ti.API.info(" input details : "+JSON.stringify(args));
};

var someDummy = Alloy.Models.dummy;
console.log("clientdetail.js::stringify dummy :"+JSON.stringify(someDummy));
someDummy.set('id', '1234');
someDummy.fetch();

var data = args.title.split(':');
var name = data[0];
var firstname = data[1];
var lastname = data[2];
var fullname = firstname+" "+lastname;
var company = data[3];
var phone = data[4];
var email = data[5];
var address = data[6];
var city = data[7];
var state = data[8];
var country = data[9];
var fulladdress = address+", "+city+". "+state+", "+country;
var invoice = data[10];
var project = data[11];
var proposal = data[12];
//var idtag = data[13].replace("xCoLoNx",",").split(',')[0].replace("yCoLoNy",":");
var idtag = data[13].replace(/xCoLoNx/g,',').split(',')[0].replace('yCoLoNy',':');
var edithref = data[13].replace(/xCoLoNx/g,',').split(',')[1].replace('yCoLoNy',':');
var selfhref = data[13].replace(/xCoLoNx/g,',').split(',')[2].replace('yCoLoNy',':');
console.log("clientdetail.js::idtag :"+idtag+" edithref: "+edithref+" selfhref: "+selfhref);

someDummy.set('fullname', fullname);
someDummy.set('firstname', firstname);
someDummy.set('lastname', lastname);
someDummy.set('company', company);
someDummy.set('phone', phone);
someDummy.set('email', email);
someDummy.set('address', address);
someDummy.set('fulladdress', fulladdress);
someDummy.set('city', city);
someDummy.set('state', state);
someDummy.set('country', country);
someDummy.set('firstname', firstname);
someDummy.set('lastname', lastname);
someDummy.set('name', name);
someDummy.set('invoice', invoice);
someDummy.set('project', project);
someDummy.set('proposal', proposal);

function stageHandler(e){
	console.log("clientdetailjs::stageHandler:: JSON.stringify(e) : "+JSON.stringify(e));
	
	var stageRowArray = [ labelFirstname,labelFirstnameData,stageunlockButtonFirstname,labelLastname,labelLastnameData,labelPhone,labelPhoneData,labelEmail,labelEmailData,labelAddress,labelAddressData,labelCompany,labelCompanyData ];
	for (i=0;i<stageRowArray.length;i++){
		newRow.add(stageRowArray[i]);
	}
	stagetableViewSection.add(newRow);
	var editData = [stagetableViewSection, $.pendinginvoice_section ];
	$.clientdetail_table.setData(editData);
}


function editHandler(e){
	console.log("clientdetailjs::editHandler:: JSON.stringify(e) : "+JSON.stringify(e));
	//var editData = [$.editcontactdetail_section, $.pendinginvoice_section ];
	//$.clientdetail_table.setData(editData);
	
	var rowArray = [ labelFirstname,textFieldFirstname,unlockButtonFirstname,labelLastname,textFieldLastname,labelPhone,textFieldPhone,labelEmail,textFieldEmail,labelAddress,textFieldAddress,labelCompany,textFieldCompany ];
	
	for (i=0;i<rowArray.length;i++){
		newRow.add(rowArray[i]);
	}

	edittableViewSection.add(newRow);
	
	var editData = [ edittableViewSection , $.pendinginvoice_section ];
	$.clientdetail_table.setData(editData);
}

	var labelFirstname = Ti.UI.createLabel({
		id:"labelfirstname" , 
		borderColor : 'white', // border color
		text:'Firstname: ',
		font : {
			fontSize: '18',
			fontweight : 'normal'
		},
		left: '20',
		top: '10',
		color: "#3B708A"
		});
	var labelFirstnameData = Ti.UI.createLabel({
		borderColor : 'white', // border color
		text: firstname,
		font : {
			fontSize: '18'
		},
		left: '120',
		top: '10',
		color: "#3B708A"
		});
	var textFieldFirstname = Titanium.UI.createTextField({
		id:"labelfirstname_tf",
		borderColor : 'white', // border color
    	width: Ti.UI.FILL,
    	left:'120',
    	top: '10',
    	value: firstname,
    	font: {fontSize: '18'}
		});
	var unlockButtonFirstname = Titanium.UI.createButton({image: "unlocked46.png",right:"20",height:"22",width:"22",top:"10"});
	var lockButtonFirstname = Titanium.UI.createButton({image: "locked10.png",right:"20",height:"22",width:"22",top:"10"});
	var stageunlockButtonFirstname = Titanium.UI.createButton({image: "unlocked46.png",right:"20",height:"22",width:"22",top:"10"});
	var stagelockButtonFirstname = Titanium.UI.createButton({image: "locked10.png",right:"20",height:"22",width:"22",top:"10"});
	var labelLastname = Ti.UI.createLabel({
		id:"labellastname" , 
		borderColor : 'white', // border color
		text:'Lastname: ',
		font : {
			fontSize: '18',
			fontweight : 'normal'
		},
		left: '20',
		top: '40',
		color: "#3B708A"
		});
	var labelLastnameData = Ti.UI.createLabel({
		borderColor : 'white', // border color
		text: lastname,
		font : {
			fontSize: '18'
		},
		left: '120',
		top: '40',
		color: "#3B708A"
		});
	var textFieldLastname = Titanium.UI.createTextField({
		id:"labellastname_tf",
		borderColor : 'white', // border color
    	width: '160',
    	left:'120',
    	top: '40',
    	font: {fontSize: '18'},
    	value: lastname
		});
	var labelPhone = Ti.UI.createLabel({
		id:"labelphone" , 
		borderColor : 'white', // border color
		text:'Phone: ',
		font : {
			fontSize: '18',
			fontweight : 'normal'
		},
		left: '20',
		top: '70',
		color: "#3B708A"
		});
	var labelPhoneData = Ti.UI.createLabel({
		borderColor : 'white', // border color
		text: phone,
		font : {
			fontSize: '18'
		},
		left: '120',
		top: '70',
		color: "#3B708A"
		});
	var textFieldPhone = Titanium.UI.createTextField({
		id:"labelphone_tf",
		width: '160',
		borderColor : 'white', // border color
    	top: '72',
    	left: '120',
    	width: '80',
    	keyboardType: Ti.UI.KEYBOARD_NUMBER_PAD,
    	returnKeyType : Ti.UI.RETURNKEY_DONE,
    	font: {fontSize: '18'},
    	value: phone
		});
	var labelEmail = Ti.UI.createLabel({
		id:"labelemail" , 
		borderColor : 'white', // border color
		text:'Email: ',
		font : {
			fontSize: '18',
			fontweight : 'normal'
		},
		left: '20',
		top: '100',
		color: "#3B708A"
		});
	var labelEmailData = Ti.UI.createLabel({
		borderColor : 'white', // border color
		text:email,
		font : {
			fontSize: '18',
			fontweight : 'normal'
		},
		left: '120',
		top: '100',
		color: "#3B708A"
		});
	var textFieldEmail = Titanium.UI.createTextField({
		id:"labelemail_tf",
		borderColor : 'white', // border color
    	width: '160',
    	left:'120',
    	top: '100',
    	font: {fontSize: '18'}
		});
	var labelAddress = Ti.UI.createLabel({
		id:"labeladdress" , 
		borderColor : 'white', // border color
		text:'Address: ',
		font : {
			fontSize: '18',
			fontweight : 'normal'
		},
		left: '20',
		top: '130',
		color: "#3B708A"
		});
	var textFieldAddress = Titanium.UI.createTextField({
		id:"labeladdress_tf",
		borderColor : 'white', // border color
    	width: '160',
    	left:'120',
    	top: '130',
    	font: {fontSize: '18'}
		});
	var labelAddressData = Ti.UI.createLabel({
		borderColor : 'white', // border color
		text: fulladdress,
		font : {
			fontSize: '18'
		},
		left: '120',
		top: '130',
		color: "#3B708A"
		});
	var labelCompany = Ti.UI.createLabel({
		borderColor : 'white', // border color
		text: 'Company : ',
		font : {
			fontSize: '18'
		},
		left: '20',
		top: '180',
		color: "#3B708A"
		});
	var labelCompanyData = Ti.UI.createLabel({
		borderColor : 'white', // border color
		text: company,
		font : {
			fontSize: '18'
		},
		left: '120',
		top: '180',
		color: "#3B708A"
		});
	var textFieldCompany = Titanium.UI.createTextField({
		id:"labelcompany_tf",
		borderColor : 'white', // border color
    	width: '160',
    	left:'120',
    	top: '180',
    	font: {fontSize: '18'}
		});
	
	// Defining new row
	var newRow = Ti.UI.createTableViewRow({
		height: '250',
		borderColor : 'white',
		backgroundColor : "transparent"
	});
	
	var edittableViewSection = Ti.UI.createTableViewSection({
		headerTitle: "ContactDetails"
	});
	
var stagetableViewSection = Ti.UI.createTableViewSection({
		headerTitle: "ContactDetails"
	});
	
stageunlockButtonFirstname.addEventListener("click",function(e){
	console.log("clientdetailjs::stageunlockButtonFirstname:: JSON.stringify(e) : "+JSON.stringify(e));
	var rowArray = [ labelFirstname,textFieldFirstname,unlockButtonFirstname,labelLastname,textFieldLastname,labelPhone,textFieldPhone,labelEmail,textFieldEmail,labelAddress,textFieldAddress,labelCompany,textFieldCompany ];
	for (i=0;i<rowArray.length;i++){
		newRow.add(rowArray[i]);
	}
	edittableViewSection.add(newRow);	
	var editData = [ edittableViewSection , $.pendinginvoice_section ];
	$.clientdetail_table.setData(editData);
});