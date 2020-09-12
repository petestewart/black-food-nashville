import React from 'react';
// import PropTypes from 'prop-types';

import './RestaurantCard.scss';

const RestaurantCard = (props) => {
  const { restaurant } = props;
  return (
    <div className = "RestaurantCard">
      {restaurant.name}
      ::
      {restaurant.location.address1}
      ::
      {restaurant.location.zipcode}
    </div>
  );
};

// RestaurantCard.propTypes = {}

export default RestaurantCard;
