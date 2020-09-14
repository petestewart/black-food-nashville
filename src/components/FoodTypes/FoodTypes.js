import React, { useState, useEffect } from 'react';
// import PropTypes from 'prop-types';

import FilterButton from '../../UI/FilterButton/FilterButton';

// import './FoodTypes.scss';

const FoodTypes = (props) => {
  const [allActive, setAllActive] = useState(true);

  const checkAllShownStatus = () => {
    const status = props.availableFilters.every((filter) => props.filters[filter] === true);
    setAllActive(status);
  };

  useEffect(checkAllShownStatus, [props]);

  const createFilterButtons = () => {
    const buttons = props.availableFilters.map((filter, index) => {
      let click = () => props.toggleFilter(filter);
      let isActive = props.filters[filter];
      if (allActive) {
        isActive = false;
        click = () => {
          props.setSoloFilter(filter);
        };
      }
      return (<FilterButton click={click} isActive={isActive} key={index}>{filter}</FilterButton>);
    });
    return buttons;
  };

  return (
    <div className="FoodTypes">
      Food Types:<br/>
      <FilterButton isActive={allActive} click={props.resetFilters}>Show All</FilterButton><br/>
      {createFilterButtons()}
    </div>
  );
};

// FoodTypes.propTypes = {}

export default FoodTypes;
