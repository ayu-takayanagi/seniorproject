
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB1VeyILKICJpawAUefjXGk7z49XjPzn2w",
  authDomain: "senior-project-a785c.firebaseapp.com",
  projectId: "senior-project-a785c",
  storageBucket: "senior-project-a785c.appspot.com",
  messagingSenderId: "681443969740",
  appId: "1:681443969740:web:4363cc65a5db622356d069",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

const db = getFirestore(); 
export default db;

export const auth =  getAuth();