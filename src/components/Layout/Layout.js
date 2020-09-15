import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';

import fbConnection from '../../helpers/data/connection';

import Console from '../Console/Console';

// import './Layout.scss';

fbConnection();

const Layout = (props) => {
  const [authed, setAuthed] = useState(false);

  const removeListener = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setAuthed(true);
      } else {
        setAuthed(false);
      }
      console.warn('listener removed');
    });
  };

  useEffect(removeListener, []);

  return (
      <div className="Layout">
        <Console authed={authed} />
      </div>
  );
};

export default Layout;
