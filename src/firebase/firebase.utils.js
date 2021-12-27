import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'
import 'firebase/compat/auth'

const config = {
  apiKey: "AIzaSyDWAZ79Gqvo2PsEXmLRD7M_b_a9WVE8ijE",
  authDomain: "crwn-clothing-750e5.firebaseapp.com",
  projectId: "crwn-clothing-750e5",
  storageBucket: "crwn-clothing-750e5.appspot.com",
  messagingSenderId: "1051409143394",
  appId: "1:1051409143394:web:081b335ef6ae4f5928633b",
  measurementId: "G-3Q5MVQBFLZ"
};

firebase.initializeApp(config)

export const auth = firebase.auth()
export const firestore = firebase.firestore()

const provider = new firebase.auth.GoogleAuthProvider()
provider.setCustomParameters({ prompt: 'select_account' })
export const signInWithGoogle = () => auth.signInWithPopup(provider)

export default firebase
