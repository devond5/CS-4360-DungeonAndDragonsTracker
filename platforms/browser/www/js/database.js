var db = (window.cordova.platformId === 'browser') ?
window.openDatabase('MyDatabase', '1.0', 'Data', 2*1024*1024) :
window.sqlitePlugin.openDatabase({name: 'MyDatabase.db', location: 'default'});

document.addEventListener('deviceready', function() {
    // db.transaction(function(transaction) {
    //     var executeQuery = "DROP TABLE IF EXISTS characters";
    //     transaction.executeSql(executeQuery, [],
    //     function(tx, result) {alert('Table deleted successfully.');},
    //     function(error){alert('Error occurred while droping the table.');}
    //     );
    //     });
  db.transaction(function(tr) {
      tr.executeSql('CREATE TABLE IF NOT EXISTS characters (id integer primary key, name text, initiative integer, \
                                                            hp integer, currenthp integer, ac integer, pp integer, \
                                                            str integer, dex integer, constitution integer, int integer, \
                                                            wis integer, charisma integer)');
  }, function (error) {
      console.log('transaction error: ' + error.message);
  }, function () {
      console.log('transaction ok');
  });
})



function insertCharacter() {
    var name="Elie";
    var hp=0;
    var currenthp=0
    var initiative=0
    var ac=0;
    var pp=0
    var str=0
    var dex=0
    var constitution=0
    var int=0
    var wis=0
    var charisma=0
    db.transaction(function(transaction) {
        var executeQuery = 'INSERT INTO characters (name, initiative, hp, currenthp, ac, pp, str, dex, constitution, int, wis, charisma) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)';
        transaction.executeSql(executeQuery, [name, initiative, hp, currenthp, ac, pp, str, dex, constitution, int, wis, charisma],
        function(tx, result) {
            alert('Inserted');
        },
        function(error){
            alert('Error occurred');
        });
    });
}

function updateCharacter(){
    var id=1;
    var name="Elie2.0";
    var hp=100;
    var currenthp=100
    var initiative=100
    var ac=100;
    var pp=100
    var str=100
    var dex=100
    var constitution=100
    var int=100
    var wis=100
    var charisma=100
        db.transaction(function(transaction) {
            var executeQuery = "UPDATE characters SET name=?, initiative=?, hp=?, currenthp=?, ac=?, pp=?, str=?, dex=?, constitution=?, int=?, wis=?, charisma=? WHERE id=?"
            transaction.executeSql(executeQuery, [name, initiative, hp, currenthp, ac, pp, str, dex, constitution, int, wis, charisma, id],
                function(tx, result) {
                    alert('Updated successfully');
            },
                function(error){
                    alert('Something went Wrong');
            });
        })
}

function viewCharacter(){
    db.transaction(function(transaction) {
        transaction.executeSql('SELECT * FROM characters', [], function (tx, results) {
        var len = results.rows.length, i;
        return results.rows
        }, null);
        });
}

function deleteCharacter(event){
    db.transaction(function(transaction) {
        var id = event.id;
        var executeQuery = "DELETE FROM characters WHERE id=?";
        transaction.executeSql(executeQuery, [id],
        //On Success
        function(tx, result) {alert('Delete successfully');},
        //On Error
        function(error){alert('Something went Wrong');});
    });
}