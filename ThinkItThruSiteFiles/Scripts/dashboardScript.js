console.log("Hello World!");
let myTaskList = new TaskList();
myTaskList.addTask(new Task("task one", 200, priority.HIGH, new Date(2024, 3, 5)));
myTaskList.addTask(new Task("task two", 200, priority.MED, new Date(2024, 3, 6)));
myTaskList.addTask(new Task("task three", 200, priority.LOW, new Date(2024, 3, 4)));
//its not adding this one for some reason?
myTaskList.addTask(new Task("task four", 200, priority.HIGH, new Date(2024, 3, 6)));
myTaskList.addTask(new Task("task five", 200, priority.HIGH, new Date(2024, 3, 3)));
myTaskList.logTasks();
console.log("done");

let taskToChange = myTaskList.getTask(1);
taskToChange.name = "CHANGED";

myTaskList.logTasks();
generateTasks();

let myObj = new DailyObjectivesList(myTaskList);
myObj.printDayList();
myObj.displayObjectivesList();


console.log("days until assignment is due: " + DateManipulation.daysUntilDue(myTaskList.getTask(1).dueDate));
console.log("DONE");
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

function showCheck() {
  var x = document.getElementById("checkmark");
  if (x.style.visibility === "hidden") {
    x.style.visibility = "visible";
  } else {
    x.style.visibility = "hidden";
  }
}

function PausePlay() {
  var x = document.getElementById("playimg");
  var y = document.getElementById("pauseimg");
  if (x.style.display === "block") {
    x.style.display = "none";
    y.style.display = "block";
  } else {
    x.style.display = "block";
    y.style.display = "none";
  }
}

function generateTasks() {
  /*var node = document.getElementById('node-id');
node.innerHTML('<p>some dynamic html</p>');*/

  var dashboardTasks = document.getElementById("TaskBoxSection");
  let html = "";

  console.log(dashboardTasks);

  /*myTaskList.taskList.forEach(Task => {
    console.log("ADDING TO DASHBOARD: " + Task.name);
    html += "<div class=\"TaskBox\"> <div class=\"Task\"><div class=\"EditTaskBtn\"><a href=\"javascript:void(0);\" class=\"icon\" onclick=\"showLinks()\"><img src=\"Styles/more-horiz.svg\"></img> </a></div><div class=\"TaskName\"><h3>Task 1</h3> <p>Time Left: 10:04:31</p></div><div class=\"PauseAndPlay\"><h3>Pause/Play</h3> <p>Time Spent: 1:02:15</p></div><div class=\"CheckBtn\"><button><span>&#9744</span><span id=\"checkmark\">&#10008</span></button></div>\</div>\<div class=\"Subtask\"><p>subtask1</p></div><div class=\"Subtask\">subtask2</div></div>"
  } );
*/
  for(let i = 0; i < myTaskList.taskList.length; i++){
    html += htmlForTask(myTaskList.taskList[i], i);
  }

  //console.log(html);

  //dashboardTasks.innerHTML = ('<p> hi </p>');
  //console.log(dashboardTasks.innerHTML);
  dashboardTasks.innerHTML = html;  
}

/*


        <div class="TaskBox">
            <div class="Task">
                <div class="EditTaskBtn"><a href="javascript:void(0);" class="icon" onclick="showLinks()"><img src="Styles/more-horiz.svg"></img> </a></div>
                <div class="TaskName"><h3>Task 1</h3> <p>Time Left: 10:04:31</p></div>
                <div class="PauseAndPlay"><h3>Pause/Play</h3> <p>Time Spent: 1:02:15</p></div>
                <div class="CheckBtn"><button><span>&#9744</span><span id="checkmark">&#10008</span></button></div>
            </div>

            <div class="Subtask"><p>subtask1</p></div>
            <div class="Subtask">subtask2</div>
        </div>

        */

function htmlForTask(Task, index){
  let html = "<div id = \"TaskBox" + index + "\">";
  html += "<div class=\"Task " + index + "\">";
  html += "<div class=\"EditTaskBtn\"><a href=\"javascript:void(0);\" class=\"icon\" onclick=\"showLinks()\"><img src=\"Styles/more-horiz.svg\"></img> </a></div>";
  html += "<div class= TaskName><h3>" + Task.name + "</h3> <p>Time Left: " + formatTime(Task.getTimeRemaining()) + "</p></div>"; //TODO format date
  html += "<div class=\"PauseAndPlay\"><h3>Pause/Play</h3> <p>Time Spent:"+ formatTime(Task.timeWorked) +"</p></div>";
  html += "<div class=\"CheckBtn\"><button><span>&#9744</span><span id=\"checkmark\">&#10008</span></button></div></div>"; //TODO connect this to Task somehow
  
  if(Task.hasSubTasks == true){
    if(Task.subtasksList == null){
      console.log("Levi made a coding error");
    }
    else{
      for(let i = 0; i < Task.subtasksList.length; i++){
        html += "<div class=\"Subtask\"><p>"+ Task.subtasksList[i].name +"</p></div>";
      }
    }
  }


  html += "</div>";

  return html;

}

function formatTime(timeInMinutes){
  let hours = timeInMinutes/60;
  let remainingMinutes = timeInMinutes%60;
  return hours + " : " + remainingMinutes;
}