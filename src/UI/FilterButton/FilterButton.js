import React from 'react';
// import PropTypes from 'prop-types';

import './FilterButton.scss';

const FilterButton = (props) => (
    <button className={`btn btn-sm m-1 ${props.isActive ? 'btn-info' : 'btn-light'}`} onClick={props.click}>
      {props.children}
    </button>
);

// FilterButton.propTypes = {}

export default FilterButton;
