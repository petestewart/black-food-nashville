import React from 'react';
// import PropTypes from 'prop-types';

import YelpSearch from '../YelpSearch/YelpSearch';
import RestaurantForm from '../RestaurantForm/RestaurantForm';

import './SubmitRestaurant.scss';

const SubmitRestaurant = (props) => {
  return (<div className="SubmitRestaurant">
      <h3>Submit A New Restaurant</h3>
      { props.authed
        ? <YelpSearch />
        : 'You must log in to submit a new restaurant'
      }
      {/* <RestaurantForm newRest={true} /> */}
    </div>);
};

// SubmitRestaurant.propTypes = {}

export default SubmitRestaurant;
