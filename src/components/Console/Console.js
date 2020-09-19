import React, { useState, useEffect } from 'react';
import {
  BrowserRouter, Redirect, Route, Switch,
} from 'react-router-dom';

// import PropTypes from 'prop-types';

import Navbar from '../Navbar/Navbar';
import Filters from '../Filters/Filters';
import Results from '../Results/Results';
import SubmitRestaurant from '../SubmitRestaurant/SubmitRestaurant';
import EditRestaurant from '../EditRestaurant/EditRestaurant';
import RestaurantForm from '../RestaurantForm/RestaurantForm';
import SplashScreen from '../../UI/SplashScreen/SplashScreen';
import SingleRestaurant from '../SingleRestaurant/SingleRestaurant';
import Favorites from '../Favorites/Favorites';

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
  const [favorites, setFavorites] = useState([]);

  // const [openForm, setOpenForm] = useState(false);

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
          if (!res) {
            userData.createNewUser(props.uid)
              .then((resp) => setUser(resp))
              .catch((err) => console.error(err));
          } else {
            setUser(res);
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

  const getFavorites = () => {
    userData.getFavorites(props.uid)
      .then((res) => setFavorites(res))
      .catch((err) => console.error(err));
  };

  useEffect(getUserLocation, []);
  useEffect(updateAreaRests, [location.latitude, radius]);
  useEffect(getUserInfo, [props.authed, props.uid]);
  useEffect(getFavorites, [props.uid]);

  const isFavorite = (restId) => favorites.some((rest) => rest.id === restId);

  const addFavorite = (restId) => {
    userData.addFavorite(restId)
      .then(() => getFavorites())
      .catch((err) => console.error(err));
  };

  const removeFavorite = (restId) => {
    const favIndex = favorites.findIndex((fav) => fav.id === restId);
    const { favId } = favorites[favIndex];
    userData.removeFavorite(favId)
      .then(() => getFavorites())
      .catch((err) => console.error(err));
  };

  const displayLocation = () => {
    let placeholder = 'Enter your location';
    if (location.name) {
      const { name } = location;
      placeholder = `${name.city} ${name.state} ${name.zipCode}`;
    }
    return placeholder;
  };

  // ARE WE NOT USING THIS ANYMORE?
  // const openNewRestForm = () => setOpenForm(true);
  // const closeForm = () => setOpenForm(false);

  return (
  <BrowserRouter>
    <React.Fragment>
      <Navbar placeholder={displayLocation()} setLocation={setLocation} setRadius={setRadius} radius={radius} authed={props.authed} user={user}/>
      <div className="content">
        <Switch>
          <Route path="/search">
            {/* this should load if openForm is set to false */}
            <React.Fragment>
              <Filters foodFilters={foodFilters} openNow={openNow} vegOnly={vegOnly} deliveryOnly={deliveryOnly} setFoodFilters={setFoodFilters} areaRests={areaRests} toggleFilter={toggleFilter} updateAreaRests={updateAreaRests}/>
              <Results foodFilters={foodFilters} openNow={openNow} vegOnly={vegOnly} deliveryOnly={deliveryOnly} location={location} areaRests={areaRests} authed={props.authed} favorites={favorites} addFavorite={addFavorite} removeFavorite={removeFavorite}/>
            </React.Fragment>
          </Route>
          <Route path="/business/:restId">
            <SingleRestaurant authed={props.authed} isFavorite={isFavorite} addFavorite={addFavorite} removeFavorite={removeFavorite} />
          </Route>
          <Route path="/edit/:restId">
            <EditRestaurant authed={props.authed} />
          </Route>
          <Route path="/submit">
            {/* this should load if openForm is set to true (newRest prop will eventually change based on new or existing restaurant) */}
            <SubmitRestaurant authed={props.authed}/>
          </Route>
          <Route path="/restaurantform">
            <RestaurantForm updateAreaRests={updateAreaRests}/>
          </Route>
          <Route path="/favorites">
            <Favorites uid={props.uid} location={location} favorites={favorites}/>
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
