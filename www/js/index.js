
var splashImagesWeb = ["img/battle.jpg","img/dragons.jpg","img/magic.jpg"],
splashTextWeb = ["Prepare For Battle","Face the Dragon","Harness your Magic"];
var lenDbChar,
lenDbMons,
lenDbNpc;
var db = window.openDatabase('dmdb', '1.0', 'Data', 2*1024*1024);



window.onload = function load(){
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

var splashNum =  Math.floor(Math.random() * 3);

document.getElementById("splash").style.backgroundImage = "url(" +splashImagesWeb[splashNum]+")";
document.getElementById("splashText").innerHTML = splashTextWeb[splashNum];

if(splashNum == 2){
    document.getElementById("splash").style.backgroundPosition = "50%";
}

}

function checkTableLength() {
    db.transaction(function (tx) {
    tx.executeSql('SELECT * FROM characters', [], function (tx, results)
    {  lenDbChar=results.rows.length;   }
    
    );
    tx.executeSql('SELECT * FROM monsters', [], function (tx, results)
    {  lenDbMons=results.rows.length;   }
    
    );
    tx.executeSql('SELECT * FROM NPCs', [], function (tx, results)
    {  lenDbNpc=results.rows.length; 
        disableButton();
    }
    
    );
    });
}

function disableButton(){
    if(lenDbNpc ==0 && lenDbMons==0 &&  lenDbChar==0){ 
        document.getElementById("button2").disabled = true;
 }
    
    }