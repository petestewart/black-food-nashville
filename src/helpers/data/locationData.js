console.warn(location);

const getCurrentLocation = () => {
  const success = (res) => {
    const crd = res.coords;
    console.warn('finished calculating');
    // console.log('Your current position is:');
    // console.log(`Latitude : ${crd.latitude}`);
    // console.log(`Longitude: ${crd.longitude}`);
    // console.log(`More or less ${crd.accuracy} meters.`);
    
  };

  const res = navigator.geolocation.getCurrentPosition(success);
};
