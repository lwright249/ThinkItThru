let timers = {};


function deleteTask(element) {
    //First, get the id and take the index number out of the string
    let elementID = element.getAttribute("id");
    elementID = elementID.substring(6);
    
    //Remove the item at that index from the TaskList
    removeTaskFromUser(elementID);

    const taskCard = element.closest('.card');
    taskCard.remove(); // Removes the task card from the DOM
}

function completeTask(element) {
    //First, get the id and take the index number out of the string
    let elementID = element.getAttribute("id");
    elementID = elementID.substring(6);
    
    //Remove the item at that index from the TaskList
    removeTaskFromUser(elementID);

    //TODO: award player some XP!

    const taskCard = element.closest('.card');
    taskCard.remove(); // Example action, remove the task card
    // Additional actions can be added here, like updating the database
}


function toggleTimer(button, timerId) {
    const timerDisplay = document.getElementById(timerId);
    if (!timers[timerId]) {
        timers[timerId] = { running: false, time: 0, interval: null, prevTime: 0};
    }
    let timer = timers[timerId];

    if (!timer.running) {
        timer.prevTime = timer.time;
        button.textContent = 'Clock Out';
        timer.running = true;
        timer.interval = setInterval(() => {
            timer.time++;
            let hours = Math.floor(timer.time / 3600);
            let minutes = Math.floor((timer.time % 3600) / 60);
            let seconds = timer.time % 60;
            timerDisplay.textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        }, 1000);
    } else {
        button.textContent = 'Clock In';
        clearInterval(timer.interval);
        timer.running = false;

        //Looks at time in minutes to add to Task
        let timeToAdd = Math.floor((timer.time - timer.prevTime)/60);

        //get TaskList index from element id
        let elementID = button.getAttribute("id");
        elementID = elementID.substring(6);
        console.log(elementID);

        //add time to Task from TaskList
        addTimeToUserTask(elementID, timeToAdd);

        //TODO: delete this next line when done testing
        //displayTasks();
    }
}