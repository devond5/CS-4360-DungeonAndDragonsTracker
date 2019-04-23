var db = window.openDatabase('dmdb', '1.0', 'DM Data', 2 * 1024 * 1024),
  lenDbChar = null,
  lenDbMons = null,
  lenDbNpc = null;
window.onload = function () {
  db.transaction(function (tx) {
    tx.executeSql('CREATE TABLE IF NOT EXISTS characters (id integer primary key, name text, Initiative integer, \
      HP integer, CurrentHp integer, AC integer, PP integer, \
      Strength integer, Dexterity integer, Constitution integer, Intellegence integer, \
      Wisdom integer, Charisma integer, Player text, Background text, ClassLevel text,\
      Experience text, Align text, Race text)');
    tx.executeSql('CREATE TABLE IF NOT EXISTS monsters (id integer primary key, name text, Initiative integer, \
      HP integer, CurrentHp integer, AC integer, PP integer, \
      Strength integer, Dexterity integer, Constitution integer, Intellegence integer, \
      Wisdom integer, Charisma integer, STstr integer, STdex integer, \
        STconstitution integer, STint integer, STwis integer, \
        STcharisma integer)');
    tx.executeSql('CREATE TABLE IF NOT EXISTS NPCs (id integer primary key, name text, Initiative integer, \
      HP integer, CurrentHp integer, AC integer, PP integer, \
      Strength integer, Dexterity integer, Constitution integer, Intellegence integer, \
      Wisdom integer, Charisma integer, STstr integer, STdex integer, \
    STconstitution integer, STint integer, STwis integer, \
    STcharisma integer)');
    checkTableLength();
  });
}

function checkTableLength() {
  db.transaction(function (tx) {
    tx.executeSql('SELECT * FROM characters', [], function (tx, results) {

      lenDbChar = results.rows.length;
      if (lenDbChar > 0) {
        fillCharTable(results);
      }
    });
    tx.executeSql('SELECT * FROM monsters', [], function (tx, results) {
      lenDbMons = results.rows.length;
      if (lenDbMons > 0) {
        fillMonsTable(results);
      }
    });
    tx.executeSql('SELECT * FROM NPCs', [], function (tx, results) {
      lenDbNpc = results.rows.length;
      if (lenDbNpc > 0) {
        fillNpcTable(results);
      }
    });
  });
}

function fillCharTable(results) {
  var table = document.getElementById("characterTable");
  if (table.rows.length == 0) {
    var HeaderRow = table.insertRow(0);
    var cell1Head = HeaderRow.insertCell(0);
    var cell2Head = HeaderRow.insertCell(1);
    var cell3Head = HeaderRow.insertCell(2);
    var cell4Head = HeaderRow.insertCell(3);
    cell1Head.innerHTML = "Character";
    cell2Head.innerHTML = "Statistics";
    cell3Head.innerHTML = "Player Info";
    cell4Head.innerHTML = "Delete";
  }
  for (var i = 0; i < lenDbChar; i++) {
    var row = table.insertRow(1);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    var reStats = "";
    var rePlayers = "";
    cell1.innerHTML = results.rows.item(i).name;
    var items = results.rows.item(i);
    for (var it in items) {
      if (it == "Initiative" || it == "HP" || it == "CurrentHp" || it == "AC" || it == "PP" ||
        it == "Strength" || it == "Dexterity" || it == "Constitution" || it == "Intellegence" || it == "Wisdom" || it == "Charisma") {
        if (items[it] != null) {
          reStats +=  it + ":" + items[it] + "<br/>";
        }
      }
      else if (items[it] != null && items[it] != "" && it != "id" && it != "name") {
        rePlayers += it + ":" + items[it] + "<br/>";
      }
    }
    cell2.innerHTML = reStats;
    cell3.innerHTML = rePlayers;
    cell4.innerHTML = "<button id='deleteButton' data-name=" + items['name'] + " onclick='deleteCharacter(this)'>Delete</button>"
  }
}

//***************************************/CHARACTER DATABASE FUNCTIONS *********************************************

