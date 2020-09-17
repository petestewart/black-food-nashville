import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import StarRatings from 'react-star-ratings';

// import PropTypes from 'prop-types';

import RestaurantUrl from '../RestaurantUrl/RestaurantUrl';
import OrderLinks from '../OrderLinks/OrderLinks';

import restaurantData from '../../helpers/data/restaurantData';

import './SingleRestaurant.scss';

const SingleRestaurant = (props) => {
  const [restaurant, setRestaurant] = useState({
    categories: [],
    doordash: '',
    grubhub: '',
    hours: [],
    latitude: 0,
    location: {
      address1: '',
      address2: '',
      city: '',
      zipcode: '',
    },
    longitude: 0,
    name: '',
    phone: '',
    photo: '',
    price: '',
    rating: null,
    ubereats: '',
    vegFriendly: false,
    website: '',
    yelp: '',
  });

  const { restId } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
    restaurantData.getSingleRestaurant(restId)
      .then(({ data }) => setRestaurant(data))
      .catch((err) => console.error(err));
  }, [restId]);

  const rest = restaurant;
  return (
    <div className="SingleRestaurant">
      <div className="rest-img">
        <img className="card-img-top" src={rest.photo} alt="" />
      </div>
      <div className="rest-body px-3">
        <div className="rest-body-top">
          <div className="rest-body-top-l">
            <div className="rest-info">
              <h1>{rest.name}</h1>
              <div className="location">
                {rest.location.address1}, {rest.location.city} {rest.location.zipcode}
              </div>
              <div className="categories">
                {/* TODO: add openNow */}
                {rest.categories.join(', ')}
              </div>
              <div className="rest-rating">
                {rest.rating
                  ? <StarRatings
                      rating={Number(rest.rating)}
                      starRatedColor="black"
                      numberOfStars={5}
                      starDimension="13px"
                      starSpacing="1px"/>
                  : ''
                    }
                {/* TODO: add price */}
              </div>
            </div>
          </div>
          <div className="rest-body-top-r">
            <div className="rest-edit">
              <h6>submit changes</h6>
              {/* TODO: add submit link */}
            </div>
            <div className="controls px-3">
              <RestaurantUrl url={rest.website}><i className="fas fa-external-link-alt fa-2x cardlink text-muted"></i></RestaurantUrl>
              <i className="far fa-bookmark fa-2x cardlink text-muted"></i>
              <i className="fas fa-share-alt fa-2x cardlink text-muted"></i>
              <OrderLinks className="cardlink" rest={rest}><i className="fas fa-car-side fa-2x text-muted" /></OrderLinks>
            </div>
          </div>
        </div>
        <div className="rest-body-btm">
          <div className="rest-body-btm-l">
            <div className="rest-hours my-2">
              <h3>HOURS</h3>
              {/* TODO: add price */}
            </div>
          </div>
          <div className="rest-body-btm-r">
            <h3>LINKS</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

// SingleRestaurant.propTypes = {}

export default SingleRestaurant;
