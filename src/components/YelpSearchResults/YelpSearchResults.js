import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router';

// import PropTypes from 'prop-types';

import './YelpSearchResults.scss';
import yelpData from '../../helpers/data/yelpData';

const YelpSearchResults = (props) => {
  const [rest, setRest] = useState({
    yelpId: '',
    name: '',
    photo: '',
    address: [],
    phone: '',
    categories: [],
  });
  const [currentRest, setCurrentRest] = useState(0);

  const showResults = () => {
    if (currentRest >= props.result.length) {
      console.warn('WE COULDNT FIND YOUR RESTAURANT - GO TO FORM');
    } else {
      setRest(props.result[currentRest]);
    }
  };

  const acceptResultHandler = (e) => {
    e.preventDefault();
    yelpData.insertYelpData(rest.yelpId)
      .then((res) => {
        // props.openFormHandler(res);
        props.history.push({
          pathname: '/restaurantform',
          restaurantInfo: res,
        });
      })
      .catch((err) => console.error(err));
  };

  const denyResultHandler = (e) => {
    e.preventDefault();
    if (currentRest + 1 >= props.result.length) {
      props.noMatches();
    } else {
      setCurrentRest((prevCount) => prevCount + 1);
    }
  };

  useEffect(showResults, [currentRest]);

  // ** TODO:
  // 5. If there are no results, take user to form (with a message that we could not find your restaurant)

  return (
    <div className="YelpSearchResults d-flex justify-content-center w-100">
      <div className="restaurant-chooser">
        <h6 className="text-center m-3">Is this your restaurant?</h6>
        <div className="RestaurantCard">
          <div className="rest-img"><img className="card-img-top" src={rest.photo} alt="" /></div>
          <div className="">
            <h6 className="mb0">{rest.name}</h6>
            <div className="rest-body">
              <div className="location">
                <span>{rest.address.join(' ')}</span>
                <span>∙</span>
                <span>{rest.phone}</span>
              </div>
              <div className="categories">
                {rest.categories.join(', ')}
              </div>
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-center w-100">
        <button className={'btn btn-sm m-1 btn-outline-secondary'} onClick={acceptResultHandler}>Yes</button>
        <button className={'btn btn-sm m-1 btn-outline-secondary'} onClick={denyResultHandler}>No</button>

        </div>
      </div>
    </div>
  );
};

// YelpSearchResults.propTypes = {}

export default withRouter(YelpSearchResults);
