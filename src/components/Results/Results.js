import React, { useState, useEffect } from 'react';

// import PropTypes from 'prop-types';

import RestaurantCard from '../RestaurantCard/RestaurantCard';

import './Results.scss';
import utils from '../../helpers/utils';

const Results = (props) => {
  const [results, setResults] = useState([]);
  const [activeFilters, setActiveFilters] = useState([]);

  const isFavorite = (restId) => props.favorites.some((rest) => rest.id === restId);

  const updateActiveFilters = () => {
    if (props.foodFilters === {}) { return; }
    const updatedFilters = [];
    Object.keys(props.foodFilters).forEach((filter) => {
      if (props.foodFilters[filter]) {
        updatedFilters.push(filter);
      }
    });
    setActiveFilters(updatedFilters);
  };

  useEffect(updateActiveFilters, [props]);

  const applyFilters = () => {
    if (props.areaRests.length > 0) {
      const allRests = [...props.areaRests];
      let filteredRests = allRests.filter((rest) => rest.categories.some((restCat) => activeFilters.includes(restCat)));
      if (props.vegOnly) {
        filteredRests = filteredRests.filter((rest) => rest.vegFriendly === true);
      }
      if (props.deliveryOnly) {
        filteredRests = filteredRests.filter((rest) => rest.doorDash || rest.grubhub || rest.postmates || rest.uberEats);
      }
      if (props.openNow) {
        filteredRests = filteredRests.filter((rest) => utils.checkIfOpen(rest.hours));
      }
      setResults(filteredRests);
    } else { setResults([]); }
  };

  useEffect(applyFilters, [activeFilters], props);

  const cards = (restaurants) => {
    let cardList = 'No Results To Display';
    if (restaurants.length > 0) {
      cardList = restaurants.map((restaurant) => <RestaurantCard key={restaurant.id} restaurant={restaurant} userLocation={props.location} isFavorite={isFavorite(restaurant.id)} addFavorite={props.addFavorite} removeFavorite={props.removeFavorite} authed={props.authed} />);
    }
    return cardList;
  };

  const resultsCount = (restaurants) => {
    let cardList = [];
    if (restaurants.length > 0) {
      cardList = restaurants.map((restaurant, index) => index);
    }
    return cardList.length;
  };

  // const resultsCount = cards(results).length;

  useEffect(() => { props.setResultsCount(resultsCount(results)); }, [props, results]);

  return (
    <div className="Results card-columns">
      {cards(results)}
    </div>
  );
};

// Results.propTypes = {}

export default Results;
