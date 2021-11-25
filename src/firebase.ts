import { initializeApp } from 'firebase/app'

const firebaseConfig = {
    apiKey: "AIzaSyDKLTCjJnE3YkP0l_YxaFdUbj4MNnhYTb4",
    authDomain: "multichat-551c1.firebaseapp.com",
    databaseURL: "https://multichat-551c1-default-rtdb.firebaseio.com",
    projectId: "multichat-551c1",
    storageBucket: "multichat-551c1.appspot.com",
    messagingSenderId: "838695630643",
    appId: "1:838695630643:web:e019fea0e8fd460ca9f046",
    measurementId: "G-D921840W9V"
};

const firebaseApp = initializeApp(firebaseConfig)

export { firebaseApp }