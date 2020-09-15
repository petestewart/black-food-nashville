import React from 'react';
// import PropTypes from 'prop-types';

// import './OrderLinks.scss';

const OrderLinks = (props) => {
  const linkItems = () => {
    const links = [];
    const { rest } = props;
    if (rest.doorDash) {
      links.push(<a className="dropdown-item" href={rest.doorDash}>DoorDash</a>);
    }
    if (rest.grubHub) {
      links.push(<a className="dropdown-item" href={rest.grubHub}>GrubHub</a>);
    }
    if (rest.uberEats) {
      links.push(<a className="dropdown-item" href={rest.uberEats}>UberEats</a>);
    }
    if (rest.phone) {
      links.push(<a className="dropdown-item" href={`tel:${rest.phone.replace(/[^\d]/g, '')}`}>Call {rest.phone}</a>);
    }
    return links;
  };

  return (
    <div className="dropdown">
      {/* <i className="fas fa-car-side fa-2x text-muted"></i> */}
      <i className="fas fa-car-side fa-2x text-muted dropdown-toggle" type="button" id={`${props.rest.id}-orderlinks`} data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></i>
      <div className="dropdown-menu" aria-labelledby={`${props.rest.id}-orderlinks`}>
        {linkItems()}
      </div>
    </div>
  );
};

// OrderLinks.propTypes = {}

export default OrderLinks;
