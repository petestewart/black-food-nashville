import axios from 'axios';
import apiKeys from '../apiKeys.json';

import authData from './authData';

import utils from '../utils';

const baseUrl = apiKeys.firebaseConfig.databaseURL;

const getUser = (uid) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/users.json?orderBy="uid"&equalTo="${uid}"`)
    .then(({ data }) => resolve(utils.convertFirebaseCollection(data)))
    .catch((err) => console.error(err));
});

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

// const getFavorites = (uid) => new Promise((resolve, reject) => {
//   console.warn(uid);
//   axios.get(`${baseUrl}/userFavorites.json?orderBy="uid"&equalTo="${uid}"`)
//     .then(({ data }) => {
//       const allPromises = utils.convertFirebaseCollection(data).map((obj) => restaurantData.getSingleRestaurant(obj.restId, { favId: obj.id }));
//       Promise.all(allPromises)
//         .then((res) => {
//           const favorites = res.map((rest) => rest);
//           resolve(favorites);
//         })
//         .catch((err) => reject(err));
//     });
// });

// const addFavorite = (restId) => axios.post(`${baseUrl}/userFavorites.json`, {
//   uid: authData.getUid(),
//   restId,
// });

// const removeFavorite = (favId) => axios.delete(`${baseUrl}/userFavorites/${favId}.json`);

export default {
  getUser, createNewUser,
};
