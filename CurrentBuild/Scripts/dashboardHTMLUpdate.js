let newUser = new User("John", "Doe", 13123123, "CSCI", 5000, 1.1, 1, new TaskList(), "aaaaaaaaaaaaaaaa");
newUser.userTasks.addTask(new Task("task one", 200, priority.HIGH, new Date(2024, 4, 5)));
newUser.userTasks.addTask(new Task("task two", 200, priority.MED, new Date(2024, 4, 6)));
newUser.userTasks.addTask(new Task("task three", 200, priority.LOW, new Date(2024, 4, 4)));
newUser.userTasks.logTasks();

//remove element from TaskList
/*
let element = document.getElementById("")
let elementID = element.getAttribute("id");
console.log(elementID);*/

function removeTaskFromUser(index){
    newUser.userTasks.removeTask(index);
    newUser.userTasks.logTasks();
}

function awardUser(xp){
    newUser.xp = newUser.xp + xp;
}

function addTimeToUserTask(index, minutes){
    let task = newUser.userTasks.getTask(index);
    task.timeWorked += minutes;
    //console.log(task.timeWorked);
    newUser.userTasks.logTasks();
}