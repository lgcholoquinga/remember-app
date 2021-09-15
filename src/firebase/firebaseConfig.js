import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyBlopg07iiSEAQGfNW6Gr1AvyK0LWclB8c',
  authDomain: 'journal-app-1e31d.firebaseapp.com',
  projectId: 'journal-app-1e31d',
  storageBucket: 'journal-app-1e31d.appspot.com',
  messagingSenderId: '1016083059402',
  appId: '1:1016083059402:web:6d274c58c7cb5543c61a33',
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export { db, googleAuthProvider, firebase };
