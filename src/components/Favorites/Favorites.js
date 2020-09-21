import React from 'react';

// import PropTypes from 'prop-types';

import RestaurantCard from '../RestaurantCard/RestaurantCard';

import './Favorites.scss';

const Favorites = (props) => {
  const cards = (restaurants) => {
    let cardList = 'No Results To Display';
    if (restaurants.length > 0) {
      cardList = restaurants.map((restaurant) => <RestaurantCard key={restaurant.id} restaurant={restaurant} userLocation={props.location} isFavorite={props.isFavorite(restaurant.id)} removeFavorite={props.removeFavorite} authed={props.authed} />);
    }
    return cardList;
  };

  return (
    <div className="Favorites">
      <h3 className="text-center mt-2 w-100">Your Favorites</h3>
      <div className="d-flex justify-content-center">
        <div className="Favorites card-columns">
          {cards(props.favorites)}
        </div>
      </div>
    </div>
  );
};

// Results.propTypes = {}

export default Favorites;
