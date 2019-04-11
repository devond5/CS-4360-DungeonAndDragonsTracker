
var splashImagesWeb = ["img/battle.jpg","img/dragons.jpg","img/magic.jpg"],
splashTextWeb = ["Prepare For Battle","Face the Dragon","Harness your Magic"];




window.load = load();
function load(){
var splashNum =  Math.floor(Math.random() * 3);

document.getElementById("splash").style.backgroundImage = "url(" +splashImagesWeb[splashNum]+")";
document.getElementById("splashText").innerHTML = splashTextWeb[splashNum];

if(splashNum == 2){
    document.getElementById("splash").style.backgroundPosition = "50%";
}

function cont() {
    window.location.assign("splashHome.html")
}

}