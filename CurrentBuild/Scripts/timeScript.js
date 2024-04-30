
class DateManipulation {
    static daysUntilDue(dueDate) {
        let today = new Date();

        //difference between the assignment date and today's date
        let diffInMilliseconds = dueDate - today;

        //if due date is passed, treat as if due today
        if (diffInMilliseconds < 0) {
            return 0;
        }

        //milliseconds to days (1000 ms * 60 s * 60 min * 24 hours)
        let diffInDays = Math.round(diffInMilliseconds / (1000 * 60 * 60 * 24));

        //console.log("diff in days: " + diffInDays)
        return diffInDays;
    }

    static formatTimeFromMinutes(timeInMinutes) {
        let hours = Math.floor(timeInMinutes / 60);
        let remainingMinutes = timeInMinutes % 60;
        return hours + " hours " + remainingMinutes + " minutes";
    }

    static formatTimeFromSeconds(timeInSeconds) {
        let hours = Math.floor(timeInSeconds / (60 * 60));
        let minutes = Math.floor(timeInSeconds / 60) % 60;
        let remainingSeconds = timeInSeconds % (60);

        let hoursString = hours.toString().padStart(2, '0');
        let minutesString = minutes.toString().padStart(2, '0');
        let secondsString = remainingSeconds.toString().padStart(2, '0');
        return hoursString + " : " + minutesString + " : " + secondsString;
    }
}
