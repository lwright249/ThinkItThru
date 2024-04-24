let timers = {};

function toggleTimer(button, timerId) {
    const timerDisplay = document.getElementById(timerId);
    if (!timers[timerId]) {
        timers[timerId] = { running: false, time: 0, interval: null };
    }
    let timer = timers[timerId];

    if (!timer.running) {
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
    }
}