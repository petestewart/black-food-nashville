import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router';

// import PropTypes from 'prop-types';

import restaurantData from '../../helpers/data/restaurantData';
import authData from '../../helpers/data/authData';

import './RestaurantForm.scss';

const RestaurantForm = (props) => {
  const [restaurant, setRestaurant] = useState({
    categories: [],
    doordash: '',
    grubhub: '',
    hours: [],
    latitude: 0,
    location: {
      address1: '',
      address2: '',
      city: '',
      zipcode: '',
    },
    longitude: 0,
    name: '',
    phone: '',
    photo: '',
    price: '',
    rating: null,
    ubereats: '',
    vegFriendly: false,
    website: '',
    yelp: '',
  });

  useEffect(() => {
    // warning below about adding restaurant to the dependency array, but that isn't what we want (?)
    if (props.location.restaurantInfo) {
      const uid = authData.getUid();
      setRestaurant({ ...restaurant, ...props.location.restaurantInfo, submittedBy: uid });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const inputHandler = (e) => {
    e.preventDefault();
    const updatedRest = { ...restaurant };
    const key = e.target.id;
    if (key.substring(0, 4) === 'LOC_') {
      updatedRest.location[key.substring(4)] = e.target.value;
    } else if (key === 'categories') {
      updatedRest.categories[0] = e.target.value;
    } else {
      updatedRest[key] = e.target.value;
    }
    setRestaurant(updatedRest);
  };

  const vegInputHandler = (e) => {
    const updatedRest = { ...restaurant };
    updatedRest.vegFriendly = e.target.checked;
    setRestaurant(updatedRest);
  };

  const submitRest = (e) => {
    e.preventDefault();
    console.warn('submitRest called to create', restaurant);
    restaurantData.createRestaurant(restaurant)
      .then((res) => console.warn(res))
      .catch((err) => console.error(err));
  };

  return (
    <div className="restaurant-form">
    <form className="col-6">
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          className="form-control"
          id="name"
          value={restaurant.name}
          onChange={inputHandler}
          />
      </div>
      <div className="form-group">
        <label htmlFor="categories">Category</label>
        <input
          type="text"
          className="form-control"
          id="categories"
          value={restaurant.categories}
          onChange={inputHandler}
          />
      </div>
      <div className="form-group">
        <label htmlFor="LOC_address1">Street Address</label>
        <input
          type="text"
          className="form-control"
          id="LOC_address1"
          value={restaurant.location.address1}
          onChange={inputHandler}
          />
      </div>
      <div className="form-group">
        <label htmlFor="LOC_address2">Suite Number</label>
        <input
          type="text"
          className="form-control"
          id="LOC_address2"
          value={restaurant.location.address2}
          onChange={inputHandler}
          />
      </div>
      <div className="form-group">
        <label htmlFor="LOC_city">City</label>
        <input
          type="text"
          className="form-control"
          id="LOC_city"
          value={restaurant.location.city}
          onChange={inputHandler}
          />
      </div>
      <div className="form-group">
        <label htmlFor="LOC_zipcode">Zip Code</label>
        <input
          type="text"
          className="form-control"
          id="LOC_zipcode"
          value={restaurant.location.zipcode}
          onChange={inputHandler}
          />
      </div>
      <div className="form-group">
        <label htmlFor="phone">Phone Number</label>
        <input
          type="text"
          className="form-control"
          id="phone"
          value={restaurant.phone}
          onChange={inputHandler}
          />
      </div>
      <div className="form-group">
        <label htmlFor="photo">Photo URL</label>
        <input
          type="url"
          className="form-control"
          id="photo"
          value={restaurant.photo}
          onChange={inputHandler}
          />
      </div>
      <div className="form-group">
        <label htmlFor="doordash">DoorDash URL</label>
        <input
          type="url"
          className="form-control"
          id="doordash"
          value={restaurant.doordash}
          onChange={inputHandler}
          />
      </div>
      <div className="form-group">
        <label htmlFor="grubhub">GrubHub URL</label>
        <input
          type="url"
          className="form-control"
          id="grubhub"
          value={restaurant.grubhub}
          onChange={inputHandler}
          />
      </div>
      <div className="form-group">
        <label htmlFor="ubereats">UberEats URL</label>
        <input
          type="url"
          className="form-control"
          id="ubereats"
          value={restaurant.ubereats}
          onChange={inputHandler}
          />
      </div>
      <div className="form-group">
        <label htmlFor="website">Restaurant's Website</label>
        <input
          type="url"
          className="form-control"
          id="website"
          value={restaurant.website}
          onChange={inputHandler}
          />
      </div>
      <div className="form-group">
        <label htmlFor="vegFriendly">Vegetarian-friendly</label>
        <input
          type="checkbox"
          className="form-control"
          id="vegFriendly"
          checked={restaurant.vegFriendly}
          onChange={vegInputHandler}
          />
      </div>
      <button className="btn-btn-info" onClick={submitRest}>Submit</button>
    </form>
  </div>
  );
};

// RestaurantForm.propTypes = {}

export default withRouter(RestaurantForm);
