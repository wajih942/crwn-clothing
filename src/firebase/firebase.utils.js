import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

const config = {
    apiKey: "AIzaSyBJ7vCyA2DfLxwPFYbTzsvxGxymRFiR4hs",
    authDomain: "crwn-db-3afbd.firebaseapp.com",
    projectId: "crwn-db-3afbd",
    storageBucket: "crwn-db-3afbd.appspot.com",
    messagingSenderId: "275765487894",
    appId: "1:275765487894:web:aedb036200e5168100c837"
  };

export const createUserProfileDocument = async (userAuth,additionalData)=>{
  if(!userAuth) return 
  const userRef = firestore.doc(`users/${userAuth.uid}`)
  const snapshot = userRef.get()
  if(!snapshot.exists){
    const {displayName,email} = userAuth;
    const createdAt = new Date()
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    } catch (error) {
      console.log("error creating user",error.message)
    }
  }
  return userRef
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;