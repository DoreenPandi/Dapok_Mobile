import * as firebase from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore/lite"

const firebaseConfig = {
    apiKey: "AIzaSyAxSdX8hhx0IjOgRcrxZYnyKPq2Yi3iWfA",
    authDomain: "dapok-75e63.firebaseapp.com",
    databaseURL: "https://dapok-75e63-default-rtdb.firebaseio.com",
    projectId: "dapok-75e63",
    storageBucket: "dapok-75e63.appspot.com",
    messagingSenderId: "845946346250",
    appId: "1:845946346250:web:bc3e68c40fb70b6711f8f3",
    measurementId: "G-Z3LXCD4FGX"
};

const app = firebase.initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore(app)

export { db, auth }


// import firebase from "firebase/compat/app"
// import "firebase/compat/auth"
// import "firebase/compat/firestore"

// const firebaseConfig = {
//     apiKey: "AIzaSyAxSdX8hhx0IjOgRcrxZYnyKPq2Yi3iWfA",
//     authDomain: "dapok-75e63.firebaseapp.com",
//     databaseURL: "https://dapok-75e63-default-rtdb.firebaseio.com",
//     projectId: "dapok-75e63",
//     storageBucket: "dapok-75e63.appspot.com",
//     messagingSenderId: "845946346250",
//     appId: "1:845946346250:web:bc3e68c40fb70b6711f8f3",
//     measurementId: "G-Z3LXCD4FGX"
// };

// if (!firebase.apps.length) {
//     firebase.initializeApp(firebaseConfig)
// }

// export { firebase }