var db = window.openDatabase('dmdb', '1.0', 'DM Data', 2 * 1024 * 1024);

//****************************************************Table Setup FUNCTIONS*************************************************/
var table = document.getElementById("combatantsTable");
var started = false;

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
            var rowdb = combatant.rows[0];
            
            if(rowdb.Initiative == null || typeof rowdb.Initiative == "undefined" ){
                cell1.innerHTML = 0;
            }else{
                cell1.innerHTML = rowdb.Initiative;
            }
            cell2.innerHTML = rowdb.name;
            cell3.innerHTML = rowdb.CurrentHp + "/" +rowdb.HP;
            cell4.innerHTML = "<button id='attack' onclick='attack(this)'>Attack</button><input id='attackInput' type='number' min='0'> <br/> \
            <button id='heal' onclick='attack(this)'>Heal</button><input id='attackInput' type='number' min='0'>"
            sortTable();
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


function initButton(button){
    var rows = table.rows;
    parent = rows[1].parentNode;
    var init = parseInt(rows[1].cells[0].innerHTML);
    var toAppend = [];
    if(!started){
        button.innerHTML = init;
        for(var a = 1; a< rows.length; a++){
            if(parseInt(rows[a].cells[0].innerHTML) == init){
                rows[a].style.backgroundColor = "rgba(100,100,100,0.8)";
            }
        }
        started = true;
    }else{
        for(var a = 1; a< rows.length; a++){
        if(parseInt(rows[a].cells[0].innerHTML) == init){
            toAppend.push(rows[a]);  
        }
        }
        for(a = 0; a<toAppend.length;a++){
            table.appendChild(toAppend[a]);
        }
        toAppend = [];
        init = parseInt(rows[1].cells[0].innerHTML)
        button.innerHTML = init;

        for(var a = 1; a< rows.length; a++){
            if(parseInt(rows[a].cells[0].innerHTML) == init){
                rows[a].style.backgroundColor = "rgba(100,100,100,0.8)";
            }else{
                rows[a].style.backgroundColor = "rgba(0,0,0,0)";
            }
        }

    }
}

function attack(val){
    if(val.id =="attack"){
        var value = val.parentNode.children[1].value;
        var name = val.parentNode.parentNode.children[1].innerHTML;
        var hpStat = val.parentNode.parentNode.children[2];
        val.parentNode.children[1].value = "";
    }else{
        var value = val.parentNode.children[4].value;
        var name = val.parentNode.parentNode.children[1].innerHTML;
        var hpStat = val.parentNode.parentNode.children[2];
       
    }
    

    if(value == ""){
        return;
    }else{
        value = parseInt(value);
        if(val.id == "attack"){
            value = value * -1;
            val.parentNode.children[1].value = "";
        }else{
            val.parentNode.children[4].value = "";
        }
        
        db.transaction(function (tx) {
            var executeSql = 'SELECT * FROM combatants WHERE name=?'
            tx.executeSql(executeSql, [name], function (tx, combatant) {
                var rowdb = combatant.rows[0];
                var id = rowdb.id; 
                id = id.split(" ")[0]; 
                var type = rowdb.type;
                db.transaction(function (tx) {
                    var sql = 'SELECT * FROM '+ type + ' WHERE id=?';
                    tx.executeSql(sql, [id], function (tx, results) {
                        var currHp = parseInt(results.rows[0].CurrentHp);
                        var totHp = parseInt(results.rows[0].HP);
                          if((currHp +value)<0){
                            updateHp(hpStat,type,id,0,totHp);
                          }else if((currHp+value)>totHp){
                            updateHp(hpStat,type, id, totHp, totHp);
                          }else{
                            updateHp(hpStat,type, id, (currHp +value), totHp);
                          }                
                        
                  });
                
                });
              
            });
        });
    }
}

function updateHp(hpStat, type, id, newHp, totHp){
    db.transaction(function (transaction) {
        var executeQuery = 'UPDATE '+type+ ' SET CurrentHp=? WHERE id=?';
        transaction.executeSql(executeQuery, [newHp, id],
            function (tx, result) {
                hpStat.innerHTML = newHp + '/' + totHp;
                console.log('Updated');
                
            },
            function (error) {
                console.log('Error occurred');
            });
    });
}

