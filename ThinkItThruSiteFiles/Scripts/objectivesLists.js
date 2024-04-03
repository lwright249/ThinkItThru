class DailyObjectivesList{
    constructor(objTaskList){
        this.objTaskList = objTaskList;
        this.dayList = [];

        this.objectivesList = [];
        this.bonusMultiplier = 1;
        //TODO ensure tasks in taskList marked complete when they are checked off on the website
        //also find out if this var is necessary or covered by checkObjComplete??
        this.allObjectivesDone = false;

        this.createDayList();
        this.createObjectives();
    }

    //slow, O(n^3)??-ish
    createDayList(){
        //this loop might break things
        for(let i = 0; i < this.objTaskList.taskList.length; i++){
            let currTaskDueDate = this.objTaskList.taskList[i].dueDate;
            let hasMatch = false;
            console.log("task iteration: " + i + " due date: " + currTaskDueDate);
            //check if date of element matches Day that is already made
            this.dayList.forEach(dayElement => {
                //console.log("curr task due date: " + currTaskDueDate);
                //console.log("day Element date: "+ dayElement.dayDate);
                if(currTaskDueDate.getTime() == dayElement.dayDate.getTime()){
                    console.log("equal");
                    hasMatch = true;
                    //add index of the task in objTaskList.taskList to the day
                    dayElement.add(i);
                }
                else{
                    console.log("not equal");
                }
            });

            //if no Day exists under that date,
            if(hasMatch == false){
                let newDay = new Day(currTaskDueDate);
                newDay.add(i);
                //TODO change to push in place!!!!
                //this.dayList.push(newDay);
                this.pushInPlace(newDay);
            }
        }
    }

    pushInPlace(dayToPush){
        let isPushedInMiddle = false;

        console.log("daylist len: " + this.dayList.length);

        for(let i = 0; i < this.dayList.length; i++){
            if (dayToPush.dayDate.getTime() < this.dayList[i].dayDate.getTime() && !isPushedInMiddle){
                isPushedInMiddle = true;
                console.log("pusing to index " + i);
                this.dayList.splice(i, 0, dayToPush);
            }
        }
        if(isPushedInMiddle == false){
            this.dayList.push(dayToPush);
        }
    }

    //TODO: this does not implement recurring tasks I don't think
    createObjectives(){
        let oldCeiling = 0;
        let newCeiling = 0;
        let totalTime = 0;
        let timeToAdd = 0;
        let timeToWorkInDay = 0;
        let today = new Date();

        console.log(today.getDate());

        //iterates through each "day" that has a task due
        this.dayList.forEach(day => {
            //totals time to work in this day
            day.indexList.forEach(index => {
                timeToWorkInDay += this.objTaskList.taskList[index].getTimeRemaining();
            });

            totalTime += timeToWorkInDay;

            //check if this day's date is less than today
            if((day.dayDate.getDate() - today.getDate()) >= 1){
                newCeiling = totalTime / ( (day.dayDate.getDate() - today.getDate() )+1);
            }
            //if task overdue, it treats it as if the task is due today (just like being divided by one)
            else{
                newCeiling = totalTime;
            }

            //if more work per day needs to be completed to finish all tasks, add on more work!
            if(newCeiling > oldCeiling){

                day.indexList.forEach(index => {
                    let timeToWorkOnTask = this.objTaskList.taskList[index].getTimeRemaining();
                    timeToAdd = (newCeiling - oldCeiling) * (timeToWorkOnTask / timeToWorkInDay);
                    //TODO add task to objectivesList
                    //myTaskList.addTask(new Task("task five", 2, priority.HIGH, difficulty.HARD, 15, new Date(2024, 3, 26)));


                    console.log("current task: " + this.objTaskList.taskList[index].name);
                    let newObjective = new Objective(this.objTaskList.taskList[index].name, timeToAdd, index);
                    this.objectivesList.push(newObjective);

                });
            }

            oldCeiling = newCeiling;

        });





    }

    checkObjectivesComplete(){

    }

    awardPlayer(){

    }

    displayObjectivesList(){
        this.objectivesList.forEach(objective => {
            //console.log(objective.objTask.getInfo());
            objective.printObjective();

        })
    }

    //temporary!!!
    printDayList(){
        console.log("printint day list:");
        this.dayList.forEach(dayInList => {
            dayInList.printDay();
        });
    }


}

class Day{
    constructor(dayDate){
        this.dayDate = dayDate;
        this.indexList = [];
        
    }

    add(taskIndex){
        this.indexList.push(taskIndex);  
    }

    //temporary!!!
    printDay(){
        console.log(this.dayDate + ":");
        this.indexList.forEach(indexInDay => {
            //console.log("hello");
            console.log(indexInDay);
        });
    }
}

//please work
class Objective{
    constructor(objName, timeToWork, taskListIndex){
        this.objName = objName;
        this.timeToWork = timeToWork;
        this.taskListIndex = taskListIndex;
        this.timeWorkedOn = 0;
        this.isComplete = false;
    }
    update(timeWorked){
        this.timeWorkedOn += timeWorked;
        if(this.timeWorkedOn >= this.timeToWork){
            this.isComplete = true;
        }
    }
    printObjective(){
        console.log("work on " + this.objName + " for " + this.timeToWork + " minutes" + "      index=" + this.taskListIndex);
    }
}