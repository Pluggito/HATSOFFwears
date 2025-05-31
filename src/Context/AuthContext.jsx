import React, { createContext, useContext, useEffect, useState } from "react";
import { app } from "../Backend/firebase"; // Make sure you have initialized firebase in this file
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const auth = getAuth(app);

  const signup = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const login = async (email, password) => {
    await signInWithEmailAndPassword(auth, email, password);
     localStorage.setItem('lastLogin', Date.now().toString());
  };

  const logout = () => {
    return signOut(auth);
  };

useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, async (user) => {
    const lastLogin = parseInt(localStorage.getItem("lastLogin"), 10);
    const now = Date.now();
    //How long the session will last
    const oneDay = 24 * 60 * 60 * 1000;

    if (user && lastLogin && now - lastLogin > oneDay) {
      // Session expired
      await signOut(auth);
      localStorage.removeItem("lastLogin");
      setCurrentUser(null);
    } else {
      setCurrentUser(user);
    }

    setLoading(false);
  });
    return unsubscribe;
  }, [auth]);

  const value = {
    currentUser,
    signup,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
