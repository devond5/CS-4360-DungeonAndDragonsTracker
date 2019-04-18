var db = (window.cordova.platformId === 'browser') ?
window.openDatabase('dmdb', '1.0', 'Data', 2*1024*1024) :
window.sqlitePlugin.openDatabase({name: 'dmdb.db', location: 'default'});

document.addEventListener('deviceready', function() {
    // db.transaction(function(transaction) {
    //     var executeQuery = "DROP TABLE IF EXISTS NPCs";
    //     transaction.executeSql(executeQuery, [],   
    //     function(tx, result) {alert('Table deleted successfully.');},
    //     function(error){alert('Error occurred while droping the table.');}
    //     );
    //     });
  db.transaction(function(tr) {
        tr.executeSql('CREATE TABLE IF NOT EXISTS characters (id integer primary key, name text, initiative integer, \
                                                            hp integer, currenthp integer, ac integer, pp integer, \
                                                            str_save integer, dex_save integer, con_save integer, \
                                                            int_save integer, wis_save integer, cha_save integer)');
        tr.executeSql('CREATE TABLE IF NOT EXISTS monsters (id integer primary key, name text, initiative integer, \
                                                            hp integer, currenthp integer, ac integer, speed integer, pp integer, str integer, \
                                                            dex integer, con integer, int integer, wis integer, \
                                                            cha integer, str_save integer, dex_save integer, \
                                                            con_save integer, int_save integer, wis_save integer, \
                                                            cha_save integer, proficiency_bonus integer, dmg_resist text, dmg_immune text, condition_immune text)');
        tr.executeSql('CREATE TABLE IF NOT EXISTS NPCs (id integer primary key, name text, initiative integer, \
                                                        hp integer, currenthp integer, ac integer, speed integer, pp integer, str integer, \
                                                        dex integer, con integer, int integer, wis integer, \
                                                        cha integer, str_save integer, dex_save integer, \
                                                        con_save integer, int_save integer, wis_save integer, \
                                                        cha_save integer, proficiency_bonus integer, dmg_resist text, dmg_immune text, condition_immune text)');
    
  }, function (error) {
      console.log('transaction error: ' + error.message);
  }, function () {
      console.log('transaction ok');
  });  
})

//***************************************/CHARACTER DATABASE FUNCTIONS *********************************************

