const priority = {
    LOW: 1,
    MED: 2,
    HIGH: 4
}

class User{
    //constructor for new and returning users, defaults are for calling for new users
    constructor(firstName, lastName, picId, major, xp = 0, streak = 0, xpGardenMultiplier = 1, userTasks = new TaskList(), gardenStr = "aaaaaaaaaaaaaaaa", dailyObjectives = null, weeklyObjectives = null){
        this.firstName = firstName;
        this.lastName = lastName;
        this.picId = picId;
        this.major = major;
        this.xp = xp;
        this.streak = streak;
        this.xpGardenMultiplier = xpGardenMultiplier;
        this.userTasks = userTasks;
        this.gardenStr = gardenStr; //TODO create Garden object from this
        this.dailyObjectives = dailyObjectives;
        this.weeklyObjectives = weeklyObjectives;
    }
}

//parent class for Task and SubTask
class BasicTask{
    constructor(name, timeReq = 0){
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
    constructor(name, timeReq, taskPriority, dueDate, subtasksList = []){
        super();
        this.timeWorked = 0;
        this.isCompleted = false;

        if(subtasksList == []){
            this.hasSubTasks = false;
        }
        else{
            this.hasSubTasks = true;
        }
        

        this.name = name;
        this.timeReq = timeReq;
        this.taskPriority = taskPriority;
        this.subtasksList = subtasksList;

        this.dueDate = dueDate;
    }

    getSubTaskListSize(){
        return this.subtasksList.length
    }

    getSubTask(index){
        return this.subtasksList[index];
    }

    update(){
        //TODO remove
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
        let infoString = "Name: " + this.name + " | " + this.timeWorked + " / " + this.timeReq + " minutes worked" + " | " + this.taskPriority + " priority" + " | " + this.getDaysUntilDue() + " day(s) remaining" + " | queueScore = " + this.getQueueScore();
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

    addSubTask(subtask){
        if(this.hasSubTasks == false){
            this.hasSubTasks = true;
        }
        this.subtasksList.push(subtask);
    }

}

//not implemented yet
class SubTask extends BasicTask{

    //do I need subtask index here?

    getName(){
        return this.name;
    }

    getIsCompleted(){
        return this.isCompleted;
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

            //let listLength = this.taskList.length;
            let newTaskPushed = false;
            
            for(let i = 0; (i < this.taskList.length && !newTaskPushed); i++){
            console.log("iteration: " + i);
            let iterationQueueScore = this.taskList[i].getQueueScore();
                console.log("comparing " + newTaskQueueScore + " to " + iterationQueueScore);

                if(newTaskQueueScore > iterationQueueScore){
                    console.log("pushing in middle");
                    this.taskList.splice(i, 0, task);
                    newTaskPushed = true;
                }
            }
        }
        else{
            console.log("pushed to back");
            console.log("list length: " + this.taskList.length);
            this.taskList.push(task);
        }

        
    }

    removeTask(index){
        //TODO test this
        this.taskList.splice(index,1);
    }

    getTask(index){
        return this.taskList[index];
    }

    //prints all Tasks in TaskList to console
    logTasks(){
        this.taskList.forEach(
            t => {
                console.log(t.getInfo());
                //TODO: this should create html on the dashboard that displays it instead
            }
        )
    }
}