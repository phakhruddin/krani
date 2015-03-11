exports.openMainWindow = function(_tab) {
  _tab.open($.schedule_window);
  Ti.API.info("This is child widow schedule.js" +JSON.stringify(_tab));
 // $.schedule_table.search = $.search_history;
  Alloy.Collections.schedule.fetch();	
  
/*
  $.events.addEventListener ("click", function(e){
		Ti.API.info('index = ' + JSON.stringify(e.index));
		Ti.API.info("in open_button click event title :"+e.row.Title);
		CheckEvents();
	});
  
  $.createevent.addEventListener ("click", function(e){
		Ti.API.info('index = ' + JSON.stringify(e.index));
		Ti.API.info("in open_button click event title :"+e.row.Title);	
		CreateEvents();
	});
	
  $.createeventfuture.addEventListener ("click", function(e){
		Ti.API.info('index = ' + JSON.stringify(e.index));
		Ti.API.info("in open_button click event title :"+e.row.Title);	
		Alloy.Globals.createController('createevent',$.schedule_tab);
	});
	
  $.createmultipleevent.addEventListener ("click", function(e){
		Ti.API.info('index = ' + JSON.stringify(e.index));
		Ti.API.info("in open_button click event title :"+e.row.Title);	
		multiplepicker();
	});
	
  $.sharedcalendar.addEventListener ("click", function(e){
		Ti.API.info('index = ' + JSON.stringify(e.index));
		Ti.API.info("in open_button click event title :"+e.row.Title);
			googleAuthCalendar;
			console.log('Access Token for Calendar is: ' + googleAuthCalendar.getAccessToken());
			googleAuthCalendar.isAuthorized(function() {
				console.log('Access Token: ' + googleAuthCalendar.getAccessToken());
			}, function() {
				console.log('Authorized first, see next window: ');
			});
		Alloy.Globals.createController('sharedcalendar',$.schedule_tab);
	});*/

};

  var osname = Ti.Platform.osname;
  
  function CheckEvents() {
	var calendars = [];
	var selectedCalendarName;
	var selectedid;
	var pickerData = [];
	
	
	//**read events from calendar*******
	function performCalendarReadFunctions(){
	    var scrollView = Ti.UI.createScrollView({
	      backgroundColor: '#eee',
	      height: 500,
	      top: 20
	    });
	
	    var label = Ti.UI.createLabel({
	      backgroundColor: 'white',
	      text: 'Click on the button to display the events for the selected calendar',
	      textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
	      top: 20
	    });
	    scrollView.add(label);
	
	    var selectableCalendars = Ti.Calendar.allCalendars;
	    for (var i = 0, ilen = selectableCalendars.length; i < ilen; i++) {
	      calendars.push({ name: selectableCalendars[i].name, id: selectableCalendars[i].id });
	      pickerData.push( Ti.UI.createPickerRow({ title: calendars[i].name }) );
	      if(i === 0){
	        selectedCalendarName = selectableCalendars[i].name;
	        selectedid = selectableCalendars[i].id;
	      }
	    }
	    
	    if(!calendars.length){
	      label.text = 'No calendars available. Select at least one in the native calendar before using this app';
	    } else {
	      label.text = 'Click button to view calendar events';
	      
	      var picker = Ti.UI.createPicker({
	        top:20
	      });
	      
	      picker.add(pickerData);
	      win.add(picker);
	      
	      picker.addEventListener('change', function(e){
	        for (var i = 0, ilen = calendars.length; i < ilen; i++) {
	          if(calendars[i].name === e.row.title){
	            selectedCalendarName = calendars[i].name;
	            selectedid = calendars[i].id;
	            Ti.API.info('Selected calendar that we are going to fetch is :: '+ selectedid + ' name:' + selectedCalendarName);
	          }
	        }
	      });
	      
	      var button = Ti.UI.createButton({
	        title: 'View events',
	        top: 20
	      });
	      win.add(button);
	      
	      button.addEventListener('click', function(e){
	        label.text = 'Generating...';
	        
	        var currentYear = new Date().getFullYear();
	        
	        var consoleString = '';
	        
	        function print(s) {
	          if (consoleString.length) {
	            consoleString = consoleString + '\n';
	          }
	          consoleString = consoleString + s;
	        }
	        
	        var calendar = Ti.Calendar.getCalendarById(selectedid);
	        Ti.API.info('Calendar was of type' + calendar);
	        Ti.API.info('calendar that we are going to fetch is :: '+ calendar.id + ' name:' + calendar.name);
	        
	        function printReminder(r) {
	            if (osname === 'android') {
	                var typetext = '[method unknown]';
	                if (r.method == Ti.Calendar.METHOD_EMAIL) {
	                    typetext = 'Email';
	                } else if (r.method == Ti.Calendar.METHOD_SMS) {
	                    typetext = 'SMS';
	                } else if (r.method == Ti.Calendar.METHOD_ALERT) {
	                    typetext = 'Alert';
	                } else if (r.method == Ti.Calendar.METHOD_DEFAULT) {
	                    typetext = '[default reminder method]';
	                }
	                print(typetext + ' reminder to be sent ' + r.minutes + ' minutes before the event');
	            }
	        }
	        
	        function printAlert(a) {
	            if (osname === 'android') {
	                print('Alert id ' + a.id + ' begin ' + a.begin + '; end ' + a.end + '; alarmTime ' + a.alarmTime + '; minutes ' + a.minutes);
	            } else if (osname === 'iphone' || osname === 'ipad') {
	                print('Alert absoluteDate ' + a.absoluteDate + ' relativeOffset ' + a.relativeOffset);
	            }
	        }
	        
	        function printEvent(event) {
	          if (event.allDay) {
	            print('Event: ' + event.title + '; ' + event.begin + ' (all day)');
	          } else {
	            print('Event: ' + event.title + '; ' + event.begin + ' ' + event.begin+ '-' + event.end);
	          }
	          
	          var reminders = event.reminders;
	          if (reminders && reminders.length) {
	            print('There is/are ' + reminders.length + ' reminder(s)');
	            for (var i = 0; i < reminders.length; i++) {
	                printReminder(reminders[i]);
	            }
	          }
	          print('hasAlarm? ' + event.hasAlarm);
	          var alerts = event.alerts;
	          if (alerts && alerts.length) {
	            for (var i = 0; i < alerts.length; i++) {
	              printAlert(alerts[i]);
	            }
	          }
	          
	          var status = event.status;
	          if (status == Ti.Calendar.STATUS_TENTATIVE) {
	            print('This event is tentative');
	          }
	          if (status == Ti.Calendar.STATUS_CONFIRMED) {
	            print('This event is confirmed');
	          }
	          if (status == Ti.Calendar.STATUS_CANCELED) {
	            print('This event was canceled');
	          }
	        }
	        
	        var events = calendar.getEventsInYear(currentYear);
	        if (events && events.length) {
	          print(events.length + ' event(s) in ' + currentYear);
	          print('');
	          for (var i = 0; i < events.length; i++) {
	            printEvent(events[i]);
	            print('');
	          }
	        } else {
	          print('No events');
	        }
	        
	        label.text = consoleString;
	      });
	    }
	
	    win.add(scrollView);
	}
	
	
	var win = Ti.UI.createWindow({
	  backgroundColor: 'white',
	  exitOnClose: true,
	  fullscreen: false,
	  layout: 'vertical',
	  title: 'Calendar'
	});
	
	if (osname === 'android') {
	    performCalendarReadFunctions();
	} else if (osname === 'iphone' || osname === 'ipad') {
	    if (Ti.Calendar.eventsAuthorization == Ti.Calendar.AUTHORIZATION_AUTHORIZED) {
	        performCalendarReadFunctions();
	    } else {
	        Ti.Calendar.requestEventsAuthorization(function(e){
	            if (e.success) {
	                performCalendarReadFunctions();
	            } else {
	                alert('Access to calendar is not allowed');
	            }
	        });
	    }
	}
	
	    if(Ti.Platform.osname == 'android'){
			alert("do nothing this is android");
	   	} else {
		   	var btnBack = Ti.UI.createButton({ 
				title: '< Back', 
				top: 20,
				left: 10
			});
		   	var win1 = Titanium.UI.iOS.createNavigationWindow({
				Title: "Krani",
				backgroundColor: "transparent",
		   	  	window: win
		    });
		    win1.add(btnBack);
		    btnBack.addEventListener("click", function(_tab) { 
				console.debug("closing map" +_tab);
		//		Ti.API.info("tab:" + JSON.stringify(_tab));
				win1.close();
		});
	   }; 
	   
	   	if(Ti.Platform.osname == 'android'){
			win.open();
		} else {
			win1.open();
		};
	
	//win.open();
	}

  function CreateEvents() {
    function printEventDetails(eventID) {
	    Ti.API.info('eventID:' + eventID);
	    var defCalendar = Ti.Calendar.defaultCalendar;
	    var eventFromCalendar = defCalendar.getEventById(eventID);
	    if (eventFromCalendar != null) {
	        Ti.API.info('Printing event values ::');
	        Ti.API.info('title : '+ eventFromCalendar.title);
	        Ti.API.info('notes : ' + eventFromCalendar.notes);
	        Ti.API.info('location:' + eventFromCalendar.location);
	        Ti.API.info('allDay ? :' + eventFromCalendar.allDay);
	        Ti.API.info('status : '+ eventFromCalendar.status);
	        Ti.API.info('availability : '+ eventFromCalendar.availability);
	        Ti.API.info('hasAlarm ? : '+ eventFromCalendar.hasAlarm);
	        Ti.API.info('id : '+ eventFromCalendar.id);
	        Ti.API.info('isDetached ? : '+ eventFromCalendar.isDetached);
	        Ti.API.info('begin : '+ eventFromCalendar.begin);
	        Ti.API.info('end : '+ eventFromCalendar.end);
	        var eventRule = eventFromCalendar.recurrenceRules;
	        Ti.API.info("recurrenceRules : " + eventRule);
	        for (var i = 0; i < eventRule.length; i++) {
	            Ti.API.info("Rule # "+ i);
	            Ti.API.info('frequency : ' + eventRule[i].frequency);
	            Ti.API.info('interval : ' + eventRule[i].interval);
	            Ti.API.info('daysofTheWeek : ' );
	            var daysofTheWeek = eventRule[i].daysOfTheWeek; 
	            for (var j = 0; j < daysofTheWeek.length; j++) {
	                Ti.API.info('{ dayOfWeek : '+ daysofTheWeek[j].dayOfWeek +'weekNumber : '+daysofTheWeek[j].week +'}, ');
	            }
	            Ti.API.info('firstDayOfTheWeek : ' + eventRule[i].firstDayOfTheWeek);
	            Ti.API.info('daysOfTheMonth : ');
	            var daysOfTheMonth = eventRule[i].daysOfTheMonth;
	            for(var j=0;j<daysOfTheMonth.length;j++) {
	                Ti.API.info(' ' + daysOfTheMonth[j]);
	            }
	            Ti.API.info('daysOfTheYear : ');
	            var daysOfTheYear = eventRule[i].daysOfTheYear;
	            for(var j=0;i<daysOfTheYear.length;j++) {
	                Ti.API.info(' ' + daysOfTheYear[j]);
	            }
	            Ti.API.info('weeksOfTheYear : ');
	            var weeksOfTheYear = eventRule[i].weeksOfTheYear;
	            for(var j=0;j<weeksOfTheYear.length;j++) {
	                Ti.API.info(' ' + weeksOfTheYear[j]);
	            }
	            Ti.API.info('monthsOfTheYear : ');
	            var monthsOfTheYear = eventRule[i].monthsOfTheYear;
	            for(var j=0;j<monthsOfTheYear.length;j++) {
	                Ti.API.info(' ' + monthsOfTheYear[j]);
	            }
	            Ti.API.info('daysOfTheYear : ');
	            var setPositions = eventRule[i].setPositions;
	            for(var j=0;j<setPositions.length;j++) {
	                Ti.API.info(' ' + setPositions[j]);
	            }
	        };
	        Ti.API.info('alerts : '+ eventFromCalendar.alerts);
	        var newAlerts = eventFromCalendar.alerts;
	        
	        for(var i=0 ; i < newAlerts.length ; i++) {
	            Ti.API.info('*****ALert '+ i);
	            Ti.API.info('absoluteDate :'+ newAlerts[i].absoluteDate);
	            Ti.API.info('relativeOffset ;' + newAlerts[i].relativeOffset);
	        }
	   }
	}
	function performCalendarWriteFunctions(){
	    var defCalendar = Ti.Calendar.defaultCalendar;
	    var date1 = new Date(new Date().getTime() + 3000),
	        date2 = new Date(new Date().getTime() + 900000);
	    Ti.API.info('Date1 : '+ date1 + 'Date2 : '+ date2);
	    var event1 = defCalendar.createEvent({
	                        title: 'Sample Event',
	                        notes: 'This is a test event which has some values assigned to it.',
	                        location: 'Appcelerator Inc',
	                        begin: date1,
	                        end: date2,
	                        availability: Ti.Calendar.AVAILABILITY_FREE,
	                        allDay: false,
	                });
	    var alert1 = event1.createAlert({
	                        absoluteDate: new Date(new Date().getTime() - (1000*60*20))
	                });
	    var alert2 = event1.createAlert({
	        relativeOffset:-(60*15)
	    });
	    var allAlerts = new Array(alert1,alert2);
	    event1.alerts = allAlerts;
	    var newRule = event1.createRecurenceRule({
	                        frequency: Ti.Calendar.RECURRENCEFREQUENCY_MONTHLY,
	                        interval: 1,
	                        daysOfTheWeek: [{dayOfWeek:1,week:2},{dayOfWeek:2}],
	                        end: {occurrenceCount:10}
	                });
	    Ti.API.info('newRule : '+ newRule);
	    event1.recurrenceRules = [newRule];
	    Ti.API.info('Going to save event now');
	    event1.save(Ti.Calendar.SPAN_THISEVENT);
	    Ti.API.info('Done with saving event,\n Now trying to retreive it.');
	    printEventDetails(event1.id);
	}
	
	if(Ti.Platform.osname == 'android'){
			var win = Ti.UI.createWindow({
	                        backgroundColor: 'transparent',
	                        title: 'Calendar'
	            });
	   	} else {
		   	var btnBack = Ti.UI.createButton({ 
				title: '< BACK',
				height:50,
			    width:"50%",
			        font: {
			        fontSize:24,
			        fontFamily:'Helvetica Neue',
			        fontWeight:'normal'
			    },
			    left:"25%",
			    right:"25%",
			    top:-50
			});
		   	var win1 = Titanium.UI.iOS.createNavigationWindow({
				Title: "Calendar",
				backgroundColor: "transparent",
		   	  	window: win
		    });
		    win1.add(btnBack);
		    btnBack.addEventListener("click", function(_tab) { 
				console.debug("closing map" +_tab);
		//		Ti.API.info("tab:" + JSON.stringify(_tab));
				win1.close();
		});
	   }; 	
	
	var label = Ti.UI.createLabel({
	                        text: 'Check console log',
	                        height: Ti.UI.size,
	                        width: Ti.UI.size
	            });
	if (osname === 'iphone' || osname === 'ipad') { win1.add(label);} else {win.add(label);}
	
	if(Ti.Calendar.eventsAuthorization == Ti.Calendar.AUTHORIZATION_AUTHORIZED) {
	    performCalendarWriteFunctions();
	} else {
	    Ti.Calendar.requestEventsAuthorization(function(e){
	            if (e.success) {
	                performCalendarWriteFunctions();
	            } else {
	                alert('Access to calendar is not allowed');
	            }
	        });
	}
	
	if (osname === 'iphone' || osname === 'ipad') { win1.add(label);} else {win.open();}
	
	
	}

  function multiplepicker(){
	// Appcelerator Titanium (JS) code to produce multiple selection type data entry in a single window.
	// via @CJ_Reed
	// and Dan Tamas : http://cssgallery.info/making-a-combo-box-in-titanium-appcelerator-code-and-video
	
	
	
	var win = Titanium.UI.createWindow({
			fullscreen: true,
			tabBarHidden : true,
			navBarHidden: false
		});	
	
	if(Ti.Platform.osname == 'android'){
			alert("do nothing this is android");
	   	} else {
		   	var btnBack = Ti.UI.createButton({ 
				title: '< Back', 
				top: 5,
				left: 10
			});
		   	var win1 = Titanium.UI.iOS.createNavigationWindow({
				Title: "Event",
				backgroundColor: "transparent",
		   	  	window: win
		    });
		    win1.add(btnBack);
		    btnBack.addEventListener("click", function(_tab) { 
				console.debug("closing map" +_tab);
		//		Ti.API.info("tab:" + JSON.stringify(_tab));
				win1.close();
		});
	   }; 
	
	// build custom tableView data/layout
	var array = [];
	var titleRow = Titanium.UI.createTableViewRow({height:40, className:'titleRow'}); 
	var valueRow = Titanium.UI.createTableViewRow({height:40, className:'valueRow'}); 
	var dateRow = Titanium.UI.createTableViewRow({height:40, className:'dateRow'});
	var enddateRow = Titanium.UI.createTableViewRow({height:40, className:'enddateRow'});
	var submitRow = Titanium.UI.createTableViewRow({height:40, className:'submitRow'});
	var titleLabel = Ti.UI.createLabel({color:'gray', text:"Title", font:{fontSize:20, fontWeight:'normal'}, top:8, left:12, height:24, width:99});
	var titleText = Titanium.UI.createTextField({value:"  ", color:'#336699', borderColor:'#888', borderWidth:0.1, borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED, font:{fontSize:16, fontWeight:'normal'},top:8, left:100, height:32, width:184});
	var valueLabel = Ti.UI.createLabel({color:'gray', text:"Labor", font:{fontSize:20, fontWeight:'normal'}, top:8, left:12, height:24, width:170});
	var dateLabel = Ti.UI.createLabel({color:'gray', text:"Start Date", font:{fontSize:20, fontWeight:'normal'}, top:8, left:12, height:24, width:170});
	var valueData = Ti.UI.createLabel({color:'#3D4460', text:"", font:{fontSize:17, fontWeight:'normal'}, top:11, left:112, height:20, width:180, textAlign:'right'});	
	var dateData = Ti.UI.createLabel({color:'#3D4460', text:"", font:{fontSize:17, fontWeight:'normal'}, top:11, left:102, height:20, width:180, textAlign:'right'});	
	var enddateLabel = Ti.UI.createLabel({color:'gray', text:"End Date", font:{fontSize:20, fontWeight:'normal'}, top:8, left:12, height:24, width:170});
	var enddateData = Ti.UI.createLabel({color:'#3D4460', text:"", font:{fontSize:17, fontWeight:'normal'}, top:11, left:102, height:20, width:180, textAlign:'right'});
	var submitLabel = Ti.UI.createLabel({color:'blue', text:"Create Event > ", font:{fontSize:20, fontWeight:'normal'}, top:8, right:40, height:24, width:170});	
	titleRow.add(titleLabel);
	titleRow.add(titleText);
	valueRow.add(valueLabel);
	valueRow.add(valueData);
	dateRow.add(dateLabel);
	dateRow.add(dateData);
	enddateRow.add(enddateLabel);
	enddateRow.add(enddateData);
	submitRow.add(submitLabel);
	array.push(titleRow);
	array.push(valueRow);
	array.push(dateRow);
	array.push(enddateRow);
	array.push(submitRow);
	
	// view initialisation
	var tableView = Titanium.UI.createTableView({data:array, style:Titanium.UI.iPhone.TableViewStyle.GROUPED});
	var pickerView = Titanium.UI.createView({height:248,bottom:-248});
	var datePickerView = Titanium.UI.createView({height:248,bottom:-248});
	var enddatePickerView = Titanium.UI.createView({height:248,bottom:-248});
	
	  var thelabor = Alloy.Collections.instance('labor');
	  thelabor.fetch();
	  var laborjson = thelabor.toJSON();
	  console.log("laborjson.length "+laborjson.length);
	  console.log("laborjson "+laborjson);
	  console.log("laborjson[0].col2 "+laborjson[0].col2);
	  
	  
	var labor = [ 'John', 'Alex', 'Marie', 'Eva' ];
	var Values = [];
	var pickerValues = [];
	var picker = Titanium.UI.createPicker({top:0});
	picker.selectionIndicator=true;
	
	for( var i=0; i < laborjson.length; i++){
	  var Values = Ti.UI.createPickerRow({
	    title: laborjson[i].col2+' '+laborjson[i].col3
	  });
	  pickerValues.push(Values);
	}
	
	Ti.API.info("PickerValues are : "+JSON.stringify(pickerValues));
	picker.add(pickerValues);
	pickerView.add(picker);
	
	// date picker initialisation
	var datePicker = Titanium.UI.createPicker({top:0, type:Titanium.UI.PICKER_TYPE_DATE_AND_TIME});
	datePicker.selectionIndicator=true;
	datePickerView.add(datePicker);
	
	var enddatePicker = Titanium.UI.createPicker({top:0, type:Titanium.UI.PICKER_TYPE_DATE_AND_TIME});
	enddatePicker.selectionIndicator=true;
	enddatePickerView.add(enddatePicker);
	
	// animations
	var slideIn =  Titanium.UI.createAnimation({bottom:-43});
	var slideOut =  Titanium.UI.createAnimation({bottom:-251});
	
	// event functions
	submitLabel.hide();	
	tableView.addEventListener('click', function(eventObject){
		if (eventObject.rowData.className == "valueRow")
		{
			titleText.blur();
			datePickerView.animate(slideOut);
			enddatePickerView.animate(slideOut);	
			pickerView.animate(slideIn);
			submitLabel.hide();	
		}
		else if (eventObject.rowData.className == "titleRow")
		{
			pickerView.animate(slideOut);
			datePickerView.animate(slideOut);
			enddatePickerView.animate(slideOut);
			titleText.focus();	
			submitLabel.hide();			
		}
		else if (eventObject.rowData.className == "dateRow")
		{
			pickerView.animate(slideOut);
			datePickerView.animate(slideIn);
			enddatePickerView.animate(slideOut);
			titleText.blur();	
			submitLabel.hide();		
		}
		else if (eventObject.rowData.className == "enddateRow")
		{
			pickerView.animate(slideOut);
			datePickerView.animate(slideOut);
			enddatePickerView.animate(slideIn);
			titleText.blur();
		}
		else if (eventObject.rowData.className == "submitRow")
		{
			pickerView.animate(slideOut);
			datePickerView.animate(slideOut);
			enddatePickerView.animate(slideOut);
			titleText.blur();
			submitLabel.show();	
		};
	});
	
	datePicker.addEventListener('change',function(e)
	{
		dateData.text = e.value;
		tableView.setData(array);
		Ti.API.info("dateData: "+JSON.stringify(dateData));
	});
	
	enddatePicker.addEventListener('change',function(e)
	{
		enddateData.text = e.value;
		tableView.setData(array);
		Ti.API.info("enddateData: "+JSON.stringify(enddateData));
		submitLabel.show();	
	});
	
	picker.addEventListener('change',function(e)
	{
		valueData.text = picker.getSelectedRow(0).title;;
		tableView.setData(array);
		Ti.API.info("valueData: "+JSON.stringify(valueData));
	});
	
	titleText.addEventListener('focus',function() {
		pickerView.animate(slideOut);
		datePickerView.animate(slideOut);
		enddatePickerView.animate(slideOut);
		submitLabel.hide();	
	});
	
	submitLabel.addEventListener('click',function() {
		console.log("title txt :"+JSON.stringify(titleText));
		var summary = titleText.value;
		var enddateTime = enddateData.text.toISOString();
		var startdateTime = dateData.text.toISOString();
		var organizerdisplayName = valueData.text;
		console.log(" summary, organizerdisplayName, startdateTime, enddateTime :" +summary+", "+organizerdisplayName+", "+startdateTime+", "+enddateTime);
		alert("event created");
		Alloy.Globals.postCreateEvent (startdateTime,enddateTime,"",summary,"",organizerdisplayName);
	});

	
	// build display
	win.add(tableView);
	win.add(pickerView);
	win.add(datePickerView);
	win.add(enddatePickerView);
	
	if(Ti.Platform.osname == 'android'){
			win.open();
		} else {
			win1.open();
		};
	
}

