import React from 'react';
import StarRatings from 'react-star-ratings';

// import PropTypes from 'prop-types';

// import Rating from '../../UI/Rating/Rating';

import './RestaurantCard.scss';

const RestaurantCard = (props) => {
  const rest = props.restaurant;
  return (
      <div className="RestaurantCard">
        <div className="rest-img"><img className="card-img-top" src={rest.photo} alt="" /></div>
        <div className="">
          <h6 className="mb0">{rest.name}</h6>
          <div className="rest-body">
          <div className="rest-subheading">
            {rest.rating
              ? <StarRatings
                  rating={Number(rest.rating)}
                  starRatedColor="black"
                  numberOfStars={5}
                  starDimension="13px"
                  starSpacing="1px"/>
              : ''
                }
              </div>
            <div className="location">
              <span>{rest.location.address1}</span>
              <span>∙</span>
              <span>{rest.phone}</span>
            </div>
            <div className="categories">
              {rest.categories.join(', ')}
            </div>
            <div className="controls px-3 mt-2">
            <i className="fas fa-external-link-alt fa-2x text-muted"></i>
              {/* <i className="far fa-heart fa-2x text-muted"></i> */}
              <i className="far fa-bookmark fa-2x text-muted"></i>
              <i className="fas fa-share-alt fa-2x text-muted"></i>
              <i className="fas fa-car-side fa-2x text-muted"></i>
            </div>
          </div>
        </div>
      </div>
  );
};

// RestaurantCard.propTypes = {}

export default RestaurantCard;
