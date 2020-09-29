import React from 'react';
import { withRouter } from 'react-router';
import StarRatings from 'react-star-ratings';
import * as geolib from 'geolib';

// import PropTypes from 'prop-types';

import RestaurantUrl from '../RestaurantUrl/RestaurantUrl';
import ShareMenu from '../ShareMenu/ShareMenu';
import OrderLinks from '../OrderLinks/OrderLinks';
import FavoriteSwitch from '../FavoriteSwitch/FavoriteSwitch';

import './RestaurantCard.scss';

const RestaurantCard = (props) => {
  const distanceTo = () => {
    const distMeters = geolib.getDistance(props.userLocation, { latitude: props.restaurant.latitude, longitude: props.restaurant.longitude });
    const distMiles = geolib.convertDistance(distMeters, 'mi');
    return `${Math.round(distMiles * 10) / 10} miles`;
  };

  const goToSingleView = (e) => {
    props.history.push({
      pathname: `/business/${props.restaurant.id}`,
      restaurantInfo: props.restaurant,
    });
  };

  const rest = props.restaurant;
  return (
      <div className="RestaurantCard ">
        <div className="rest-img" onClick={goToSingleView}><img className="card-img-top" src={rest.photo} alt="" /></div>
        <div className="">
          <h6 className="mb0 rest-name" onClick={goToSingleView}>{rest.name}</h6>
          <div className="rest-body">
            <div className="rest-subheading">
            {rest.rating
              ? <StarRatings
                  rating={Number(rest.rating)}
                  starRatedColor="#6C757D"
                  numberOfStars={5}
                  starDimension="13px"
                  starSpacing="1px"/>
              : ''
                }
            </div>
            <div className="location">
              <span>{rest.location.address1}</span>
              <span className="ml-1">{rest.phone}</span>
              {<span className="ml-1 text-muted">
                  {distanceTo()}
                </span>}
            </div>
            <div className="categories">
              {rest.categories.join(', ')}
            </div>
            <div className="controls px-3 mt-2">
              <RestaurantUrl url={rest.website}><i className="fas fa-external-link-alt fa-2x cardlink text-muted"></i></RestaurantUrl>
              {props.authed
                ? <FavoriteSwitch addFavorite={props.addFavorite} removeFavorite={props.removeFavorite} isFavorite={props.isFavorite} restId={rest.id}/>
                : ''
              }
              <ShareMenu className="cardlink" rest={rest}><i className="fas fa-share-alt fa-2x cardlink text-muted"></i></ShareMenu>
              <OrderLinks className="cardlink" rest={rest}><i className="fas fa-car-side fa-2x text-muted" /></OrderLinks>
              {/* <Dropdown className="cardlink" links={links}><i className="fas fa-car-side fa-2x text-muted" ></i></Dropdown> */}
            </div>
          </div>
        </div>
      </div>
  );
};

// RestaurantCard.propTypes = {}

export default withRouter(RestaurantCard);
