var db = window.openDatabase('dmdb', '1.0', 'DM Data', 2 * 1024 * 1024);

//****************************************************BASIC PAGE FUNCTIONS***************************************************************************/

function openForm() {
    document.getElementById("addCombatant").style.display = "block";
    viewCharacters();
    viewMonsters();
    viewNPCs();
    highlightCombatants();
    document.getElementById("characterTable").style.display = "inline-table";
    document.getElementById("monsterTable").style.display = "none";
    document.getElementById("NPCtable").style.display = "none";
    document.getElementById("formButton").disabled = true;
}

function closeForm() {
    document.getElementById("addCombatant").style.display = "none";
    var table = document.getElementById("characterTable");
    table.innerHTML = "<tbody></tbody>";
    document.getElementById("formButton").disabled = false;

}

function changeTab(tabType) {
    if (tabType === 'characters') {
        document.getElementById('characterTable').style.display = "inline-table";
        document.getElementById('monsterTable').style.display = "none";
        document.getElementById('NPCtable').style.display = "none";
    }
    else if (tabType === 'monsters') {
        document.getElementById('characterTable').style.display = "none";
        document.getElementById('monsterTable').style.display = "inline-table";
        document.getElementById('NPCtable').style.display = "none";
    }
    else {
        document.getElementById('characterTable').style.display = "none";
        document.getElementById('monsterTable').style.display = "none";
        document.getElementById('NPCtable').style.display = "inline-table";
    }
}

function toggleClass(cell, className) {
    if (cell.className.indexOf(className) >= 0) {
        cell.className = cell.className.replace(className, "hover ");
        removeCombatant(cell.parentNode);
    }
    else {
        //selected
        insertCombatant(cell.parentNode);
        cell.className += className;
    }
}

//****************************************************TABLE FUNCTIONS***************************************************************************/


function highlightCombatants(){
    var table = document.getElementById("characterTable");
    db.transaction(function (transaction) {
        transaction.executeSql("SELECT * FROM combatants", [], function(tx, results){
            len = results.rows.length;
            for(var i = 0; i < len; i++){
                try{
                    var cellId = results.rows.item(i).id;    
                    console.log(cellId)
                    var cell = document.getElementById(cellId);
                    cell.setAttribute("class", "selected");
                }
                catch{
                    console.log("Cannot highlight combatants");
                }   
            }
        });
    })
}


function viewCharacters() {
    db.transaction(function (transaction) {
        transaction.executeSql('SELECT * FROM characters', [], function (tx, results) {
            len = results.rows.length;
            table = document.getElementById("characterTable");
            for (i = 0; i < len; i++) {
                row = document.createElement("tr");
                row.setAttribute("id", "characters");
                cell = document.createElement("td");
                cell.setAttribute("onclick", "toggleClass(this, 'selected')");
                cell.setAttribute("class", "hover");
                cell.setAttribute("id", results.rows.item(i).id+"characters")
                cell.innerHTML = results.rows.item(i).name;
                row.appendChild(cell);
                cell2 = document.createElement("td");
                cell2.innerHTML = "<label for='initChoose'>Inititave: </label><input id='initChoose' style='margin-bottom:5px;' type=number type='number' min='0' max='100'>";
                cell2.setAttribute("class", "nohover");
                row.appendChild(cell2);
                table.appendChild(row);

            }
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
                cell = document.createElement("td");
                cell.setAttribute("onclick", "toggleClass(this, 'selected')");
                cell.setAttribute("id", results.rows.item(i).id+"monsters")
                cell.setAttribute("class", "hover");
                cell.innerHTML = results.rows.item(i).name;
                row.appendChild(cell);
                cell2 = document.createElement("td");
                cell2.innerHTML = "<label for='initChoose'>Inititave: </label><input id='initChoose' style='margin-bottom:5px;' type=number type='number' min='0' max='100'>";
                cell2.setAttribute("class", "nohover");
                row.appendChild(cell2);
                table.appendChild(row);

            }
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
                cell = document.createElement("td");
                cell.setAttribute("onclick", "toggleClass(this, 'selected')");
                cell.setAttribute("class", "hover");
                cell.setAttribute("id", results.rows.item(i).id+"NPCs");
                cell.innerHTML = results.rows.item(i).name;
                row.appendChild(cell);
                cell2 = document.createElement("td");
                cell2.innerHTML = "<label for='initChoose'>Inititave: </label><input id='initChoose' style='margin-bottom:5px;' type=number type='number' min='0' max='100'>";
                cell2.setAttribute("class", "nohover");
                row.appendChild(cell2);
                table.appendChild(row);

            }
        });
    });
}


//*********************************************COMBATANT FUNCTIONS***************************************************************************/

function insertCombatant(row){
    cell = row.getElementsByTagName("td");
    var id = cell[0].id;
    var name = cell[0].innerText;
    var type = row.id;
    db.transaction(function (transaction) {
        var executeQuery = 'INSERT INTO combatants (id, name, type) VALUES (?,?,?)';
        transaction.executeSql(executeQuery, [id, name, type],
            function (tx, result) {
                console.log('Inserted');
            },
            function (error) {
                console.log('Error occurred');
            });

    })
}

function removeCombatant(row){
    var cell = row.getElementsByTagName("td");
    var id = cell[0].id;
    // var type = row.id
    console.log(id);
    db.transaction(function (transaction){
        var executeQuery = "DELETE FROM combatants WHERE id=?";
            transaction.executeSql(executeQuery, [id],
                //On Success
                function (tx, result) { console.log('Delete successfully'); },
                //On Error
                function (error) { console.log('Something went Wrong'); });
    })
}

