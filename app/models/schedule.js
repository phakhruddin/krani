var moment = require("moment");
exports.definition = {
	config: {
		columns: {
		    "col1": "TEXT",
		    "col2": "TEXT",
		    "col3": "TEXT",
		    "col4": "TEXT",
		    "col5": "TEXT",
		    "col6": "TEXT",
		    "col7": "TEXT",
		    "col8": "TEXT",
		    "col9": "TEXT",
		    "col10": "TEXT",
		    "col11": "TEXT",
		    "col12": "TEXT",
		    "col13": "TEXT",
		    "col14": "TEXT",
		    "col15": "TEXT",
		    "col16": "TEXT"
		},
		adapter: {
			type: "sql",
			collection_name: "schedule"
		}
	},
	extendModel: function(Model) {
		_.extend(Model.prototype, {
			// extended functions and properties go here
		});

		return Model;
	},
	extendCollection: function(Collection) {
		_.extend(Collection.prototype, {
			// extended functions and properties go here
			deleteAll : function() {
 
				var collection = this;
				 
				var sql = "DELETE FROM " + collection.config.adapter.collection_name;
				db = Ti.Database.open(collection.config.adapter.db_name);
				db.execute(sql);
				db.close();
				 
				collection.trigger('sync');
				 
				},
				
			deleteCol1 : function(col1) {
 
				var collection = this;
				 
				var sql = "DELETE FROM " + collection.config.adapter.collection_name +" WHERE col1=\""+col1+"\"";
				db = Ti.Database.open(collection.config.adapter.db_name);
				db.execute(sql);
				db.close();
				 
				collection.trigger('sync');
				 
				},
				 
			 saveAll : function() {
				var collection = this;
				 
				var dbName = collection.config.adapter.db_name;
				var table = collection.config.adapter.collection_name;
				var columns = collection.config.columns;
				 
				db = Ti.Database.open(dbName);
				db.execute("BEGIN;");
				 
				collection.each(function(model) {
				 
				if (!model.id) {
				model.id = guid();
				model.attributes[model.idAttribute] = model.id;
				}
				 
				var names = [], values = [], q = [];
				for (var k in columns) {
				names.push(k);
				values.push(model.get(k));
				q.push("?");
				}
				var sqlInsert = "INSERT INTO " + table + " (" + names.join(",") + ") VALUES (" + q.join(",") + ");";
				 
				db.execute(sqlInsert, values);
				 
				});
				 
				db.execute("COMMIT;");
				db.close();
				 
				collection.trigger('sync');
			},
			
			today : function(_options) {
                var self = this;

                // this can be more elegant, but kept it simple for demo purposes
                //
                // db.execute("SELECT FROM " + table + " " + opts.query.sql, opts.query.params);
                //
                var yesterday, tomorrow, today, todayUTC;

                // get today and reset to midnight
                yesterday = moment().hours(0).minutes(0).seconds(1).subtract('days', 1);
                tomorrow = moment().hours(0).minutes(0).seconds(1).add('days', 1);
                today = new Date();
                todayUTC = Date.now();
                tomorrowUTC= todayUTC+86400000;
                tomorrowLocale = new Date(tomorrowUTC);
                tomorrowISO= tomorrowLocale.toISOString();
                todayISO = today.toISOString();
                

                // debug information
                Ti.API.info("today: " + today+" todayISO: "+todayISO);
                Ti.API.info("tomorrowLocale: " + tomorrowLocale+" tomorrowISO: "+tomorrowISO);
                //Ti.API.info("yesterday " + yesterday.calendar()+' yesterday.unix(): '+yesterday.unix());
                //Ti.API.info("tomorrow " + tomorrow.calendar()+' tomorrow.unix(): '+tomorrow.unix());

                var p = [];
                ///p.push(yesterday.unix() +"");
                ///p.push(tomorrow.unix() +"");
                p.push(todayISO +"");
                p.push(tomorrowISO +"");
                // pass params
                _options['query'] = {
                    "sql" : 'WHERE col4 between ? AND ?',
                    "params" : p
                };
                self.fetch(_options);
            }
				
		});

		return Collection;
	}
};