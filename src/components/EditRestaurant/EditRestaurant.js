import React from 'react';
import { useParams } from 'react-router';

// import PropTypes from 'prop-types';

import RestarauntForm from '../RestaurantForm/RestaurantForm';

import './EditRestaurant.scss';

const EditRestaurant = (props) => {
  const { restId, authed } = useParams();

  return (
    <div>
      <RestarauntForm restId={restId} authed={props.authed} />
    </div>
  );
};

// EditRestaurant.propTypes = {}

export default (EditRestaurant);
