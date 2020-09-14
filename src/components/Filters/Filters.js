import React, { useState, useEffect } from 'react';
// import PropTypes from 'prop-types';

import './Filters.scss';

import FoodTypes from '../FoodTypes/FoodTypes';

const Filters = (props) => {
  const [availableFilters, setAvailableFilters] = useState([]);

  const updateAvailableFilters = () => {
    const allFilters = [];
    props.areaRests.forEach((rest) => rest.categories.forEach((category) => allFilters.push(category)));
    setAvailableFilters([...new Set(allFilters)].sort());
  };

  const addNewFilters = () => {
    const updatedFilters = { ...props.filters };
    const currentFilters = Object.keys(props.filters);
    availableFilters.forEach((filter) => {
      if (!currentFilters.includes(filter)) {
        updatedFilters[filter] = true;
      }
    });
    props.setFilters(updatedFilters);
  };

  useEffect(updateAvailableFilters, [props.areaRests]);

  useEffect(addNewFilters, [availableFilters]);

  return (
    <div className="Filters">
      <FoodTypes filters={props.filters} availableFilters={availableFilters} toggleFilter={props.toggleFilter}/>
    </div>
  );
};

// Filters.propTypes = {}

export default Filters;
