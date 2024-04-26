let newUser = new User("John", "Doe", 13123123, "CSCI", 3000, 1.1, 1, new TaskList(), "caadaagaaabaaeaa");
let myGarden = new Garden(newUser.gardenStr, newUser);
updateScreen(myGarden);
console.log("done");