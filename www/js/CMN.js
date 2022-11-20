var db = window.openDatabase('dmdb', '1.0', 'DM Data', 2 * 1024 * 1024),
  lenDbChar = null,
  lenDbMons = null,
  lenDbNpc = null;
window.onload = function () {
  db.transaction(function (tx) {
    tx.executeSql('CREATE TABLE IF NOT EXISTS characters (id integer primary key, name text, Initiative integer, \
      HP integer, CurrentHp integer, AC integer, PP integer, \
      Strength integer, Dexterity integer, Constitution integer, Intelligence integer, \
      Wisdom integer, Charisma integer, Player text, Background text, ClassLevel text,\
      Experience text, Align text, Race text)');
    tx.executeSql('CREATE TABLE IF NOT EXISTS monsters (id integer primary key, name text, Initiative integer, \
      HP integer, CurrentHp integer, AC integer, PP integer, \
      Strength integer, Dexterity integer, Constitution integer, Intelligence integer, \
      Wisdom integer, Charisma integer, STstr integer, STdex integer, \
        STconstitution integer, STint integer, STwis integer, \
        STcharisma integer)');
    tx.executeSql('CREATE TABLE IF NOT EXISTS NPCs (id integer primary key, name text, Initiative integer, \
      HP integer, CurrentHp integer, AC integer, PP integer, \
      Strength integer, Dexterity integer, Constitution integer, Intelligence integer, \
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
    cell4Head.innerHTML = "Edit/Delete";
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
        it == "Strength" || it == "Dexterity" || it == "Constitution" || it == "Intelligence" || it == "Wisdom" || it == "Charisma") {
        if (items[it] != null) {
          reStats += it + ":" + items[it] + "<br/>";
        }
      }
      else if (items[it] != null && items[it] != "" && it != "id" && it != "name") {
        rePlayers += it + ":" + items[it] + "<br/>";
      }
    }
    cell2.innerHTML = reStats;
    cell3.innerHTML = rePlayers;
    cell4.innerHTML = "<button id='editButton' data-name=" + items['name'] + " onclick='editCharacter(this)'>Edit</button> <button id='deleteButton' data-name=" + items['name'] + " onclick='deleteCharacter(this)'>Delete</button>"
  }
}

function fillMonsTable(results) {
  var table = document.getElementById("monsterTable");
  if (table.rows.length == 0) {
    var HeaderRow = table.insertRow(0);
    var cell1Head = HeaderRow.insertCell(0);
    var cell2Head = HeaderRow.insertCell(1);
    var cell3Head = HeaderRow.insertCell(2);
    var cell4Head = HeaderRow.insertCell(3);
    cell1Head.innerHTML = "Monster";
    cell2Head.innerHTML = "Statistics";
    cell3Head.innerHTML = "Saving Statistics";
    cell4Head.innerHTML = "Edit/Delete";
  }
  for (var i = 0; i < lenDbMons; i++) {
    var row = table.insertRow(1);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    var reStats = "";
    var reSaving = "";
    cell1.innerHTML = results.rows.item(i).name;
    var items = results.rows.item(i);
    for (var it in items) {
      if (it == "Initiative" || it == "HP" || it == "CurrentHp" || it == "AC" || it == "PP" ||
        it == "Strength" || it == "Dexterity" || it == "Constitution" || it == "Intelligence" || it == "Wisdom" || it == "Charisma") {
        if (items[it] != null) {
          reStats += it + ":" + items[it] + "<br/>";
        }
      }
      else if (items[it] != null && it != "id" && it != "name") {
        if(it.includes("STstr")){
          reSaving += "Saving Strength" + ":" + items[it] + "<br/>";
        }
        if(it.includes("STdex")){
          reSaving += "Saving Dexterity"  + ":" + items[it] + "<br/>";
        }
        if(it.includes("STconstitution")){
          reSaving += "Saving Constitution"  + ":" + items[it] + "<br/>";
        }
        if(it.includes("STint")){
          reSaving += "Saving Intelligence"  + ":" + items[it] + "<br/>";
        }
        if(it.includes("STwis")){
          reSaving += "Saving Wisdom"  + ":" + items[it] + "<br/>";
        }
        if(it.includes("STcharisma")){
          reSaving += "Saving Charisma"  + ":" + items[it] + "<br/>";
        }

      }
    }
    cell2.innerHTML = reStats;
    cell3.innerHTML = reSaving;
    cell4.innerHTML = "<button id='editButton' data-name=" + items['name'] + " onclick='editMonster(this)'>Edit</button><button id='deleteButton' data-name=" + items['name'] + " onclick='deleteMonster(this)'>Delete</button>"
  }
}

