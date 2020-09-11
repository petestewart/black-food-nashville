import React from 'react';
// import PropTypes from 'prop-types';

import './SearchBar.scss';

const searchBar = (props) => {
  return (
    <div className="SearchBar">
      <form className="form-inline my-2 my-lg-0">
        <input className="form-control mr-sm-2" type="search" placeholder={props.placeholder} style={{ width: props.width }} aria-label="Search" />
        <button className="btn btn-outline-dark my-2 my-sm-0" type="submit"><i class="fas fa-search"></i></button>
      </form>
    </div>
  );
};

// searchBar.propTypes = {}

export default searchBar;
