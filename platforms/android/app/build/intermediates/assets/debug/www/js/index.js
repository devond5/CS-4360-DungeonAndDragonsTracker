
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

}

document.addEventListener('deviceready', function() {
  var db = window.sqlitePlugin.openDatabase({name: 'dm.db', location: 'default'});
  db.transaction(function(tr) {
      tr.executeSql('CREATE TABLE IF NOT EXISTS characters ( id integer primary key, name text, hp integer, ac integer)');
  }, function (error) {
      console.log('transaction error: ' + error.message);
  }, function () {
      console.log('transaction ok');
  });
})

function insertData() {
var name="Gerbo";
var hp=65;
var ac=15;
myDB.transaction(function(transaction) {
var executeQuery = "INSERT INTO characters (name, hp, ac) VALUES (?,?)";
transaction.executeSql(executeQuery, [title,desc]
, function(tx, result) {
alert('Inserted');
},
function(error){
alert('Error occurred');
});
});
}

function viewData(){
    myDB.transaction(function(transaction) {
        transaction.executeSql('SELECT * FROM characters', [], function (tx, results) {
        var len = results.rows.length, i;
        $("#rowCount").append(len);
        for (i = 0; i < len; i++){
        $("#TableData").append("<tr><td>"+results.rows.item(i).id+"</td><td>"+results.rows.item(i).name+"</td><td>"+results.rows.item(i).hp+"</td></tr>"+"</td><td>"+results.rows.item(i).ac+"</td></tr>");
        }
        }, null);
        });
}