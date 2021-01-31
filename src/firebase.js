import firebase from 'firebase/app'
import 'firebase/database'

const firebaseConfig = {
    apiKey: "AIzaSyApuRyufuNzy94Ak4WDgVUFWFe1b3feU0U",
    authDomain: "vuechat-66e19.firebaseapp.com",
    projectId: "vuechat-66e19",
    storageBucket: "vuechat-66e19.appspot.com",
    messagingSenderId: "332681333053",
    appId: "1:332681333053:web:11e31f9f3fa28549dbdd54"
};

firebase.initializeApp(firebaseConfig)

let db = firebase.database()

export default db