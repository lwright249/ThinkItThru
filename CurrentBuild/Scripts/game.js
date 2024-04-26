let newUser = new User("John", "Doe", 13123123, "CSCI", 5000, 1.1, 1, new TaskList(), "caadaagaaabaaeaa");
let myGarden = new Garden(newUser.gardenStr, newUser);
updateScreen(myGarden);
displayXP();

function displayXP(){
    let div = document.getElementById("xp");
    let html = newUser.xp + " xp";
    div.innerHTML = html;
}