import axios from 'axios';
import apiKeys from '../apiKeys.json';

import authData from './authData';

const baseUrl = apiKeys.firebaseConfig.databaseURL;

const getUser = (uid) => axios.get(`${baseUrl}/users.json?orderBy="uid"&equalTo="${uid}"`);

const createNewUser = (uid) => new Promise((resolve, reject) => {
  const authedUser = authData.getAuthInfo(uid);
  const newUser = {
    uid: authedUser.uid,
    name: authedUser.displayName,
    profilePic: authedUser.photoURL,
    email: authedUser.email,
    location: {},
    preferences: {
      foodTypes: [],
      deliveryOnly: false,
      vegOnly: false,
    },
  };
  axios.post(`${baseUrl}/users.json`, newUser)
    .then(() => resolve(newUser))
    .catch((err) => reject(err));
});

export default {
  getUser, createNewUser,
};
