import React from 'react';
// import PropTypes from 'prop-types';

import './FavoriteSwitch.scss';

const FavoriteSwitch = (props) => (
    <div className="FavoriteSwitch" onClick={() => { props.toggleFavorite(props.restId); }}>
      { props.isFavorite
        ? <i className="fas fa-heart fa-2x cardlink text-dark"></i>
        : <i className="far fa-heart fa-2x cardlink text-muted"></i>
      }
    </div>
);

// FavoriteSwitch.propTypes = {}

export default FavoriteSwitch;
