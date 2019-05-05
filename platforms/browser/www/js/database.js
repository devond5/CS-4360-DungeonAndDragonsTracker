var db = window.openDatabase('dmdb', '1.0', 'Data', 2*1024*1024);

window.onload = function () {

    db.transaction(function (tr) {
        tr.executeSql('CREATE TABLE IF NOT EXISTS combatants (id integer, name text, type text)'); 

    }, function (error) {
        console.log('transaction error: ' + error.message);
    }, function () {
        console.log('transaction ok');
    });
};

//***************************************/CHARACTER DATABASE FUNCTIONS *********************************************





function viewCharacters() {
    db.transaction(function (transaction) {
        transaction.executeSql('SELECT * FROM characters', [], function (tx, results) {
            len = results.rows.length;
            table = document.getElementById("characterTable");
            for (i = 0; i < len; i++) {
                row = document.createElement("tr");
                row.setAttribute("id", "characters");
                row.setAttribute("onclick", "toggleClass(this, 'selected')");
                cell = document.createElement("td");
                cell.setAttribute("id", results.rows.item(i).id+"characters")
                cell.innerHTML = results.rows.item(i).name;
                row.appendChild(cell);
                table.appendChild(row);

            }
        });
    });
}

function deleteCharacter(event) {
    db.transaction(function (transaction) {
        var id = event.id;
        var executeQuery = "DELETE FROM characters WHERE id=?";
        transaction.executeSql(executeQuery, [id],
            //On Success
            function (tx, result) { console.log('Delete successfully'); },
            //On Error
            function (error) { console.log('Something went Wrong'); });
    });
}

//***************************************MONSTER DATABASE FUNCTIONS *********************************************

function insertMonster() {
    var name = "Penis Monster";
    var HP = 69;
    var currentHP = 69;
    var initiative = 21;
    var ac = 69;
    var speed = 45;
    var pp = 100;
    var str = 20;
    var dex = 20;
    var con = 20;
    var int = 20;
    var wis = 20;
    var cha = 20;
    var str_save = 8;
    var dex_save = 2;
    var con_save = 6;
    var int_save = 2;
    var wis_save = -1;
    var cha_save = -1;
    var proficiency_bonus = 10;
    var dmg_resist = "nothing";
    var dmg_immune = "nothing";
    var condition_immune = "nothing";

    db.transaction(function (transaction) {
        var executeQuery = 'INSERT INTO monsters (name, initiative, HP, currentHP, AC, speed, pp, str, dex, con, int, wis, cha, str_save, dex_save, con_save, int_save, wis_save, cha_save, proficiency_bonus, dmg_resist, dmg_immune, condition_immune) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)';
        transaction.executeSql(executeQuery, [name, initiative, HP, currentHP, AC, speed, pp, str, dex, con, int, wis, cha, str_save, dex_save, con_save, int_save, wis_save, cha_save, proficiency_bonus, dmg_resist, dmg_immune, condition_immune],
            function (tx, result) {
                console.log('Inserted');
            },
            function (error) {
                console.log('Error occurred');
            });
    });
}

function updateMonster() {
    var id = 1;
    var name = " Erect Penis Monster";
    var HP = 69;
    var currentHP = 69;
    var initiative = 21;
    var ac = 69;
    var speed = 45;
    var pp = 100;
    var str = 20;
    var dex = 20;
    var con = 20;
    var int = 20;
    var wis = 20;
    var cha = 20;
    var str_save = 8;
    var dex_save = 2;
    var con_save = 6;
    var int_save = 2;
    var wis_save = -1;
    var cha_save = -1;
    var proficiency_bonus = 10;
    var dmg_resist = "everything";
    var dmg_immune = "everything";
    var condition_immune = "everything";

    db.transaction(function (transaction) {
        var executeQuery = 'UPDATE monsters SET name=?, initiative=?, HP=?, currentHP=?, AC=?, speed=?, \
                                                pp=?, str=?, dex=?, con=?, int=?, wis=?, cha=?, str_save=?, \
                                                dex_save=?, con_save=?, int_save=?, wis_save=?, cha_save=?, \
                                                proficiency_bonus=?, dmg_resist=?, dmg_immune=?, condition_immune=? WHERE id=?';
        transaction.executeSql(executeQuery, [name, initiative, HP, currentHP, AC, speed, pp, str, dex, con, int, wis, cha, str_save, dex_save, con_save, int_save, wis_save, cha_save, proficiency_bonus, dmg_resist, dmg_immune, condition_immune, id],
            function (tx, result) {
                console.log('Updated');
            },
            function (error) {
                console.log('Error occurred');
            });
    });
}

