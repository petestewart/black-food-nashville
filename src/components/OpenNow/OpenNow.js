import React from 'react';
// import Switch from 'react-switch';

import Switch from '../../UI/Switch/Switch';

// import PropTypes from 'prop-types';

// import './OpenNow.scss';

const OpenNow = (props) => {
  const handleChange = () => {
    props.toggleFilter('openNow');
  };

  return (
        <Switch onChange={handleChange} checked={props.status}>
          <span>OpenNow</span>
        </Switch>
  );
};

// OpenNow.propTypes = {}

export default OpenNow;
