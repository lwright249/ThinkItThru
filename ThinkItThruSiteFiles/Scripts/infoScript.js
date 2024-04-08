const difficulty = {
    EASY: 0.8,
    MEDIUM: 1.0,
    HARD: 1.2
}

//ASK ABOUT THIS
const priority = {
    LOW: 1,
    MED: 2,
    HIGH: 4
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
    constructor(name, timeReq, taskPriority, taskDifficulty, dueDate, subtasksList = null){
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
        this.subtasksList = subtasksList;

        this.dueDate = dueDate;
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

    //prints the Task information, used to show TaskList items to console
    getInfo(){
        let infoString = "Name: " + this.name + " | " + this.timeWorked + " / " + this.timeReq + " minutes worked" + " | " + this.taskDifficulty + " difficulty and " + this.taskPriority + " priority" + " | " + this.getDaysUntilDue() + " day(s) remaining" + " | queueScore = " + this.getQueueScore();
        return infoString;
    }

    //shows work time left to do for this Task
    getTimeRemaining(){
        return this.timeReq - this.timeWorked;
    }

    //calculates queue score, higher score means it is higher on the TaskList (in terms of index, therefore display)
    getQueueScore(){
        return (this.getTimeRemaining() * this.taskPriority) / (this.getDaysUntilDue() + 1);
    }

    //calculates how many days a Task has left
    getDaysUntilDue(){
        return DateManipulation.daysUntilDue(this.dueDate);
    }

}

//not implemented yet
class SubTask extends BasicTask{
    //do I need subtask index here?

    getName(){
        return this.name;
    }
}

//One per user, will be used to store Tasks, and is used to instantiate Objectives List in another script
class TaskList{
    constructor(firstTask = null){
        if(this.firstTask == null){
            this.taskList = [];
        }
        else{
            this.taskList = [firstTask];
        }
        
    }

    //adds a Task to the TaskList, ranked by queuescore
    addTask(task){
        if(this.taskList == null){
            console.log("error, task list null");
            return;
        }

       
        let newTaskQueueScore = task.getQueueScore();
        
        //makes sure the taskList actually has something in it, also checks if we should just add the task to the back (for speeeeed)
        if(this.taskList.length > 0 && newTaskQueueScore > this.taskList[this.taskList.length - 1].getQueueScore()){
            console.log("NOT pushed to back");
            console.log("tasklist length: " + this.taskList.length);

            let listLength = this.taskList.length;
            let newTaskPushed = false;
            
            for(let i = 0; (i < this.taskList.length && !newTaskPushed); i++){
            console.log("iteration: " + i);
            let iterationQueueScore = (this.taskList[i].getTimeRemaining() * this.taskList[i].taskPriority) / this.taskList[i].getDaysUntilDue();

                if(newTaskQueueScore > iterationQueueScore){
                    console.log("pushing in middle");
                    this.taskList.splice(i, 0, task);
                    newTaskPushed = true;
                }
            }
        }
        else{
            console.log("list length: " + this.taskList.length);
            console.log("pushed to back");
            this.taskList.push(task);
        }

        
    }

    removeTask(index){
        //nothing here yet
    }

    getTask(index){
        return this.taskList[index];
    }

    //prints all Tasks in TaskList to console
    logTasks(){
        this.taskList.forEach(
            t => {
                console.log(t.getInfo());
            }
        )
    }
}
