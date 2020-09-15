import React from 'react';
// import PropTypes from 'prop-types';

import SearchBar from '../../UI/SearchBar/SearchBar';
import UserMenu from '../UserMenu/UserMenu';
import NumberInput from '../../UI/NumberInput/NumberInput';

import mapquestData from '../../helpers/data/mapquestData';

import './Navbar.scss';

const Navbar = (props) => {
  const submitNewLocation = (newLocation) => {
    mapquestData.getCoordinates(newLocation)
      .then((res) => props.setLocation(res))
      .catch((err) => console.error(err));
  };

  const setRadius = (radius) => {
    props.setRadius(radius);
  };

  return (
    <div className="Navbar">
      <h2 className="Logo">OneBite</h2>
      <div className="location-controls">
      <NumberInput click={setRadius} value={props.radius}/>
      miles within
      <SearchBar placeholder={props.placeholder} click={submitNewLocation}/>
      </div>
      <div className="userMenu">
        {/* <i className="fas fa-user-circle fa-2x ml-auto mr-2"></i> */}
        <UserMenu />
      </div>
    </div>
  );
};

// Navbar.propTypes = {}

export default Navbar;
