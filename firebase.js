// ==========================================
// FIREBASE CONFIGURATION
// Campus Lost & Found
// ==========================================
//
// The current website uses localStorage so it can
// run immediately without requiring Firebase.
//
// When Firebase is connected, replace the values
// below with the configuration provided by your
// Firebase project.
//
// Firebase Console:
// Project Settings -> General -> Your apps
// ==========================================


const firebaseConfig = {

    apiKey: "",

    authDomain: "",

    projectId: "",

    storageBucket: "",

    messagingSenderId: "",

    appId: ""

};


// ==========================================
// FIREBASE STATUS
// ==========================================

const firebaseConfigured =
    firebaseConfig.apiKey !== "" &&
    firebaseConfig.projectId !== "";


if (firebaseConfigured) {

    console.log(
        "Firebase configuration detected."
    );

} else {

    console.log(
        "Firebase is not configured. Using local browser storage."
    );

}


// ==========================================
// FUTURE FIREBASE SETUP
// ==========================================
//
// Once Firebase is enabled, this file can be used
// to initialize:
//
// 1. Firebase App
// 2. Cloud Firestore
// 3. Firebase Storage
// 4. Firebase Authentication
//
// Until then, script.js stores reports in
// localStorage so the website remains functional.
// ==========================================