const radiusSearch = (coords, radius, pool) => {
  const maxLat = coords.latitude + (radius * 0.0145);
  const minLat = coords.latitude - (radius * 0.0145);
  const maxLng = coords.longitude + (radius * 0.0180);
  const minLng = coords.longitude - (radius * 0.0180);
  const squareArea = pool.filter((rest) => (rest.latitude >= minLat && rest.longitude <= maxLat) && (rest.longitude >= minLng && rest.longitude <= maxLng));
  return squareArea;
};

export default {
  radiusSearch,
};
