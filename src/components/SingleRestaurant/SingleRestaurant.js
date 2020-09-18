import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import StarRatings from 'react-star-ratings';

// import PropTypes from 'prop-types';

import LinksMenu from '../../UI/LinksMenu/LinksMenu';
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

  const links = () => {
    const directionsLink = () => {
      const { location } = rest;
      const url = `${rest.name} ${location.address1} ${location.city} ${location.zipcode}`;
      console.warn(encodeURIComponent(url));
      return ((url));
    };

    const restLinks = [];

    if (rest.doordash) {
      restLinks.push({
        name: 'DoorDash',
        faIcon: 'fas fa-car-side',
        link: rest.doordash,
        external: true,
      });
    }
    if (rest.grubhub) {
      restLinks.push({
        name: 'GrubHub',
        faIcon: 'fas fa-car-side',
        link: rest.grubhub,
        external: true,
      });
    }
    if (rest.ubereats) {
      restLinks.push({
        name: 'UberEats',
        faIcon: 'fas fa-car-side',
        link: rest.ubereats,
        external: true,
      });
    }
    if (rest.phone) {
      restLinks.push({
        name: rest.phone,
        faIcon: 'fas fa-phone-alt',
        link: `tel:${rest.phone.replace(/[^\d]/g, '')}`,
      });
    }
    if (rest.yelp) {
      restLinks.push({
        name: 'Yelp',
        faIcon: 'fab fa-yelp',
        link: rest.yelp,
        external: true,
      });
    }
    if (rest.website) {
      restLinks.push({
        name: 'Website',
        faIcon: 'fas fa-external-link-alt',
        link: rest.website,
        external: true,
      });
    }
    if (rest.location) {
      restLinks.push({
        name: 'Get Directions',
        faIcon: 'fas fa-location-arrow',
        link: `https://www.google.com/maps/search/?api=1&query="${rest.name} ${rest.location.address1} ${rest.location.city} ${rest.location.zipcode}"`,
        external: true,
      });
    }
    return restLinks;
  };

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
            <div className="rest-edit text-right">
              <span className="text-muted text-nowrap"><i className="fas fa-edit"></i> Submit changes</span>
              {/* TODO: add submit link */}
            </div>
            <div className="controls px-3">
              <i className="fas fa-share-alt fa-2x cardlink text-muted"></i>
              <i className="far fa-heart fa-2x text-muted"></i>
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
            <div className="rest-links">
              <LinksMenu className="mt-1" links={links()} />
            </div>
            {/* <h3>LINKS</h3><OrderLinks className="cardlink" rest={rest}><i className="fas fa-car-side fa-2x text-muted" /></OrderLinks><RestaurantUrl url={rest.website}><i className="fas fa-external-link-alt fa-2x cardlink text-muted"></i></RestaurantUrl> */}
          </div>
        </div>
      </div>
    </div>
  );
};

// SingleRestaurant.propTypes = {}

export default SingleRestaurant;
