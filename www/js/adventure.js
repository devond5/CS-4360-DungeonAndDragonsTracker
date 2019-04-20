function openForm() {
    document.getElementById("addCombatant").style.display = "block";
    viewCharacters();
    viewMonsters();
    viewNPCs();
    highlightCombatants();
    document.getElementById("characterTable").style.display = "inline-table";
    document.getElementById("monsterTable").style.display = "none";
    document.getElementById("NPCtable").style.display = "none";
    document.getElementById("formButton").disabled = true;
}

function closeForm() {
    document.getElementById("addCombatant").style.display = "none";
    var table = document.getElementById("characterTable");
    table.innerHTML = "<tbody></tbody>";
    document.getElementById("formButton").disabled = false;

}

function changeTab(tabType) {
    if (tabType === 'characters') {
        document.getElementById('characterTable').style.display = "inline-table";
        document.getElementById('monsterTable').style.display = "none";
        document.getElementById('NPCtable').style.display = "none";
    }
    else if (tabType === 'monsters') {
        document.getElementById('characterTable').style.display = "none";
        document.getElementById('monsterTable').style.display = "inline-table";
        document.getElementById('NPCtable').style.display = "none";
    }
    else {
        document.getElementById('characterTable').style.display = "none";
        document.getElementById('monsterTable').style.display = "none";
        document.getElementById('NPCtable').style.display = "inline-table";
    }
}

function toggleClass(row, className) {
    if (row.className.indexOf(className) >= 0) {
        row.className = row.className.replace(className, "");
        removeCombatant(row);
    }
    else {
        //selected
        insertCombatant(row);
        row.className += className;
    }
}
