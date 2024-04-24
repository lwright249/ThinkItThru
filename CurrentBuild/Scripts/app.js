import {
    getAuth,
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
    signInWithEmailAndPassword
 } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";

const auth = getAuth();

const mainView = document.getElementById("main-view");

const email = document.getElementById("email");
const password = document.getElementById("password");
const signUpBtn = document.getElementById("signup-btn");
const UIErrorMessage = document.getElementById("error-message");

const signUpFormView = document.getElementById("signup-form");
const userProfileView = document.getElementById("user-profile");
const UIuserEmail = document.getElementById("user-email");
const logOutBtn =  document.getElementById("logout-btn");

const loginForm = document.getElementById("login-form");
const loginEmail = document.getElementById("login-email");
const loginPassword = document.getElementById("login-password");
const loginBtn = document.getElementById("login-btn");
const loginErrorMessage = document.getElementById("login-error-message");

onAuthStateChanged(auth, (user) => {
    console.log(user);
    if(user) {
        loginForm.style.display = "none";
        userProfileView.style.display = "block";
        UIuserEmail.innerHTML = user.email;
    } else {
        //signUpFormView.style.display = "block";
        loginForm.style.display = "block";
        userProfileView.style.display = "none";
    }
    mainView.classList.remove("loading");
});

const signUpButtonPressed = async (e) => {
    e.preventDefault();

    try{
        const userCredential = await createUserWithEmailAndPassword(
            auth,  
            email.value, 
            password.value
        );
        console.log(userCredential);
    } catch (error) {
        console.log(error.code);
        UIErrorMessage.innerHTML = formatErrorMessage(error.code, "signup");
        UIErrorMessage.classList.add("visible");
    }
};

const logOutButtonPressed = async () => {
    try{
        await signOut(auth);
        email.value = "";
        password.value = "";
        loginEmail.value = "";
        loginPassword.value = "";
    } catch(error) {
        console.log(error);
    }
};

const loginButtonPressed = async (e) => {
    e.preventDefault();

    try {
        await signInWithEmailAndPassword(
            auth, 
            loginEmail.value, 
            loginPassword.value
        );
    } catch(error) {
        console.log(error.code);
        console.log(formatErrorMessage(error.code, "login"));
        loginErrorMessage.innerHTML = formatErrorMessage(error.code, "login");
        loginErrorMessage.classList.add("visible");
    }
}

/*onAuthStateChanged(auth, (user) => {
    console.log(user);
    if(user) {
        signUpFormView.style.display = "none";
        userProfileView.style.display = "block";
        UIuserEmail.innerHTML = user.email;
    } else {
        signUpFormView.style.display = "block";
        userProfileView.style.display = "none";
    }
    mainView.classList.remove("loading");
});*/

signUpBtn.addEventListener("click", signUpButtonPressed);
logOutBtn.addEventListener("click", logOutButtonPressed);
loginBtn.addEventListener("click", loginButtonPressed);

const formatErrorMessage = (errorCode, action) => {
    let message = "";
    if (action === "signup") {
        switch (errorCode) {
            case "auth/invalid-email":
            case "auth/missing-email":
                message = "Please enter a valid email.";
                break;
            case "auth/weak-password":
                message = "Password must be at least 6 characters.";
                break;
            case "auth/email-already-in-use":
                message = "Email is already taken.";
                break;
            default:
                message = "Something went wrong.";
                break;
        }
    } else if (action === "login") {
        switch (errorCode) {
            case "auth/invalid-email":
            case "auth/invalid-password":
            case "auth/user-not-found":
                message = "Email or Password is incorrect.";
                break;
            default:
                message = "An error occurred during login.";
                break;
        }
    }
    return message;
};
