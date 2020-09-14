import React, { useState, useEffect } from 'react';
// import PropTypes from 'prop-types';

import Navbar from '../Navbar/Navbar';
import Filters from '../Filters/Filters';
import Results from '../Results/Results';

import filterActions from '../../helpers/filterActions';
import restaurantData from '../../helpers/data/restaurantData';
import mapquestData from '../../helpers/data/mapquestData';

import './Console.scss';

const Console = (props) => {
  const [location, setLocation] = useState({ latitude: 0, longitude: 0, name: '' });
  const [radius, setRadius] = useState(5);
  const [areaRests, setAreaRests] = useState([]);
  const [filters, setFilters] = useState({ vegOnly: false });

  const updateAreaRests = () => {
    restaurantData.getAllRestaurants()
      .then((res) => {
        setAreaRests(filterActions.radiusSearch(location, radius, res));
      })
      .catch((err) => console.error(err));
  };

  const getUserLocation = () => {
    const success = (res) => {
      const { latitude, longitude } = res.coords;
      mapquestData.getCity({ latitude, longitude })
        .then((name) => setLocation({ latitude, longitude, name }))
        .catch((err) => console.error(err));
    };
    navigator.geolocation.getCurrentPosition(success);
  };

  // const toggleFilter = (filter, status) => {
  //   console.warn(`change ${filter} to ${status}`);
  //   const updatedFilters = [...filters];
  //   if (!status) {
  //     updatedFilters.splice((updatedFilters.indexOf(filter)), 1);
  //   } else if (!filters.includes(filter)) {
  //     updatedFilters.push(filter);
  //   }
  //   if (updatedFilters !== filters) {
  //     setFilters(updatedFilters);
  //   }
  // };

  const toggleFilter = (filter) => {
    const updatedFilters = { ...filters };
    updatedFilters[filter] = !filters[filter];
    setFilters(updatedFilters);
  };

  useEffect(getUserLocation, []);
  useEffect(updateAreaRests, [location, radius]);

  const displayLocation = () => {
    let placeholder = 'Enter your location';
    if (location.name) {
      const { name } = location;
      placeholder = `${name.city} ${name.state} ${name.zipCode}`;
    }
    return placeholder;
  };

  return (
    <React.Fragment>
      <Navbar placeholder={displayLocation()} setLocation={setLocation} setRadius={setRadius} radius={radius}/>
      <div className="content">
        <Filters filters={filters} setFilters={setFilters} areaRests={areaRests} toggleFilter={toggleFilter}/>
        <Results location={location} areaRests={areaRests} />
      </div>

    </React.Fragment>
  );
};

// Console.propTypes = {}

export default Console;
