let newUser = new User("John", "Doe", 13123123, "CSCI", 1000, 1.1, 1, new TaskList(), "aaaaaaaaaaaaaaaa");
let myGarden = new Garden(newUser.gardenStr, newUser);





function showLinks() {
    var x = document.getElementById("LinkContainer");
    if (x.style.display === "block") {
      x.style.display = "none";
    } else {
      x.style.display = "block";
    }
  }
