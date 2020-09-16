import React from 'react';
// import PropTypes from 'prop-types';

import RestaurantForm from '../RestaurantForm/RestaurantForm';

import './SubmitRestaurant.scss';

const SubmitRestaurant = (props) => {
  return (
    <div className="SubmitRestaurant">
      <h3>Submit A New Restaurant</h3>
      <RestaurantForm newRest={true} />
    </div>
  );
};

// SubmitRestaurant.propTypes = {}

export default SubmitRestaurant;
