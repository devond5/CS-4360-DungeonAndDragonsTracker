
var splashImagesWeb = ["img/battle.jpg", "img/dragons.jpg", "img/magic.jpg"],
  splashTextWeb = ["Prepare For Battle", "Face the Dragon", "Harness your Magic"];
var lenDbChar,
  lenDbMons,
  lenDbNpc;
var db = window.openDatabase('dmdb', '1.0', 'Data', 2 * 1024 * 1024);



window.onload = function load() {
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

  var splashNum = Math.floor(Math.random() * 3);

  document.getElementById("splash").style.backgroundImage = "url(" + splashImagesWeb[splashNum] + ")";
  document.getElementById("splashText").innerHTML = splashTextWeb[splashNum];

  if (splashNum == 2) {
    document.getElementById("splash").style.backgroundPosition = "50%";
  }

}

function checkTableLength() {
  db.transaction(function (tx) {
    tx.executeSql('SELECT * FROM characters', [], function (tx, results) { lenDbChar = results.rows.length; }

    );
    tx.executeSql('SELECT * FROM monsters', [], function (tx, results) { lenDbMons = results.rows.length; }

    );
    tx.executeSql('SELECT * FROM NPCs', [], function (tx, results) {
      lenDbNpc = results.rows.length;
      disableButton();
    }

    );
  });
}

function disableButton() {
  if (lenDbNpc == 0 && lenDbMons == 0 && lenDbChar == 0) {
    document.getElementById("button2").disabled = true;
  }

}


function dropTables() {
  db.transaction(function (tx) {
    tx.executeSql("DROP TABLE characters", [],
      function (tx, results) { console.log("Successfully Dropped") },
      function (tx, error) { console.log("Could not delete") }
    );
    tx.executeSql("DROP TABLE monsters", [],
      function (tx, results) { console.log("Successfully Dropped") },
      function (tx, error) { console.log("Could not delete") }
    );
    tx.executeSql("DROP TABLE combatants", [],
      function (tx, results) { console.log("Successfully Dropped") },
      function (tx, error) { console.log("Could not delete") }
    );
    tx.executeSql("DROP TABLE NPCs", [],
      function (tx, results) { console.log("Successfully Dropped") },
      function (tx, error) { console.log("Could not delete") }
    );
    newGame();
  });
}

function newGame() {
  window.location.href='characterMonsterNpc.html';
}

 // Get the modal
 var modal = document.getElementById('myModal');

 // Get the button that opens the modal
 var btn = document.getElementById("button1");

 // Get the <span> element that closes the modal
 var span = document.getElementsByClassName("close")[0];

 // When the user clicks the button, open the modal 
 btn.onclick = function () {

  if(document.getElementById("button2").disabled == true){
    dropTables();
    window.location.replace('characterMonsterNpc.html');
  }else{
    modal.style.display = "block";
  }
   
 }

 // When the user clicks on <span> (x), close the modal
 span.onclick = function () {
   modal.style.display = "none";
 }

 // When the user clicks anywhere outside of the modal, close it
 window.onclick = function (event) {
   if (event.target == modal) {
     modal.style.display = "none";
   }
 }