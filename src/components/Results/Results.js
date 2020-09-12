import React from 'react';
// import PropTypes from 'prop-types';

import RestaurantCard from '../RestaurantCard/RestaurantCard';

import './Results.scss';

const Results = (props) => {
  const cards = (restaurants) => {
    let cardList = 'No Results To Display';
    if (restaurants) {
      cardList = restaurants.map((restaurant) => <RestaurantCard key={restaurant.id} restaurant={restaurant} />);
    }
    return cardList;
  };

  return (
    <div className="Results">
      <h2>RESULTS:</h2>
      {cards(props.results)}
    </div>
  );
};

// Results.propTypes = {}

export default Results;
