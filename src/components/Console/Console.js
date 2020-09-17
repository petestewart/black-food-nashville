import React, { useState, useEffect } from 'react';
import {
  BrowserRouter, Redirect, Route, Switch,
} from 'react-router-dom';

// import PropTypes from 'prop-types';

import Navbar from '../Navbar/Navbar';
import Filters from '../Filters/Filters';
import Results from '../Results/Results';
import SubmitRestaurant from '../SubmitRestaurant/SubmitRestaurant';
import RestaurantForm from '../RestaurantForm/RestaurantForm';
import SplashScreen from '../../UI/SplashScreen/SplashScreen';
import SingleRestaurant from '../SingleRestaurant/SingleRestaurant';

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
  const [openForm, setOpenForm] = useState(false);

  // *** URL MANIPULATION:
  // const params = new URLSearchParams(location.search);
  // params.set('search', 2.0);

  // window.history.replaceState({}, '', `${location.pathname}?${params}`);

  const updateAreaRests = () => {
    if (location.latitude === 0) { return; } // LOOP-PREVENTION
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
    if (!props.authed) {
      setUser({});
      return;
    }
    if (props.uid) {
      userData.getUser(props.uid)
        .then(([res]) => {
          if (res.name) {
            setUser(res);
          } else {
            userData.createNewUser(props.uid)
              .then((resp) => setUser(resp))
              .catch((err) => console.error(err));
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
  useEffect(updateAreaRests, [location.latitude, radius]); // LOOP-PREVENTION (was location)
  useEffect(getUserInfo, [props.authed, props.uid]);

  const displayLocation = () => {
    let placeholder = 'Enter your location';
    if (location.name) {
      const { name } = location;
      placeholder = `${name.city} ${name.state} ${name.zipCode}`;
    }
    return placeholder;
  };

  const openNewRestForm = () => setOpenForm(true);
  const closeForm = () => setOpenForm(false);

  return (
  <BrowserRouter>
    <React.Fragment>
      <Navbar placeholder={displayLocation()} setLocation={setLocation} setRadius={setRadius} radius={radius} authed={props.authed} user={user} openNewRestForm={openNewRestForm}/>
      <div className="content">
        <Switch>
          <Route path="/search">
            {/* this should load if openForm is set to false */}
            <React.Fragment>
              <Filters foodFilters={foodFilters} openNow={openNow} vegOnly={vegOnly} deliveryOnly={deliveryOnly} setFoodFilters={setFoodFilters} areaRests={areaRests} toggleFilter={toggleFilter}/>
              <Results foodFilters={foodFilters} openNow={openNow} vegOnly={vegOnly} deliveryOnly={deliveryOnly} location={location} areaRests={areaRests} authed={props.authed}/>
            </React.Fragment>
          </Route>
          <Route path="/business/:restId">
            <SingleRestaurant authed={props.authed} />
          </Route>
          <Route path="/submit">
            {/* this should load if openForm is set to true (newRest prop will eventually change based on new or existing restaurant) */}
            <SubmitRestaurant newRest={true}/>
          </Route>
          <Route path="/restaurantform">
            <RestaurantForm />
          </Route>
          <Route path="/splash">
            <SplashScreen />
          </Route>
          <Redirect from="*" to="/search" />
        </Switch>
      </div>
    </React.Fragment>
  </BrowserRouter>
  );
};

// Console.propTypes = {}

export default Console;
