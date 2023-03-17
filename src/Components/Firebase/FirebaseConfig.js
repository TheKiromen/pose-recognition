// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAmlrmqq_aTN-_wtV5ytWvHYkGvKt-ulBI",
    authDomain: "posenet-2f456.firebaseapp.com",
    projectId: "posenet-2f456",
    storageBucket: "posenet-2f456.appspot.com",
    messagingSenderId: "290017661717",
    appId: "1:290017661717:web:71155132be35791d2ccf1c",
    measurementId: "G-F91D5WRW7G"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
