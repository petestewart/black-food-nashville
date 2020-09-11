import React from 'react';
// import PropTypes from 'prop-types';

import SearchBar from '../../UI/SearchBar/SearchBar';

// import mapquestData from '../../helpers/data/mapquestData';

import './Navbar.scss';

const Navbar = (props) => {
  return (
    <div className="Navbar">
      <h1 className="Logo">OneBite</h1>
      <SearchBar placeholder={'Here I am'} width={'400px'}/>
      <div className="userMenu">
      <i class="fas fa-user-circle fa-2x"></i>
      </div>
    </div>
  );
};

// Navbar.propTypes = {}

export default Navbar;
