import React from 'react';
// import Switch from 'react-switch';

import Switch from '../../UI/Switch/Switch';

// import PropTypes from 'prop-types';

// import './DeliveryOnly.scss';

const DeliveryOnly = (props) => {
  const handleChange = () => {
    props.toggleFilter('deliveryOnly');
  };

  return (
        <Switch onChange={handleChange} checked={props.status}>
          <span>Delivery Available</span>
        </Switch>
  );
};

// DeliveryOnly.propTypes = {}

export default DeliveryOnly;
