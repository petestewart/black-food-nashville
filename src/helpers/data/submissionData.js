import axios from 'axios';
import apiKeys from '../apiKeys.json';

import authData from './authData';

const baseUrl = apiKeys.firebaseConfig.databaseURL;

const submitRestaurant = (restaurant, restaurantId) => new Promise((resolve, reject) => {
  const uid = authData.getUid();
  let restObj = { ...restaurant };
  if (restaurantId) { restObj = { ...restObj, restaurantId, editedBy: uid }; }
  else { restObj.submittedBy = uid; }
  axios.post(`${baseUrl}/sumbissions.json`, restObj)
    .then((res) => resolve(res))
    .catch((err) => reject(err));
});

export default {
  submitRestaurant,
};
