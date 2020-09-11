import React from 'react';
// import PropTypes from 'prop-types';

import SearchBar from '../../UI/SearchBar/SearchBar';

// import mapquestData from '../../helpers/data/mapquestData';

import './Navbar.scss';

const Navbar = (props) => {
  const submitNewLocation = (newLocation) => {
    console.warn(newLocation);
  };

  return (
    <div className="Navbar">
      <h2 className="Logo">OneBite</h2>
      <SearchBar placeholder={props.placeholder} click={submitNewLocation}/>
      <div className="userMenu">
        <i className="fas fa-user-circle fa-2x ml-auto mr-2"></i>
      </div>
    </div>
  );
};

// Navbar.propTypes = {}

export default Navbar;
