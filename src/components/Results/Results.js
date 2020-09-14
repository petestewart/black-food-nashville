import React, { useState, useEffect } from 'react';
// import PropTypes from 'prop-types';

import RestaurantCard from '../RestaurantCard/RestaurantCard';

// import filters from '../../helpers/filters';
// import restaurantData from '../../helpers/data/restaurantData';

import './Results.scss';

const Results = (props) => {
  // const [results, setResults] = useState([]);

  // const updateResults = () => {
  //   restaurantData.getAllRestaurants()
  //     .then((res) => {
  //       setResults(filters.radiusSearch(props.location, props.radius, res));
  //     })
  //     .catch((err) => console.error(err));
  // };

  // useEffect(updateResults, [props]);

  const cards = (restaurants) => {
    let cardList = 'No Results To Display';
    if (restaurants.length > 0) {
      cardList = restaurants.map((restaurant) => <RestaurantCard key={restaurant.id} restaurant={restaurant} userLocation={props.location} />);
    }
    return cardList;
  };

  return (
    <div className="Results card-columns">
      {cards(props.areaRests)}
    </div>
  );
};

// Results.propTypes = {}

export default Results;
