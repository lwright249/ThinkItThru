import {
    getAuth,
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
    signInWithEmailAndPassword,
    sendEmailVerification,
    sendPasswordResetEmail,
    GoogleAuthProvider,
    signInWithPopup
 } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";

 import {
    getFirestore,
    doc,
    setDoc,
    getDoc,
    updateDoc
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

const auth = getAuth();
const db = getFirestore();

const date = new Date();
let currentDay= String(date.getDate()).padStart(2,'0');
let currentMonth= String(date.getMonth()+1).padStart(2,'0');
let currentYear= date.getFullYear();
let currentDate= `${currentMonth}-${currentDay}-${currentYear}`;

const mainView = document.getElementById("main-view");

const emailVerificationView = document.getElementById("email-verification");
const resendEmailBtn = document.getElementById("resend-email-btn");

const name = document.getElementById("name");
const major = document.getElementById("major");
const email = document.getElementById("email");
const password = document.getElementById("password");
const signUpBtn = document.getElementById("signup-btn");
const UIErrorMessage = document.getElementById("error-message");
const signUpFormView = document.getElementById("signup-form");
const haveAnAccountBtn = document.getElementById("have-an-account-btn");

const userProfileView = document.getElementById("user-profile");
const UIuserEmail = document.getElementById("user-email");
const logOutBtn =  document.getElementById("logout-btn");
const updateName = document.getElementById("update-name");
const updateEmail = document.getElementById("update-email");
const updateMajor = document.getElementById("update-major");
const updateBtn = document.getElementById("update-btn");

const resetPasswordForm = document.getElementById("reset-password-form");
const forgotPasswordBtn = document.getElementById("forgot-password-btn");
const resetPasswordBtn = document.getElementById("reset-password-btn");
const resetPasswordEmail = document.getElementById("reset-password-email");
const resetPasswordMessage = document.getElementById("rp-message");

const loginWithGoogleBtn = document.getElementById("login-with-google-btn");
const loginForm = document.getElementById("login-form");
const loginEmail = document.getElementById("login-email");
const loginPassword = document.getElementById("login-password");
const loginBtn = document.getElementById("login-btn");
const loginErrorMessage = document.getElementById("login-error-message");
const needAnAccountBtn = document.getElementById("need-an-account-btn");

onAuthStateChanged(auth, async (user) => {
    console.log(user);
    if(user) {

        if(!user.emailVerified) {
            emailVerificationView.style.display = "block";
            userProfileView.style.display = "none";
        }else if (user.emailVerified) {
            window.location.href="dashboard.html";
        } else {
            userProfileView.style.display = "block";
            UIuserEmail.innerHTML = user.email;
            emailVerificationView.style.display = "none";
            
            try {
                const docRef = doc(db, "users", user.uid);
                const docSnap = await getDoc(docRef);
                console.log(docSnap.data());
                updateName.value = docSnap.data().name;
                updateMajor.value = docSnap.data().major;
                updateEmail.value = docSnap.data().email;

            } catch (error) {
                console.log(error);
            }
        }

        loginForm.style.display = "none";
        signUpFormView.style.display = "none";

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

        await sendEmailVerification(userCredential.user);

        const docRef = doc(db, "users", userCredential.user.uid);
        await setDoc(docRef, {
            name: name.value,
            major: major.value,
            email: email.value,
            exp: 0,
            streak: 0,
            lastLogin: currentDate,
            gameboard: "",
        });

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

        window.location.href="dashboard.html";
    } catch(error) {
        console.log(error.code);
        console.log(formatErrorMessage(error.code, "login"));
        loginErrorMessage.innerHTML = formatErrorMessage(error.code, "login");
        loginErrorMessage.classList.add("visible");
    }
}

const needAnAccountButtonPressed = () => {
    loginForm.style.display = "none";
    signUpFormView.style.display = "block";
}

const haveAnAccountButtonPressed = () => {
    signUpFormView.style.display = "none";
    loginForm.style.display = "block";
}

const resendButtonPressed = async () => {
    await sendEmailVerification(auth.currentUser);
}

const forgotPasswordButtonPressed = () => {
    resetPasswordForm.style.display = "block";
    loginForm.style.display = "none";
}

const resetPasswordButtonPressed = async (e) => {
    e.preventDefault();
    console.log(resetPasswordEmail.value);
    try{
        await sendPasswordResetEmail(auth, resetPasswordEmail.value);
        resetPasswordMessage.innerHTML = `We've sent a link to reset your password to ${resetPasswordEmail.value}`;
        resetPasswordMessage.classList.add("success");
    } catch (error) {
        console.log(error);
        resetPasswordMessage.innerHTML = "Please provide a valid registered email.";
        resetPasswordMessage.classList.add("error");
    }
    resetPasswordMessage.classList.remove("hidden");
}

const loginWithGoogleButtonPressed = async (e) => {
    e.preventDefault();
    const googleProvider = new GoogleAuthProvider();
    
    try {
        await signInWithPopup(auth, googleProvider);

        window.location.href="dashboard.html";
    } catch (error) {
        console.log(error.code);
    }
}

const updateUserProfileButtonPressed = async (e) => {
    e.preventDefault();
    
    try{
        const docRef = doc (db, "users", auth.currentUser.uid);
        await updateDoc(docRef, {
            name: updateName.value,
            major: updateMajor.value,
            email: updateEmail.value
        });
    } catch (error) {
        console.log(error.code);
    }
}

signUpBtn.addEventListener("click", signUpButtonPressed);
logOutBtn.addEventListener("click", logOutButtonPressed);
loginBtn.addEventListener("click", loginButtonPressed);
needAnAccountBtn.addEventListener("click", needAnAccountButtonPressed);
haveAnAccountBtn.addEventListener("click", haveAnAccountButtonPressed);
resendEmailBtn.addEventListener("click", resendButtonPressed);
forgotPasswordBtn.addEventListener("click", forgotPasswordButtonPressed);
resetPasswordBtn.addEventListener("click", resetPasswordButtonPressed);
loginWithGoogleBtn.addEventListener("click", loginWithGoogleButtonPressed);
updateBtn.addEventListener("click", updateUserProfileButtonPressed);

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
