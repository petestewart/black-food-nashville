import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

// import PropTypes from 'prop-types';

import SearchBar from '../../UI/SearchBar/SearchBar';
import UserMenu from '../UserMenu/UserMenu';
import NumberInput from '../../UI/NumberInput/NumberInput';

import mapquestData from '../../helpers/data/mapquestData';

import './Navbar.scss';

const Navbar = (props) => {
  const [showSearchBar, setShowSearchBar] = useState(true);

  const { pathname } = useLocation();

  useEffect(() => {
    setShowSearchBar(pathname === '/search');
  }, [pathname]);

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
      <div className="logo">
        <NavLink tag={NavLink} to="/search">
          <h2 id="logo"><i className="fas fa-utensils DesktopOnly"></i>BlackFoodNashville</h2>
          <div className="tagline">Supporting Black-owned businesses in Music City</div>
        </NavLink>
      </div>
      <div className="navbar-middle">
        { showSearchBar
          ? <div className="location-controls">
              <NumberInput click={setRadius} value={props.radius}/>
              miles within
              <SearchBar placeholder={props.placeholder} click={submitNewLocation}/>
            </div>
          : ''
        }
      </div>
      <div className="userMenu">
        <UserMenu user={props.user} authed={props.authed} openNewRestForm={props.openNewRestForm} isAdmin={props.isAdmin}/>
      </div>
    </div>
  );
};

// Navbar.propTypes = {}

export default Navbar;
