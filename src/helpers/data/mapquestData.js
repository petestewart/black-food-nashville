import axios from 'axios';
import apiKeys from '../apiKeys.json';

const { baseURL, apiKey } = apiKeys.mapquestConfig;

const getCoordinates = (address) => axios.get(`${baseURL}/address?key=${apiKey}&location=${address}&outFormat=json&thumbMaps=false`);

const getCity = ({ latitude, longitude }) => axios.get(`${baseURL}/reverse?key=${apiKey}&location=${latitude},${longitude}&outFormat=json&thumbMaps=false`);

export default { getCity, getCoordinates };
