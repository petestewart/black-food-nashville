import React from 'react';
import StarRatings from 'react-star-ratings';
import * as geolib from 'geolib';
// import PropTypes from 'prop-types';

import RestaurantUrl from '../RestaurantUrl/RestaurantUrl';
import OrderLinks from '../OrderLinks/OrderLinks';
import Schedule from '../../UI/Schedule/Schedule';

import utils from '../../helpers/utils';

import './AdminPreviewCard.scss';

const AdminPreviewCard = (props) => {
  const distanceTo = () => {
    const distMeters = geolib.getDistance({ latitude: 36.1627, longitude: -86.7816 }, { latitude: props.restaurant.latitude, longitude: props.restaurant.longitude });
    const distMiles = geolib.convertDistance(distMeters, 'mi');
    return `${Math.round(distMiles * 10) / 10} miles`;
  };

  const rest = props.restaurant;

  return (
      <div className="AdminPreviewCard">
        <div className="rest-img"><img className="card-img-top" src={rest.photo} alt="" /></div>
        <div className="">
          <h6 className="mb0 rest-name">{rest.name}</h6>
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
            <div className="rest-hours my-2">
              {rest.hours ? <Schedule schedule={utils.getWeeklyHours(rest.hours)} /> : ''}
              {/* TODO: add price */}
            </div>
            <div className="controls px-3 mt-2">
              <RestaurantUrl url={rest.website}><i className="fas fa-external-link-alt fa-2x cardlink text-muted"></i></RestaurantUrl>
              { rest.yelp
                ? <a href={rest.yelp} target="_blank" rel="noopener noreferrer"><i class="fab fa-yelp fa-2x cardlink text-muted"></i></a>
                : ''
              }
              { rest.location.address1 && rest.location.zipcode
                ? <a href={`https://www.google.com/maps/search/?api=1&query="${rest.name} ${rest.location.address1} ${rest.location.city} ${rest.location.zipcode}"`} target="_blank" rel="noopener noreferrer"><i class="fas fa-location-arrow fa-2x cardlink text-muted"></i></a>
                : ''

              }
              <OrderLinks className="cardlink" rest={rest}><i className="fas fa-car-side fa-2x text-muted" /></OrderLinks>
            </div>
            <div className="approvalButtons d-flex justify-content-center w-100 p-3">
              <button className="btn btn-outline-success mr-2">Approve</button>
              <button className="btn btn-outline-danger ml-2">Deny</button>
            </div>
          </div>
        </div>
      </div>
  );
};

// AdminPreviewCard.propTypes = {}

export default AdminPreviewCard;
