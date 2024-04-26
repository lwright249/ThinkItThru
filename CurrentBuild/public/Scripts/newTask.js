import {initializeApp} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";

import { 
    getAuth, 
    onAuthStateChanged
 } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";

 import { 
    getFirestore, 
    collection,
    query,
    collectionGroup,
    getDocs,
    getDoc,
    addDoc 
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyDbCO9y8SEe1WzAz94cJDD20qaCKrEBeKI",
    authDomain: "thinkitthru-f4db6.firebaseapp.com",
    databaseURL: "https://thinkitthru-f4db6-default-rtdb.firebaseio.com",
    projectId: "thinkitthru-f4db6",
    storageBucket: "thinkitthru-f4db6.appspot.com",
    messagingSenderId: "913141842173",
    appId: "1:913141842173:web:b49d49476f74c4f7d2be94",
    measurementId: "G-GX7BREDZTJ"
  };

const app = initializeApp(firebaseConfig); 
const db = getFirestore(app);
const auth = getAuth(app);

onAuthStateChanged(auth, user => {
    if(user){
        console.log(user.uid);
        document.getElementById("newTaskForm").addEventListener("submit", async function(event) {
            event.preventDefault();

            const taskData = {
                name: document.getElementById("taskName").value,
                dueDate: document.getElementById("dueDate").value,
                priority: document.getElementById("priority").value,
                taskMinutes: parseInt(document.getElementById("minutes").value)+(parseInt(document.getElementById("hours").value)*60),
                totalTimeWorked: 0
            };

            try {
                const docRef = await addDoc(collection(db, `users/${user.uid}/tasks`), taskData);
                console.log("Document written with ID: ", docRef.id);
                alert("Task added successfully!");
                window.location.href = "dashboard.html";
            } catch (error) {
                console.error("Error adding document: ", error);
                alert("Failed to add task. Please try again!");
            }
        });
    } else {
        console.log("No user signed in");
        window.location.href = "index.html";
    }


});

export async function fetchAllTasks() {
    const userTasksQuery = query(collection(db, `users/aVGHDc80jRRKFUn1oMkqgKRNuPC3/tasks`));
    try {
        const querySnapshot = await getDocs(userTasksQuery);
        querySnapshot.forEach(doc => {
            console.log(`${doc.id} =>`, doc.data());
            // Here, you handle the tasks specifically for the user with userId
                
        });
    } catch (error) {
        console.error("Error fetching user tasks: ", error);
    }
}

console.log(fetchAllTasks());


/*document.getElementById('newTaskForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Gather data from form
    const taskData = {
        name: document.getElementById('taskName').value,
        dueDate: document.getElementById('dueDate').value,
        priority: document.getElementById('priority').value,
        taskMinutes: document.getElementById('minutes').value + (document.getElementById('hours').value * 60)
    };

    onAuthStateChanged(auth, (user) => {

    });
    // Placeholder for Firebase code
    // TODO: Add Firebase integration here
    console.log('Submitting task:', taskData);

    // Redirect or notify on success
    alert('Task added successfully!');
    window.location.href = 'dashboard.html'; // Redirect to dashboard or confirmation page
});*/



/*import {initializeApp} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";

import { 
    getAuth, 
    onAuthStateChanged
 } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";

 import { 
    getFirestore, 
    collection, 
    addDoc 
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyDbCO9y8SEe1WzAz94cJDD20qaCKrEBeKI",
    authDomain: "thinkitthru-f4db6.firebaseapp.com",
    databaseURL: "https://thinkitthru-f4db6-default-rtdb.firebaseio.com",
    projectId: "thinkitthru-f4db6",
    storageBucket: "thinkitthru-f4db6.appspot.com",
    messagingSenderId: "913141842173",
    appId: "1:913141842173:web:b49d49476f74c4f7d2be94",
    measurementId: "G-GX7BREDZTJ"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

onAuthStateChanged(auth, user => {
    if (user) {
        document.getElementById('newTaskForm').addEventListener('submit', async function(event) {
            event.preventDefault();

            const taskData = {
                name: document.getElementById('taskName').value,
                dueDate: document.getElementById('dueDate').value,
                priority: document.getElementById('priority').value,
                taskMinutes: parseInt(document.getElementById('minutes').value) + (parseInt(document.getElementById('hours').value) * 60),
                totalTimeWorked: 0
            };

            try {
                const docRef = await addDoc(collection(db, `users/${user.uid}/tasks`), taskData);
                console.log("Document written with ID: ", docRef.id);
                alert('Task added successfully!');
                window.location.href = 'dashboard.html'; // Redirect to dashboard or confirmation page
            } catch (e) {
                console.error("Error adding document: ", e);
                alert('Failed to add task. Please try again!');
            }
        });
    } else {
        console.log("No user signed in");
        // Optionally redirect to login page
        window.location.href = 'login.html';
    }
});*/
