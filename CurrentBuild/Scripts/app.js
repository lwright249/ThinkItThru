import {
    getAuth,
    createUserWithEmailAndPassword
 } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";

const auth = getAuth();

const email = document.getElementById("email");
const password = document.getElementById("password");
const signUpBtn = document.getElementById("signup-btn");
const UIErrorMessage = document.getElementById("error-message");

const signUpFormView = document.getElementById("signup-form");
const userProfileView = document.getElementById("user-profile");
const UIuserEmail = document.getElementById("user-email");

const signUpButtonPressed = async (e) => {
    e.preventDefault();

    try{
        const userCredential = await createUserWithEmailAndPassword(
            auth,  
            email.value, 
            password.value
        );
        console.log(userCredential);

        UIuserEmail.innerHTML = userCredential.user.email;
        
        signUpFormView.style.display = "none";
        userProfileView.style.display = "block";
    } catch (error) {
        console.log(error.code);
        UIErrorMessage.innerHTML = formatErrorMessage(error.code);
        UIErrorMessage.classList.add("visible");
    }
};

signUpBtn.addEventListener("click", signUpButtonPressed);

const formatErrorMessage = (errorCode) => {
    let message = "";
    if(errorCode === "auth/invalid-email" || errorCode === "auth/missing-email") {
        message = "Please enter a valid email."
    } else if (errorCode === "auth/missing-password" || errorCode === "auth/weak-password") {
        message = "Password must be at least 6 characters.";
    } else if (errorCode === "auth/email-already-in-use") {
        message = "Email is already taken.";
    }
    return message;
};