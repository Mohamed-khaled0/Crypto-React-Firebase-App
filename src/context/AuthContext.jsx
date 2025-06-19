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
  
    const signUp = async (email, password) => {
      let userCredential = null;
      
      try {
        // First create the user account
        userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        
        // Then create the user document in Firestore
        try {
          await setDoc(doc(db, 'users', user.uid), {
            email: email,
            watchList: [],
            createdAt: new Date().toISOString(),
          });
        } catch (firestoreError) {
          console.warn('Firestore document creation failed, but user account was created:', firestoreError);
          // Don't throw the error - user account is still created successfully
          // The document can be created later when needed
        }
        
        return userCredential;
      } catch (error) {
        // If user creation failed, throw the error
        if (!userCredential) {
          throw error;
        }
        // If user was created but something else failed, still return success
        return userCredential;
      }
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
  