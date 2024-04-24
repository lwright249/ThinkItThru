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
    if(action === "signup") {
        if(errorCode === "auth/invalid-email" || errorCode === "auth/missing-email") {
            message = "Please enter a valid email."
        } else if (errorCode === "auth/missing-password" || errorCode === "auth/weak-password") {
            message = "Password must be at least 6 characters.";
        } else if (errorCode === "auth/email-already-in-use") {
            message = "Email is already taken.";
        } else {
            message = "Something went wrong.";
        }
        return message;
    } else if (action === "login") {
        if (errorCode === "auth/invalid-email" || 
        errorCode === "auth/invalid-password"
    ){
        message = "Email or Password is incorrect.";
    } else if (errorCode === "auth/user-not-found"){
        message = "Our system was unable to verify your email or password";
    };
    };
    };