function insertCharacter() {
  var name = (document.getElementById("characterName").value == "" ? null : document.getElementById("characterName").value);
  if(name == null){
    document.getElementById("error").innerHTML = "Add Character Name or Close."
    document.getElementById("characterName").style.borderColor = "red";
    return;
  }
    hp = (document.getElementById("HP").value == "" ? 0 : document.getElementById("HP").value);
    currenthp = (document.getElementById("HP").value == "" ? 0 : document.getElementById("HP").value),
    ac = (document.getElementById("AC").value == "" ? 0 : document.getElementById("AC").value),
    pp = (document.getElementById("PP").value == "" ? 0 : document.getElementById("PP").value),
    str = (document.getElementById("Stength").value == "" ? 0 : document.getElementById("Stength").value),
    dex = (document.getElementById("Dexterity").value == "" ? 0 : document.getElementById("Dexterity").value),
    constitution = (document.getElementById("Constitution").value == "" ? 0 : document.getElementById("Constitution").value),
    int = (document.getElementById("Intellegance").value == "" ? 0 : document.getElementById("Intellegance").value),
    wis = (document.getElementById("Wisdom").value == "" ? 0 : document.getElementById("Wisdom").value),
    charisma = (document.getElementById("Charisma").value == "" ? 0 : document.getElementById("Charisma").value),
    player = (document.getElementById("PlayerName").value == "" ? null : document.getElementById("PlayerName").value),
    bg = (document.getElementById("Background").value == "" ? null : document.getElementById("Background").value),
    classLevel = (document.getElementById("ClassAndLevel").value == "" ? null : document.getElementById("ClassAndLevel").value),
    exp = (document.getElementById("Experience").value == "" ? null : document.getElementById("Experience").value),
    align = (document.getElementById("Alignment").value == "" ? null : document.getElementById("Alignment").value),
    race = (document.getElementById("Race").value == "" ? null : document.getElementById("Race").value);
  if (name != null) {
    db.transaction(function (transaction) {
      var executeQuery = 'INSERT INTO characters (name, HP, CurrentHP, AC, PP, Strength, Dexterity, Constitution, Intellegence, Wisdom, Charisma, Player, Background, ClassLevel, Experience,Align, Race) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)';
      transaction.executeSql(executeQuery, [name, hp, currenthp, ac, pp, str, dex, constitution, int, wis, charisma, player, bg, classLevel, exp, align, race],
        function (tx, result) {
          console.log('Inserted');
        },
        function (error) {
          console.log('Error occurred');
        });
    });
    addToCharTable();
  }
  var elements = document.getElementsByTagName("input");
  for (var ii = 0; ii < elements.length; ii++) {
    if (elements[ii].type == "text" || elements[ii].type == "number") {
      elements[ii].value = "";
    }
  }
  document.getElementById("characterOverlay").style.display = "none"
  document.getElementById("error").innerHTML = ""
}


function deleteCharacter(event) {
  db.transaction(function (transaction) {
    var name = event.dataset.name;
    var executeQuery = "DELETE FROM characters WHERE name=?";
    transaction.executeSql(executeQuery, [name],
      //On Success
      function (tx, result) { console.log("Delete Sucessfully"); },
      //On Error
      function (error) { console.log("Something went wrong"); });
    var i = event.parentNode.parentNode.rowIndex;
    document.getElementById("characterTable").deleteRow(i);
    if (document.getElementById("characterTable").rows.length == 1) {
      document.getElementById("characterTable").deleteRow(0);
    }
  });
}

//***************************************MONSTER DATABASE FUNCTIONS *********************************************

