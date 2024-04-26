  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
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

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);