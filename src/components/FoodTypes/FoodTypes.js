import React, { useEffect } from 'react';
// import PropTypes from 'prop-types';

import FilterButton from '../../UI/FilterButton/FilterButton';

// import './FoodTypes.scss';

const FoodTypes = (props) => {
  const checkAllShownStatus = () => {
    if (Object.keys(props.foodFilters).every((filter) => props.foodFilters[filter] === false)) { props.resetFilters(); }
    const status = props.availableFilters.every((filter) => props.foodFilters[filter] === true);
    props.setAllActive(status);
  };

  useEffect(checkAllShownStatus, [props]);

  const createFilterButtons = () => {
    const buttons = props.availableFilters.map((filter, index) => {
      let click = () => props.toggleFilter(filter);
      let isActive = props.foodFilters[filter];
      if (props.allActive) {
        isActive = false;
        click = () => {
          props.setSoloFilter(filter);
        };
      }
      return (<FilterButton click={click} isActive={isActive} dim={props.allActive} key={index}>{filter}</FilterButton>);
    });
    return buttons;
  };

  return (
    <div className="FoodTypes">
      Food Types:<br/>
      <FilterButton isActive={props.allActive} dim={!props.allActive} click={props.resetFilters}>Show All</FilterButton><br/>
      {createFilterButtons()}
    </div>
  );
};

// FoodTypes.propTypes = {}

export default FoodTypes;
