import axios from 'axios';
import apiKeys from '../apiKeys.json';

const { baseURL, apiKey } = apiKeys.yelpConfig;

const yelpREST = axios.create({
  baseURL,
  headers: {
    Authorization: `Bearer ${apiKey}`,
    'Content-type': 'application/json',
  },
});

// const getRestaurantInfo = (yelpId) => yelpREST(`/businesses/${yelpId}`);

const getRestaurantInfo = (yelpId) => new Promise((resolve, reject) => {
  yelpREST(`/businesses/${yelpId}`)
    .then(({ data }) => {
      resolve(data);
    })
    .catch((err) => reject(err));
});

export default { getRestaurantInfo };
