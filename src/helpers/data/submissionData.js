import axios from 'axios';
import apiKeys from '../apiKeys.json';

import authData from './authData';
import utils from '../utils';

const baseUrl = apiKeys.firebaseConfig.databaseURL;

const submitRestaurant = (restaurant, restaurantId) => new Promise((resolve, reject) => {
  const uid = authData.getUid();
  let restObj = { ...restaurant };
  if (restaurantId) { restObj = { ...restObj, restaurantId, editedBy: uid }; } else { restObj.submittedBy = uid; }
  axios.post(`${baseUrl}/submissions.json`, restObj)
    .then((res) => resolve(res))
    .catch((err) => reject(err));
});

const getSubmissions = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/submissions.json`)
    .then(({ data }) => {
      console.warn(data);
      resolve(utils.convertFirebaseCollection(data));
    })
    .catch((err) => reject(err));
});

const deleteSubmission = (submissionId) => axios.delete(`${baseUrl}/submissions/${submissionId}.json`);

export default {
  submitRestaurant, getSubmissions, deleteSubmission,
};