function fillNpcTable(results) {
  var table = document.getElementById("npcTable");
  if (table.rows.length == 0) {
    var HeaderRow = table.insertRow(0);
    var cell1Head = HeaderRow.insertCell(0);
    var cell2Head = HeaderRow.insertCell(1);
    var cell3Head = HeaderRow.insertCell(2);
    var cell4Head = HeaderRow.insertCell(3);
    cell1Head.innerHTML = "NPC";
    cell2Head.innerHTML = "Statistics";
    cell3Head.innerHTML = "Saving Statistics";
    cell4Head.innerHTML = "Edit/Delete";
  }
  for (var i = 0; i < lenDbNpc; i++) {
    var row = table.insertRow(1);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    var reStats = "";
    var reSaving = "";
    cell1.innerHTML = results.rows.item(i).name;
    var items = results.rows.item(i);
    for (var it in items) {
      if (it == "Initiative" || it == "HP" || it == "CurrentHp" || it == "AC" || it == "PP" ||
        it == "Strength" || it == "Dexterity" || it == "Constitution" || it == "Intelligence" || it == "Wisdom" || it == "Charisma") {
        if (items[it] != null) {
          reStats += it + ":" + items[it] + "<br/>";
        }
      }
      else if (items[it] != null && it != "id" && it != "name") {
        if(it.includes("STstr")){
          reSaving += "Saving Strength" + ":" + items[it] + "<br/>";
        }
        if(it.includes("STdex")){
          reSaving += "Saving Dexterity"  + ":" + items[it] + "<br/>";
        }
        if(it.includes("STconstitution")){
          reSaving += "Saving Constitution"  + ":" + items[it] + "<br/>";
        }
        if(it.includes("STint")){
          reSaving += "Saving Intelligence"  + ":" + items[it] + "<br/>";
        }
        if(it.includes("STwis")){
          reSaving += "Saving Wisdom"  + ":" + items[it] + "<br/>";
        }
        if(it.includes("STcharisma")){
          reSaving += "Saving Charisma"  + ":" + items[it] + "<br/>";
        }
        
      }
    }
    cell2.innerHTML = reStats;
    cell3.innerHTML = reSaving;
    cell4.innerHTML = "<button id='editButton' data-name=" + items['name'] + " onclick='editNpc(this)'>Edit</button><button id='deleteButton' data-name=" + items['name'] + " onclick='deleteNpc(this)'>Delete</button>"
  }
}

//***************************************/CHARACTER DATABASE FUNCTIONS *********************************************

function insertCharacter() {
  var name = (document.getElementById("characterName").value == "" ? null : document.getElementById("characterName").value);
  if (name == null) {
    document.getElementById("error").innerHTML = "Add Character Name or Close."
    document.getElementById("characterName").style.borderColor = "red";
    return;
  }
  hp = (document.getElementById("HP").value == "" ? 0 : document.getElementById("HP").value);
  currenthp = (document.getElementById("HP").value == "" ? 0 : document.getElementById("HP").value),
    ac = (document.getElementById("AC").value == "" ? 0 : document.getElementById("AC").value),
    pp = (document.getElementById("PP").value == "" ? 0 : document.getElementById("PP").value),
    str = (document.getElementById("Strength").value == "" ? 0 : document.getElementById("Strength").value),
    dex = (document.getElementById("Dexterity").value == "" ? 0 : document.getElementById("Dexterity").value),
    constitution = (document.getElementById("Constitution").value == "" ? 0 : document.getElementById("Constitution").value),
    int = (document.getElementById("Intelligence").value == "" ? 0 : document.getElementById("Intelligence").value),
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
      let executeQuery= '';
      if(document.getElementById("doneChar").innerHTML  == "Update"){
        executeQuery = 'UPDATE characters SET HP=?,  CurrentHP=?,  AC=?,  PP=?,  Strength=?,  Dexterity=?,  Constitution=?,  Intelligence=?,  Wisdom=?,  Charisma=?,  Player=?,  Background=?,  ClassLevel=?,  Experience=? ,Align=?,  Race=? WHERE name=?';
        transaction.executeSql(executeQuery, [hp, currenthp, ac, pp, str, dex, constitution, int, wis, charisma, player, bg, classLevel, exp, align, race, name],
          function (tx, result) {
            console.log('Updated');
            updateCharTable();
          },
          function (error) {
            console.log('Error occurred');
          });
      }else{
        executeQuery = 'INSERT INTO characters (name, HP, CurrentHP, AC, PP, Strength, Dexterity, Constitution, Intelligence, Wisdom, Charisma, Player, Background, ClassLevel, Experience,Align, Race) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)';
        transaction.executeSql(executeQuery, [name, hp, currenthp, ac, pp, str, dex, constitution, int, wis, charisma, player, bg, classLevel, exp, align, race],
          function (tx, result) {
            console.log('Inserted');
           
          },
          function (error) {
            console.log('Error occurred');
          });
         
      }
     
      
    });

    if(document.getElementById("doneChar").innerHTML  != "Update"){
      addToCharTable();
    }
    
  }

  var elements = document.getElementsByTagName("input");
  for (var ii = 0; ii < elements.length; ii++) {
    if (elements[ii].type == "text" || elements[ii].type == "number") {
      elements[ii].value = "";
    }
  }
  document.getElementById("characterOverlay").style.visibility = "hidden"
  document.getElementById("characterOverlay").style.opacity = "0"
  document.getElementById("error").innerHTML = ""
  document.getElementById("characterName").style.borderColor = "";
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

