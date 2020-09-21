import React, { useState, useEffect } from 'react';
// import PropTypes from 'prop-types';

import './SearchBar.scss';

const SearchBar = (props) => {
  const [value, setValue] = useState(props.placeholder);

  useEffect(() => setValue(props.placeholder), [props.placeholder]);

  const inputHandler = (e) => {
    setValue(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    props.click(value);
  };

  const resetInput = () => {
    if (value === '') {
      setValue(props.placeholder);
    }
  };

  return (
    <div className="SearchBar">
      <form className="form-inline my-2 my-lg-0 filled">
        <input
          className="form-control mr-sm-2"
          id="location-input"
          type="search"
          placeholder={value || 'Enter address, city or zipcode'}
          value={value}
          onClick={() => setValue('')}
          onBlur={resetInput}
          onChange={inputHandler}
          aria-label="Search" />
        <button className="btn btn-outline-success my-2 my-sm-0 search-button" type="submit" onClick={submitHandler}><i className="fas fa-search"></i></button>
      </form>
    </div>
  );
};

// SearchBar.propTypes = {}

export default SearchBar;
