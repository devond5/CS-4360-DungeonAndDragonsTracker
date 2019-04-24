var db = window.openDatabase('dmdb', '1.0', 'DM Data', 2 * 1024 * 1024);


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