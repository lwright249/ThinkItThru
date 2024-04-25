let newUser = new User("John", "Doe", 13123123, "CSCI", 5000, 1.1, 1, new TaskList(), "aaaaaaaaaaaaaaaa");
newUser.userTasks.addTask(new Task("task one", 200, priority.HIGH, new Date(2024, 4, 5)));
newUser.userTasks.addTask(new Task("task two", 200, priority.MED, new Date(2024, 4, 6)));
newUser.userTasks.addTask(new Task("task three", 200, priority.LOW, new Date(2024, 4, 4)));
newUser.userTasks.logTasks();
newUser.userTasks.taskList[1].addSubTask(new SubTask("subtask one"));
console.log(newUser.userTasks.taskList[1].getSubTaskListSize());
displayTasks();

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
    //TODO: reload html when available!!!!!
    //TODO: update serverside
}

function addTimeToUserTask(index, minutes){
    let task = newUser.userTasks.getTask(index);
    task.timeWorked += minutes;
    //console.log(task.timeWorked);
    newUser.userTasks.logTasks();

    //TODO: update serverside!

}

//task0-subtask0-checkbox
function changeUserSubtask(taskIndex, subtaskIndex){
    //console.log("task: " + taskIndex + "subtask: " + subtaskIndex);
    let checkbox = document.getElementById("task"+taskIndex+"-subtask"+subtaskIndex+"-checkbox");
    let isChecked = checkbox.checked;

    //TODO: no idea if this works!!!!!

    let ownerTask = newUser.userTasks.getTask(taskIndex);
    let subtask = ownerTask.getSubTask(subtaskIndex);

    subtask.isCompleted = isChecked;
    console.log(subtask.getName() + "   " + subtask.isCompleted);

    //TODO: update serverside!
}

/*
<div class="row" id = "row">
            <div class="col-12 col-md-6 col-lg-4" id = "task0">
                <div class="card task-card">
                    <div class="dropdown">
                        <button class ="btn tan options-button" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                            <i clas="bi bi-list">Options</i>
                        </button>
                        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            <li><a class="dropdown-item" href="totaltasklayout.html">Edit Task</a></li>
                            <li><a class="dropdown-item" id = "delete0" href="#" onclick="deleteTask(this)">Delete Task</a></li>
                            <li><a class="dropdown-item" id = "complete0" href="#" onclick="completeTask(this)">Complete Task</a></li>
                        </ul>
                    </div>
                    <div class="card-body">
                        <h5 class="card-title">Task Name</h5>
                        <button class="btn btn-primary clock-btn" id="button0" onclick="toggleTimer(this, 'timer0')">Clock In</button>
                        <span class="timer">00:00:00</span>
                        <span class="timer" id="timer0">00:00:00</span>
                    </div>
                    <div class="task-extension">
                        Work on this task for 20 minutes today.
                    </div>
                    <div class="task-extension subtask">
                        - Subtask 1
                        <input type="checkbox" class="task-checkbox" id="task0-subtask0-checkbox" onclick = "changeUserSubtask(0,0)"/>
                        <label for="task0-subtask0-checkbox" class="checkbox-label"></label>
                    </div>
                    <div class="task-extension subtask">
                        - Subtask 2
                        <input type="checkbox" class="task-checkbox" id="task0-subtask1-checkbox" onclick = "changeUserSubtask(0,1)"/>
                        <label for="task0-subtask1-checkbox" class="checkbox-label"></label>
                    </div>
                </div>
            </div>
            <!------------- We can keep copying this to add more ------------------->
            <div class="col-12 col-md-6 col-lg-4">
                <div class="card task-card">
                    <div class="dropdown">
                        <button class ="btn tan
*/
function displayTasks(){
    let div = document.getElementById("row");
    let html = "";

    for(let i = 0; i < newUser.userTasks.taskList.length; i++){
        let currTask = newUser.userTasks.taskList[i];
        //TODO: subtasksList is ALWAYS null, even when there are subtasks
        let subtasksList = currTask.subtasksList;

        html += "<div class=\"col-12 col-md-6 col-lg-4\" id = \"task0\">";
        html += "<div class=\"card task-card\"><div class=\"dropdown\">";
        html += "<button class =\"btn tan options-button\" type=\"button\" id=\"dropdownMenuButton\" data-bs-toggle=\"dropdown\" aria-expanded=\"false\">";
        html += "<i clas=\"bi bi-list\">Options</i></button>";
        html += "<ul class=\"dropdown-menu\" aria-labelledby=\"dropdownMenuButton\">";
        html += "<li><a class=\"dropdown-item\" href=\"totaltasklayout.html\">Edit Task</a></li>"
        html += "<li><a class=\"dropdown-item\" id = \"delete"+i+"\" href=\"#\" onclick=\"deleteTask(this)\">Delete Task</a></li>"
        html += "<li><a class=\"dropdown-item\" id = \"complete"+i+"\" href=\"#\" onclick=\"completeTask(this)\">Complete Task</a></li></ul></div>"
        html += "<div class=\"card-body\"> <h5 class=\"card-title\">"+currTask.name+"</h5>";
        html += "<button class=\"btn btn-primary clock-btn\" id=\"button0\" onclick=\"toggleTimer(this, 'timer"+i+"')\">Clock In</button>";
        //TODO format time!
        html += "<span class=\"timer\">"+currTask.timeWorked+"</span><span class=\"timer\" id=\"timer"+i+"\">00:00:00</span>";
        //TODO GET OBJECTIVES WORKING WITH THE HTML
        html += "</div><div class=\"task-extension\">Work on this task for 20 minutes today.</div>";

        console.log(newUser.userTasks.taskList[i].getSubTaskListSize());
        if(!(subtasksList == null)){
            for(let j = 0; j < subtasksList.length; j++){
                console.log("SUBTASK");
                html += "<div class=\"task-extension subtask\">- "+ subtasksList[j].name;
                html += "<input type=\"checkbox\" class=\"task-checkbox\" id=\"task"+i+"-subtask"+j+"-checkbox\" onclick = \"changeUserSubtask("+i+","+j+")\"/>";
                html += "<label for=\"task"+i+"-subtask"+j+"-checkbox\" class=\"checkbox-label\"></label></div>"
    
            }
        }

        html += "</div></div>";
    }
    html += "</div>";
    div.innerHTML = html;
}