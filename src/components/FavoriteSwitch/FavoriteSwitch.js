import React from 'react';
// import PropTypes from 'prop-types';

import './FavoriteSwitch.scss';

const FavoriteSwitch = (props) => {
  const toggleFavorite = () => {
    if (props.isFavorite) {
      props.removeFavorite(props.restId);
    } else {
      props.addFavorite(props.restId);
    }
  };

  return (
    <div className="FavoriteSwitch" onClick={toggleFavorite}>
      { props.isFavorite
        ? <i className="fas fa-heart fa-2x cardlink text-dark"></i>
        : <i className="far fa-heart fa-2x cardlink text-muted"></i>
      }
    </div>
  );
};

// FavoriteSwitch.propTypes = {}

export default FavoriteSwitch;
