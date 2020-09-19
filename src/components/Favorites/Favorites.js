import React, { useState, useEffect } from 'react';

// import PropTypes from 'prop-types';

import RestaurantCard from '../RestaurantCard/RestaurantCard';

import './Favorites.scss';
import utils from '../../helpers/utils';

import userData from '../../helpers/data/userData';

const Favorites = (props) => {
  useEffect(() => {
    userData.getFavorites(props.uid)
      .then((res) => setFavorites(res))
      .catch((err) => console.error(err));
  }, [props.uid]);

  const [favorites, setFavorites] = useState([]);

  const cards = (restaurants) => {
    let cardList = 'No Results To Display';
    if (restaurants.length > 0) {
      cardList = restaurants.map((restaurant) => <RestaurantCard key={restaurant.id} restaurant={restaurant} userLocation={props.location} />);
    }
    return cardList;
  };

  return (
    <div className="Results card-columns">
      {cards(favorites)}
    </div>
  );
};

// Results.propTypes = {}

export default Favorites;
