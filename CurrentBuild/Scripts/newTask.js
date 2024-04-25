document.getElementById('newTaskForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Gather data from form
    const taskData = {
        name: document.getElementById('taskName').value,
        dueDate: document.getElementById('dueDate').value,
        priority: document.getElementById('priority').value,
        timeEstimate: {
            hours: document.getElementById('hours').value,
            minutes: document.getElementById('minutes').value
        }
    };

    // Placeholder for Firebase code
    // TODO: Add Firebase integration here
    console.log('Submitting task:', taskData);

    // Redirect or notify on success
    alert('Task added successfully!');
    window.location.href = 'dashboard.html'; // Redirect to dashboard or confirmation page
});

