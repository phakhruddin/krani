exports.openMainWindow = function(_tab) {
  _tab.open($.supplier_window);
  Ti.API.info("This is child widow schedule.js" +JSON.stringify(_tab));
  $.supplier_table.search = $.search_history;

};

function addHandler(e) {
	console.log("JSON stringify addHandler(e): "+JSON.stringify(e));
}
