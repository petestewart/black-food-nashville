import React from 'react';
// import PropTypes from 'prop-types';

import FilterButton from '../../UI/FilterButton/FilterButton';

// import './FoodTypes.scss';

const FoodTypes = (props) => {
  const createFilterButtons = () => {
    const buttons = props.availableFilters.map((filter, index) => (<FilterButton click={() => props.toggleFilter(filter)} isActive={props.filters[filter]} key={index}>{filter}</FilterButton>));
    return buttons;
  };
  return (
    <div className="FoodTypes">
      Food Types:<br/>
      {createFilterButtons()}
    </div>
  );
};

// FoodTypes.propTypes = {}

export default FoodTypes;