var GoogleAuth = require('googleAuth');
var googleAuthCalendar = new GoogleAuth({
	clientId : '306793301753-8ej6duert04ksb3abjutpie916l8hcc7.apps.googleusercontent.com',
	clientSecret : 'fjrsVudiK3ClrOKWxO5QvXYL',
	propertyName : 'googleToken',
	scope : ['https://spreadsheets.google.com/feeds', 'https://docs.google.com/feeds','https://www.googleapis.com/auth/calendar','https://www.googleapis.com/auth/calendar.readonly'],
	quiet: false
});

function createEventFuture() {
	Alloy.Globals.createController('createevent',$.schedule_tab);
}

function sharedCalendar() {
	googleAuthCalendar;
	console.log('Access Token for Calendar is: ' + googleAuthCalendar.getAccessToken());
	googleAuthCalendar.isAuthorized(function() {
		console.log('Access Token: ' + googleAuthCalendar.getAccessToken());
	}, function() {
		console.log('Authorized first, see next window: ');
		});
	Alloy.Globals.createController('sharedcalendar',$.schedule_tab);
}

function transformFunction(model) {
	var transform = model.toJSON();
	console.log("transform is ::" +JSON.stringify(transform));
	transform.title = transform.col1+":"+transform.col2+":"+transform.col3+":"+transform.col4+":"+transform.col5+":"+transform.col6+":"+transform.col7+":"+transform.col8+":"+transform.col9+":"+transform.col10
	+":"+transform.col11+":"+transform.col12+":"+transform.col13+":"+transform.col14+":"+transform.col15+":"+transform.col16;
    //date conversion
	var startdatetimeUTC = Date.parse(transform.col4);
	var startdatetimeLocale = new Date(startdatetimeUTC);
	var startdatetime = startdatetimeLocale.toString().replace(/GMT.*/," ");
	var enddatetimeUTC = Date.parse(transform.col4);
	var enddatetimeLocale = new Date(enddatetimeUTC);
	var enddatetime = enddatetimeLocale.toString().replace(/GMT.*/," ");
	
    console.log("col4: "+transform.col4+" Date: " +startdatetimeUTC+" : "+startdatetimeLocale); 
	transform.custom = (transform.col1 == "none")?"Event title was not provided":transform.col1;
	transform.name = (transform.col2 == "none")?"":transform.col2;
	transform.item = (transform.col3 == "none" || transform.col3 == "None")?"":'Address: '+transform.col3;
	transform.start = (startdatetimeUTC)?'Start: '+startdatetime:'Start: Date&Time not provided';
	transform.end = (enddatetimeUTC)?'End: '+enddatetime:'End: Date&Time not provided';
	transform.email = (transform.col9 == "none")?"":'email : '+transform.col9;
	if (transform.col15 == "submitted"){
		transform.img ="proposalsubmitted.gif";
	} else {
		transform.img ="proposalpending.gif";
	}
	return transform;
}

