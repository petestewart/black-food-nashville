import React, { useState, useEffect } from 'react';
// import PropTypes from 'prop-types';

import Navbar from '../Navbar/Navbar';
import Filters from '../Filters/Filters';
import Results from '../Results/Results';

import filterActions from '../../helpers/filterActions';
import restaurantData from '../../helpers/data/restaurantData';
import mapquestData from '../../helpers/data/mapquestData';
import userData from '../../helpers/data/userData';

import './Console.scss';

const Console = (props) => {
  const [location, setLocation] = useState({ latitude: 0, longitude: 0, name: '' });
  const [radius, setRadius] = useState(5);
  const [areaRests, setAreaRests] = useState([]);
  const [deliveryOnly, setDeliveryOnly] = useState(false);
  const [openNow, setOpenNow] = useState(false);
  const [vegOnly, setVegOnly] = useState(false);
  const [foodFilters, setFoodFilters] = useState({});
  const [user, setUser] = useState({});

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

  const getUserInfo = () => {
    if (props.uid) {
      userData.getUser(props.uid)
        .then(({ data }) => {
          console.warn('getUserInfo recieved', data);
          if (!data.name) {
            userData.createNewUser(props.uid)
              .then((res) => setUser(res))
              .catch((err) => console.error(err));
          } else {
            setUser(data);
          }
        })
        .catch((err) => console.error('problem getting user', err));
    }
  };

  const toggleFilter = (filter) => {
    switch (filter) {
      case 'openNow':
        setOpenNow(!openNow);
        break;
      case 'deliveryOnly':
        setDeliveryOnly(!deliveryOnly);
        break;
      case 'vegOnly':
        setVegOnly(!vegOnly);
        break;
      default: {
        const updatedFilters = { ...foodFilters };
        updatedFilters[filter] = !foodFilters[filter];
        setFoodFilters(updatedFilters); }
    }
  };

  useEffect(getUserLocation, []);
  useEffect(updateAreaRests, [location, radius]);
  useEffect(getUserInfo, [props.authed, props.uid]);

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
      <Navbar placeholder={displayLocation()} setLocation={setLocation} setRadius={setRadius} radius={radius} authed={props.authed}/>
      <div className="content">
        <Filters foodFilters={foodFilters} openNow={openNow} vegOnly={vegOnly} deliveryOnly={deliveryOnly} setFoodFilters={setFoodFilters} areaRests={areaRests} toggleFilter={toggleFilter}/>
        <Results foodFilters={foodFilters} openNow={openNow} vegOnly={vegOnly} deliveryOnly={deliveryOnly} location={location} areaRests={areaRests} />
      </div>

    </React.Fragment>
  );
};

// Console.propTypes = {}

export default Console;
