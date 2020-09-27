import axios from 'axios';
import apiKeys from '../apiKeys.json';

import authData from './authData';
import restaurantData from './restaurantData';

import utils from '../utils';

const baseUrl = apiKeys.firebaseConfig.databaseURL;

const getFavorites = (uid) => new Promise((resolve, reject) => {
  console.warn(uid);
  axios.get(`${baseUrl}/userFavorites.json?orderBy="uid"&equalTo="${uid}"`)
    .then(({ data }) => {
      const allPromises = utils.convertFirebaseCollection(data).map((obj) => restaurantData.getSingleRestaurant(obj.restId, { favId: obj.id }));
      Promise.all(allPromises)
        .then((res) => {
          const favorites = res.map((rest) => rest);
          resolve(favorites);
        })
        .catch((err) => reject(err));
    });
});

const addFavorite = (restId) => axios.post(`${baseUrl}/userFavorites.json`, {
  uid: authData.getUid(),
  restId,
});

const removeFavorite = (favId) => axios.delete(`${baseUrl}/userFavorites/${favId}.json`);

export default {
  getFavorites, addFavorite, removeFavorite,
};