function viewMonsters() {
    db.transaction(function (transaction) {
        transaction.executeSql('SELECT * FROM monsters', [], function (tx, results) {
            len = results.rows.length;
            table = document.getElementById("monsterTable");
            for (i = 0; i < len; i++) {
                row = document.createElement("tr");
                row.setAttribute("id", "monsters");
                row.setAttribute("onclick", "toggleClass(this, 'selected')");
                cell = document.createElement("td");
                cell.setAttribute("id", results.rows.item(i).id+"monsters")
                cell.innerHTML = results.rows.item(i).name;
                row.appendChild(cell);
                table.appendChild(row);

            }
        });
    });
}

function deleteMonster(event) {
    db.transaction(function (transaction) {
        var id = event.id;
        var executeQuery = "DELETE FROM monsters WHERE id=?";
        transaction.executeSql(executeQuery, [id],
            //On Success
            function (tx, result) { console.log('Delete successfully'); },
            //On Error
            function (error) { console.log('Something went Wrong'); });
    });
}
//***************************************NPC DATABASE FUNCTIONS *********************************************

function insertNPC() {
    var name = "barkeep";
    var HP = 5;
    var currentHP = 5;
    var initiative = 20;
    var ac = 10;
    var speed = 15;
    var pp = 2;
    var str = 2;
    var dex = 2;
    var con = 2;
    var int = 2;
    var wis = 2;
    var cha = 2;
    var str_save = 1;
    var dex_save = 1;
    var con_save = 1;
    var int_save = 1;
    var wis_save = -1;
    var cha_save = -1;
    var proficiency_bonus = 10;
    var dmg_resist = "nothing";
    var dmg_immune = "nothing";
    var condition_immune = "nothing";

    db.transaction(function (transaction) {
        var executeQuery = 'INSERT INTO NPCs (name, initiative, HP, currentHP, AC, speed, pp, str, dex, con, int, wis, cha, str_save, dex_save, con_save, int_save, wis_save, cha_save, proficiency_bonus, dmg_resist, dmg_immune, condition_immune) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)';
        transaction.executeSql(executeQuery, [name, initiative, HP, currentHP, AC, speed, pp, str, dex, con, int, wis, cha, str_save, dex_save, con_save, int_save, wis_save, cha_save, proficiency_bonus, dmg_resist, dmg_immune, condition_immune],
            function (tx, result) {
                console.log('Inserted');
            },
            function (error) {
                console.log('Error occurred');
            });
    });
}

function updateNPC() {
    var id = 1;
    var name = "Barkeep thats about to woop your ass";
    var HP = 150;
    var currentHP = 100;
    var initiative = 21;
    var ac = 22;
    var speed = 50;
    var pp = 100;
    var str = 20;
    var dex = 20;
    var con = 20;
    var int = 20;
    var wis = 20;
    var cha = 20;
    var str_save = 8;
    var dex_save = 8;
    var con_save = 8;
    var int_save = 8;
    var wis_save = 8;
    var cha_save = 8;
    var proficiency_bonus = 10;
    var dmg_resist = "earth, wind, fire";
    var dmg_immune = "Harsh words, thrown bottles, barstools";
    var condition_immune = "charm spells";

    db.transaction(function (transaction) {
        var executeQuery = 'UPDATE NPCs SET name=?, initiative=?, HP=?, currentHP=?, AC=?, speed=?, \
                                                pp=?, str=?, dex=?, con=?, int=?, wis=?, cha=?, str_save=?, \
                                                dex_save=?, con_save=?, int_save=?, wis_save=?, cha_save=?, \
                                                proficiency_bonus=?, dmg_resist=?, dmg_immune=?, condition_immune=? WHERE id=?';
        transaction.executeSql(executeQuery, [name, initiative, HP, currentHP, AC, speed, pp, str, dex, con, int, wis, cha, str_save, dex_save, con_save, int_save, wis_save, cha_save, proficiency_bonus, dmg_resist, dmg_immune, condition_immune, id],
            function (tx, result) {
                console.log('Updated');
            },
            function (error) {
                console.log('Error occurred');
            });
    });
}

function viewNPCs() {
    db.transaction(function (transaction) {
        transaction.executeSql('SELECT * FROM NPCs', [], function (tx, results) {
            len = results.rows.length;
            table = document.getElementById("NPCtable");
            for (i = 0; i < len; i++) {
                row = document.createElement("tr");
                row.setAttribute("id", "NPCs");
                row.setAttribute("onclick", "toggleClass(this, 'selected')");
                cell = document.createElement("td");
                cell.setAttribute("id", results.rows.item(i).id+"NPCs");
                cell.innerHTML = results.rows.item(i).name;
                row.appendChild(cell);
                table.appendChild(row);

            }
        });
    });
}

function deleteNPC(event) {
    db.transaction(function (transaction) {
        var id = event.id;
        var executeQuery = "DELETE FROM NPCs WHERE id=?";
        transaction.executeSql(executeQuery, [id],
            //On Success
            function (tx, result) { console.log('Delete successfully'); },
            //On Error
            function (error) { console.log('Something went Wrong'); });
    });
}
