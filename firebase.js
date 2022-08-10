import firebase from 'firebase/app';
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/firebase-storage'


const firebaseConfig = {
    apiKey: "AIzaSyBveq4Q0uoWdHgGyVdiZPig8629a5tS8IY",
    authDomain: "school-7ede0.firebaseapp.com",
    projectId: "school-7ede0",
    storageBucket: "school-7ede0.appspot.com",
    messagingSenderId: "621097007853",
    appId: "1:621097007853:web:bb4b81c9ed31a932722ae4",
    measurementId: "G-5TG3WP62XP"
};

const fire = firebase.initializeApp(firebaseConfig)

const db = fire.firestore()
const auth = fire.auth()
const storage = fire.storage();


export { db, auth,storage }
export default firebase