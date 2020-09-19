import React from 'react';

// import PropTypes from 'prop-types';

import RestaurantCard from '../RestaurantCard/RestaurantCard';

import './Favorites.scss';

const Favorites = (props) => {
  const cards = (restaurants) => {
    let cardList = 'No Results To Display';
    if (restaurants.length > 0) {
      cardList = restaurants.map((restaurant) => <RestaurantCard key={restaurant.id} restaurant={restaurant} userLocation={props.location} />);
    }
    return cardList;
  };

  return (
    <div className="Results card-columns">
      {cards(props.favorites)}
    </div>
  );
};

// Results.propTypes = {}

export default Favorites;
