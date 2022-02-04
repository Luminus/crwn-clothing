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

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return
  
  const userRef = firestore.doc(`users/${userAuth.uid}`)
  const collectionRef = firestore.collection('users')

  const snapShot = await userRef.get()
  const collectionSnapshot = await collectionRef.get()
  console.log({ collection: collectionSnapshot.docs.map(doc => doc.data()) });

  if (!snapShot.exists) {
    const { displayName, email } = userAuth
    const createdAt = new Date()

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    } catch (error) {
      console.log('error creating user', error.message)
    }
  }

  return userRef
}

firebase.initializeApp(config)

export const auth = firebase.auth()
export const firestore = firebase.firestore()

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
  const collectionRef = firestore.collection(collectionKey)
  console.log(collectionRef)

  const batch = firestore.batch()
  objectsToAdd.forEach(object => {
    const newDocRef = collectionRef.doc()
    batch.set(newDocRef, object)
  })

  return await batch.commit()
}

export const convertCollectionsSnapshotToMap = (collections) => {
  const transformedCollection = collections.docs.map(doc => {
    const { title, items } = doc.data()

    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items
    }
  })

  return transformedCollection.reduce((accumulator, collection) => {
    accumulator[collection.title.toLowerCase()] = collection
    return accumulator
  }, {})
}

const provider = new firebase.auth.GoogleAuthProvider()
provider.setCustomParameters({ prompt: 'select_account' })
export const signInWithGoogle = () => auth.signInWithPopup(provider)

export default firebase
