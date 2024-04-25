
class DateManipulation{
    static daysUntilDue(dueDate){
        let today = new Date();

        //difference between the assignment date and today's date
        let diffInMilliseconds = dueDate - today;
        
        //if due date is passed, treat as if due today
        if(diffInMilliseconds < 0){
            return 0;
        }

        //milliseconds to days (1000 ms * 60 s * 60 min * 24 hours)
        let diffInDays = Math.round(diffInMilliseconds / (1000 * 60 * 60 * 24));

        return diffInDays;
    }
}
/*
class Timer{
    constructor(){
        this.beginTime = new Date();
        this.i = 0;
    }
    showTime(elementId){
        i++;
        document.getElementById(elementId).innerHTML = i;
    }

}
*/
//var x = setInterval(Timer.showTime(),1000);