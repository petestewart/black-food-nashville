import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';

import fbConnection from '../../helpers/data/connection';

import Console from '../Console/Console';

import authData from '../../helpers/data/authData';

// import './Layout.scss';

fbConnection();

const Layout = (props) => {
  const [authed, setAuthed] = useState(false);
  const [uid, setUid] = useState('');

  const removeListener = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setAuthed(true);
      } else {
        setAuthed(false);
      }
    });
  };

  useEffect(removeListener, []);
  useEffect(() => {
    if (authed) {
      setUid(authData.getUid());
    } else {
      setUid('');
    }
  }, [authed]);

  return (
      <div className="Layout">
        <Console authed={authed} uid={uid}/>
      </div>
  );
};

export default Layout;
