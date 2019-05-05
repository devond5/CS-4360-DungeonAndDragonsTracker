var db = window.openDatabase('dmdb', '1.0', 'DM Data', 2 * 1024 * 1024);

//****************************************************Table Setup FUNCTIONS*************************************************/
var table = document.getElementById("combatantsTable");

window.onload = function (){
    var row = table.insertRow(0);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    cell1.innerHTML = "Initiative";
    cell2.innerHTML = "Combatant Name";
    cell3.innerHTML = "HP";
    cell4.innerHTML = "Attack/Heal Combatant";
    db.transaction(function (tx) {
        tx.executeSql('SELECT * FROM combatants', [], function (tx, results) {
            for(var i = 0; i < results.rows.length; i++){
                try{
                    var id = results.rows.item(i).id; 
                    id = id.split(" ")[0]; 
                    var type = results.rows.item(i).type;
                    addCombtToTable(id,type);
                }
                catch{
                    console.log("Cannot get Combatants");
                }   
            }
            
            sortTable();
      });
    
    });
}

function addCombtToTable(id, type){
    

    db.transaction(function (tx) {
        var executeSql = 'SELECT * FROM '+type + ' WHERE id=?'
        tx.executeSql(executeSql, [id], function (tx, combatant) {
            var row = table.insertRow(1);
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            var cell3 = row.insertCell(2);
            var cell4 = row.insertCell(3);
            var row = combatant.rows[0];
            
            if(row.Initiative == null || typeof row.Initiative == "undefined" ){
                cell1.innerHTML = 0;
            }else{
                cell1.innerHTML = row.Initiative;
            }
            cell2.innerHTML = row.name;
            cell3.innerHTML = row.CurrentHp + "/" +row.HP;
            cell4.innerHTML = "<button id='attack' onclick='attack(this)'>Attack/Heal</button><input id='attackInput' type='number'>"
      });
    });
}


function sortTable() {
    var rows, switching, i, x, y, shouldSwitch;
    switching = true;
    /*Make a loop that will continue until
    no switching has been done:*/
    while (switching) {
      //start by saying: no switching is done:
      switching = false;
      rows = table.rows;
      /*Loop through all table rows (except the
      first, which contains table headers):*/
      for (i = 1; i < (rows.length - 1); i++) {
        //start by saying there should be no switching:
        shouldSwitch = false;
        /*Get the two elements you want to compare,
        one from current row and one from the next:*/
        x = rows[i].getElementsByTagName("TD")[0];
        y = rows[i + 1].getElementsByTagName("TD")[0];
        //check if the two rows should switch place:
        if (Number(x.innerHTML) < Number(y.innerHTML)) {
          //if so, mark as a switch and break the loop:
          shouldSwitch = true;
          break;
        }
      }
      if (shouldSwitch) {
        /*If a switch has been marked, make the switch
        and mark that a switch has been done:*/
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;
      }
    }
  }

//****************************************************PAGE FUNCTIONS*************************************************/
function rollD4(){
var roll = Math.floor(Math.random()*4)+1;
document.getElementById("d4").innerHTML = roll;
}
function rollD6(){
    var roll =  Math.floor(Math.random()*6)+1;
    document.getElementById("d6").innerHTML = roll;
}
function rollD8(){
    var roll = Math.floor(Math.random()*8)+1;
    document.getElementById("d8").innerHTML = roll;
}
function rollD10(){
    var roll = Math.floor(Math.random()*10)+1;
    document.getElementById("d10").innerHTML = roll;
}
function rollD12(){
    var roll = Math.floor(Math.random()*12)+1;
    document.getElementById("d12").innerHTML = roll;
}
function rollD20(){
    var roll = Math.floor(Math.random()*20)+1;
    document.getElementById("d20").innerHTML = roll;
}
function rollD100(){
    var roll = Math.floor(Math.random()*100)+1;
    document.getElementById("d100").innerHTML = roll;
}