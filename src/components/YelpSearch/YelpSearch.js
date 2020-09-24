import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
// import PropTypes from 'prop-types';

import YelpSearchResult from '../YelpSearchResults/YelpSearchResults';
import yelpData from '../../helpers/data/yelpData';

import './YelpSearch.scss';

const YelpSearch = (props) => {
  const [searchInput, setSearchInput] = useState('');
  const [searchArea, setSearchArea] = useState('');
  const [result, setResult] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [notFound, setNotFound] = useState(false);

  window.scrollTo(0, 0);

  const searchInputHandler = (e) => {
    e.preventDefault();
    setSearchInput(e.target.value);
    if (notFound) { setNotFound(false); }
  };

  const searchAreaHandler = (e) => {
    e.preventDefault();
    setSearchArea(e.target.value);
    if (notFound) { setNotFound(false); }
  };

  useEffect(() => {
    if (notFound) {
      setShowResult(false);
    }
  }, [notFound]);

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

  const noMatches = () => {
    setNotFound(true);
    setShowResult(false);
  };

  const cancelForm = (e) => {
    e.preventDefault();
    props.history.push({
      pathname: '/home',
    });
  };

  const performYelpSearch = (e) => {
    e.preventDefault();
    setNotFound(false);
    if (!searchInput) { return; }
    if (searchInput.slice(0, 25) === 'https://www.yelp.com/biz/') {
      // get Id and search yelp
    }
    yelpData.searchByName(searchInput, searchArea)
      .then((res) => {
        if (res.length > 0) {
          setNotFound(false);
          setResult(res);
          setShowResult(true);
        } else {
          setNotFound(true);
        }
      })
      .catch((err) => {
        console.error(err);
        setNotFound(true);
      });
  };

  const createFromScratch = (e) => {
    e.preventDefault();
    props.history.push({
      pathname: '/restaurantform',
      restaurantInfo: { name: searchInput },
    });
  };

  return (
    <div className = "YelpSearch d-flex justify-content-center w-100">
      <form className="col-6 m-3">
        <h6 className="text-center m-3">Let's see if we can find your restaurant on Yelp</h6>
        <div className="form-group">
          <label htmlFor="yelp">Name</label>
          <input
            type="text"
            className="form-control"
            id="yelp"
            value={searchInput}
            onChange={searchInputHandler}
            onSubmit={performYelpSearch}
            />
        </div>
        <div className="form-group">
          <label htmlFor="yelpArea">City or Zipcode (optional)</label>
          <input
            type="text"
            className="form-control"
            id="yelpArea"
            value={searchArea}
            onChange={searchAreaHandler}
            onSubmit={performYelpSearch}
            />
        </div>
  <button className="btn btn-outline-dark" onClick={performYelpSearch}>{notFound ? 'Try Again' : 'Search Yelp'}</button>
      <div className="searchResults mt-3">
        { notFound
          ? <div className="not-found">
            <div className="alert alert-warning" role="alert">
              <p>
                Sorry, we were unable to find a restaurant with that name.
              </p>
              <p>
                Would you like to create a new restaurant from scratch?
              </p>
            </div>

              <button className="btn btn-warning" onClick={createFromScratch}>Yes, Create New Restaurant</button>
              <button className="btn btn-outline-secondary ml-3" onClick={cancelForm}>No, thank-you</button>

          </div>
          : ''}

        { showResult
          ? <YelpSearchResult result={result} noMatches={noMatches}/>
          : ''
        }
      </div>
      </form>
    </div>
  );
};

// YelpSearch.propTypes = {}

export default withRouter(YelpSearch);
