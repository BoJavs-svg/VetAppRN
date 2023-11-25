//firebase.js
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { decode as atob } from 'base-64';

global.atob = atob;

const firebaseConfig = {
apiKey: "AIzaSyAPnfcCw4n42dLwOkmCCEo6gtV50En6lYk",
authDomain: "vetapprn-cf246.firebaseapp.com",
projectId: "vetapprn-cf246",
storageBucket: "vetapprn-cf246.appspot.com",
messagingSenderId: "222199868190",
appId: "1:222199868190:web:9b87b4106fef320eb0b70f"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig); 
}
firebase.firestore().settings({ experimentalForceLongPolling: true });


export default firebase;