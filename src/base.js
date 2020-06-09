import Rebase from 're-base'
import firebase from 'firebase/app'
import 'firebase/database'

const firebaseApp = firebase.initializeApp({
  apiKey: 'AIzaSyA8z0i8KIT8yUTFnZC_9MFcGHCLTKu7X9c',
  authDomain: 'chat-app-1cfc7.firebaseapp.com',
  databaseURL: 'https://chat-app-1cfc7.firebaseio.com'
})

const base = Rebase.createClass(firebase.database())

export { firebaseApp }

export default base
