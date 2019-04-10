document.addEventListener('deviceready', function() {
    var db = window.sqlitePlugin.openDatabase({name: 'test.db', location: 'default'});
    db.transaction(function(tr) {
      tr.executeSql("SELECT upper('Test string') AS upperString", [], function(tr, rs) {
        console.log('Got upperString result: ' + rs.rows.item(0).upperString);
      });
    });
  });

  document.addEventListener('deviceready', function() {
        var db = window.sqlitePlugin.openDatabase({name: 'dm.db', location: 'default'});
        db.transaction(function(tr) {
            tr.executeSql('CREATE TABLE characters (name, hp, ac)');
        }, function (error) {
            console.log('transaction error: ' + error.message);
        }, function () {
            console.log('transaction ok');
        });
  })