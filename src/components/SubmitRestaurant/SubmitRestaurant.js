import React from 'react';
// import PropTypes from 'prop-types';

import YelpSearch from '../YelpSearch/YelpSearch';
import RestaurantForm from '../RestaurantForm/RestaurantForm';

import './SubmitRestaurant.scss';

const SubmitRestaurant = (props) => (
    <div className="SubmitRestaurant">
      <h3>Submit A New Restaurant</h3>
      { props.newRest
        ? <YelpSearch />
        : 'EXISTING RESTAURANT FORM'
      }
      {/* <RestaurantForm newRest={true} /> */}
    </div>
);

// SubmitRestaurant.propTypes = {}

export default SubmitRestaurant;