function insertCharacter() {
    var name="Elie";
    var hp=0;
    var currenthp=0
    var initiative=0
    var ac=0;
    var pp=0
    var str=0
    var dex=0
    var con=0
    var int=0
    var wis=0
    var cha=0
    db.transaction(function(transaction) {
        var executeQuery = 'INSERT INTO characters (name, initiative, hp, currenthp, ac, pp, str_save, dex_save, con_save, int_save, wis_save, cha_save) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)';
        transaction.executeSql(executeQuery, [name, initiative, hp, currenthp, ac, pp, str, dex, con, int, wis, cha],
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
            var executeQuery = "UPDATE characters SET name=?, initiative=?, hp=?, currenthp=?, ac=?, pp=?, str_save=?, dex_save=?, con_save=?, int_save=?, wis_save=?, cha_save=? WHERE id=?"
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
        console.log(results.rows)
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

//***************************************MONSTER DATABASE FUNCTIONS *********************************************

function insertMonster() {
    var name="Penis Monster";
    var hp=69;
    var currenthp=69;
    var initiative=21;
    var ac=69;
    var speed=45;
    var pp=100;
    var str=20;
    var dex=20;
    var con=20;
    var int=20;
    var wis=20;
    var cha=20;
    var str_save=8;
    var dex_save=2;
    var con_save=6;
    var int_save=2; 
    var wis_save=-1;
    var cha_save=-1; 
    var proficiency_bonus=10;
    var dmg_resist="nothing"; 
    var dmg_immune="nothing";
    var condition_immune="nothing";

    db.transaction(function(transaction) {
        var executeQuery = 'INSERT INTO monsters (name, initiative, hp, currenthp, ac, speed, pp, str, dex, con, int, wis, cha, str_save, dex_save, con_save, int_save, wis_save, cha_save, proficiency_bonus, dmg_resist, dmg_immune, condition_immune) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)';
        transaction.executeSql(executeQuery, [name, initiative, hp, currenthp, ac, speed, pp, str, dex, con, int, wis, cha, str_save, dex_save, con_save, int_save, wis_save, cha_save, proficiency_bonus, dmg_resist, dmg_immune, condition_immune],
        function(tx, result) {
            alert('Inserted');
        },
        function(error){
            alert('Error occurred');
        });
    });
}

function updateMonster(){
    var id =1;
    var name=" Erect Penis Monster";
    var hp=69;
    var currenthp=69;
    var initiative=21;
    var ac=69;
    var speed=45;
    var pp=100;
    var str=20;
    var dex=20;
    var con=20;
    var int=20;
    var wis=20;
    var cha=20;
    var str_save=8;
    var dex_save=2;
    var con_save=6;
    var int_save=2; 
    var wis_save=-1;
    var cha_save=-1; 
    var proficiency_bonus=10;
    var dmg_resist="everything"; 
    var dmg_immune="everything";
    var condition_immune="everything";

    db.transaction(function(transaction) {
        var executeQuery = 'UPDATE monsters SET name=?, initiative=?, hp=?, currenthp=?, ac=?, speed=?, \
                                                pp=?, str=?, dex=?, con=?, int=?, wis=?, cha=?, str_save=?, \
                                                dex_save=?, con_save=?, int_save=?, wis_save=?, cha_save=?, \
                                                proficiency_bonus=?, dmg_resist=?, dmg_immune=?, condition_immune=? WHERE id=?';
        transaction.executeSql(executeQuery, [name, initiative, hp, currenthp, ac, speed, pp, str, dex, con, int, wis, cha, str_save, dex_save, con_save, int_save, wis_save, cha_save, proficiency_bonus, dmg_resist, dmg_immune, condition_immune, id],
        function(tx, result) {
            alert('Updated');
        },
        function(error){
            alert('Error occurred');
        });
    });
}

function viewMonster(){
    db.transaction(function(transaction) {
        transaction.executeSql('SELECT * FROM monsters', [], function (tx, results) {
        console.log(results.rows)
        return results.rows
        }, null);
        });
}

function deleteMonster(event){
    db.transaction(function(transaction) {
        var id = event.id;
        var executeQuery = "DELETE FROM monsters WHERE id=?";
        transaction.executeSql(executeQuery, [id],
        //On Success
        function(tx, result) {alert('Delete successfully');},
        //On Error
        function(error){alert('Something went Wrong');});
    });
}
//***************************************NPC DATABASE FUNCTIONS *********************************************

function insertNPC() {
    var name="barkeep";
    var hp=5;
    var currenthp=5;
    var initiative=20;
    var ac=10;
    var speed=15;
    var pp=2;
    var str=2;
    var dex=2;
    var con=2;
    var int=2;
    var wis=2;
    var cha=2;
    var str_save=1;
    var dex_save=1;
    var con_save=1;
    var int_save=1; 
    var wis_save=-1;
    var cha_save=-1; 
    var proficiency_bonus=10;
    var dmg_resist="nothing"; 
    var dmg_immune="nothing";
    var condition_immune="nothing";

    db.transaction(function(transaction) {
        var executeQuery = 'INSERT INTO NPCs (name, initiative, hp, currenthp, ac, speed, pp, str, dex, con, int, wis, cha, str_save, dex_save, con_save, int_save, wis_save, cha_save, proficiency_bonus, dmg_resist, dmg_immune, condition_immune) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)';
        transaction.executeSql(executeQuery, [name, initiative, hp, currenthp, ac, speed, pp, str, dex, con, int, wis, cha, str_save, dex_save, con_save, int_save, wis_save, cha_save, proficiency_bonus, dmg_resist, dmg_immune, condition_immune],
        function(tx, result) {
            alert('Inserted');
        },
        function(error){
            alert('Error occurred');
        });
    });
}

function updateNPC(){
    var id =1;
    var name="Barkeep thats about to woop your ass";
    var hp=150;
    var currenthp=100;
    var initiative=21;
    var ac=22;
    var speed=50;
    var pp=100;
    var str=20;
    var dex=20;
    var con=20;
    var int=20;
    var wis=20;
    var cha=20;
    var str_save=8;
    var dex_save=8;
    var con_save=8;
    var int_save=8; 
    var wis_save=8;
    var cha_save=8; 
    var proficiency_bonus=10;
    var dmg_resist="earth, wind, fire"; 
    var dmg_immune="Harsh words, thrown bottles, barstools";
    var condition_immune="charm spells";

    db.transaction(function(transaction) {
        var executeQuery = 'UPDATE NPCs SET name=?, initiative=?, hp=?, currenthp=?, ac=?, speed=?, \
                                                pp=?, str=?, dex=?, con=?, int=?, wis=?, cha=?, str_save=?, \
                                                dex_save=?, con_save=?, int_save=?, wis_save=?, cha_save=?, \
                                                proficiency_bonus=?, dmg_resist=?, dmg_immune=?, condition_immune=? WHERE id=?';
        transaction.executeSql(executeQuery, [name, initiative, hp, currenthp, ac, speed, pp, str, dex, con, int, wis, cha, str_save, dex_save, con_save, int_save, wis_save, cha_save, proficiency_bonus, dmg_resist, dmg_immune, condition_immune, id],
        function(tx, result) {
            alert('Updated');
        },
        function(error){
            alert('Error occurred');
        });
    });
}

function viewNPC(){
    db.transaction(function(transaction) {
        transaction.executeSql('SELECT * FROM NPCs', [], function (tx, results) {
        console.log(results.rows)
        return results.rows
        }, null);
        });
}

function deleteNPC(event){
    db.transaction(function(transaction) {
        var id = event.id;
        var executeQuery = "DELETE FROM NPCs WHERE id=?";
        transaction.executeSql(executeQuery, [id],
        //On Success
        function(tx, result) {alert('Delete successfully');},
        //On Error
        function(error){alert('Something went Wrong');});
    });
}