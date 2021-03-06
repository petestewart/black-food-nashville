import axios from 'axios';
import apiKeys from '../apiKeys.json';

import utils from '../utils';

const { baseURL, apiKey } = apiKeys.yelpConfig;

const yelpREST = axios.create({
  baseURL,
  headers: {
    Authorization: `Bearer ${apiKey}`,
    'Content-type': 'application/json',
  },
});

const getRestaurantInfo = (yelpId) => new Promise((resolve, reject) => {
  yelpREST(`/businesses/${yelpId}`)
    .then(({ data }) => {
      resolve(data);
    })
    .catch((err) => reject(err));
});

const searchByName = (restName, area) => new Promise((resolve, reject) => {
  const cleanName = restName.replace(/[^0-9a-zA-Z ]/g, '');
  yelpREST(`/businesses/search?categories=&22food%22&location=${area ? `${area} TN` : '%22Nashville,%20TN%22'}&term=%22${cleanName}%22`)
    .then(({ data }) => {
      resolve(utils.convertYelpSearchResult(data.businesses));
    })
    .catch((err) => reject(err));
});

const insertYelpData = (yelpId) => new Promise((resolve, reject) => {
  getRestaurantInfo(yelpId)
    .then((res) => {
      const categories = res.categories.map((cat) => cat.title);
      let hours = [];
      if (res.hours) hours = res.hours[0].open;
      const newRest = {
        name: res.name,
        photo: res.image_url,
        location: {
          address1: res.location.address1,
          address2: res.location.address2,
          city: res.location.city,
          zipcode: res.location.zip_code,
        },
        phone: res.display_phone,
        latitude: res.coordinates.latitude,
        longitude: res.coordinates.longitude,
        hours,
        categories,
        rating: res.rating,
        price: res.price,
        yelp: res.url,
      };
      if (categories.some((cat) => cat === 'Vegetarian' || cat === 'Vegan')) {
        newRest.vegFriendly = true;
      }
      resolve(newRest);
    })
    .catch((err) => reject(err));
});

export default { getRestaurantInfo, insertYelpData, searchByName };