function editCharacter(event) {
  document.getElementById("characterOverlay").style.visibility = "visible"
  document.getElementById("characterOverlay").style.opacity = "1";
  document.getElementById("doneChar").innerText  = "Update"; 

  db.transaction(function (transaction) {
    var name = event.dataset.name;
    var executeQuery = "SELECT * FROM characters WHERE name=?";
    transaction.executeSql(executeQuery, [name],
      //On Success
      function (tx, result) { 
        const values = result.rows[0];
        document.getElementById("characterName").value = values.name;
        document.getElementById("characterName").disabled = true;
        document.getElementById("HP").value = values.HP
        document.getElementById("HP").value = values.CurrentHp
  document.getElementById("AC").value = values.AC
  document.getElementById("PP").value = values.PP
  document.getElementById("Strength").value = values.Strength
  document.getElementById("Dexterity").value = values.Dexterity
  document.getElementById("Constitution").value = values.Constitution
  document.getElementById("Intelligence").value = values.Intelligence
  document.getElementById("Wisdom").value =values.Wisdom
  document.getElementById("Charisma").value = values.Charisma
  document.getElementById("PlayerName").value = values.Player
  document.getElementById("Background").value = values.Background
  document.getElementById("ClassAndLevel").value = values.ClassLevel
  document.getElementById("Experience").value = values.Experience
  document.getElementById("Alignment").value = values.Align
  document.getElementById("Race").value = values.Race
      },
      //On Error
      function (error) { console.log("Something went wrong"); });
    
  });
}
function updateCharTable(){
  var table = document.getElementById("characterTable");
  table.innerHTML = "";
  db.transaction(function (tx) {
    tx.executeSql('SELECT * FROM characters', [], function (tx, results) {

      lenDbChar = results.rows.length;
      if (lenDbChar > 0) {
        fillCharTable(results);
      }
    });
  });
}

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
    cell1.innerHTML = document.getElementById("characterName").value;

    cell4.innerHTML = "<button id='editButton' data-name=" + document.getElementById('characterName').value + " onclick='editCharacter(this)'>Edit</button> <button id='deleteButton' data-name=" + document.getElementById('characterName').value + " onclick='deleteCharacter(this)'>Delete</button>"

    if (document.getElementById("HP").value != "") {
      stats += "HP:" + document.getElementById("HP").value + "<br/>";
      stats += "CurrentHP:" + document.getElementById("HP").value + "<br/>";
    } else {
      stats += "HP:0" + " <br/>";
    }
    if (document.getElementById("AC").value != "") {
      stats += "AC:" + document.getElementById("AC").value + "<br/>";
    } else {
      stats += "AC:0" + "<br/>";
    }
    if (document.getElementById("PP").value != "") {
      stats += "Perception:" + document.getElementById("PP").value + "<br/>";
    } else {
      stats += "Perception:0" + "<br/>";
    }
    if (document.getElementById("Strength").value != "") {
      stats += "Strength:" + document.getElementById("Strength").value + "<br/>"
    } else {
      stats += "Strength:0" + "<br/>";
    }
    if (document.getElementById("Dexterity").value != "") {
      stats += "Dexterity:" + document.getElementById("Dexterity").value + "<br/>";
    } else {
      stats += "Dexterity:0" + "<br/>";
    }
    if (document.getElementById("Constitution").value != "") {
      stats += "Constitution:" + document.getElementById("Constitution").value + "<br/>";
    } else {
      stats += "Constitution:0" + "<br/>";
    }
    if (document.getElementById("Intelligence").value != "") {
      stats += "Intelligence:" + document.getElementById("Intelligence").value + "<br/>";
    } else {
      stats += "Intelligence:0" + " <br/>";
    }
    if (document.getElementById("Wisdom").value != "") {
      stats += "Wisdom:" + document.getElementById("Wisdom").value + "<br/>";
    } else {
      stats += " Wisdom:0" + "<br/>";
    }
    if (document.getElementById("Charisma").value != "") {
      stats += "Charisma:" + document.getElementById("Charisma").value + "<br/>";
    } else {
      stats += "Charisma:0" + " <br/>";
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

//***************************************START MONSTER DATABASE FUNCTIONS *********************************************

function insertMonster() {
  var name = (document.getElementById("monsterName").value == "" ? null : document.getElementById("monsterName").value);
  if (name == null) {
    document.getElementById("monsterError").innerHTML = "Add Monster Name or Close."
    document.getElementById("monsterName").style.borderColor = "red";
    return;
  }
  hp = (document.getElementById("monsterHP").value == "" ? 0 : document.getElementById("monsterHP").value);
  currenthp = (document.getElementById("monsterHP").value == "" ? 0 : document.getElementById("monsterHP").value),
    ac = (document.getElementById("monsterAC").value == "" ? 0 : document.getElementById("monsterAC").value),
    pp = (document.getElementById("monsterPP").value == "" ? 0 : document.getElementById("monsterPP").value),
    str = (document.getElementById("monsterStrength").value == "" ? 0 : document.getElementById("monsterStrength").value),
    dex = (document.getElementById("monsterDexterity").value == "" ? 0 : document.getElementById("monsterDexterity").value),
    constitution = (document.getElementById("monsterConstitution").value == "" ? 0 : document.getElementById("monsterConstitution").value),
    int = (document.getElementById("monsterIntelligence").value == "" ? 0 : document.getElementById("monsterIntelligence").value),
    wis = (document.getElementById("monsterWisdom").value == "" ? 0 : document.getElementById("monsterWisdom").value),
    charisma = (document.getElementById("monsterCharisma").value == "" ? 0 : document.getElementById("monsterCharisma").value);
  SavingStrength = (document.getElementById("monsterSavingStrength").value == "" ? 0 : document.getElementById("monsterSavingStrength").value);
  SavingDexterity = (document.getElementById("monsterSavingDexterity").value == "" ? 0 : document.getElementById("monsterSavingDexterity").value);
  SavingConstitution = (document.getElementById("monsterSavingConstitution").value == "" ? 0 : document.getElementById("monsterSavingConstitution").value);
  SavingIntelligence = (document.getElementById("monsterSavingIntelligence").value == "" ? 0 : document.getElementById("monsterSavingIntelligence").value);
  SavingWisdom = (document.getElementById("monsterSavingWisdom").value == "" ? 0 : document.getElementById("monsterSavingWisdom").value);
  SavingCharisma = (document.getElementById("monsterSavingCharisma").value == "" ? 0 : document.getElementById("monsterSavingCharisma").value);


  if (name != null) {

    db.transaction(function (transaction) {
      let executeQuery= '';
      if(document.getElementById("doneMon").innerHTML  == "Update"){
        executeQuery = 'UPDATE monsters SET HP=?,  CurrentHP=?,  AC=?,  PP=?,  Strength=?,  Dexterity=?,  Constitution=?,  Intelligence=?,  Wisdom=?,  Charisma=?,  STstr=?,  STdex=?,  STconstitution=?,  STint=? ,STwis=?,  STcharisma=? WHERE name=?';
        transaction.executeSql(executeQuery, [ hp, currenthp, ac, pp, str, dex, constitution, int, wis, charisma,
          SavingStrength, SavingDexterity, SavingConstitution, SavingIntelligence, SavingWisdom, SavingCharisma, name],
          function (tx, result) {
            console.log('Updated');
            updateMonTable();
          },
          function (error) {
            console.log('Error occurred');
          });
      }else{
        executeQuery = 'INSERT INTO monsters (name, HP, CurrentHP, AC, PP, Strength, Dexterity, Constitution, Intelligence, Wisdom, Charisma, STstr, STdex, STconstitution, STint, STwis, STcharisma) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)';
        transaction.executeSql(executeQuery, [name, hp, currenthp, ac, pp, str, dex, constitution, int, wis, charisma,
          SavingStrength, SavingDexterity, SavingConstitution, SavingIntelligence, SavingWisdom, SavingCharisma],
          function (tx, result) {
            console.log('Inserted');
          },
          function (error) {
            console.log('Error occurred');
          });
      }
      
    });
    if(document.getElementById("doneMon").innerHTML  != "Update"){
    addToMonsTable();
    }
  }
  var elements = document.getElementsByTagName("input");
  for (var ii = 0; ii < elements.length; ii++) {
    if (elements[ii].type == "text" || elements[ii].type == "number") {
      elements[ii].value = "";
    }
  }
  document.getElementById("monsterOverlay").style.visibility = "hidden"
  document.getElementById("monsterOverlay").style.opacity = "0"
  document.getElementById("monsterError").innerHTML = ""
  document.getElementById("monsterName").style.borderColor = "";
}


function updateMonTable(){
  var table = document.getElementById("monsterTable");
  table.innerHTML = "";
  db.transaction(function (tx) {
    tx.executeSql('SELECT * FROM monsters', [], function (tx, results) {

      lenDbMons = results.rows.length;
      if (lenDbMons > 0) {
        fillMonsTable(results);
      }
    });
  });
}

function addToMonsTable() {
  //If enough info is added create a table

  var table = document.getElementById("monsterTable");

  if (table.rows.length == 0) {
    firstMonsTable = false;
    var HeaderRow = table.insertRow(0);
    var cell1Head = HeaderRow.insertCell(0);
    var cell2Head = HeaderRow.insertCell(1);
    var cell3Head = HeaderRow.insertCell(2);
    var cell4Head = HeaderRow.insertCell(3);
    cell1Head.innerHTML = "Monster";
    cell2Head.innerHTML = "Statistics";
    cell3Head.innerHTML = "Saving Statistics";
  }


  var row = table.insertRow(1);
  var cell1 = row.insertCell(0);
  var cell2 = row.insertCell(1);
  var cell3 = row.insertCell(2);
  var cell4 = row.insertCell(3);

  var stats = "";
  var savingStats = "";
  if (document.getElementById("monsterName").value != "") {
    cell1.innerHTML = document.getElementById("monsterName").value;

    cell4.innerHTML = "<button id='editButton' data-name=" + document.getElementById('monsterName').value + " onclick='editMonster(this)'>Edit</button> <button id='deleteButton' data-name=" + document.getElementById('monsterName').value + " onclick='deleteMonster(this)'>Delete</button>"

    if (document.getElementById("monsterHP").value != "") {
      stats += "HP:" + document.getElementById("monsterHP").value + "<br/>";
      stats += "CurrentHP:" + document.getElementById("monsterHP").value + "<br/>";
    } else {
      stats += "HP:0" + " <br/>";
    }
    if (document.getElementById("monsterAC").value != "") {
      stats += "AC:" + document.getElementById("monsterAC").value + "<br/>";
    } else {
      stats += "AC:0" + "<br/>";
    }
    if (document.getElementById("monsterPP").value != "") {
      stats += "Perception:" + document.getElementById("monsterPP").value + "<br/>";
    } else {
      stats += "Perception:0" + "<br/>";
    }
    if (document.getElementById("monsterStrength").value != "") {
      stats += "Strength:" + document.getElementById("monsterStrength").value + "<br/>"
    } else {
      stats += "Strength:0" + "<br/>";
    }
    if (document.getElementById("monsterDexterity").value != "") {
      stats += "Dexterity:" + document.getElementById("monsterDexterity").value + "<br/>";
    } else {
      stats += "Dexterity:0" + "<br/>";
    }
    if (document.getElementById("monsterConstitution").value != "") {
      stats += "Constitution:" + document.getElementById("monsterConstitution").value + "<br/>";
    } else {
      stats += "Constitution:0" + "<br/>";
    }
    if (document.getElementById("monsterIntelligence").value != "") {
      stats += "Intelligence:" + document.getElementById("monsterIntelligence").value + "<br/>";
    } else {
      stats += "Intelligence:0" + " <br/>";
    }
    if (document.getElementById("monsterWisdom").value != "") {
      stats += "Wisdom:" + document.getElementById("monsterWisdom").value + "<br/>";
    } else {
      stats += " Wisdom:0" + "<br/>";
    }
    if (document.getElementById("monsterCharisma").value != "") {
      stats += "Charisma:" + document.getElementById("monsterCharisma").value + "<br/>";
    } else {
      stats += "Charisma:0" + " <br/>";
    }
    cell2.innerHTML = stats;

    if (document.getElementById("monsterSavingStrength").value != "") {
      savingStats += "Saving Strength:" + document.getElementById("monsterSavingStrength").value + "<br/>"
    } else {
      savingStats += "Saving Strength:0" + "<br/>";
    }
    if (document.getElementById("monsterSavingDexterity").value != "") {
      savingStats += "Saving Dexterity:" + document.getElementById("monsterSavingDexterity").value + "<br/>";
    } else {
      savingStats += "Saving Dexterity:0" + "<br/>";
    }
    if (document.getElementById("monsterSavingConstitution").value != "") {
      savingStats += "Saving Constitution:" + document.getElementById("monsterSavingConstitution").value + "<br/>";
    } else {
      savingStats += "Saving Constitution:0" + "<br/>";
    }
    if (document.getElementById("monsterSavingIntelligence").value != "") {
      savingStats += "Saving Intelligence:" + document.getElementById("monsterSavingIntelligence").value + "<br/>";
    } else {
      savingStats += "Saving Intelligence:0" + " <br/>";
    }
    if (document.getElementById("monsterSavingWisdom").value != "") {
      savingStats += "Saving Wisdom:" + document.getElementById("monsterSavingWisdom").value + "<br/>";
    } else {
      savingStats += "Saving Wisdom:0" + "<br/>";
    }
    if (document.getElementById("monsterSavingCharisma").value != "") {
      savingStats += "Saving Charisma:" + document.getElementById("monsterSavingCharisma").value + "<br/>";
    } else {
      savingStats += "Saving Charisma:0" + " <br/>";
    }
    cell3.innerHTML = savingStats;
  }
}

function deleteMonster(event) {
  db.transaction(function (transaction) {
    var name = event.dataset.name;
    var executeQuery = "DELETE FROM monsters WHERE name=?";
    transaction.executeSql(executeQuery, [name],
      //On Success
      function (tx, result) { console.log("Delete Sucessfully"); },
      //On Error
      function (error) { console.log("Something went wrong"); });
    var i = event.parentNode.parentNode.rowIndex;
    document.getElementById("monsterTable").deleteRow(i);
    if (document.getElementById("monsterTable").rows.length == 1) {
      document.getElementById("monsterTable").deleteRow(0);
    }
  });
}

function editMonster(event) {
  document.getElementById("monsterOverlay").style.visibility = "visible";
  document.getElementById("monsterOverlay").style.opacity = "1";
  document.getElementById("doneMon").innerText  = "Update";
  db.transaction(function (transaction) {
    var name = event.dataset.name;
    var executeQuery = "SELECT * FROM monsters WHERE name=?";
    transaction.executeSql(executeQuery, [name],
      //On Success
      function (tx, result) { 
        const values = result.rows[0];
        document.getElementById("monsterName").value = values.name;
        document.getElementById("monsterName").disabled = true;
        document.getElementById("monsterHP").value = values.HP
        document.getElementById("monsterHP").value = values.CurrentHp
  document.getElementById("monsterAC").value = values.AC
  document.getElementById("monsterPP").value = values.PP
  document.getElementById("monsterStrength").value = values.Strength
  document.getElementById("monsterDexterity").value = values.Dexterity
  document.getElementById("monsterConstitution").value = values.Constitution
  document.getElementById("monsterIntelligence").value = values.Intelligence
  document.getElementById("monsterWisdom").value =values.Wisdom
  document.getElementById("monsterCharisma").value = values.Charisma
  document.getElementById("monsterSavingStrength").value = values.STstr
  document.getElementById("monsterSavingDexterity").value = values.STdex
  document.getElementById("monsterSavingConstitution").value = values.STconstitution
  document.getElementById("monsterSavingIntelligence").value = values.STint
  document.getElementById("monsterSavingWisdom").value = values.STwis
  document.getElementById("monsterSavingCharisma").value = values.STcharisma
      },
      //On Error
      function (error) { console.log("Something went wrong"); });
    
  });
      
}
//***************************************END MONSTER DATABASE FUNCTIONS *********************************************

//***************************************NPC DATABASE FUNCTIONS *********************************************

function insertNpc() {
  var name = (document.getElementById("npcName").value == "" ? null : document.getElementById("npcName").value);
  if (name == null) {
    document.getElementById("npcError").innerHTML = "Add NPC Name or Close."
    document.getElementById("npcName").style.borderColor = "red";
    return;
  }
  hp = (document.getElementById("npcHP").value == "" ? 0 : document.getElementById("npcHP").value);
  currenthp = (document.getElementById("npcHP").value == "" ? 0 : document.getElementById("npcHP").value),
    ac = (document.getElementById("npcAC").value == "" ? 0 : document.getElementById("npcAC").value),
    pp = (document.getElementById("npcPP").value == "" ? 0 : document.getElementById("npcPP").value),
    str = (document.getElementById("npcStrength").value == "" ? 0 : document.getElementById("npcStrength").value),
    dex = (document.getElementById("npcDexterity").value == "" ? 0 : document.getElementById("npcDexterity").value),
    constitution = (document.getElementById("npcConstitution").value == "" ? 0 : document.getElementById("npcConstitution").value),
    int = (document.getElementById("npcIntelligence").value == "" ? 0 : document.getElementById("npcIntelligence").value),
    wis = (document.getElementById("npcWisdom").value == "" ? 0 : document.getElementById("npcWisdom").value),
    charisma = (document.getElementById("npcCharisma").value == "" ? 0 : document.getElementById("npcCharisma").value);
  SavingStrength = (document.getElementById("npcSavingStrength").value == "" ? 0 : document.getElementById("npcSavingStrength").value);
  SavingDexterity = (document.getElementById("npcSavingDexterity").value == "" ? 0 : document.getElementById("npcSavingDexterity").value);
  SavingConstitution = (document.getElementById("npcSavingConstitution").value == "" ? 0 : document.getElementById("npcSavingConstitution").value);
  SavingIntelligence = (document.getElementById("npcSavingIntelligence").value == "" ? 0 : document.getElementById("npcSavingIntelligence").value);
  SavingWisdom = (document.getElementById("npcSavingWisdom").value == "" ? 0 : document.getElementById("npcSavingWisdom").value);
  SavingCharisma = (document.getElementById("npcSavingCharisma").value == "" ? 0 : document.getElementById("npcSavingCharisma").value);


  if (name != null) {
    db.transaction(function (transaction) {
      let executeQuery= '';
      if(document.getElementById("doneNPC").innerHTML  == "Update"){
        executeQuery = 'UPDATE NPCs SET HP=?,  CurrentHP=?,  AC=?,  PP=?,  Strength=?,  Dexterity=?,  Constitution=?,  Intelligence=?,  Wisdom=?,  Charisma=?,  STstr=?,  STdex=?,  STconstitution=?,  STint=? ,STwis=?,  STcharisma=? WHERE name=?';
        transaction.executeSql(executeQuery, [ hp, currenthp, ac, pp, str, dex, constitution, int, wis, charisma,
          SavingStrength, SavingDexterity, SavingConstitution, SavingIntelligence, SavingWisdom, SavingCharisma, name],
          function (tx, result) {
            console.log('Updated');
            updateNpcTable();
          },
          function (error) {
            console.log('Error occurred');
          });
      }else{
        executeQuery = 'INSERT INTO NPCs (name, HP, CurrentHP, AC, PP, Strength, Dexterity, Constitution, Intelligence, Wisdom, Charisma, STstr, STdex, STconstitution, STint, STwis, STcharisma) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)';
        transaction.executeSql(executeQuery, [name, hp, currenthp, ac, pp, str, dex, constitution, int, wis, charisma,
          SavingStrength, SavingDexterity, SavingConstitution, SavingIntelligence, SavingWisdom, SavingCharisma],
          function (tx, result) {
            console.log('Inserted');
          },
          function (error) {
            console.log('Error occurred');
          });
      }
     
    });
    if(document.getElementById("doneNPC").innerHTML  != "Update"){
      addToNpcTable();
      }
    
  }
  var elements = document.getElementsByTagName("input");
  for (var ii = 0; ii < elements.length; ii++) {
    if (elements[ii].type == "text" || elements[ii].type == "number") {
      elements[ii].value = "";
    }
  }
  document.getElementById("npcOverlay").style.visibility = "hidden"
  document.getElementById("npcOverlay").style.opacity = "0"
  document.getElementById("npcError").innerHTML = ""
  document.getElementById("npcName").style.borderColor = "";
}



function updateNpcTable(){
  var table = document.getElementById("npcTable");
  table.innerHTML = "";
  db.transaction(function (tx) {
    tx.executeSql('SELECT * FROM NPCs', [], function (tx, results) {

      lenDbNpc = results.rows.length;
      if (lenDbNpc > 0) {
        fillNpcTable(results);
      }
    });
  });
}

function addToNpcTable() {
  //If enough info is added create a table

  var table = document.getElementById("npcTable");

  if (table.rows.length == 0) {
    firstMonsTable = false;
    var HeaderRow = table.insertRow(0);
    var cell1Head = HeaderRow.insertCell(0);
    var cell2Head = HeaderRow.insertCell(1);
    var cell3Head = HeaderRow.insertCell(2);
    var cell4Head = HeaderRow.insertCell(3);
    cell1Head.innerHTML = "Monster";
    cell2Head.innerHTML = "Statistics";
    cell3Head.innerHTML = "Saving Statistics";
  }


  var row = table.insertRow(1);
  var cell1 = row.insertCell(0);
  var cell2 = row.insertCell(1);
  var cell3 = row.insertCell(2);
  var cell4 = row.insertCell(3);

  var stats = "";
  var savingStats = "";
  if (document.getElementById("npcName").value != "") {
    cell1.innerHTML = document.getElementById("npcName").value;

    cell4.innerHTML = "<button id='editButton' data-name=" + document.getElementById('npcName').value + " onclick='editNpc(this)'>Edit</button> <button id='deleteButton' data-name=" + document.getElementById('npcName').value + " onclick='deleteMonster(this)'>Delete</button>"

    if (document.getElementById("npcHP").value != "") {
      stats += "HP:" + document.getElementById("npcHP").value + "<br/>";
      stats += "CurrentHP:" + document.getElementById("npcHP").value + "<br/>";
    } else {
      stats += "HP:0" + " <br/>";
    }
    if (document.getElementById("npcAC").value != "") {
      stats += "AC:" + document.getElementById("monsterAC").value + "<br/>";
    } else {
      stats += "AC:0" + "<br/>";
    }
    if (document.getElementById("npcPP").value != "") {
      stats += "Perception:" + document.getElementById("npcPP").value + "<br/>";
    } else {
      stats += "Perception:0" + "<br/>";
    }
    if (document.getElementById("npcStrength").value != "") {
      stats += "Strength:" + document.getElementById("npcStrength").value + "<br/>"
    } else {
      stats += "Strength:0" + "<br/>";
    }
    if (document.getElementById("npcDexterity").value != "") {
      stats += "Dexterity:" + document.getElementById("npcDexterity").value + "<br/>";
    } else {
      stats += "Dexterity:0" + "<br/>";
    }
    if (document.getElementById("npcConstitution").value != "") {
      stats += "Constitution:" + document.getElementById("npcConstitution").value + "<br/>";
    } else {
      stats += "Constitution:0" + "<br/>";
    }
    if (document.getElementById("npcIntelligence").value != "") {
      stats += "Intelligence:" + document.getElementById("npcIntelligence").value + "<br/>";
    } else {
      stats += "Intelligence:0" + " <br/>";
    }
    if (document.getElementById("npcWisdom").value != "") {
      stats += "Wisdom:" + document.getElementById("npcWisdom").value + "<br/>";
    } else {
      stats += " Wisdom:0" + "<br/>";
    }
    if (document.getElementById("npcCharisma").value != "") {
      stats += "Charisma:" + document.getElementById("npcCharisma").value + "<br/>";
    } else {
      stats += "Charisma:0" + " <br/>";
    }
    cell2.innerHTML = stats;

    if (document.getElementById("npcSavingStrength").value != "") {
      savingStats += "Saving Strength:" + document.getElementById("npcSavingStrength").value + "<br/>"
    } else {
      savingStats += "Saving Strength:0" + "<br/>";
    }
    if (document.getElementById("npcSavingDexterity").value != "") {
      savingStats += "Saving Dexterity:" + document.getElementById("npcSavingDexterity").value + "<br/>";
    } else {
      savingStats += "Saving Dexterity:0" + "<br/>";
    }
    if (document.getElementById("npcSavingConstitution").value != "") {
      savingStats += "Saving Constitution:" + document.getElementById("npcSavingConstitution").value + "<br/>";
    } else {
      savingStats += "Saving Constitution:0" + "<br/>";
    }
    if (document.getElementById("npcSavingIntelligence").value != "") {
      savingStats += "Saving Intelligence:" + document.getElementById("npcSavingIntelligence").value + "<br/>";
    } else {
      savingStats += "Saving Intelligence:0" + " <br/>";
    }
    if (document.getElementById("npcSavingWisdom").value != "") {
      savingStats += "Saving Wisdom:" + document.getElementById("npcSavingWisdom").value + "<br/>";
    } else {
      savingStats += "Saving Wisdom:0" + "<br/>";
    }
    if (document.getElementById("npcSavingCharisma").value != "") {
      savingStats += "Saving Charisma:" + document.getElementById("npcSavingCharisma").value + "<br/>";
    } else {
      savingStats += "Saving Charisma:0" + " <br/>";
    }
    cell3.innerHTML = savingStats;
  }
}

function deleteNpc(event) {
  db.transaction(function (transaction) {
    var name = event.dataset.name;
    var executeQuery = "DELETE FROM NPCs WHERE name=?";
    transaction.executeSql(executeQuery, [name],
      //On Success
      function (tx, result) { console.log("Delete Sucessfully"); },
      //On Error
      function (error) { console.log("Something went wrong"); });
    var i = event.parentNode.parentNode.rowIndex;
    document.getElementById("npcTable").deleteRow(i);
    if (document.getElementById("npcTable").rows.length == 1) {
      document.getElementById("npcTable").deleteRow(0);
    }
  });
}

function editNpc(event) {
  document.getElementById("npcOverlay").style.visibility = "visible";
  document.getElementById("npcOverlay").style.opacity = "1";
  document.getElementById("doneNPC").innerText  = "Update";
  db.transaction(function (transaction) {
    var name = event.dataset.name;
    var executeQuery = "SELECT * FROM NPCs monsters WHERE name=?";
    transaction.executeSql(executeQuery, [name],
      //On Success
      function (tx, result) { 
        const values = result.rows[0];
        document.getElementById("npcName").value = values.name;
        document.getElementById("npcName").disabled = true;
        document.getElementById("npcHP").value = values.HP
        document.getElementById("npcHP").value = values.CurrentHp
  document.getElementById("npcAC").value = values.AC
  document.getElementById("npcPP").value = values.PP
  document.getElementById("npcStrength").value = values.Strength
  document.getElementById("npcDexterity").value = values.Dexterity
  document.getElementById("npcConstitution").value = values.Constitution
  document.getElementById("npcIntelligence").value = values.Intelligence
  document.getElementById("npcWisdom").value =values.Wisdom
  document.getElementById("npcCharisma").value = values.Charisma
  document.getElementById("npcSavingStrength").value = values.STstr
  document.getElementById("npcSavingDexterity").value = values.STdex
  document.getElementById("npcSavingConstitution").value = values.STconstitution
  document.getElementById("npcSavingIntelligence").value = values.STint
  document.getElementById("npcSavingWisdom").value = values.STwis
  document.getElementById("npcSavingCharisma").value = values.STcharisma
      },
      //On Error
      function (error) { console.log("Something went wrong"); });
    
  });
}


//***************************************DOCUMENT FUNCTIONS**********************************************************

function cmnForm(currentId) {
  if (currentId == "characterOverlay") {
    document.getElementById("characterOverlay").style.visibility = "visible"
    document.getElementById("characterOverlay").style.opacity = "1";
    document.getElementById("doneChar").innerText  = "Done"; 
    document.getElementById("characterName").disabled = false;
  } else if (currentId == "monsterOverlay") {
    document.getElementById("monsterOverlay").style.visibility = "visible";
    document.getElementById("monsterOverlay").style.opacity = "1";
    document.getElementById("doneMon").innerText  = "Done"; 
    document.getElementById("monsterName").disabled = false;
  } else {
    document.getElementById("npcOverlay").style.visibility = "visible";
    document.getElementById("npcOverlay").style.opacity = "1";
    document.getElementById("doneNPC").innerText  = "Done"; 
    document.getElementById("npcName").disabled = false;
  }

}

function off(currentId) {
  if (currentId == "characterOverlay") {
    document.getElementById("characterOverlay").style.visibility = "hidden"
    document.getElementById("characterOverlay").style.opacity = "0";
    document.getElementById("error").innerHTML = ""
    document.getElementById("characterName").style.borderColor = "";
  } else if (currentId == "monsterOverlay") {
    document.getElementById("monsterOverlay").style.visibility = "hidden";
    document.getElementById("monsterOverlay").style.opacity = "0";
    document.getElementById("monsterError").innerHTML = ""
  document.getElementById("monsterName").style.borderColor = "";
  } else {
    document.getElementById("npcOverlay").style.visibility = "hidden";
    document.getElementById("npcOverlay").style.opacity = "0";
    document.getElementById("npcError").innerHTML = ""
    document.getElementById("npcName").style.borderColor = "";
  }
  var elements = document.getElementsByTagName("input");
  for (var ii = 0; ii < elements.length; ii++) {
    if (elements[ii].type == "text" || elements[ii].type == "number") {
      elements[ii].value = "";
    }
  }
}

// Get the element with id="defaultOpen" and click on it
document.getElementById("charOpen").click();

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

    document.getElementById("body").className = "bodyContainMonsters";
    document.getElementById("npcTableCont").style.visibility = "hidden";
    document.getElementById("npcTableCont").style.opacity = "0";
    document.getElementById("npcTableCont").style.display = "none";
    document.getElementById("monsterTableCont").style.visibility = "visible";
    document.getElementById("monsterTableCont").style.opacity = "1";
    document.getElementById("monsterTableCont").style.display = "block";
    document.getElementById("characterTableCont").style.visibility = "hidden";
    document.getElementById("characterTableCont").style.opacity = "0";
    document.getElementById("characterTableCont").style.display = "none";

  } else if (tabName === 'NPCs') {

    document.getElementById("body").className = "bodyContainNpcs";
    document.getElementById("npcTableCont").style.visibility = "visible";
    document.getElementById("npcTableCont").style.opacity = "1";
    document.getElementById("npcTableCont").style.display = "block";
    document.getElementById("monsterTableCont").style.visibility = "hidden";
    document.getElementById("monsterTableCont").style.opacity = "0";
    document.getElementById("monsterTableCont").style.display = "none";
    document.getElementById("characterTableCont").style.visibility = "hidden";
    document.getElementById("characterTableCont").style.opacity = "0";
    document.getElementById("characterTableCont").style.display = "none";
  } else {
    document.getElementById("body").className = "bodyContainCharacters";
    document.getElementById("npcTableCont").style.visibility = "hidden";
    document.getElementById("npcTableCont").style.opacity = "0";
    document.getElementById("npcTableCont").style.display = "none";
    document.getElementById("monsterTableCont").style.visibility = "hidden";
    document.getElementById("monsterTableCont").style.opacity = "0";
    document.getElementById("monsterTableCont").style.display = "none";
    document.getElementById("characterTableCont").style.visibility = "visible";
    document.getElementById("characterTableCont").style.opacity = "1";
    document.getElementById("characterTableCont").style.display = "block";

  }
  evt.currentTarget.className += " active";
}









