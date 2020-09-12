import axios from 'axios';
import apiKeys from '../apiKeys.json';

const { baseURL, apiKey } = apiKeys.mapquestConfig;

const getCoordinates = (address) => new Promise((resolve, reject) => {
  axios.get(`${baseURL}/address?key=${apiKey}&location=${address}&outFormat=json&thumbMaps=false`)
    .then((res) => {
      const location = {
        latitude: res.data.results[0].locations[0].latLng.lat,
        longitude: res.data.results[0].locations[0].latLng.lng,
        name: {
          city: res.data.results[0].locations[0].adminArea5,
          state: res.data.results[0].locations[0].adminArea3,
          zipCode: res.data.results[0].locations[0].postalCode.substring(0, 5),
        },

      };
      resolve(location);
    })
    .catch((err) => reject(err));
});

const getCity = ({ latitude, longitude }) => new Promise((resolve, reject) => {
  axios.get(`${baseURL}/reverse?key=${apiKey}&location=${latitude},${longitude}&outFormat=json&thumbMaps=false`)
    .then((res) => {
      const name = {
        city: res.data.results[0].locations[0].adminArea5,
        state: res.data.results[0].locations[0].adminArea3,
        zipCode: res.data.results[0].locations[0].postalCode.substring(0, 5),
      };
      resolve(name);
    })
    .catch((err) => reject(err));
});

export default { getCity, getCoordinates };