function filterFunction(collection) { 
		var sorttype = Titanium.App.Properties.getString('sorttype'); 
	    console.log("sorttype in filter : "+sorttype); 
	    //console.log("JSON stringify collection: " +JSON.stringify(collection));
	    if (sorttype == "Today")  {
	    	return collection.where({col6:"phakhruddin@gmail.com"});
	    } else if (sorttype == "ThisWeek") {
	    	return collection.where({col6:"phakhruddin1@gmail.com"});
	    } else {
	    	return collection.where({col6:"confirmed"});
	    }
}

function buttonAction(e){
	console.log("JSON stringify e : " +JSON.stringify(e));
	console.log("JSON stringify e.source : " +JSON.stringify(e.source));
	var thesort = e.source.title;
	if (thesort == "Today") { var sorttype = "Today"; };
	if (thesort == "ThisWeek") { var sorttype = "ThisWeek"; };
	if (thesort == "Pending") { var sorttype = "pending"; };
	if (thesort == "None") { var sorttype = "\*"; };
	Ti.App.Properties.setString("sorttype",sorttype);
	Alloy.Collections.schedule.fetch();
}

function refreshCalendar() {
	var account = 'idevice.net@gmail.com';
	var url = 'https://www.googleapis.com/calendar/v3/calendars/'+account+'/events'+"?access_token="+googleAuthCalendar.getAccessToken();;
	getSharedCalendarData(url);
}


