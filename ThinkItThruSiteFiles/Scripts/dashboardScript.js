console.log("Hello World!");
let myTaskList = new TaskList();
myTaskList.addTask(new Task("task one", 2, priority.HIGH, difficulty.HARD, 15, new Date(2024, 3, 28)));
myTaskList.addTask(new Task("task two", 2, priority.MED, difficulty.HARD, 15, new Date(2024, 3, 29)));
myTaskList.addTask(new Task("task three", 2, priority.LOW, difficulty.EASY, 15, new Date(2024, 3, 27)));
//its not adding this one for some reason?
myTaskList.addTask(new Task("task four", 2, priority.HIGH, difficulty.HARD, 15, new Date(2024, 3, 29)));
myTaskList.addTask(new Task("task five", 2, priority.HIGH, difficulty.HARD, 15, new Date(2024, 3, 26)));
myTaskList.logTasks();
console.log("done");

let taskToChange = myTaskList.getTask(1);
taskToChange.name = "CHANGED";

myTaskList.logTasks();

let myObj = new DailyObjectivesList(myTaskList);
myObj.createDayList();
myObj.printDayList();
/*

const container = document.getElementById('myDiv');
const numberList = document.createElement('ul');

//container.innerHTML = '';

for (let i = 1; i <= 10; i++) {
  const listItem = document.createElement('li');
  listItem.textContent = `Number ${i}`;
  numberList.appendChild(listItem);
}

container.appendChild(numberList);*/

function showLinks() {
  var x = document.getElementById("LinkContainer");
  if (x.style.display === "block") {
    x.style.display = "none";
  } else {
    x.style.display = "block";
  }
}