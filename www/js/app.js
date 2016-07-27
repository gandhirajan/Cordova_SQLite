$(document).ready(function() {
	document.addEventListener("deviceready", onDeviceReady, false);
});

var db;

function onDeviceReady() {		
	
     $('#create').click( function() 
		{	
		    try {				
				db = window.sqlitePlugin.openDatabase({name: 'my.db', location: 'default'});
				db.transaction(function(tx) {
					tx.executeSql('DROP TABLE IF EXISTS test_table');
					tx.executeSql('CREATE TABLE IF NOT EXISTS test_table (id integer primary key, data text, data_num integer)');					
				});
			}
			catch(err) {
				alert("Plugin Error - " + err.message);
			}
			
		});	

	 $('#insert').click( function() 
		{	
			try{
				db.transaction(function(tx) {
					tx.executeSql("INSERT INTO test_table (data, data_num) VALUES (?,?)", ["test", 100], function(tx, res) {
					  console.log("insertId: " + res.insertId + " -- probably 1");
					  console.log("rowsAffected: " + res.rowsAffected + " -- should be 1");					
					});
				});
			}
			catch(err) {
				alert("Insertion error - " + err.message);
			}
			
		});	

	 $('#fetch').click( function() 
		{	
			try{
				db.transaction(function(tx) {
					tx.executeSql("select data as val from test_table;", [], function(tx, res) {
					  console.log("res.rows.length: " + res.rows.length + " -- should be 1");
					  console.log("res.rows.item(0).cnt: " + res.rows.item(0).val + " -- should be 1");
					  alert(res.rows.item(0).val);
					});
				});
			}
			catch(err) {
				alert("Fetch error - " + err.message);
			}
			
		});	
	
}
	