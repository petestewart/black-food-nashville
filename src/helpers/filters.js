import * as geolib from 'geolib';

// const squareSearch = (coords, radius, pool) => {
//   const maxLat = coords.latitude + (radius * 0.0145);
//   const minLat = coords.latitude - (radius * 0.0145);
//   const maxLng = coords.longitude + (radius * 0.0180);
//   const minLng = coords.longitude - (radius * 0.0180);
//   const squareArea = pool.filter((rest) => (rest.latitude >= minLat && rest.longitude <= maxLat) && (rest.longitude >= minLng && rest.longitude <= maxLng));
//   return squareArea;
// };

const radiusSearch = (coords, radius, pool) => {
  const radiusInMeters = radius / 0.00062137;
  const results = pool.filter((rest) => geolib.isPointWithinRadius({ latitude: rest.latitude, longitude: rest.longitude }, coords, radiusInMeters));
  return results;
};

export default {
  radiusSearch,
};