var getSharedCalendarData = function(url) {	
	Ti.API.info("URL is: "+url);
	var thefile = "calendar.txt";
	var data = [];
	//Alloy.Globals.checkGoogleisAuthorized();
	//Alloy.Globals.checkNetworkAndGoogleAuthorized('1gnkP116nsTVxtrw6d_mXVdOiesQEPH7LVUIyHUfx9EE');
	googleAuthCalendar;
	console.log('Access Token for Calendar is: ' + googleAuthCalendar.getAccessToken());
	googleAuthCalendar.isAuthorized(function() {
		console.log('Access Token: ' + googleAuthCalendar.getAccessToken());
		
		var xhr = Ti.Network.createHTTPClient({
		    onload: function(e) {
		    try {
				console.log("response txt is: "+this.responseText);
				var file = Ti.Filesystem.getFile(
					Ti.Filesystem.tempDirectory, thefile
				);
				if(file.exists() && file.writeable) {
				    var success = file.deleteFile();
				    Ti.API.info((success==true) ? file.write(this.responseText) : 'fail'); // outputs 'success'
					}	
				// Updating calendar DB
				var json = JSON.parse(this.responseText);
				//var json = this.responseText;
				Alloy.Collections.schedule.deleteAll();
				for (var i=0; i < +json.items.length; i++) {
					var dataModel = Alloy.createModel('schedule',{
						col1 :  json.items[i].summary || "none",
						col2 : json.items[i].description || "none",
						col3 : json.items[i].location || "none",
						col4 : json.items[i].start.dateTime || "none",
						col5 : json.items[i].end.dateTime || "none",
						col6 : json.items[i].status  || "none",
						col7 : json.items[i].status || "none",
						col8 : json.items[i].creator.displayName || "none",
						col9 : json.items[i].creator.email || "none",
						col10 :  json.items[i].creator.email || "none",
						col11 : json.items[i].creator.email || "none",
						col12 :  json.items[i].creator.email || "none",
						col13 :  json.items[i].creator.email || "none",
						col14 :  json.items[i].creator.email || "none",
						col15 :  json.items[i].creator.email || "none",
						col16 :  json.items[i].creator.email || "none",		
					});			
					dataModel.save();
				}							
				} catch(e){
					Ti.API.info("cathing e: "+JSON.stringify(e));
				}
			}
		});
		xhr.onerror = function(e){
			//alert(e);
			alert("Unable to connect to the network. The info displayed here is NOT the latest.");
			console.log("response txt after failure is: "+this.responseText);
		};
		xhr.open("GET", url);
		xhr.send();
		Ti.API.info(" Data were successfuly downloaded from "+url+". Please proceed.");
		
	}, function() {
		console.log('Authorized first, see next window: ');
	});
	var url = " ";
};

function selectItem(e) {
	console.log("JSON stringify: "+JSON.stringify(e));
}

function doClick(e) {
	console.log("JSON stringify: "+JSON.stringify(e));
}
