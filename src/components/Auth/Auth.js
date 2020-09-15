// import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';

// import './Auth.scss';

const auth = (authed) => {
  // const { authed } = props;

  const loginClickEvent = (e) => {
    e.preventDefault();
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(googleProvider);
  };

  const logoutClickEvent = (e) => {
    e.preventDefault();
    firebase.auth().signOut();
  };

  const authButton = () => {
    if (authed) {
      return { name: 'Sign Out', click: logoutClickEvent };
    }
    return { name: 'Sign In', click: loginClickEvent };
  };

  return authButton();
};

export default { auth };
