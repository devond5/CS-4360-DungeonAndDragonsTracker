function cmnForm(currentId){
  if(currentId == "characterOverlay"){
    document.getElementById("characterOverlay").style.display = "block"; 
  }else if(currentId == "monsterOverlay"){
    document.getElementById("monsterOverlay").style.display = "block"; 
  }else{
    document.getElementById("npcOverlay").style.display = "block"; 
  }
 
}
function off(currentId){
  if(currentId == "characterOverlay"){
    document.getElementById("characterOverlay").style.display = "none"; 
  }else if(currentId == "monsterOverlay"){
    document.getElementById("monsterOverlay").style.display = "none"; 
  }else{
    document.getElementById("npcOverlay").style.display = "none"; 
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
        
    }else if(tabName === 'NPCs'){
      document.getElementById(document.getElementsByClassName("body")[0].id).style.opacity = "0"; 
      
      document.getElementsByClassName("body")[0].id = "bodyContainNpcs";
        document.getElementById("bodyContainNpcs").style.opacity = "1"; 
    }else{
      document.getElementById(document.getElementsByClassName("body")[0].id).style.opacity = "0"; 
      
        document.getElementsByClassName("body")[0].id = "bodyContainCharacters";
        document.getElementById("bodyContainCharacters").style.opacity = "1"; 
    }
    evt.currentTarget.className += " active";
  }
  
  
  // Get the element with id="defaultOpen" and click on it
  document.getElementById("defaultOpen").click();

  window.onload = function(){
    document.getElementById("bodyContainCharacters").style.opacity = "1"; 
  }



  
  
