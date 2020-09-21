import React from 'react';
// import PropTypes from 'prop-types';

import './FilterButton.scss';

const FilterButton = (props) => (
    <button className={`btn btn-sm m-1 ${props.isActive ? 'btn-success' : 'btn-light'}`} style={props.dim ? { color: 'grey' } : {} } onClick={props.click}>
      {props.children}
    </button>
);

// FilterButton.propTypes = {}

export default FilterButton;
