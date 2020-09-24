import React from 'react';
// import PropTypes from 'prop-types';

import './FilterButton.scss';

const FilterButton = (props) => {

  const btnClass = props.btnClass || 'btn-danger';

  return (
    <button className={`FilterButton btn btn-sm m-1 ${props.isActive ? btnClass : 'btn-light'}`} style={props.dim ? { color: 'grey' } : {} } onClick={props.click}>
      {props.children}
    </button>
)};

// FilterButton.propTypes = {}

export default FilterButton;
