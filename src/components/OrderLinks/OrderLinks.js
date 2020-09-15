import React from 'react';
// import PropTypes from 'prop-types';

import Dropdown from '../../UI/Dropdown/Dropdown';

// import './OrderLinks.scss';

const OrderLinks = (props) => {
  const links = () => {
    const items = [];
    const { rest } = props;
    if (rest.doordash) {
      items.push({ name: 'DoorDash', link: rest.doordash, external: true });
    }
    if (rest.grubhub) {
      items.push({ name: 'GrubHub', link: rest.grubhub, external: true });
    }
    if (rest.ubereats) {
      items.push({ name: 'UberEats', link: rest.ubereats, external: true });
    }
    if (rest.phone) {
      items.push({ name: `Call ${rest.phone}`, link: `tel:${rest.phone.replace(/[^\d]/g, '')}` });
    }
    return items;
  };

  return (
    <Dropdown links={links()}>{props.children}</Dropdown>
  );
};

// OrderLinks.propTypes = {}

export default OrderLinks;
