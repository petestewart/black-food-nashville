import axios from 'axios';
import apiKeys from '../apiKeys.json';

import utils from '../utils';
// import mapquestData from './mapquestData';
// import yelpData from './yelpData';

const baseUrl = apiKeys.firebaseConfig.databaseURL;

const getAllRestaurants = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/restaurants.json`)
    .then(({ data }) => resolve(utils.convertFirebaseCollection(data)))
    .catch((err) => reject(err));
});

// const getAreaRestaurants = (coords, radius) => new Promise((resolve, reject) => {
//   axios.get(`${baseUrl}/restaurants.json?orderBy="longitude"&startAt="-86.7"&endAt="-86.9"`)
//     .then((res) => {
//       console.warn(res);
//       resolve(res);
//     })
//     .catch((err) => reject(err));
// });

const getSingleRestaurant = (restId) => axios.get(`${baseUrl}/restaurants/${restId}.json`);

const deleteRestaurant = (restId) => axios.delete(`${baseUrl}/restaurants/${restId}.json`);

const createRestaurant = (restaurant) => axios.post(`${baseUrl}/restaurants.json`, restaurant);

const editRestaurant = (restaurant, restId) => axios.put(`${baseUrl}/restaurants/${restId}.json`, restaurant);

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
  getAllRestaurants, getSingleRestaurant, deleteRestaurant, createRestaurant, editRestaurant,
};
