import React, { useState } from 'react';
// import PropTypes from 'prop-types';

import Navbar from '../Navbar/Navbar';
import Filters from '../Filters/Filters';
import Results from '../Results/Results';

import './Layout.scss';

const Layout = (props) => {
  // const [location, setLocation] = useState();

  function success(pos) {
    const crd = pos.coords;
    console.log('Your current position is:');
    console.log(`Latitude : ${crd.latitude}`);
    console.log(`Longitude: ${crd.longitude}`);
    console.log(`More or less ${crd.accuracy} meters.`);
  }

  const location = navigator.geolocation.getCurrentPosition(success);

  console.warn(location);

  return (
    <React.Fragment>
      <Navbar/>
      <div className="content">
        <Filters/>
        <Results/>
      </div>

    </React.Fragment>
  );
};

// Layout.propTypes = {}

export default Layout;
