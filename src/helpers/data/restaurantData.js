import axios from 'axios';
import apiKeys from '../apiKeys.json';

import utils from '../utils';
import authData from './authData';
import favoritesData from './favoritesData';
// import mapquestData from './mapquestData';
// import yelpData from './yelpData';

const baseUrl = apiKeys.firebaseConfig.databaseURL;

const getAllRestaurants = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/restaurants.json`)
    .then(({ data }) => resolve(utils.convertFirebaseCollection(data)))
    .catch((err) => reject(err));
});

const getSingleRestaurant = (restId, extraData) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/restaurants/${restId}.json`)
    .then((res) => {
      resolve({ ...res.data, ...extraData, id: restId });
    })
    .catch((err) => reject(err));
});

const deleteRestaurant = (restId) => new Promise((resolve, reject) => {
  axios.delete(`${baseUrl}/restaurants/${restId}.json`)
    .then(() => {
      axios.get(`${baseUrl}/userFavorites.json?orderBy="restId"&equalTo="${restId}"`)
        .then(({ data }) => {
          utils.convertFirebaseCollection(data).forEach((fav) => favoritesData.removeFavorite(fav.id));
          resolve();
        })
        .catch((err) => console.error(err));
    })
    .catch((err) => reject(err));
});

const createRestaurant = (restaurant) => axios.post(`${baseUrl}/restaurants.json`, { ...restaurant, submittedBy: authData.getUid() });

const updateRestaurant = (restaurant, restId) => axios.put(`${baseUrl}/restaurants/${restId}.json`, { ...restaurant, editedBy: authData.getUid() });

const getAllCategories = () => new Promise((resolve, reject) => {
  getAllRestaurants()
    .then((res) => {
      const allRests = utils.convertFirebaseCollection(res);
      const allCategories = [];
      allRests.forEach((rest) => {
        if (rest.categories) {
          rest.categories.forEach((category) => allCategories.push(category));
        }
      });
      resolve([...new Set(allCategories)].sort());
    })
    .catch((err) => reject(err));
});

// const convertYelpRestaurant = (oldRest) => {
// const yelpId = oldRest.yelp.slice(25);
// console.warn('yelpId', yelpId);
// yelpData.getRestaurantInfo(yelpId)
//   .then((res) => {
//     console.warn(res);
//     const categories = res.categories.map((cat) => cat.title);
//     const newRest = {
//       name: oldRest.name,
//       photo: res.image_url,
//       location: {
//         address1: oldRest.address,
//         address2: res.location.address2,
//         city: res.location.city,
//         zipcode: oldRest.zip,
//       },
//       phone: res.display_phone,
//       latitude: res.coordinates.latitude,
//       longitude: res.coordinates.longitude,
//       hours: res.hours[0].open,
//       categories,
//       vegFriendly: oldRest.veg,
//       rating: res.rating,
//       price: res.price,
//       yelp: res.url,
//       doordash: oldRest.doordash,
//       grubhub: oldRest.grubhub,
//       ubereats: oldRest.ubereats,
//       website: oldRest.website,
//     };
//     console.warn(newRest);
//     createRestaurant(newRest);
//     deleteRestaurant(oldRest.id);
//   })
//   .catch((err) => console.error(err));
// };

// const convertNonYelpRestaurant = (oldRest) => {
// const address = `${oldRest.address} ${oldRest.zip}`;
// mapquestData.getCoordinates(address)
//   .then((mq) => {
//     console.warn(mq);
//     const newRest = {
//       name: oldRest.name,
//       photo: '',
//       location: {
//         address1: oldRest.address,
//         address2: '',
//         city: mq.name.city,
//         zipcode: oldRest.zip,
//       },
//       phone: '',
//       latitude: mq.latitude,
//       longitude: mq.longitude,
//       hours: [],
//       categories: oldRest.type,
//       vegFriendly: oldRest.veg,
//       rating: '',
//       price: '',
//       yelp: oldRest.yelp,
//       doordash: oldRest.doordash,
//       grubhub: oldRest.grubhub,
//       ubereats: oldRest.ubereats,
//       website: oldRest.website,
//     };
//     console.warn(newRest);
//     createRestaurant(newRest);
//     deleteRestaurant(oldRest.id);
//   })
//   .catch((err) => console.error(err));
// };

export default {
  getAllRestaurants, getSingleRestaurant, deleteRestaurant, createRestaurant, updateRestaurant, getAllCategories,
};
