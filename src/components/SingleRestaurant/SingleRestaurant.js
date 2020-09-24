import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import StarRatings from 'react-star-ratings';

// import PropTypes from 'prop-types';

import LinksMenu from '../../UI/LinksMenu/LinksMenu';
import Schedule from '../../UI/Schedule/Schedule';
import ShareMenu from '../ShareMenu/ShareMenu';

import utils from '../../helpers/utils';

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
    postmates: '',
    price: '',
    rating: null,
    ubereats: '',
    vegFriendly: false,
    website: '',
    yelp: '',
  });

  // const [isFavorite, setisFavorite] = useState(false);

  const { restId } = useParams();
  const rest = restaurant;

  useEffect(() => {
    window.scrollTo(0, 0);
    restaurantData.getSingleRestaurant(restId)
      .then((res) => setRestaurant(res))
      .catch((err) => console.error(err));
  }, [restId]);

  // useEffect(() => setisFavorite(props.isFavorite))

  // const editRestaurant = () => {
  //   props.history.push({
  //     pathname: `/edit/${restId}`,
  //     authed: props.authed,
  //   });
  // };

  const links = () => {
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
    if (rest.postmates) {
      restLinks.push({
        name: 'Postmates',
        faIcon: 'fas fa-car-side',
        link: rest.postmates,
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

  const favoriteButton = () => (props.isFavorite(restId)
    ? <button className="btn btn-warning" onClick={() => props.removeFavorite(restId)}><i className="fas fa-heart"></i> Saved</button>
    : <button className="btn btn-outline-warning" onClick={() => props.addFavorite(restId)}><i className="far fa-heart"></i> Save</button>);

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
                {rest.categories.join(', ')}
                {utils.checkIfOpen(rest.hours) ? <span className="open-now ml-3">Open Now</span> : ''}
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
            <div className="rest-edit text-right pt-1">
              <span className="text-muted text-nowrap submit-link">
                <Link to={{ pathname: `/edit/${restId}`, state: { restaurant } }}>
                  <i className="fas fa-edit"></i> Submit changes
                </Link>
              </span>
              {/* TODO: add submit link */}
            </div>
            <div className="controls px-3 pb-2">
              <ShareMenu className="cardlink" rest={{ ...rest, id: restId }}>
                <button className="btn btn-outline-warning"><i className="fas fa-share-alt"></i> Share</button>
              </ShareMenu>

              { props.authed ? favoriteButton() : ''}

            </div>
          </div>
        </div>
        <div className="rest-body-btm">
          <div className="rest-body-btm-l">
            <div className="rest-hours my-2">
              {rest.hours ? <Schedule schedule={utils.getWeeklyHours(rest.hours)} /> : ''}
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