function insertmonster() {
  var name = "Penis Monster";
  var hp = 69;
  var currenthp = 69
  var initiative = 21
  var ac = 69;
  var pp = 100;
  var str = 20;
  var dex = 20;
  var constitution = 20;
  var int = 20;
  var wis = 20;
  var charisma = 20;
  db.transaction(function (transaction) {
    var executeQuery = 'INSERT INTO monsters (name, hp, currenthp, ac, pp, str, dex, constitution, int, wis, charisma) VALUES (?,?,?,?,?,?,?,?,?,?,?)';
    transaction.executeSql(executeQuery, [name, hp, currenthp, ac, pp, str, dex, constitution, int, wis, charisma],
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
  var name = "Elie2.0";
  var hp = 100;
  var currenthp = 100
  var initiative = 100
  var ac = 100;
  var pp = 100
  var str = 100
  var dex = 100
  var constitution = 100
  var int = 100
  var wis = 100
  var charisma = 100
  db.transaction(function (transaction) {
    var executeQuery = "UPDATE monsters SET name=?, initiative=?, hp=?, currenthp=?, ac=?, pp=?, str=?, dex=?, constitution=?, int=?, wis=?, charisma=? WHERE id=?"
    transaction.executeSql(executeQuery, [name, initiative, hp, currenthp, ac, pp, str, dex, constitution, int, wis, charisma, id],
      function (tx, result) {
        console.log('Updated successfully');
      },
      function (error) {
        console.log('Something went Wrong');
      });
  })
}

function viewMonster() {
  db.transaction(function (transaction) {
    transaction.executeSql('SELECT * FROM monsters', [], function (tx, results) {
      return results.rows
    }, null);
  });
}

function deleteMonster(event) {
  db.transaction(function (transaction) {
    var name = event.attributes.data - name.nodeValue;
    var executeQuery = "DELETE FROM monsters WHERE name=?";
    transaction.executeSql(executeQuery, [name],
      //On Success
      function (tx, result) { console.log('Delete successfully'); },
      //On Error
      function (error) { console.log('Something went Wrong'); });
  });
}

//***************************************DOCUMENT DATABASE*********************************************

function cmnForm(currentId) {
  if (currentId == "characterOverlay") {
    document.getElementById("characterOverlay").style.display = "block"
  } else if (currentId == "monsterOverlay") {
    document.getElementById("monsterOverlay").style.display = "block";
  } else {
    document.getElementById("npcOverlay").style.display = "block";
  }

}
function off(currentId) {
  if (currentId == "characterOverlay") {
    document.getElementById("characterOverlay").style.display = "none"
  } else if (currentId == "monsterOverlay") {
    document.getElementById("monsterOverlay").style.display = "none";
  } else {
    document.getElementById("npcOverlay").style.display = "none";
  }
  var elements = document.getElementsByTagName("input");
  for (var ii = 0; ii < elements.length; ii++) {
    if (elements[ii].type == "text" || elements[ii].type == "number") {
      elements[ii].value = "";
    }
  }
}

function openTab(evt, tabName) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");

  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(tabName).style.display = "block";
  if (tabName === 'Monsters') {

    document.getElementById(document.getElementsByClassName("body")[0].id).style.opacity = "0";

    document.getElementsByClassName("body")[0].id = "bodyContainMonsters";
    document.getElementById("bodyContainMonsters").style.opacity = "1";
    document.getElementsByClassName("monsterTableCont")[0].style.display = "block";
    document.getElementsByClassName("npcTableCont")[0].style.display = "none";
    document.getElementsByClassName("characterTableCont")[0].style.display = "none";
  } else if (tabName === 'NPCs') {
    document.getElementById(document.getElementsByClassName("body")[0].id).style.opacity = "0";

    document.getElementsByClassName("body")[0].id = "bodyContainNpcs";
    document.getElementById("bodyContainNpcs").style.opacity = "1";
    document.getElementsByClassName("monsterTableCont")[0].style.display = "none";
    document.getElementsByClassName("npcTableCont")[0].style.display = "block";
    document.getElementsByClassName("characterTableCont")[0].style.display = "none";
  } else {
    document.getElementById(document.getElementsByClassName("body")[0].id).style.opacity = "0";

    document.getElementsByClassName("body")[0].id = "bodyContainCharacters";
    document.getElementById("bodyContainCharacters").style.opacity = "1";
    document.getElementsByClassName("monsterTableCont")[0].style.display = "none";
    document.getElementsByClassName("npcTableCont")[0].style.display = "none";
    document.getElementsByClassName("characterTableCont")[0].style.display = "block";
  }
  evt.currentTarget.className += " active";
}


// Get the element with id="defaultOpen" and click on it
document.getElementById("defaultOpen").click();

function addToCharTable() {
  //If enough info is added create a table

  var table = document.getElementById("characterTable");

  if (table.rows.length == 0) {
    firstCharTable = false;
    var HeaderRow = table.insertRow(0);
    var cell1Head = HeaderRow.insertCell(0);
    var cell2Head = HeaderRow.insertCell(1);
    var cell3Head = HeaderRow.insertCell(2);
    var cell4Head = HeaderRow.insertCell(3);
    cell1Head.innerHTML = "Character";
    cell2Head.innerHTML = "Statistics";
    cell3Head.innerHTML = "Player Info";
  }


  var row = table.insertRow(1);
  var cell1 = row.insertCell(0);
  var cell2 = row.insertCell(1);
  var cell3 = row.insertCell(2);
  var cell4 = row.insertCell(3);

  var stats = "";
  var characterInfo = "";
  if (document.getElementById("characterName").value != "") {
    var charName = document.getElementById("characterName").value;
    cell1.innerHTML = document.getElementById("characterName").value;

    cell4.innerHTML = "<button id='deleteButton' data-name=" + document.getElementById('characterName').value + " onclick='deleteCharacter(this)'>Delete</button>"
    
    if (document.getElementById("HP").value != "") {
      stats += "HP:" + document.getElementById("HP").value+ "<br/>";
      stats += "CurrentHP:" + document.getElementById("HP").value + "<br/>";
    }else{
      stats += "HP:0" + " <br/>" ;
    }
    if (document.getElementById("AC").value != "") {
      stats += "AC:" + document.getElementById("AC").value + "<br/>";
    }else{
      stats += "AC:0" + "<br/>" ;
    }
    if (document.getElementById("PP").value != "") {
      stats += "Perception:" + document.getElementById("PP").value + "<br/>";
    }else{
      stats += "Perception:0" + "<br/>" ;
    }
    if (document.getElementById("Stength").value != "") {
      stats += "Stength:" + document.getElementById("Stength").value + "<br/>"
    }else{
      stats += "Stength:0" + "<br/>" ;
    }
    if (document.getElementById("Dexterity").value != "") {
      stats += "Dexterity:" + document.getElementById("Dexterity").value + "<br/>";
    }else{
      stats += "Dexterity:0" + "<br/>" ;
    }
    if (document.getElementById("Constitution").value != "") {
      stats += "Constitution:" + document.getElementById("Constitution").value + "<br/>";
    }else{
      stats += "Constitution:0" + "<br/>" ;
    }
    if (document.getElementById("Intellegance").value != "") {
      stats += "Intellegance:" + document.getElementById("Intellegance").value + "<br/>";
    }else{
      stats += "Intellegance:0" + " <br/>" ;
    }
    if (document.getElementById("Wisdom").value != "") {
      stats += "Wisdom:" + document.getElementById("Wisdom").value + "<br/>";
    }else{
      stats += " Wisdom:0" + "<br/>" ;
    }
    if (document.getElementById("Charisma").value != "") {
      stats += "Charisma:" + document.getElementById("Charisma").value + "<br/>";
    }else{
      stats += "Charisma:0" + " <br/>" ;
    }
    cell2.innerHTML = stats;

    if (document.getElementById("PlayerName").value != "") {
      characterInfo += "Player:" + document.getElementById("PlayerName").value + "<br/>";
    }
    if (document.getElementById("Background").value != "") {
      characterInfo += "Background:" + document.getElementById("Background").value + "<br/>";
    }
    if (document.getElementById("ClassAndLevel").value != "") {
      characterInfo += "ClassAndLevel:" + document.getElementById("ClassAndLevel").value + "<br/>";
    }
    if (document.getElementById("Experience").value != "") {
      characterInfo += "Experience:" + document.getElementById("Experience").value + "<br/>";
    }
    if (document.getElementById("Alignment").value != "") {
      characterInfo += "Alignment:" + document.getElementById("Alignment").value + "<br/>";
    }
    if (document.getElementById("Race").value != "") {
      characterInfo += "Race:" + document.getElementById("Race").value + "<br/>";
    }
    cell3.innerHTML = characterInfo;


  }


}
function submitMonsters() {
  //If enough info is added create a table
  var table = document.getElementById("myTable");
  var row = table.insertRow(0);
  var cell1 = row.insertCell(0);
  var cell2 = row.insertCell(1);
  cell1.innerHTML = "NEW CELL1";
  cell2.innerHTML = "NEW CELL2";
}
function submitNpcs() {
  //If enough info is added create a table
  var table = document.getElementById("myTable");
  var row = table.insertRow(0);
  var cell1 = row.insertCell(0);
  var cell2 = row.insertCell(1);
  cell1.innerHTML = "NEW CELL1";
  cell2.innerHTML = "NEW CELL2";

}










