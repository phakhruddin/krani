exports.definition = {
	config: {
		columns: {
		    "col1": "integer",
		    "col2": "TEXT",
		    "col3": "text",
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
			collection_name: "adhoc",
			idAttribute: "col1"
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
				Alloy.Globals.Log("model: DELETE FROM " + collection.config.adapter.collection_name);
				 
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
			}
		});

		return Collection;
	}
};