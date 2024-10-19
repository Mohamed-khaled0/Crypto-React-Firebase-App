import { createContext, useContext, useState, useEffect } from 'react';
import { auth, db } from '../firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';

import { doc, setDoc } from 'firebase/firestore';


const userContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState({});
  
    const signUp = (email, password) => {
      createUserWithEmailAndPassword(auth, email, password);
      return setDoc(doc(db, 'users', email), {
        watchList: [],
      });
    };
    const signIn = (email, password) => {
      return signInWithEmailAndPassword(auth, email, password);
    };
  
    const logout = () => {
      return signOut(auth);
    };
  
    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
      });
      return () => {
        unsubscribe();
      };
    }, []);
  
    return (
      <userContext.Provider value={{ signUp, signIn, logout, user }}>
        {children}
      </userContext.Provider>
    );
  };
  
  export const UserAuth = () => {
    return useContext(userContext);
  };
  