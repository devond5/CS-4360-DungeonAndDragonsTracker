if (typeof(Storage) !== "undefined") {
  var storage = window.localStorage;
    charJson = storage.getItem("character");
    charJson = JSON.parse(charJson);
  if(charJson == null){
    charJson = {};
  }else{
    fillTable();
  }
}

function cmnForm(currentId){
  if(currentId == "characterOverlay"){
    document.getElementById("characterOverlay").style.display = "block"
  }else if(currentId == "monsterOverlay"){
    document.getElementById("monsterOverlay").style.display = "block"; 
  }else{
    document.getElementById("npcOverlay").style.display = "block"; 
  }
 
}
function off(currentId){
  if(currentId == "characterOverlay"){
    document.getElementById("characterOverlay").style.display = "none"
  }else if(currentId == "monsterOverlay"){
    document.getElementById("monsterOverlay").style.display = "none"; 
  }else{
    document.getElementById("npcOverlay").style.display = "none"; 
  }
  var elements = document.getElementsByTagName("input");
for (var ii=0; ii < elements.length; ii++) {
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
    if(tabName === 'Monsters'){
       
       document.getElementById(document.getElementsByClassName("body")[0].id).style.opacity = "0"; 
    
        document.getElementsByClassName("body")[0].id = "bodyContainMonsters";
        document.getElementById("bodyContainMonsters").style.opacity = "1"; 
        document.getElementsByClassName("monsterTableCont")[0].style.display = "block"; 
        document.getElementsByClassName("npcTableCont")[0].style.display = "none"; 
        document.getElementsByClassName("characterTableCont")[0].style.display = "none"; 
    }else if(tabName === 'NPCs'){
      document.getElementById(document.getElementsByClassName("body")[0].id).style.opacity = "0"; 
      
      document.getElementsByClassName("body")[0].id = "bodyContainNpcs";
        document.getElementById("bodyContainNpcs").style.opacity = "1"; 
        document.getElementsByClassName("monsterTableCont")[0].style.display = "none"; 
        document.getElementsByClassName("npcTableCont")[0].style.display = "block"; 
        document.getElementsByClassName("characterTableCont")[0].style.display = "none"; 
    }else{
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

function submitCharacters(){
  //If enough info is added create a table

  var table = document.getElementById("characterTable");

if(table.rows.length ==0){
  firstCharTable=false;
  var HeaderRow = table.insertRow(0);
  var cell1Head = HeaderRow.insertCell(0);
  var cell2Head = HeaderRow.insertCell(1);
  var cell3Head = HeaderRow.insertCell(2);
  cell1Head.innerHTML = "Character";
  cell2Head.innerHTML = "Statistics";
  cell3Head.innerHTML = "Player Info";
}


  var row = table.insertRow(1);
  var cell1 = row.insertCell(0);
  var cell2 = row.insertCell(1);
  var cell3 = row.insertCell(2);
  var stats = "";
  var characterInfo = "";
  if(document.getElementById("characterName").value != ""){
    var charName =document.getElementById("characterName").value;
    cell1.innerHTML = document.getElementById("characterName").value;
    charJson[charName] = {};
    charJson[charName]["stats"] = {};
    charJson[charName]["player"] = {};

    if(document.getElementById("Initiative").value !=""){
      stats += " Initiative:" + document.getElementById("Initiative").value;
      charJson[charName]["stats"] ["Initiative"] = document.getElementById("Initiative").value;
    }
    if(document.getElementById("HP").value !=""){
      stats += " HP:" +document.getElementById("HP").value;
      charJson[charName]["stats"] ["HP"] = document.getElementById("HP").value;
    }
    if(document.getElementById("AC").value !=""){
      stats += " AC:" +document.getElementById("AC").value;
      charJson[charName]["stats"] ["AC"] = document.getElementById("AC").value;
    }
    if(document.getElementById("PP").value !=""){
      stats += " Perception:" +document.getElementById("PP").value;
      charJson[charName]["stats"] ["PP"] = document.getElementById("PP").value;
    }
    if(document.getElementById("Stength").value !=""){
      stats += " Stength:" +document.getElementById("Stength").value;
      charJson[charName]["stats"] ["Stength"] = document.getElementById("Stength").value;
    }
    if(document.getElementById("Dexterity").value !=""){
      stats += " Dexterity:" +document.getElementById("Dexterity").value;
      charJson[charName]["stats"] ["Dexterity"] = document.getElementById("Dexterity").value;
    }
    if(document.getElementById("Constitution").value !=""){
      stats += " Constitution:" +document.getElementById("Constitution").value;
      charJson[charName]["stats"] ["Constitution"] = document.getElementById("Constitution").value;
    }
    if(document.getElementById("Intellegance").value !=""){
      stats += " Intellegance:" +document.getElementById("Intellegance").value;
      charJson[charName]["stats"] ["Intellegance"] = document.getElementById("Intellegance").value;
    }
    if(document.getElementById("Wisdom").value !=""){
      stats += " Wisdom:" +document.getElementById("Wisdom").value;
      charJson[charName]["stats"] ["Wisdom"] = document.getElementById("Wisdom").value;
    }
    if(document.getElementById("Charisma").value !=""){
      stats += " Charisma:" +document.getElementById("Charisma").value;
      charJson[charName]["stats"] ["Charisma"] = document.getElementById("Charisma").value;
    }
    cell2.innerHTML = stats;
  
    if(document.getElementById("PlayerName").value !=""){
      characterInfo += " PlayerName:" + document.getElementById("PlayerName").value;
      charJson[charName]["player"]["PlayerName"] = document.getElementById("PlayerName").value;
    }
    if(document.getElementById("Background").value !=""){
      characterInfo += " Background:" + document.getElementById("Background").value;
      charJson[charName]["player"]["Background"] = document.getElementById("Background").value;
    }
    if(document.getElementById("ClassAndLevel").value !=""){
      characterInfo += " ClassAndLevel:" + document.getElementById("ClassAndLevel").value;
      charJson[charName]["player"]["ClassAndLevel"] = document.getElementById("ClassAndLevel").value;
    }
    if(document.getElementById("Experience").value !=""){
      characterInfo += " Experience:" + document.getElementById("Experience").value;
      charJson[charName]["player"]["Experience"] = document.getElementById("Experience").value;
    }
    if(document.getElementById("Alignment").value !=""){
      characterInfo += " Alignment:" + document.getElementById("Alignment").value;
      charJson[charName]["player"]["Alignment"] = document.getElementById("Alignment").value;
    }
    if(document.getElementById("Race").value !=""){
      characterInfo += " Race:" + document.getElementById("Race").value;
      charJson[charName]["player"]["Race"] = document.getElementById("Race").value;
    }
    cell3.innerHTML = characterInfo;
  
    var elements = document.getElementsByTagName("input");
    for (var ii=0; ii < elements.length; ii++) {
      if (elements[ii].type == "text" || elements[ii].type == "number") {
        elements[ii].value = "";
      }
    }
    document.getElementById("characterOverlay").style.display = "none"

  }
  

}
function submitMonsters(){
  //If enough info is added create a table
  var table = document.getElementById("myTable");
  var row = table.insertRow(0);
  var cell1 = row.insertCell(0);
  var cell2 = row.insertCell(1);
  cell1.innerHTML = "NEW CELL1";
  cell2.innerHTML = "NEW CELL2";
}
function submitNpcs(){
  //If enough info is added create a table
  var table = document.getElementById("myTable");
  var row = table.insertRow(0);
  var cell1 = row.insertCell(0);
  var cell2 = row.insertCell(1);
  cell1.innerHTML = "NEW CELL1";
  cell2.innerHTML = "NEW CELL2";
  
}



window.onbeforeunload = function(){
if(typeof charJson !="undefined"){
  storage.setItem("character", JSON.stringify(charJson));
}
}

function fillTable(){
  var table = document.getElementById("characterTable");
for(var name in charJson){
  if(table.rows.length ==0){
    firstCharTable=false;
    var HeaderRow = table.insertRow(0);
    var cell1Head = HeaderRow.insertCell(0);
    var cell2Head = HeaderRow.insertCell(1);
    var cell3Head = HeaderRow.insertCell(2);
    cell1Head.innerHTML = "Character";
    cell2Head.innerHTML = "Statistics";
    cell3Head.innerHTML = "Player Info";
  }
  
  
    var row = table.insertRow(1);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var reStats = "";
    var rePlayers= "";

    cell1.innerHTML = name;
    for(var st in charJson[name]["stats"]){
      reStats += " "+ st + ":" +charJson[name]["stats"][st];
    }
    cell2.innerHTML = reStats;
    for(var pl in charJson[name]["player"]){
      rePlayers += " "+ pl + ":" +charJson[name]["player"][pl];
    }
    cell3.innerHTML = rePlayers;
}
}
 



  
  
