import React, { useState, useEffect } from 'react';
// import PropTypes from 'prop-types';

import './Filters.scss';

import OpenNow from '../OpenNow/OpenNow';
import DeliveryOnly from '../DeliveryOnly/DeliveryOnly';
import VegOnly from '../VegOnly/VegOnly';
import FoodTypes from '../FoodTypes/FoodTypes';

const Filters = (props) => {
  const [availableFilters, setAvailableFilters] = useState([]);
  const [allActive, setAllActive] = useState(true);

  const updateAvailableFilters = () => {
    if (props.areaRests.length === 0) { return; } // LOOP-PREVENTION
    const allFilters = [];
    props.areaRests.forEach((rest) => rest.categories.forEach((category) => allFilters.push(category)));
    setAvailableFilters([...new Set(allFilters)].sort());
  };

  const addNewFilters = () => {
    if (availableFilters.length === 0) { return; } // LOOP-PREVENTION
    const updatedFilters = { ...props.foodFilters };
    const currentFilters = Object.keys(props.foodFilters);
    availableFilters.forEach((filter) => {
      if (!currentFilters.includes(filter)) {
        updatedFilters[filter] = allActive;
      }
    });
    props.setFoodFilters(updatedFilters);
  };

  const resetFilters = () => {
    const updatedFilters = {};
    Object.keys(availableFilters).forEach((i) => {
      updatedFilters[availableFilters[i]] = true;
    });
    props.setFoodFilters(updatedFilters);
  };

  const setSoloFilter = (filter) => {
    const soloFilter = {};
    soloFilter[filter] = true;
    props.setFoodFilters(soloFilter);
  };

  useEffect(updateAvailableFilters, [props.areaRests]);

  useEffect(addNewFilters, [availableFilters]);

  // useEffect(() => { if (props.refresh) { props.updateAreaRests(); } }, [props, props.refresh, props.updateAreaRests]); THIS DOESNT SEEM RIGHT

  return (
    <div className="Filters">
      <OpenNow status={props.openNow} toggleFilter={props.toggleFilter} />
      <DeliveryOnly status={props.deliveryOnly} toggleFilter={props.toggleFilter} />
      <VegOnly status={props.vegOnly} toggleFilter={props.toggleFilter} />
      <FoodTypes foodFilters={props.foodFilters} availableFilters={availableFilters} toggleFilter={props.toggleFilter} resetFilters={resetFilters} setSoloFilter={setSoloFilter} setAllActive={setAllActive} allActive={allActive}/>
    </div>
  );
};

// Filters.propTypes = {}

export default Filters;
