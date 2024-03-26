class DailyObjectivesList{
    constructor(objTaskList){
        this.objTaskList = objTaskList;
        this.dayList = [];

        this.objectivesList = new TaskList();
        this.bonusMultiplier = 1;
        //TODO ensure tasks in taskList marked complete when they are checked off on the website
        //also find out if this var is necessary or covered by checkObjComplete??
        this.allObjectivesDone = false;
    }

    //slow, O(n^2)
    //also currently not working, lists numbers in order instead of the right indices!!!!!
    createDayList(){
        //this loop might break things
        for(let i = 0; i < this.objTaskList.taskList.length; i++){
            let currTaskDueDate = this.objTaskList.taskList[i].dueDate;
            let hasMatch = false;
            //check if date of element matches Day that is already made
            this.dayList.forEach(dayElement => {
                console.log("curr task due date: " + currTaskDueDate);
                console.log("day Element date: "+ dayElement.dayDate);
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
                this.dayList.push(newDay);
            }
        }
    }

    updateObjectives(){
        
    }

    checkObjectivesComplete(){

    }

    awardPlayer(){

    }

    displayObjectivesList(){

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