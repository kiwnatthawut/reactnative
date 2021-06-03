import * as firebase from 'firebase';
import firestore from 'firebase/firestore'



const firebaseConfig = {
  apiKey: "AIzaSyCJDHzw4g7d81kWbyJCQpCWLvsSJeqUYCc",
  authDomain: "ever-medical-tech-test.firebaseapp.com",
  projectId: "ever-medical-tech-test",
  storageBucket: "ever-medical-tech-test.appspot.com",
  messagingSenderId: "988103811199",
  appId: "1:988103811199:web:7ad325b12cfe81d50c1f4a",
  measurementId: "G-SDENG79F6W"
};

  firebase.initializeApp(firebaseConfig);
  firebase.firestore();

  export default firebase;