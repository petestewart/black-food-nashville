import React, { useState, useEffect } from 'react';
// import PropTypes from 'prop-types';

import './Filters.scss';

const Filters = (props) => {
  const [availableFilters, setAvailableFilters] = useState([]);

  const updateAvailableFilters = () => {
    const allFilters = [];
    props.results.forEach((rest) => rest.categories.forEach((category) => allFilters.push(category)));
    setAvailableFilters([...new Set(allFilters)].sort());
  };

  useEffect(updateAvailableFilters, [props.results]);

  const createFilterButtons = () => {
    const buttons = availableFilters.map((filter) => <button className="m-1">{filter}</button>);
    return buttons;
  };

  return (
    <div className="Filters">
      {createFilterButtons()}
    </div>
  );
};

// Filters.propTypes = {}

export default Filters;
