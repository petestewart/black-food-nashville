import React from 'react';
import { NavLink } from 'react-router-dom';

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
      <NavLink tag={NavLink} to="/search"><h2 className="Logo">OneBite</h2></NavLink>
      <div className="location-controls">
      <NumberInput click={setRadius} value={props.radius}/>
      miles within
      <SearchBar placeholder={props.placeholder} click={submitNewLocation}/>
      </div>
      <div className="userMenu">
        <UserMenu user={props.user} authed={props.authed} openNewRestForm={props.openNewRestForm}/>
      </div>
    </div>
  );
};

// Navbar.propTypes = {}

export default Navbar;
