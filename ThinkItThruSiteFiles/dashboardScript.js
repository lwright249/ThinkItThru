

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

class Task /*extends BasicTask*/{ //maybe i remove basictask and hope noone notices, it might just make my life easier
    constructor(name, timeReq, taskPriority, taskDifficulty, minTimeToAssign, subtasksList = null){
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
        this.taskList.push(task);
    }

    removeTask(index){

    }

    logTasks(){
        this.taskList.forEach(); //aldkfjlkdjfklajdlfkajdlkfjadkljflk
    }
}

console.log("Hello World!");
let myTaskList = new TaskList();
myTaskList.addTask(new Task("task one", 2, 3, 4));
console.log("done");