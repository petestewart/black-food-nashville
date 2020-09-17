import React, { useState, useEffect } from 'react';
// import PropTypes from 'prop-types';

import YelpSearchResult from '../YelpSearchResults/YelpSearchResults';
import yelpData from '../../helpers/data/yelpData';

import './YelpSearch.scss';

const YelpSearch = (props) => {
  const [searchInput, setSearchInput] = useState('');
  const [result, setResult] = useState('');
  const [showResult, setShowResult] = useState(false);

  const searchInputHandler = (e) => {
    e.preventDefault();
    setSearchInput(e.target.value);
  };

  const goToForm = (rest) => {
    // TAKE USER TO FORM WITH rest DATA AS PROPS
  };

  // ** FOR URL INPUT ONLY **
  // const yelpInputHandler = (e) => {
  //   e.preventDefault();
  //   if (restaurant.yelp.slice(0, 25) !== 'https://www.yelp.com/biz/') {
  //     return;
  //   }
  //   const getYelpId = (url) => {
  //     let yelpId = url.substring(25);
  //     if (yelpId.includes('?')) {
  //       yelpId = yelpId.substring(0, yelpId.indexOf('?'));
  //     }
  //     return yelpId;
  //   };
  //   console.warn('YELP ID IS', getYelpId(restaurant.yelp));
  //   yelpData.insertYelpData(getYelpId(restaurant.yelp))
  //     .then((res) => {
  //       console.warn(res);
  //       setRestaurant({ ...restaurant, ...res });
  //     })
  //     .catch((err) => console.error(err));
  // };

  const performYelpSearch = (e) => {
    e.preventDefault();
    if (searchInput.slice(0, 25) === 'https://www.yelp.com/biz/') {
      // get Id and search yelp
    }
    yelpData.searchByName(searchInput)
      .then((res) => {
        console.warn(res);
        setResult(res);
        setShowResult(true);
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className = "YelpSearch">
      <form className="col-6">
        <div className="form-group">
        <label htmlFor="yelp">Yelp search</label>
        <input
          type="text"
          className="form-control"
          id="yelp"
          value={searchInput}
          onChange={searchInputHandler}
          onSubmit={performYelpSearch}
          />
        </div>
        <button onClick={performYelpSearch}>Search Yelp</button>
      </form>
      <div className="searchResults">
        { showResult
          ? <YelpSearchResult result={result} />
          : ''
        }
      </div>
    </div>
  );
};

// YelpSearch.propTypes = {}

export default YelpSearch;
