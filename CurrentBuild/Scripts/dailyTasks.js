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

    //used in constructor, creates the list of days due to create DailyObjectives
    createDayList(){
        //this loop might break things
        for(let i = 0; i < this.objTaskList.taskList.length; i++){

            let currTaskDueDate = this.objTaskList.taskList[i].dueDate;
            let hasMatch = false;

            //console.log("####task iteration: " + i + " due date: " + this.objTaskList.taskList[i].dueDate);
            //check if date of element matches Day that is already made
            this.dayList.forEach(dayElement => {
                //console.log("curr task due date: " + currTaskDueDate);
                //console.log("day Element date: "+ dayElement.dayDate);
                if(currTaskDueDate.getTime() == dayElement.dayDate.getTime()){
                    //console.log("equal");
                    hasMatch = true;
                    //add index of the task in objTaskList.taskList to the day
                    dayElement.add(i);
                }
                else{
                    //console.log("not equal");
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

    //used to create Day list, organizes days by order of.... days
    pushInPlace(dayToPush){
        let isPushedInMiddle = false;

        //console.log("daylist len: " + this.dayList.length);

        for(let i = 0; i < this.dayList.length; i++){
            if (dayToPush.dayDate.getTime() < this.dayList[i].dayDate.getTime() && !isPushedInMiddle){
                isPushedInMiddle = true;
                //console.log("pusing to index " + i);
                this.dayList.splice(i, 0, dayToPush);
            }
        }
        if(isPushedInMiddle == false){
            this.dayList.push(dayToPush);
        }
    }

    //TODO: this does not implement recurring tasks I don't think (we could always set the due date for recurring tasks as every saturday)
    //actually creates daily objectives list
    createObjectives(){
        let oldCeiling = 0;
        let newCeiling = 0;
        let totalTime = 0;
        let timeToAdd = 0;
        let timeToWorkInDay = 0;
        let today = new Date();

        //iterates through each "day" that has a task due
        this.dayList.forEach(day => {
            timeToWorkInDay = 0; //maybe remove
            //totals time to work in this day
            day.indexList.forEach(index => {
                timeToWorkInDay += this.objTaskList.taskList[index].getTimeRemaining();

            });

            totalTime += timeToWorkInDay;

            //console.log(timeToWorkInDay + "minutes to work on " + today + " and " + totalTime + "to work in total");

            //check if this day's date is less than today
            //console.log("days left: " + (day.dayDate.getDate() - today.getDate()))
            //if((day.dayDate.getDate() - today.getDate()) >= 1){
            if(DateManipulation.daysUntilDue(day.dayDate) >= 1){
                //ceiling becomes total minutes of work / (days remaining + 1)
                newCeiling = (totalTime / ( (DateManipulation.daysUntilDue(day.dayDate))+1));
                console.log(newCeiling)
            }
            //if task overdue, it treats it as if the task is due today (just like being divided by one)
            else{
                newCeiling = totalTime;
            }

            //if more work per day needs to be completed to finish all tasks, add on more work!
            if(newCeiling > oldCeiling){

                day.indexList.forEach(index => {
                    console.log("new ceiling higher");
                    let timeToWorkOnTask = this.objTaskList.taskList[index].getTimeRemaining();
                    timeToAdd = (newCeiling - oldCeiling) * (timeToWorkOnTask / timeToWorkInDay);
                    //console.log("time added: " + timeToAdd);

                    //console.log("current task: " + this.objTaskList.taskList[index].name);
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
        console.log("starting")
        this.objectivesList.forEach(objective => {
            console.log("printing each objective in list");
            objective.printObjective();

        })
    }

    //temporary!!!
    printDayList(){
        console.log("printint day list:");
        this.dayList.forEach(dayInList => {
            console.log("printing")
            dayInList.printDay();
        });
    }


}

//object containing array of every index of task due on the same date
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

//the actual objective, acts as a sort of Task (BUT NOT!!!)
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
        console.log("Work on " + this.objName + " for " + Math.ceil(this.timeToWork) + " minutes")
        return("Work on " + this.objName + " for " + Math.ceil(this.timeToWork) + " minutes");
    }
}