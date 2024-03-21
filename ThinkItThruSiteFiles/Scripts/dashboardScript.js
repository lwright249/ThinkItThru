console.log("Hello World!");
let myTaskList = new TaskList();
myTaskList.addTask(new Task("task one", 2, priority.HIGH, difficulty.HARD, 15, new Date(2024, 3, 22)));
myTaskList.addTask(new Task("task two", 2, priority.MED, difficulty.HARD, 15, new Date(2024, 3, 24)));
myTaskList.addTask(new Task("task three", 2, priority.LOW, difficulty.EASY, 15, new Date(2024, 3, 23)));
myTaskList.addTask(new Task("task four", 2, priority.HIGH, difficulty.HARD, 15, new Date(2024, 3, 21)));
myTaskList.logTasks();
console.log("done");

