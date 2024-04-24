import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set } from 'firebase/database';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const firebaseApp = initializeApp({
    apiKey: "AIzaSyDbCO9y8SEe1WzAz94cJDD20qaCKrEBeKI",
    authDomain: "thinkitthru-f4db6.firebaseapp.com",
    databaseURL: "https://thinkitthru-f4db6-default-rtdb.firebaseio.com",
    projectId: "thinkitthru-f4db6",
    storageBucket: "thinkitthru-f4db6.appspot.com",
    messagingSenderId: "913141842173",
    appId: "1:913141842173:web:b49d49476f74c4f7d2be94",
    measurementId: "G-GX7BREDZTJ"
});
const auth = getAuth(firebaseApp);
const db = getDatabase(firebaseApp);

// Detect auth state
onAuthStateChanged(auth, user => {
    if (user != null){
        console.log('logged in!');
    } else {
        console.log('No user');
    }
})

/* const firebaseConfig = {
    apiKey: "AIzaSyDbCO9y8SEe1WzAz94cJDD20qaCKrEBeKI",
    authDomain: "thinkitthru-f4db6.firebaseapp.com",
    databaseURL: "https://thinkitthru-f4db6-default-rtdb.firebaseio.com",
    projectId: "thinkitthru-f4db6",
    storageBucket: "thinkitthru-f4db6.appspot.com",
    messagingSenderId: "913141842173",
    appId: "1:913141842173:web:b49d49476f74c4f7d2be94",
    measurementId: "G-GX7BREDZTJ"
};
*/
/*
// Initialize Firebase
const app = initializeApp(firebaseConfig);

function writeUserData(userId, name, email, imageURL){
// Initialize Realtime Database and get a reference to the service
const database = getDatabase(app);
const reference = ref(db, 'users/' + userId);

set(reference, {
    username: name,
    email: email,
    profile_picture: imageURL
});
}

writeUserData("andrew", "awu", "myemail@me.com", "myimageurl");
*/