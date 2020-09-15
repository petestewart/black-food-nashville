import React from 'react';
// import Switch from 'react-switch';

import Switch from '../../UI/Switch/Switch';

// import PropTypes from 'prop-types';

// import './VegOnly.scss';

const VegOnly = (props) => {
  const handleChange = () => {
    props.toggleFilter('vegOnly');
  };

  return (
        <Switch onChange={handleChange} checked={props.status}>
          <span>Vegetarian-friendly</span>
        </Switch>
  );
};

// VegOnly.propTypes = {}

export default VegOnly;
