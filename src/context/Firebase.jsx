import React, { createContext, useContext, useState, useEffect } from "react";

import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  setDoc,
  addDoc,
  getDocs,
  getDoc,
  collection,
  
  query, where,
} from "firebase/firestore";

const FirebaseContext = createContext(null);

const firebaseConfig = {
  apiKey: process.env.FIREBASEAPIKEY,
  authDomain: process.env.FIREBASEauthDomain,
  projectId: process.env.FIREBASEprojectId,
  storageBucket: process.env.FIREBASEstorageBucket,
  messagingSenderId: process.env.FIREBASEmessagingSenderId,
  appId: process.env.FIREBASEappId,
  measurementId: process.env.FIREBASEmeasurementId,
};

const firbaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firbaseApp);
const googleProvider = new GoogleAuthProvider();
const firebaseDb = getFirestore(firbaseApp);

export const useFirebase = () => useContext(FirebaseContext);

export const FirebaseProvider = (props) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        // console.log("Auth", currentUser);
      } else setUser(null);
    });
  }, []);

  const signupUserWithEmailAndPassword = (email, password) => {
    return createUserWithEmailAndPassword(firebaseAuth, email, password);
  };

  const signInWithEmailAndPasswordFunc = (email, password) => {
    return signInWithEmailAndPassword(firebaseAuth, email, password);
  };

  const signInWithPopupFunc = (email, password) => {
    return signInWithPopup(firebaseAuth, googleProvider);
  };

  const isLoggedIn = user ? true : false;

  const signOutFunc = () => {
    return signOut(firebaseAuth);
  };

  const addDocs = async (name, isbn, price) => {
    console.log(user);

    await setDoc(doc(firebaseDb, "books", name), {
      name,
      isbn,

      price,
      author: user.displayName,
      email: user.email,
      createdAt: new Date(),
      authorId: user.uid,
    });
  };

  const listAllBooks = async () => {
    const snapshot = await getDocs(collection(firebaseDb, "books"));
    return snapshot;
  };

  const fetchBookById = async (bookId) => {
    const docref = doc(firebaseDb, "books", bookId);
    const result = await getDoc(docref);
    return result;
  };

  const addOrder = async (bookId, quantity) => {
    console.log("bookId typeof:", typeof bookId, "value:", bookId);

    const colref = collection(firebaseDb, "books", bookId, "orders");
    const data = {
      quantity: Number(quantity),
      userId: user.uid,
      userEmail: user.email,
      orderDate: new Date(),
      Name: user.displayName,
    };

    const result = await addDoc(
      collection(firebaseDb, "books", bookId, "orders"),
      {
        quantity: quantity,
        userId: user.uid,
        userEmail: user.email,
        orderDate: new Date(),
        Name: user.displayName,
      }
    );
    return result;
  };

  const viewOrder = async ()=>{
    // console.log(user);
    
    const q = query(collection(firebaseDb,"books"), where("authorId", "==" , user.uid));
    const querySnapshot = await getDocs(q);
    const orders = [];

    querySnapshot.forEach(async (doc) => {
      // orders.push(doc.data());
      // console.log(doc);
      
      const colref = collection(firebaseDb, "books", doc._document.data.value.mapValue.fields.name.stringValue, "orders");
      const orderSnapshot = await getDocs(colref);
      // console.log(orderSnapshot);
      
      orderSnapshot.forEach((orderDoc) => {
        // console.log("order",orderDoc.data());
        orders.push(orderDoc.data());
        
      });


    });
    return orders;

  }

  return (
    <FirebaseContext.Provider
      value={{
        signupUserWithEmailAndPassword,
        signInWithEmailAndPasswordFunc,
        signInWithPopupFunc,
        isLoggedIn,
        signOutFunc,
        addDocs,
        listAllBooks,
        fetchBookById,
        addOrder,
        viewOrder,
        user,
      }}
    >
      {props.children}
    </FirebaseContext.Provider>
  );
};
