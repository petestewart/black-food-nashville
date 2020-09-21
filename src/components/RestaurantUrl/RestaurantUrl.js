import React from 'react';
// import PropTypes from 'prop-types';

import './RestaurantUrl.scss';

const RestaurantUrl = (props) => (
    <div className="RestaurantUrl">
      {props.url
        ? <a href={props.url} target="_blank" rel="noopener noreferrer">{props.children}</a>
        : <span className="link-disabled">{props.children}</span>
      }
    </div>
);

// RestaurantUrl.propTypes = {}

export default RestaurantUrl;
