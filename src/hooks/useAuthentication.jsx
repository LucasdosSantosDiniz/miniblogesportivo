import { db } from "../firebase/config";
import {
  getAuth,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { useEffect, useState } from "react";

export const useAuthentication = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [cancelled, setCancelled] = useState(false);

  const auth = getAuth();

  function checkIfIsCancelled() {
    if (cancelled) {
      return;
    }
  }

  // register
  const createUser = async (data) => {
    checkIfIsCancelled();
    setLoading(true);
    setError(null);

    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password,
      );

      await updateProfile(user, { displayName: data.displayName });
      setLoading(false);
      return user;
    } catch (error) {
      console.log(error.code);
      console.log(typeof error.message);

      let systemErrorMensage;

      if (error.code === "auth/weak-password") {
        systemErrorMensage = " A senha precisa conter pelo menos 6 caracteres.";
      } else if (error.code === "auth/email-already-in-use") {
        systemErrorMensage = " E-mail ja cadstrado";
      } else {
        systemErrorMensage = " Ocorreu um erro! Tente novamente mais tarde.";
      }
      setLoading(false);
      setError(systemErrorMensage);
    }
  };

  //logout-sign out
  const logout = () => {
    checkIfIsCancelled();
    signOut(auth);
  };

  //login sign in

  const login = async (data) => {
    checkIfIsCancelled();

    setLoading(true);
    setError(null);

    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);

      setLoading(false);
    } catch (error) {
      let systemErrorMensage;

      if (error.code === "auth/invalid-credential") {
        systemErrorMensage = "E-mail ou senha inválidos.";
      } else {
        systemErrorMensage = "Ocorreu um erro! Tente novamente mais tarde.";
      }

      setLoading(false);
      setError(systemErrorMensage);
    }
  };

  useEffect(() => {
    return () => setCancelled(true);
  }, []);

  return { auth, error, createUser, loading, logout, login };
};
