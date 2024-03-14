const difficulty = {
    EASY: 0.8,
    MEDIUM: 1.0,
    HARD: 1.2
}

//ASK ABOUT THIS
const priority = {
    LOW: 4,
    MED: 2,
    HIGH: 1
}

class BasicTask{
    constructor(name, timeReq){
        this.name = name;
        this.timeReq = timeReq;
        this.isCompleted = false;
        this.timeWorked = 0;
    }

    getName(){
        return this.name;
    }
    
    getTimeWorked(){
        return this.timeWorked;
    }

    getTimeRequired(){
        return this.timeReq;
    }

    getIsCompleted(){
        return this.isCompleted;
    }

    rewardPlayer(xp){
        //TODO implement this sometime
    }
    

}

class Task extends BasicTask{ //maybe i remove basictask and hope noone notices, it might just make my life easier
    constructor(name, timeReq, taskPriority, taskDifficulty, minTimeToAssign, daysUntilDue, subtasksList = null){
        super();
        this.timeWorked = 0;
        this.isCompleted = false;

        if(subtasksList == null){
            this.hasSubTasks = false;
        }
        else{
            this.hasSubTasks = true;
        }
        

        this.name = name;
        this.timeReq = timeReq;
        this.taskPriority = taskPriority;
        this.taskDifficulty = taskDifficulty;
        this.minTimeToAssign = minTimeToAssign;
        this.subtasksList = subtasksList;

        
        //REPLACE daysUntilDue with an actual Date() object!
        this.daysUntilDue = daysUntilDue;
    }

    getSubTasks(){
        if (this.subtasksList == null) {
            return "N/A";
        }
        else{
            //TODO this lmao
        }
    }

    update(){
        //TODO wtf do i do here
    }

    startTime(){
        //I need to see if this is still useful
        //maybe change to update time for the task?
    }

    pauseTime(){
        //again is this useful
    }

    finishTask(){
       //reward player
       //delete this task from the TaskList 
    }

    //TODO temporary thing
    printName(){
        console.log(this.name);
    }

    getInfo(){
        let infoString = "Name: " + this.name + " | " + this.timeWorked + " / " + this.timeReq + " minutes worked" + " | " + this.taskDifficulty + " difficulty and " + this.taskPriority + " priority" + " | " + this.daysUntilDue + " day(s) remaining" + " | queue# = " + (this.daysUntilDue * this.taskPriority);
        return infoString;
    }

}

class SubTask extends BasicTask{
    //do I need subtask index here?

    getName(){
        return this.name + ": " + this.timeWorked + " minutes out of " + this.timeReq;
    }
}

class TaskList{
    constructor(firstTask = null){
        if(this.firstTask == null){
            this.taskList = [];
        }
        else{
            this.taskList = [firstTask];
        }
        
    }

    evaluateDailyTasks(){
        //hard stuff here
    }

    evaluateWeeklyTasks(){
        //harder stuff here
    }

    addTask(task){
        if(this.taskList == null){
            console.log("error, task list null");
            return;
        }

        //replace with something smart!!!
        //this.taskList.push(task);
        let newTaskQueueNum = task.daysUntilDue * task.taskPriority;
        /*let currListSize = this.taskList.length;
        this.taskList.forEach(
            t => {
                let iterationPriority = t.daysUntilDue * t.priority;

                if(newTaskPriority < iterationPriority){
                    this.taskList.splice()
                }
            }
        )*/

        this.taskList.length

        if(this.taskList.length > 0 && newTaskQueueNum < (this.taskList[this.taskList.length - 1].daysUntilDue * this.taskList[this.taskList.length - 1].taskPriority)){
            console.log("NOT pushed to back");
            console.log("tasklist length: " + this.taskList.length);

            let listLength = this.taskList.length;
            let newTaskPushed = false;
            
            for(let i = 0; (i < this.taskList.length && !newTaskPushed); i++){
            console.log("iteration: " + i);
            let iterationPriority = this.taskList[i].daysUntilDue * this.taskList[i].taskPriority;

                if(newTaskQueueNum < iterationPriority){
                    console.log("this one's gonna crash huh");
                    this.taskList.splice(i, 0, task);
                    newTaskPushed = true;
                }
            }
        }
        else{
            console.log("list length: " + this.taskList.length);
            if(this.taskList.length > 0){
                console.log("last priority #: " + this.taskList[this.taskList.length - 1].taskPriority);
                console.log("current priority #: " + task.taskPriority);
            }


            console.log("pushed to back");
            this.taskList.push(task);
        }

        
    }

    removeTask(index){

    }

    logTasks(){
        this.taskList.forEach(
            t => {
                console.log(t.getInfo());
            }
        )
    }
}

console.log("Hello World!");
let myTaskList = new TaskList();
myTaskList.addTask(new Task("task one", 2, priority.HIGH, difficulty.HARD, 15, 2));
myTaskList.addTask(new Task("task two", 2, priority.MED, difficulty.HARD, 15, 3));
myTaskList.addTask(new Task("task three", 2, priority.LOW, difficulty.EASY, 15, 1));
myTaskList.addTask(new Task("task four", 2, priority.HIGH, difficulty.HARD, 15, 3));
myTaskList.logTasks();
console.log("done");