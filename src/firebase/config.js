import * as firebase from 'firebase';
import '@firebase/auth';
import '@firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCVpVweIZl_ETfEcxREN_sowbVMS-Rc5kI',
  authDomain: 'healthmobileapp-51ab1.firebaseapp.com',
  databaseURL: 'https://healthmobileapp-51ab1.firebaseio.com',
  projectId: 'healthmobileapp-51ab1',
  storageBucket: 'healthmobileapp-51ab1.appspot.com',
  messagingSenderId: '344972949556',
  appId: '1:344972949556:android:d5c5d4c8f3e8f9eaf8f261',
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase };