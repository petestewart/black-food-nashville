import React from 'react';
// import PropTypes from 'prop-types';

import YelpSearch from '../YelpSearch/YelpSearch';

import './SubmitRestaurant.scss';

const SubmitRestaurant = (props) => {
  return (<div className="SubmitRestaurant">
      <h3>Submit A New Restaurant</h3>
      { props.authed
        ? <YelpSearch />
        : 'You must log in to submit a new restaurant'
      }
    </div>);
};

// SubmitRestaurant.propTypes = {}

export default SubmitRestaurant;
